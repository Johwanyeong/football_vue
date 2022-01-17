import { createWebHistory, createRouter } from "vue-router";

import Home from '@/components/Home'
import Join from '@/components/Join'
import Login from '@/components/Login'
import Logout from '@/components/Logout'
import Registration from '@/components/Registration'
import PlayerList from '@/components/PlayerList'

const routes = [
    {path:'/',  name:'Home', component:Home},
    {path:'/Join',  name:'Join', component:Join},
    {path:'/Login',  name:'Login', component:Login},
    {path:'/Logout',  name:'Logout', component:Logout},
    {path:'/Registration',  name:'Registration', component:Registration},
    {path:'/PlayerList',  name:'PlayerList', component:PlayerList},
]

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;