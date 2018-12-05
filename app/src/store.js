import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    users: [
      {
        id: 0,
        nome: '',
        mail: '',
        nivel: 1,
        exp: 0,
        rank: ''
      }
    ],
    groups: [
      {
        id: 0,
        nome: ''
      }
    ],
    threads: [
      {
        id: 0,
        question: '',
        tags: []
      }
    ],
    ans: [
      {
        id: 0,
        idThread: 0,
        answer: ''
      }
    ]
  },
  mutations: {
    addUser(state, user) {
      state.users.push(user);
    }
  },
  actions: {
    addUserAct(context, user) {
      context.commit('addUser', {
        user
      });
    }
  },
  getters: {
    numberOfUsers: state => {
      return state.users.length;
    }
  }
});
