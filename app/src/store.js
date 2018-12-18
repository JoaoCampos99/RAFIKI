import Vue from "vue";
import Vuex, { mapGetters } from "vuex";

Vue.use(Vuex);

let $ = require("../node_modules/jquery/dist/jquery.js")

export default new Vuex.Store({
  state: {
    users: [
      // {
      //   id: 0,
      //   name: '',
      //   mail: '',
      //   level: 1,
      //   exp: 0,
      //   badges: [1],
      //   rank: '',
      //   desc: "",
      //   photo: "",
      //   follow: [] //Array que vai ter os id's dos threads que o utilizador segue
      // }
    ],
    badges: [{
      id: 1,
      name: "you are a beast",
      goal: (user) => {
        if (user.exp >= 200) {
          return true;
        }
        else return false;
      },
      desc: "",
      category: ""
    }],
    groups: [
      {
        id: 0,
        name: '',
        users: [2, 3, 34, 33]
      }
    ],
    threads: [
      {
        id: 0,
        userId: 0,
        question: '',
        tags: [],
        idGroup: "", //Caso este id seja diferente de null, seginifica que este thread pertence a um grupo, caso contrário é um thread geral
        upvotes: 0,
        date: "xx/xx/xx",
        views: 0, //Contador que vai ser incrementado de cada vez que alguém aceda a um thread
        course: "",
        closeDate: "xx/xx/xx"
      }
    ],
    answers: [
      {
        id: 0,
        idThread: 0,
        answer: '',
        idUser: 0,
        upvotes: 0,
        date: "xx/xx/xx"
      }
    ],
    coments: {
      id: 0,
      idAnswer: 0,
      idUser: 0,
      text: "",
      upvotes: 0
    }
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
    },
    getUsers: state => {
      if (localStorage.getItem('users')) {
        console.log("já está no localstorage");
        state.users = JSON.parse(localStorage.getItem("users"));
      }
      else {
        console.log("ainda não está no localstorage")
        let payload = {
          //PKx5elCuP-52eqXNW9oWPQ, meu token
          //I6EFQFoKLa1FFP453_jzQg , token pedro
          //k_x0qyzrU3rzj9Y2qfzQSA, mais um meu
          token: "k_x0qyzrU3rzj9Y2qfzQSA",
          data: {
            id: "numberInt",
            name: "name",
            email: "internetEmail",
            level: "numberInt",
            exp: "numberInt",
            badges: "functionArray|3|numberInt",
            rank: "numberInt",
            desc: "stringLong",
            foto: "",
            follow: "functionArray|3|numberInt",
            _repeat: 1
          }
        };

        $.ajax({
          type: "POST",
          url: "https://app.fakejson.com/q",
          data: payload,
          success: (resp => {
            // console.log(code)
            return resp;
          })(ans => {
            console.log(ans);
            console.log(typeof state.users)

            for (let persona of ans) {
              state.users.push(persona)
            }
          })
        });
      }


      console.log(state.users);

      return state.users;
    }
  },
  // ...mapGetters({

  // })
});
