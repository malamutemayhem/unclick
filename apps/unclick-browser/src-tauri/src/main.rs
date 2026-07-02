#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::time::Duration;
use tauri_plugin_updater::UpdaterExt;

#[derive(serde::Serialize)]
struct Page {
    final_url: String,
    html: String,
}

const UA: &str = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 \
                  (KHTML, like Gecko) UnClickBrowser/0.6 Safari/537.36";

// A page bigger than this is not an article; refuse it rather than freeze the
// reader trying to parse it.
const MAX_PAGE_BYTES: u64 = 10 * 1024 * 1024;

// Scheme allowlist, case-insensitive so "HTTPS://" does not slip past.
fn is_http_url(url: &str) -> bool {
    let lower = url.trim().to_ascii_lowercase();
    lower.starts_with("https://") || lower.starts_with("http://")
}

#[tauri::command]
async fn fetch_url(url: String) -> Result<Page, String> {
    if !is_http_url(&url) {
        return Err("only http(s) urls are allowed".into());
    }
    let client = reqwest::Client::builder()
        .user_agent(UA)
        // Without these a slow or unreachable host hangs the request forever and
        // the UI sits on "Loading ..." with no error. Bound the whole request so
        // it always settles and the front end can show a failure.
        .connect_timeout(Duration::from_secs(10))
        .timeout(Duration::from_secs(25))
        .build()
        .map_err(|e| e.to_string())?;
    let resp = client
        .get(&url)
        .send()
        .await
        .map_err(|e| format!("request failed: {e}"))?;
    if let Some(len) = resp.content_length() {
        if len > MAX_PAGE_BYTES {
            return Err("page too large to read".into());
        }
    }
    let final_url = resp.url().to_string();
    let html = resp
        .text()
        .await
        .map_err(|e| format!("read failed: {e}"))?;
    Ok(Page { final_url, html })
}

// Report content-length for a batch of image urls (HEAD only, never the body).
// This backs the reader's precise per-image byte cap: oversized images are
// skipped before they ever load, and the front end caches sizes per url so a
// repeat visit measures nothing.
#[tauri::command]
async fn image_sizes(
    urls: Vec<String>,
) -> Result<std::collections::HashMap<String, u64>, String> {
    let client = reqwest::Client::builder()
        .user_agent(UA)
        .connect_timeout(Duration::from_secs(5))
        .timeout(Duration::from_secs(8))
        .build()
        .map_err(|e| e.to_string())?;
    let mut handles = Vec::new();
    for url in urls.into_iter().filter(|u| is_http_url(u)).take(48) {
        let c = client.clone();
        handles.push(tauri::async_runtime::spawn(async move {
            let len = c.head(&url).send().await.ok().and_then(|r| r.content_length());
            (url, len)
        }));
    }
    let mut out = std::collections::HashMap::new();
    for h in handles {
        if let Ok((url, Some(len))) = h.await {
            out.insert(url, len);
        }
    }
    Ok(out)
}

// Open a URL in the user's real default browser. The fetch-and-iframe view
// cannot run interactive pages (captchas, logins, web apps); this hands those
// off to a full browser where they actually work.
#[tauri::command]
fn open_external(url: String) -> Result<(), String> {
    if !is_http_url(&url) {
        return Err("only http(s) urls are allowed".into());
    }
    open::that(url).map_err(|e| e.to_string())
}

fn main() {
    tauri::Builder::default()
        .plugin(tauri_plugin_updater::Builder::new().build())
        .setup(|app| {
            let handle = app.handle().clone();
            tauri::async_runtime::spawn(async move {
                if let Ok(updater) = handle.updater() {
                    if let Ok(Some(update)) = updater.check().await {
                        let _ = update
                            .download_and_install(|_chunk: usize, _total: Option<u64>| {}, || {})
                            .await;
                    }
                }
            });
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![fetch_url, open_external, image_sizes])
        .run(tauri::generate_context!())
        .expect("error while running UnClick Browser");
}
