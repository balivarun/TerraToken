/// <reference types="vite/client" />

interface ImportMetaEnv {
  VITE_API_URL: string
  VITE_APP_TITLE: string
  // Add other custom env variables here
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}