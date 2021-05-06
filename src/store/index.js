import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loggedIn: true,
    activePage: 'home',
    userUid: ''
  },
  mutations: {
    setLoggedIn(state, value) {
      console.log('loggedin changed to :' + value);
      state.loggedIn = value;
    },
    setActivePage(state, value) {
      console.log('activepage changed to :' + value);
      state.activePage = value;
    },
    setUserUid(state, value) {
      console.log('userUid changed to :' + value);
      state.userUid = value;
    }
  },
})
