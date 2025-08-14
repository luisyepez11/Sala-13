import {createRouter,createWebHistory} from "vue-router"
import Home from "../pages/home.vue";
import Login from "../pages/login.vue"
import Register from "../pages/register.vue"
import Profile from "../pages/profile.vue"
import MovieDetail from "../pages/movieDetail.vue"
import HomeBusqueda from "../pages/homeBusqueda.vue";
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
        },
        {
            path:"/details/:id",
            name: "details",
            component: MovieDetail
        },
        {
            path:"/search/:id",
            name: "search",
            component: HomeBusqueda
        }
    ]
})
export default router;