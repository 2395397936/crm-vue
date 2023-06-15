import VueRouter from 'vue-router'
import routes from "./routes";
export default new VueRouter({
    mode:'history',
    routes,
    scrollBehavior(to, from, savePosition) {
        return {y: 0}
    }
})