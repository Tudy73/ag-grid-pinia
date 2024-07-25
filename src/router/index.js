import {createMemoryHistory, createRouter} from 'vue-router'
import Grid from "@/components/Grid.vue";
import PopulateButton from "@/components/PopulateButton.vue";
import {useUserStore} from "@/stores/UserState.js";
import LogIn from "@/components/LogIn.vue";

const routes = [
    {path: '/', component: Grid},
    {path: '/api', component: PopulateButton},
    {path: '/login', component: LogIn}
]

const router = createRouter({
    history: createMemoryHistory(),
    routes,
})
router.beforeEach((to,from,next)=>{
    const userStore = useUserStore()
    if(!userStore.loggedIn && to.path!=="/login"){
        return next('/login')
    }
    next()
})
export default router