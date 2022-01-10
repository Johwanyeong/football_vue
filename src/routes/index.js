import { createWebHistory, createRouter } from "vue-router";

import Home from '@/components/Home'
import Join from '@/components/Join'
import Login from '@/components/Login'
import Logout from '@/components/Logout'

const routes = [
    {path:'/',  name:'Home', component:Home},
    {path:'/Join',  name:'Join', component:Join},
    {path:'/Login',  name:'Login', component:Login},
    {path:'/Logout',  name:'Logout', component:Logout},
]

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;