import {createRouter,createWebHistory} from "vue-router"
import Home from "../pages/home.vue";
import Login from "../pages/login.vue"
import Register from "../pages/register.vue"
import Profile from "../pages/profile.vue"
const router = createRouter({
    history:createWebHistory(),
    routes:[
        {
            path:"/",
            name:"home",
            component:Home
        },
        {
            path:"/profile",
            name:"profile",
            component:Profile
        },
        {
            path:"/login",
            name:"login",
            component:Login
        },
        {
            path:"/register",
            name:"register",
            component:Register
        }
    ]
})
export default router;