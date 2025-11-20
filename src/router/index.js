import {createRouter, createWebHashHistory} from 'vue-router'


const routes = [
    { path: '/', component: ()=> import("@/views/Index.vue") },
]

const index = createRouter({
    history: createWebHashHistory(),
    routes,
    scrollBehavior() {
        return { left: 0, top: 0 };
    },
})

export default index
