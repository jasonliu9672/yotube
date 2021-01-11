import Cookies from 'js-cookie'
import { userLogin } from "../apis/user.js";
import { deleteAuthHeader } from "../utils/request"

export const state = () => ({
    status: '',
    token: Cookies.get('token') || '',
    username: ''
})

export const mutations = {
    auth_request(state) {
        state.status = 'loading'
    },
    auth_success(state, { token, username }) {
        state.status = 'success';
        state.token = token;
        state.username = username;
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
        state.username = ''
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
                        const username = res.username;
                        console.log('username:', username)
                        if (token) {
                            Cookies.set('token', token)
                            commit('auth_success', { token, username });
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
    status: state => state.status,
    token: state => state.token,
    username: state => state.username
}
