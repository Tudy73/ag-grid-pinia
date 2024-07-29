import {createWebHistory, createRouter} from 'vue-router'
import Grid from "@/components/Grid.vue";
import PopulateButton from "@/components/PopulateButton.vue";
import {useUserStore} from "@/stores/UserState.js";
import LogIn from "@/components/LogIn.vue";
import TodoComponent from "@/components/TodoComponent.vue";
import {useGridStore} from "@/stores/grid.js";

const routes = [
    {path: '/', component: Grid},
    {path: '/api', component: PopulateButton},
    {path: '/login', component: LogIn},
    {path: '/todo/:todo', component: TodoComponent}
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})
router.beforeEach((to,from,next)=>{
    const userStore = useUserStore()
    const gridStore = useGridStore()
    if(to.path.startsWith('/todo/')){
        if(!gridStore.exists(to.params.todo))next(from.path)
        else if(!gridStore.isPublic(to.params.todo) && !userStore.loggedIn)next(from.path)
        else next()
    }
    else if(!userStore.loggedIn && to.path!=="/login" && to.path!=="/api"){
        return next("/login")
    }
    else next()
})
export default router