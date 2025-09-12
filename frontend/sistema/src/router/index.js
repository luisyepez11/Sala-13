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
import listDetailOther from "../pages/listDetailOther.vue";
import Lading_page from "../pages/lading_page.vue";
import homeBusquedaListas from "../pages/homeBusquedaListas.vue";
import PdfViewer from "../pages/PdfViewer.vue";
import ContactPage from "../pages/ContactPage.vue";
import Comunidades from "./../pages/Comunidades.vue"
import ListDetailOther from "../pages/listDetailOther.vue";
const router = createRouter({
    history:createWebHistory(),
    routes:[
        {
            path:"/",
            name:"LandingPage",
            component:Lading_page
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
            path:"/comunidades",
            name:"comunidades",
            component:Comunidades

        }
        ,
        {
            path:"/otherProfile/:id",
            name: "otherProfile",
            component: OtherProfile
        },
        {
            path:"/listDetail/:id",
            name:"listDetail",
            component:ListDetail
        },
        {
            path:"/listDetailOther/:id",
            name:"listDetailOther",
            component:ListDetailOther
        },
         {
            path:"/home",
            name:"Home",
            component:Home
        },
         {
            path:"/homeListas",
            name:"homeListas",
            component:homeBusquedaListas
        },
        {
            path:"/ayuda",
            name:"manual",
            component:PdfViewer
        },
        {
            path:"/timeline",
            name:"timeline",
            component:TimeLine
        },
        {
            path:"/contacto",
            name:"contacto",
            component:ContactPage
        }
    ]
})
export default router;