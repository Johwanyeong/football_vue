import { createApp } from 'vue'
import App from './App.vue'
import router from './routes';

//ui 설정
import ElementPlus from 'element-plus';
import 'element-plus/theme-chalk/index.css';

const app = createApp(App);
app.use(router);
app.use(ElementPlus);
app.mount('#app');
