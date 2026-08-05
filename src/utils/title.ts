import { appSettings } from '@/settings'

export function getAppTitle() {
  return import.meta.env.VITE_APP_TITLE || appSettings.title
}

export function getPageTitle(title?: string) {
  const appTitle = getAppTitle()
  return title ? `${title} - ${appTitle}` : appTitle
}
