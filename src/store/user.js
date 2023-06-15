import {getCookie} from '@/cookie'
const state= {
    suName: getCookie("suName"),
    suRole: getCookie("suRole"),
}
const mutations={
    suName: (state, data) => state.suName = data,
    suRole: (state, data) => state.suRole = data,
}
const actions={
    initUser({commit},{suName,suRole}){
        commit("suName",suName)
        commit("suRole",suRole)
    }
}
const getters={
    suName(state){
        return state.suName
    },
    suRole(state){
        return state.suRole
    },
}
export default {
    state,
    mutations,
    actions,
    getters
}