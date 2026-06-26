#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use tauri_plugin_updater::UpdaterExt;

#[derive(serde::Serialize)]
struct Page {
    final_url: String,
    html: String,
}

#[tauri::command]
async fn fetch_url(url: String) -> Result<Page, String> {
    let client = reqwest::Client::builder()
        .user_agent(
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 \
             (KHTML, like Gecko) UnClickBrowser/0.3 Safari/537.36",
        )
        .build()
        .map_err(|e| e.to_string())?;
    let resp = client
        .get(&url)
        .send()
        .await
        .map_err(|e| format!("request failed: {e}"))?;
    let final_url = resp.url().to_string();
    let html = resp
        .text()
        .await
        .map_err(|e| format!("read failed: {e}"))?;
    Ok(Page { final_url, html })
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
        .invoke_handler(tauri::generate_handler![fetch_url])
        .run(tauri::generate_context!())
        .expect("error while running UnClick Browser");
}
