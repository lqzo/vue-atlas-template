import { createApp } from 'vue'
import 'nprogress/nprogress.css'
import './styles/index.scss'
import { setupSvgIcons } from './icons'
import App from './App.vue'
import router from './router'
import { setupAuthFailureHandler } from './router/auth-failure'
import { setupRouterGuard } from './router/guard'
import { createPinia } from 'pinia'
import { setupPermissionDirective } from './directives/permission'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)

setupRouterGuard(router)
setupAuthFailureHandler(router)
setupPermissionDirective(app)
setupSvgIcons()

app.mount('#app')
