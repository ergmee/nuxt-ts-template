// var axios = require('axios')
import axios from 'axios';
import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
export const state = () => {
    return {
        products: null,
        recepts: null,
        icebox: null
    };
};
export const mutations = {
    REMOVE_PRODUCT: function (state, product) {
        delete state.products[product.name];
    },
    CREATE_PRODUCT: function (state, productObj) {
        state.products[productObj.name] = {
            name: productObj.name,
            avatar: productObj.avatar,
            category: productObj.category,
            protein: productObj.protein,
            fat: productObj.fat,
            carbohydrate: productObj.carbohydrate,
            kcal: productObj.kcal,
            metaData: {
                autor: productObj.metaData.autor,
                timestamp: productObj.metaData.timestamp
            }
        };
    },
    SAVE_RECEPT: function (state, receptObj) {
        console.log("SAVE_RECEPT", receptObj);
        state.recepts[receptObj.name] = {
            name: receptObj.name,
            avatar: receptObj.avatar,
            category: receptObj.category,
            description: receptObj.description,
            favoritesAdd: receptObj.favoritesAdd,
            photo: receptObj.photo,
            tags: receptObj.tags,
            ingredientsList: receptObj.ingredientsList,
            metaData: {
                autor: receptObj.metaData.autor,
                timestamp: receptObj.metaData.timestamp
            }
        };
    },
    SAVE_PRODUCTS: function (state, items) {
        state.products = items;
    },
    SAVE_RECEPTS: function (state, items) {
        state.recepts = items;
    },
};
export const actions = {
    async nuxtServerInit({ dispatch, commit }, { req }) {
        if (req.session) {
            if (req.session.authUser)
                commit('SET_USER', req.session.authUser);
        }
        //req.session.touch();
    },
    async createProduct({ commit }, productObj) {
        await axios.post('/api/createProduct', productObj)
            .then((response) => {
            console.log("createProduct store:", response);
            if (response.data.status === 0) {
                commit("CREATE_PRODUCT", productObj);
            }
        })
            .catch((error) => { });
    },
    async removeProduct({ commit }, productObj) {
        try {
            await axios.post('/api/removeProduct', { product: productObj })
                .then((response) => {
                console.log("response:", response);
            });
            console.log("removeProduct:");
            commit("REMOVE_PRODUCT", productObj);
        }
        catch (error) {
            throw error;
        }
    },
    getProducts: async ({ commit }) => {
        await axios.get('/api/getProducts')
            .then((response) => {
            if (response.data.status === 0) {
                commit('SAVE_PRODUCTS', response.data.result);
            }
        })
            .catch((error) => { });
    },
    async saveRecept({ commit }, receptObj) {
        console.log("saveRecept store:", receptObj);
        await axios.post('/api/saveRecept', receptObj)
            .then((response) => {
            console.log("saveRecept response:", response);
            if (response.data.status === 0) {
                commit("SAVE_RECEPT", receptObj);
            }
        })
            .catch((error) => { });
    },
    // async removeRecept({ commit }) {},
    async getRecepts({ commit }) {
        try {
            let result = await axios.get('/api/getRecepts');
            if (result.data.status === 0) {
                commit('SAVE_RECEPTS', result.data.result);
            }
        }
        catch (error) {
            throw error;
        }
    },
};
