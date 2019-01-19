import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

let $ = require("../node_modules/jquery/dist/jquery.js");

class User {
  constructor(
    id,
    nome,
    pass,
    mail,
    exp,
    desc,
    foto,
    follow,
    skill,
    year,
    course,
    upvotes
  ) {
    //fazer nos getter's a atribuição de badges, level e rank
    this.id = id; //Não vai ser preciso fazer o getId aqui, porque já é feito nos dois sitios onde os utilizadores são adicionados
    this.name = nome;
    this.password = pass;
    this.email = mail;
    this.exp = exp;
    this.level = this.getLevel();
    this.rank = this.getRank();
    this.badges = [];
    this.desc = desc;
    this.foto = foto;
    this.follow = follow;
    this.skill = skill; //Isto devia ser um array, um gadjo pode ter váriass skills
    this.year = year;
    this.course = course;
    this.upvotes = upvotes;
  }

  getLevel() {
    return Math.floor(this.exp / 100) + 1;
  }

  getRank() {
    //Vai ter que se fazer um switch para dar os nomes aos ranks
    let rank = Math.floor(this.level / 10);
    let trueRank = null;
    console.log(this.level);
    switch (
    rank //O calculo do rank deve estar mal....
    ) {
      case 0:
        trueRank = "A começar";
        break;
      case 1:
        trueRank = "grande";
        break;
      case 2:
        trueRank = "muito grande";
        break;
    }
    console.log(trueRank);
    console.log(rank);
    return [rank, trueRank];
  }
  getBadges(badgesArr, threadsArr) {
    let badges = [];
    this.badges = [];
    console.log(threadsArr);
    let tr = this.getThreads(this.userId, threadsArr); //Isto depois vai substituir a batota
    let batota = 20;
    for (let badge of badgesArr) {
      let gravar = false;

      console.log(badge);
      if (badge.goal <= this.exp && badge.category == "rank") {
        gravar = true;
      }

      if (badge.category == "help") {
        if (badge.goal <= batota) {
          gravar = true;
        }
      }

      if (gravar) {
        badges.push(badge.id);
      }
    }
    console.log(this.badges);
    console.log(this.exp);
    return badges;
  }

  getThreads(userId, threadsArr) {
    let threads = [];
    for (let thread of threadsArr) {
      if (thread.userId == userId) threads.push(thread);
    }
    return threads;
  }

  d() {
    console.log(this);
  }
}

// id: 1,
//             userid: "numberInt|1,10",
//             title: "stringWords",
//             question: "<p>Mamaaaaaaaaaas</p>",
//             tags: [], //"functionArray|2|stringWords|1,2",
//             idGroup: null, //Caso este id seja diferente de null, seginifica que este thread pertence a um grupo, caso contrário é um thread geral
//             upvotes: "numberInt|1,100",
//             date: "dateTime|ISOdate",
//             views: "numberInt|1,20", // Contador que vai ser incrementado de cada vez que alguém aceda a um thread
//             course: "stringCharacters|3,4",
//             closeDate: null,
class Thread {
  constructor(id, userid, title, question, idGroup, course, upvotes) {
    this.id = id
    this.userid = userid
    this.title = title
    this.question = question
    this.tags = []
    this.idGroup = idGroup
    this.upvotes = upvotes;
    this.date = new Date().toISOString().split('T')[0]
    this.views = 0
    this.course = course
    this.closeDate = null
  }
}
class Answer {
  constructor(id, idThread, ans, idUser) {
    this.id = id
    this.idThread = idThread
    this.answer = ans
    this.idUser = idUser
    this.upvotes = 0
  }
}
// id: 0,
//   idThread: 0,
//   answer: "",
//   idUser: 0,
//   upvotes: 0,
//   date: "xx/xx/xx"
// }
export default new Vuex.Store({
  state: {
    Userclass: User,
    // AnswerClass: 
    ThreadClass: Thread,
    autenticated: false,
    loginid: 0,
    preenchido: false,
    searchTag: "",
    users: [],
    badges: [
      //helpful awards
      {
        id: 1,
        name: "Nice, you're helpful!",
        goal: 10,
        desc: "Give 10 answers",
        category: "help"
      },
      {
        id: 2,
        name: "Damn! You know alot!",
        goal: 20,
        desc: "Give 20 answers",
        category: "help"
      },
      {
        id: 3,
        name: "We don't deserve you!",
        goal: 30,
        desc: "Give 30 answers",
        category: "help"
      },
      {
        id: 4,
        name: "You're like a guru!",
        goal: 40,
        desc: "Give 40 answers",
        category: "help"
      },
      {
        id: 5,
        name: "Rafiki, is that you?",
        goal: 100,
        desc: "Give 50 answers",
        category: "help"
      },
      // RANK AWARDS
      {
        id: 6,
        name: "THE BEST 100",
        goal: 200,
        desc: "Reach TOP 100",
        category: "rank"
      },
      {
        id: 7,
        name: "Keep climbing!",
        goal: 300,
        desc: "Reach TOP 60",
        category: "rank"
      },
      {
        id: 8,
        name: "Leave them behind!",
        goal: 400,
        desc: "Reach TOP 50",
        category: "rank"
      },
      {
        id: 9,
        name: "You're a beast!",
        goal: 500,
        desc: "Reach TOP 5",
        category: "rank"
      },
      {
        id: 10,
        name: "Our Lord, our Rafiki",
        goal: 600,
        desc: "Reach 1st place",
        category: "rank"
      },
      {
        id: 11,
        name: "10 Clicks!!! És grande",
        goal: 10,
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
        id: 1,
        userid: 1,
        question:
          "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consecteturNeque porro quisquam est qui dolorem ipsum quia dolor sit amet, consecteturNeque porro quisquam est qui dolorem ipsum quia dolor sit amet, consecteturNeque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur",
        title: "Como crio um component em vue.js?",
        tags: [],
        // idGroup: "", //Caso este id seja diferente de null, seginifica que este thread pertence a um grupo, caso contrário é um thread geral
        upvotes: [],
        date: "xx/xx/xx",
        // views: 0, // Contador que vai ser incrementado de cada vez que alguém aceda a um thread
        course: "TSIW"
        // closeDate: "xx/xx/xx"
      }
    ],
    tags: [
      {
        id: 1,
        text: "vue.js"
      },
      {
        id: 2,
        text: "javascript"
      }
    ],
    answers: [
      // {
      //   id: 0,
      //   idThread: 0,
      //   answer: "",
      //   idUser: 0,
      //   upvotes: 0,
      //   date: "xx/xx/xx"
      // }
    ],
    comments: [
      {
        // id: 0,
        // idAnswer: 0,
        // idUser: 0,
        // text: "",
        // upvotes: 0
      }
    ]
  },
  plugins: [createPersistedState()],
  mutations: {
    addUser(state, user) {
      user.id =
        state.users.length == 0
          ? 1
          : state.users[state.users.length - 1].id + 1;
      let us = new User(
        user.id,
        user.name,
        user.password,
        user.email,
        user.exp,
        user.desc,
        user.foto,
        user.follow,
        user.skills,
        user.year,
        user.course,
        []
      );
      state.users.push(us);
    },
    UPDATE_TAGS(state, payload) {
      state.tags = payload;
    },
    AUTHENTICATION(state) {
      state.autenticated = !state.autenticated;
    },
    CHANGE_LOGINID(state, payload) {
      state.loginid = payload;
    },
    ADD_THREAD(state, payload) {
      let aux = state.threads
      if (state.threads.length != 0) {
        state.threads.sort(function (a, b) {
          if (a.id > b.id) return 1;
          if (a.id < b.id) return -1;
        });
        payload.id = state.threads[state.threads.length - 1].id + 1;
        console.log(payload.id);
      } else {
        payload.id = 1;
      }

      aux.push(payload)
      console.log(aux)
      state.threads = aux;
    },
    save(state) {
      state.preenchido = true;
    },
    save_users(state, arr) {
      let aux = [];
      for (let user of arr) {
        console.log(user)
        let us = new User(
          user.id,
          user.name,
          user.password,
          user.email,
          user.exp,
          user.desc,
          user.foto,
          user.follow,
          user.skills,
          user.year,
          user.course,
          user.upvotes
        );
        aux.push(us);
      }
      state.users = aux;
      console.log(state.users);
    },
    save_threads(state, arr) {
      console.log(arr);
      let aux = []
      for (let thread of arr) {
        let th = new Thread(thread.id, thread.userid, thread.title, thread.question, 0, null, thread.upvotes)

        th.tags.push({
          id: th.tags.length == 0 ? 1 : th.tags[th.tags.length - 1].id + 1,
          text: th.title.split(' ')[0]
        })

        aux.push(th)
      }
      state.threads = aux;
      console.log(state.threads)
    },
    save_answers(state, arr) {
      console.log(arr);
      state.answers = arr;
    },
    save_comments(state, arr) {
      console.log(arr);
      state.comments = arr;
    },
    UPDATE_USER(state, newUser) {
      let index = state.users.findIndex(user => user.id == newUser.id);
      state.users[index].email = newUser.email;
      state.users[index].name = newUser.name;
      state.users[index].password = newUser.password;
      state.users[index].course = newUser.course;
      state.users[index].year = newUser.year;
      state.users[index].bio = newUser.bio;
      state.users[index].foto = newUser.foto;
    },
    SEARCH_TAG(state, tag) {
      state.searchTag = tag;
    },
    add_upvote_thread(state, id) {
      state.threads.filter(th => th.id == id)[0].upvotes++;
    },
    add_upvote_answer(state, id) { //É o id da answer
      state.answers.filter(ans => ans.id == id)[0].upvotes++;
    },
    add_upvote_comment(state, id) {
      state.comments.filter(com => com.id == id)[0].upvotes++;
    },
    add_upvote_user(state, up) {
      // state.users.filter(us => {
      //   if(us.id == up.userid) {
      //     // console.log(us.upvotes);
      //     return true;
      //   }
      //   else return false;
      // })[0].upvotes = [] 

      console.log('ata');

      let index = state.users.findIndex(us => us.id == up.userid);
      console.log(state.users[index]);
      state.users[index].upvotes.push(up.up);
    },
    DELETE_USER(state, id){
      let index= state.users.findIndex(user => user.id ==id)
      state.users.splice(index,1)
    },
    DELETE_BADGE(state, id){
      let index= state.badges.findIndex(badge => badge.id ==id)
      state.badges.splice(index,1)
    },
    DELETE_THREAD(state, id){
      let index= state.threads.findIndex(thread => thread.id ==id)
      state.threads.splice(index,1)
    },
    DELETE_TAG(state, id){
      let index= state.tags.findIndex(tag => tag.id ==id)
      state.tags.splice(index,1)
    },

    

  },
  actions: {
    // OFFICE
    delete_user(context, id)
    {
      context.commit("DELETE_USER",id)
    },

    delete_badge(context, id)
    {
      context.commit("DELETE_BADGE",id)
    },

    delete_thread(context, id)
    {
      context.commit("DELETE_THREAD",id)
    },

    delete_tag(context, id)
    {
      context.commit("DELETE_TAG",id)
    },


    /* 3 actions e 3 mutations para (threads, answers, comments) */
    add_upvote_thread(context, id) {
      context.commit("add_upvote_thread", id);
    },
    add_upvote_answer(context, id) {
      context.commit("add_upvote_answer", id);
    },
    add_upvote_comment(context, id) {
      context.commit("add_upvote_comment", id);
    },
    add_upvote_user(context, up) {
      context.commit("add_upvote_user", up);
    },
    update_user(context, newUser) {
      context.commit("UPDATE_USER", newUser);
    },
    search_tag(context, tag) {
      context.commit("SEARCH_TAG", tag);
    },
    addUserAct(context, user) {
      context.commit("addUser", user);
      return true;
    },
    update_tags(context, payload) {
      context.commit("UPDATE_TAGS", payload);
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
    add_thread(context, payload) {
      context.commit("ADD_THREAD", payload);
    },
    save_users(context) {
      if (
        !localStorage.getItem("vuex") == true ||
        JSON.parse(localStorage["vuex"]).users.length == 0
      ) {
        console.log("ainda não está no localstorage");
        let payload = {
          // PKx5elCuP-52eqXNW9oWPQ, meu token
          // I6EFQFoKLa1FFP453_jzQg , token pedro
          // k_x0qyzrU3rzj9Y2qfzQSA, mais um meu
          // 8NqHTT2oovurU8SOUFhuSg, jonas
          //Mn4xigS5bbMoHf8DRqmiHA
          //S7swes5kWKmU6fHC-PcvXA joao gmail
          /*Vai ter um objeto com iduser, idthread, idAnswer, idComment
          se estes dois ultimos não tiverem preenchidos é porque pertence a uma thread (users upvotes) */
          token: "k_x0qyzrU3rzj9Y2qfzQSA",
          data: {
            id: 1,
            name: "personNickname",
            password: "personPassword",
            email: "internetEmail",
            exp: "numberInt",
            level: 0,
            badges: [], //Já não é preciso pedir badges para os utilizadores
            rank: "numberInt",
            desc: "stringLong",
            foto: "personAvatar",
            follow: "functionArray|3|numberInt",
            skills: "personSkill",
            upvotes: [],
            _repeat: 1
          }
        };

        $.ajax({
          type: "POST",
          url: "https:app.fakejson.com/q",
          data: payload,
          success: (resp => {
            // console.log(resp);
            return resp;
          })(ans => {
            for (let i = 0; i < ans.length; i++) {
              ans[i].id = i + 1;
            }
            console.log(ans);
            context.commit("save_users", ans);
          })
        });
      } else {
        // console.log(JSON.parse(localStorage["vuex"]).users);
        context.commit("save_users", JSON.parse(localStorage["vuex"]).users);
      }
    },
    save_threads(context) {
      if (
        !localStorage.getItem("vuex") == true ||
        JSON.parse(localStorage["vuex"]).threads.length == 0
      ) {
        console.log('ataatatataatatatatataatata')
        let payload = {
          token: "k_x0qyzrU3rzj9Y2qfzQSA",
          data: {
            id: 1,
            userid: "numberInt|1,10",
            title: "stringWords",
            question: "<p>Mamaaaaaaaaaas</p>",
            tags: [], //"functionArray|2|stringWords|1,2",
            idGroup: null, //Caso este id seja diferente de null, seginifica que este thread pertence a um grupo, caso contrário é um thread geral
            upvotes: "numberInt|1,100",
            date: "dateTime|ISOdate",
            views: "numberInt|1,20", // Contador que vai ser incrementado de cada vez que alguém aceda a um thread
            course: "stringCharacters|3,4",
            closeDate: null,
            _repeat: 1
          }
        };
        $.ajax({
          type: "POST",
          url: "https:app.fakejson.com/q",
          data: payload,
          success: (resp => {
            return resp;
          })(ans => {
            for (let i = 0; i < ans.length; i++) {
              ans[i].id = i + 1;
            }
            console.log(ans);
            context.commit("save_threads", ans);
          })
        });
      } else {
        context.commit(
          "save_threads",
          JSON.parse(localStorage["vuex"]).threads
        );
      }
    },
    save_answers(context) {
      if (
        !localStorage.getItem("vuex") == true ||
        JSON.parse(localStorage["vuex"]).threads.length == 0
      ) {
        let payload = {
          token: "k_x0qyzrU3rzj9Y2qfzQSA",
          data: {
            id: 0,
            idThread: "numberInt|1,10",
            answer: "stringShort",
            idUser: "numberInt|1,10",
            upvotes: "numberInt|1,100",
            date: "dateTime|ISOdate",
            _repeat: 1
          }
        };

        $.ajax({
          type: "POST",
          url: "https:app.fakejson.com/q",
          data: payload,
          success: (resp => {
            return resp;
          })(ans => {
            for (let i = 0; i < ans.length; i++) {
              ans[i].id = i + 1;
            }
            console.log(ans);
            context.commit("save_answers", ans);
          })
        });
      } else {
        context.commit(
          "save_answers",
          JSON.parse(localStorage["vuex"]).answers
        );
      }
    },
    save_comments(context) {
      if (
        !localStorage.getItem("vuex") == true ||
        JSON.parse(localStorage["vuex"]).comments.length == 0
      ) {
        let payload = {
          token: "k_x0qyzrU3rzj9Y2qfzQSA",
          data: {
            id: 0,
            idAnswer: "numberInt|1,10",
            idUser: "numberInt|1,10",
            text: "stringShort",
            upvotes: 0,
            _repeat: 1
          }
        };
        $.ajax({
          type: "POST",
          url: "https:app.fakejson.com/q",
          data: payload,
          success: (resp => resp)(ans => {
            for (let i = 0; i < ans.length; i++) {
              ans[i].id = i + 1;
            }
            console.log(ans);
            context.commit("save_comments", ans);
          })
        });
      } else {
        context.commit(
          "save_comments",
          JSON.parse(localStorage["vuex"]).comments
        );
      }
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
    },
    getAnswers: state => state.answers,
    getComments: state => state.comments
  }
});
