const defaultAppTitle = 'Vue Atlas Template'

export function getAppTitle() {
  return import.meta.env.VITE_APP_TITLE || defaultAppTitle
}

export function getPageTitle(title?: string) {
  const appTitle = getAppTitle()
  return title ? `${title} - ${appTitle}` : appTitle
}
