import {createRouter,createWebHistory} from "vue-router"
import Home from "../pages/home.vue";
import Login from "../pages/login.vue"
import Register from "../pages/register.vue"
import Profile from "../pages/profile.vue"
import MovieDetail from "../pages/movieDetail.vue"
import HomeBusqueda from "../pages/homeBusqueda.vue";
import OtherProfile from "../pages/otherProfile.vue";
import Community from "../pages/Community.vue";
import ListDetail from "../pages/listDetail.vue";
import Lading_page from "../pages/Lading_page.vue";
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
        ,
        {
            path:"/otherProfile/:id",
            name: "otherProfile",
            component: OtherProfile
        },
        {
            path:"/community",
            name:"community",
            component:Community

        },
        {
            path:"/listDetail/:id",
            name:"listDetail",
            component:ListDetail
        },
         {
            path:"/lading_page",
            name:"lading_page",
            component:Lading_page
        },
    ]
})
export default router;