import Vue from 'vue'
import Vuex from 'vuex'
import { toyStore } from "./toy.store";
import { userStore } from "./user.store";


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    toyStore,
    userStore
  }
})
