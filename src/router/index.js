import {createMemoryHistory, createRouter} from 'vue-router'
import Grid from "@/components/Grid.vue";
import PopulateButton from "@/components/PopulateButton.vue";

const routes = [
    {path: '/', component: Grid},
    {path: '/api', component: PopulateButton}
]

const router = createRouter({
    history: createMemoryHistory(),
    routes,
})
export default router