import Cookies from 'js-cookie'
import { userLogin } from "../apis/user.js";
import { deleteAuthHeader } from "../utils/request"

export const state = () => ({
    status: '',
    token: Cookies.get('token') || '',
})

export const mutations = {
    auth_request(state) {
        state.status = 'loading'
    },
    auth_success(state, { token }) {
        state.status = 'success'
        state.token = token
    },
    auth_fail(state) {
        state.status = 'fail'
    },
    auth_error(state) {
        state.status = 'error'
    },
    logout(state) {
        state.status = ''
        state.token = ''
    },
}

export const actions = {
    login({ commit }, user) {
        return new Promise((reslove, reject) => {
            commit('auth_request')
            userLogin(user.username, user.password)
                .then(res => {
                    if (res.success) {
                        const token = res.token;
                        if (token) {
                            Cookies.set('token', token)
                            commit('auth_success', { token });
                        }
                        else {
                            commit('auth_fail');
                        }
                    }
                    else {
                        commit('auth_fail');
                    }
                    reslove(res);
                })
                .catch(err => {
                    commit('auth_error');
                    Cookies.remove('token');
                    reject(err);
                })
        })
    },
    logout({ commit }) {
        return new Promise((resolve) => {
            console.log('logout')
            commit('logout')
            Cookies.remove('token');
            deleteAuthHeader()
            resolve()
        })
    },
}

export const getters = {
    token: state => state.token
}
