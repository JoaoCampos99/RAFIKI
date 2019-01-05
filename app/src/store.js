import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

let $ = require("../node_modules/jquery/dist/jquery.js");

export default new Vuex.Store({
  state: {
    autenticated: false,
    loginid: 0,
    preenchido: false,
    users: [
      // {
      // id: 0,
      // name: "",
      // mail: "",
      // level: 1,
      // exp: 0,
      // badges: [1],
      // rank: "",
      // desc: "",
      // photo: "",
      // follow: [] // Array que vai ter os id's dos threads que o utilizador segue
      // }
    ],
    badges: [
      //helpful awards
      {
        id: 1,
        name: "Nice, you're helpful!",
        goal: user => {
          if (user.exp >= 200) {
            return true;
          } else return false;
        },
        desc: "Give 10 answers",
        category: "help"
      },
      {
        id: 2,
        name: "Damn! You know alot!",
        goal: user => {
          if (user.exp >= 200) {
            return true;
          } else return false;
        },
        desc: "Give 20 answers",
        category: "help"
      },
      {
        id: 3,
        name: "We don't deserve you!",
        goal: user => {
          if (user.exp >= 200) {
            return true;
          } else return false;
        },
        desc: "Give 30 answers",
        category: "help"
      },
      {
        id: 4,
        name: "You're like a guru!",
        goal: user => {
          if (user.exp >= 200) {
            return true;
          } else return false;
        },
        desc: "Give 40 answers",
        category: "help"
      },
      {
        id: 5,
        name: "Rafiki, is that you?",
        goal: user => {
          if (user.exp >= 200) {
            return true;
          } else return false;
        },
        desc: "Give 50 answers",
        category: "help"
      },
      // RANK AWARDS
      {
        id: 6,
        name: "THE BEST 100",
        goal: user => {
          if (user.exp >= 200) {
            return true;
          } else return false;
        },
        desc: "Reach TOP 100",
        category: "rank"
      },
      {
        id: 7,
        name: "Keep climbing!",
        goal: user => {
          if (user.exp >= 200) {
            return true;
          } else return false;
        },
        desc: "Reach TOP 60",
        category: "rank"
      },
      {
        id: 8,
        name: "Leave them behind!",
        goal: user => {
          if (user.exp >= 200) {
            return true;
          } else return false;
        },
        desc: "Reach TOP 50",
        category: "rank"
      },
      {
        id: 9,
        name: "You're a beast!",
        goal: user => {
          if (user.exp >= 200) {
            return true;
          } else return false;
        },
        desc: "Reach TOP 5",
        category: "rank"
      },
      {
        id: 10,
        name: "Our Lord, our Rafiki",
        goal: user => {
          if (user.exp >= 200) {
            return true;
          } else return false;
        },
        desc: "Reach 1st place",
        category: "rank"
      },
      {
        id: 11,
        name: "10 Clicks!!! És grande",
        goal: clicks => (clicks == 10 ? true : false),
        desc: "10 clicks on Rafiki",
        category: "hardwork" //Pode mudar de nome, mas devia ser uma categoria diferente
      }
    ],

    groups: [
      {
        id: 0,
        name: "",
        users: [2, 3, 34, 33]
      }
    ],
    threads: [
      {
        // id: 0,
        // userId: 0,
        // question: "",
        //Title:"",
        // tags: [],
        // idGroup: "", //Caso este id seja diferente de null, seginifica que este thread pertence a um grupo, caso contrário é um thread geral
        // upvotes: 0,
        // date: "xx/xx/xx",
        // views: 0, // Contador que vai ser incrementado de cada vez que alguém aceda a um thread
        // course: "",
        // closeDate: "xx/xx/xx"
      }
    ],
    answers: [
      {
        id: 0,
        idThread: 0,
        answer: "",
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
  plugins: [createPersistedState()],
  mutations: {
    addUser(state, user) {
      state.users.push(user);
    },
    AUTHENTICATION(state) {
      state.autenticated = !state.autenticated;
    },
    CHANGE_LOGINID(state, payload) {
      state.loginid = payload;
    },
    save(state) {
      state.preenchido = true;
    },
    save_users(state) {
      if (!localStorage.getItem("vuex") == true) {
        console.log("ainda não está no localstorage");
        let payload = {
          // PKx5elCuP-52eqXNW9oWPQ, meu token
          // I6EFQFoKLa1FFP453_jzQg , token pedro
          // k_x0qyzrU3rzj9Y2qfzQSA, mais um meu
          // 8NqHTT2oovurU8SOUFhuSg, jonas
          token: "PKx5elCuP-52eqXNW9oWPQ",
          data: {
            id: 1,
            name: "personNickname",
            password: "personPassword",
            email: "internetEmail",
            level: "numberInt",
            exp: "numberInt",
            badges: "functionArray|3|numberInt",
            rank: "numberInt",
            desc: "stringLong",
            foto: "personAvatar",
            follow: "functionArray|3|numberInt",
            skills: "personSkill",
            _repeat: 1
          }
        };

        $.ajax({
          type: "POST",
          url: "https:app.fakejson.com/q",
          data: payload,
          success: (resp => {
            //console.log(code);
            return resp;
          })(ans => {
            console.log(ans);

            for (let persona of ans) {
              persona.id = state.users.length == 0 ? 1 : state.users[state.users.length - 1].id + 1

              state.users.push(persona);
              console.log(persona);
            }
            console.log(state.users);
          })
        });
      } else {
        state.users = JSON.parse(localStorage.getItem("vuex")).users;
      }
    }
  },
  actions: {
    addUserAct(context, user) {
      context.commit("addUser", user);
    },
    authentication(context) {
      context.commit("AUTHENTICATION");
    },
    change_loginid(context, payload) {
      context.commit("CHANGE_LOGINID", payload);
    },
    save(context) {
      context.commit("save");
    },
    save_users(context) {
      context.commit("save_users");
    }
  },
  getters: {
    numberOfUsers: state => {
      return state.users.length;
    },
    getUsers: state => {
      return state.users;
    },
    getAuth: state => {
      return state.autenticated;
    },
    getloginID: state => {
      return state.loginid;
    },
    getBadges: state => {
      return state.badges;
    },
    getThreads: state => {
      return state.threads;
    }
  }
  //...mapGetters({

  // })
});
