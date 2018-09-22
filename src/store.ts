import Vue from 'vue';
import Vuex from 'vuex';

import axios from 'axios';

Vue.use(Vuex);

let baseURL = '/api/v1';
let baseAuthURL = '/auth/';

if (process.env.NODE_ENV && process.env.NODE_ENV === 'development') {
  const developmentServer = 'http://localhost:8000';
  baseURL = developmentServer + baseURL.slice(4, baseURL.length);
  baseAuthURL = developmentServer + baseAuthURL;
}

export default new Vuex.Store({
    state: {
        token: '',
        userInfo: {},
    },
    mutations: {
        saveToken: (state, token) => {
            if (token) {
                axios.defaults.headers.common.Authorization = 'Token ' + token;
            } else {
                delete axios.defaults.headers.common.Authorization;
            }
            state.token = token;
        },
        saveUserInfo: (state, payload) => {
            state.userInfo = payload;
        },
    },
    actions: {
        getUserToken: ({ commit, dispatch, state}, payload) => {
            return new Promise((resolve, reject) => {
                axios.post(baseAuthURL + `token/create/`, payload)
                    .then((response) => {
                        const token = response.data.auth_token;
                        commit('saveToken', token);
                        resolve();
                    });
            });
        },
        initializeUser: ({ commit, dispatch, state }, payload) => {
            return new Promise((resolve, reject) => {
                if (payload) {
                    commit('saveToken', payload);
                }
                dispatch('getUserInfo')
                    .then(() => {
                        // dispatch('getStandardAvailability');
                        resolve();
                    });
            });
        },
        getUserInfo: ({ commit, state }, payload) => {
            return new Promise((resolve, reject) => {
                axios.get(baseAuthURL + `me/`)
                    .then((responseCurrentDetails) => {
                        const username = responseCurrentDetails.data.username;
                        axios.get(baseURL + `/users/?username=${username}`)
                            .then((response) => {
                                commit('saveUserInfo', {
                                    id: response.data.results[0].id,
                                    username: response.data.results[0].username,
                                    firstName: response.data.results[0].first_name,
                                    lastName: response.data.results[0].last_name,
                                    email: response.data.results[0].email,
                                    kitNumber: response.data.results[0].kit_number,
                                    position: response.data.results[0].position,
                                    team: response.data.results[0].team,
                                    locale: response.data.results[0].locale,
                                });
                                resolve(response);
                            })
                            .catch((error) => {
                                // console.error(error);
                                reject(error);
                            });
                    });
            });
        },
    },
});
