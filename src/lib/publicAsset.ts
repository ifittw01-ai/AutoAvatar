/** 組出 public/ 下資源路徑，相容 GitHub Pages 子目錄 base */
export function publicAsset(path: string): string {
  const cleanPath = path.replace(/^\/+/, '')
  return `${import.meta.env.BASE_URL}${cleanPath}`
}
