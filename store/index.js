import Vuex from 'vuex'
import NUMBER_OF_POSTS from '~/apollo/queries/NUMBER_OF_POSTS.graphql'
import CATEGORIES from '~/apollo/queries/CATEGORIES.graphql'
import { asyncify } from 'async'
import Cookie from 'js-cookie'

const createStore = () => {
  return new Vuex.Store({
    state: {
    categoryId: '',
    postList: 0,
    categoryPostList: 0,
    allCategories: [],
    error: false,
    ok: false,
    message: ' ',
    token: null,
    searchPhrase: ''
  },
  getters: {
    getCategoryID: state => {
      return state.categoryId;
    },
    getcategoryPostList: state =>{
      return state.categoryPostList
    },
    getToken: state=>{
      return state.token
    },
    getSearchPhrase: state=>{
      return state.searchPhrase;
    }
  },
  mutations: {
    setMorePostsCategory(state, catId){
        state.categoryId = catId;
    },
    setPostList(state, postList){
      state.postList = postList;
    },
    setCategoryPostList(state, categoryPostList){
      state.categoryPostList = categoryPostList;
    },
    setCategoryList(state, categoryList){
      state.allCategories = categoryList;
    },
    showError(state){
      state.error = true;
      setTimeout(()=>{state.error = false}, 3000)
    },
    showOk(state, message){
        state.ok = true;
        state.message = message;
        setTimeout(()=>{state.ok = false; state.message=' '}, 3000)
    },
    setToken(state, token){
      state.token = token;
    },
    deleteToken(state){
      state.token = null;
    },
    setSearchPhrase(state, phrase){
      state.searchPhrase = phrase;
    },
    clearSearchPhrase(state){
      state.searchPhrase = '';
    }
  },
  actions: {
    nuxtServerInit(vuexContext, context) {
      let postListPromise = context.app.provide.$apolloProvider.defaultClient.query({query: NUMBER_OF_POSTS});
      let categoriesPromise = context.app.provide.$apolloProvider.defaultClient.query({query: CATEGORIES});
      return Promise.all([postListPromise, categoriesPromise])
        .then((res) => {
          vuexContext.commit("setPostList", res[0].data._allBlogpostsMeta.count);
          vuexContext.commit("setCategoryList", res[1].data.allCategories);
        })
    },
    logout(vuexContext, context){
      vuexContext.commit("deleteToken");
      Cookie.remove("jwt");
      if (process.client) {
        localStorage.removeItem("token");
      }
    }
  }
  })
}

export default createStore