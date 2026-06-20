export function brandIconSrcFor(slug?: string): string | null {
  if (slug === "higgsfield") return "/app-icons/higgsfield.png";
  if (slug === "google-drive") return "https://ssl.gstatic.com/images/branding/product/1x/drive_2020q4_48dp.png";
  return null;
}
