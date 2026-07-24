/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_DISPLAY_MODE?: string
  readonly VITE_SHOW_REPLACE_HINTS?: string
  readonly VITE_SITE_URL?: string
  readonly VITE_PAYMENT_MODE?: string
  readonly VITE_PAYMENT_PROVIDER?: string
  readonly VITE_PAYMENT_LINK?: string
  readonly VITE_COURSE_ACCESS_URL?: string
  readonly VITE_SUPPORT_EMAIL?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
