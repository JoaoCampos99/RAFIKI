<template>
  <nav class="navbar navbar-expand-md navbar-dark bg-dark">
    <div class="mx-auto order-0">
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target=".dual-collapse2"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
    </div>
    <router-link :to="{name:'home'}">
      <img alt="Vue logo" src="@/assets/logoR.png" style="width: 100px">
    </router-link>
    <div class="navbar-collapse collapse w-100 order-1 order-md-0 dual-collapse2">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item">
          <router-link :to="{ name: 'badges' }" :class="{ 'nav-link': true }">Badges</router-link>
        </li>
        <li class="nav-item">
          <router-link :to="{ name: 'stats' }" :class="{ 'nav-link': true }">Statistics</router-link>
        </li>
        <li class="nav-item">
          <router-link :to="{ name: 'rankings' }" :class="{ 'nav-link': true }">Ranking</router-link>
        </li>
        <li class="nav-item">
          <router-link :to="{ name: 'users' }" :class="{ 'nav-link': true }">Users</router-link>
        </li>
        <li class="nav-item">
          <router-link :to="{ name: 'tags' }" :class="{ 'nav-link': true }">Tags</router-link>
        </li>
        <li class="nav-item point" @click="profile">
          <a class="nav-link">Profile</a>
        </li>
        <li class="nav-item">
          <router-link
            :to="{ name: 'office' }"
            :class="{ 'nav-link': true }"
            v-if="loginID==1"
          >Office</router-link>
        </li>
      </ul>
    </div>
    <div class="navbar-collapse collapse w-100 order-3 dual-collapse2">
      <ul class="navbar-nav ml-auto">
        <li class="nav-item">
          <img
            v-bind:src="loginUser.foto"
            alt="Ups"
            class="rounded-circle"
            style="height: 35px; width: auto;"
          >
        </li>
        <li class="nav-item">
          <div class="dropdown dropleft">
            <a
              class="nav-link"
              data-toggle="dropdown"
              role="button"
              style="height:20px;border-radius: 50%;"
            >
              <!-- O span vai se mostrar se houver notificações e o innerHTML do "sino" Vai ser o numero de notificações -->
              <span class="point">
                <i
                  class="fas fa-bell"
                  style="color: #60CAE2;"
                >{{loginUser.notifications.filter(noti => noti.visto == false).length}}</i>
              </span>
            </a>
            <div id="drops" class="dropdown-menu">
              <div
                v-for="(noti, cont) of notificacoes"
                v-bind:key="cont"
                v-on:click="notificacaoVista(noti.id)"
              >
                <router-link
                  v-bind:to="{name: 'thread', params: {threadid: noti.idThread}}"
                  class="dropdown-item"
                  v-bind:class="{ 'bgNoti': noti.visto, 'textNoti': noti.visto }"
                >
                  <i class="far fa-flag ii"></i>
                  <span class="userName">{{users.find(us => us.id == noti.idUserFirst).name}}</span>
                  {{noti.text}}
                </router-link>
              </div>
              <!-- <a href class="dropdown-item">oaoakodk</a>
              <a href class="dropdown-item">BOas</a>
              <span class="vermais text-right" v-on:click="verMais()">Ver Mais</span>-->
              <div class="dropdwon-divider"></div>
              <div id="dropdown-footer" class="dropdown-item">
                <ul class="list-inline">
                  <li class="list-inline-item helpers point">
                    <router-link :to="{ name: 'ViewMore' }" :class="{ 'nav-link': true }">View More</router-link> </li>
                  <li
                    v-on:click="markAsRead()"
                    class="list-inline-item helpers point"
                  >Marcar como Lido</li>
                  <!-- Isto podia ficar com um icone de mesnsagem aberta e com um helper -->
                </ul>
              </div>
            </div>
          </div>
        </li>
        <li class="nav-item point" @click="logout">
          <a class="nav-link">Logout</a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      loginID: this.$store.getters.getloginID,
      loginUser: null,
      users: this.$store.getters.getUsers
      //[{"id":1,"idThread":4,"idUserFirst":1,"text":"ola boutarde","visto":false}]
    };
  },
  created() {
    // console.log(this.loginID);

    //Encontrar user logado
    this.loginUser = this.$store.getters.getUsers.filter(
      us => us.id == this.loginID
    )[0];

    // console.log(this.loginUser.notifications);
    // this.loginUser.tamanhoMaximo()
  },
  methods: {
    logout() {
      this.$store.dispatch("authentication");
      this.$store.dispatch("change_loginid", 0);
      if (this.$route.name === "home") {
        this.$router.go(this.$router.currentRoute);
      } else {
        this.$router.push({ name: "home" });
      }
    },
    profile() {
      console.log("este e o id" + this.loginID);
      this.$router.push({ name: "AboutMe", params: { userid: this.loginID } });
    },
    verMais() {
      console.log(this.loginUser);
    },
    notificacaoVista(id) {
      console.log(id);
      let indexUser = this.users.findIndex(us => us.id == this.loginUser.id);
      let indexNoti = this.loginUser.notifications.findIndex(
        not => not.id == id
      );
      //Mandar index user e index notificacao no user
      this.$store.dispatch("change_notification_status", {
        indexUser: indexUser,
        indexNoti: indexNoti
      });
    },
    markAsRead() {
      let indexUser = this.users.findIndex(us => us.id == this.loginUser.id)
      this.loginUser.notifications.map((noti, index) => {
        console.log(index)
        // noti.visto = true;
        this.$store.dispatch("change_notification_status", {
          indexUser: indexUser,
          indexNoti: index
        })
      });
    }
  },
  computed: {
    notificacoes() {
      setTimeout()
    }
  }
};
</script>

<style>
.point {
  cursor: pointer;
}
.ii {
  margin-right: 10px;
}
.textNoti {
  color: white !important;
}
.textNoti {
  background-color: #60cae2 !important;
}
.img {
  border-radius: 25% !important;
}
div#drops {
  margin-top: 40px;
  background-color: #60cae2 !important;
  border: none;
}
div#drops > div:not(#dropdown-footer) {
  overflow-wrap: inherit !important;
  background-color: white !important;
  border-radius: 20px;
  margin-bottom: 10px;
  border-top-right-radius: 3px;
  font-size: 2.2vh;
}
div#drops div:hover:not(#dropdown-footer),
.helpers:hover {
  background: orange !important;
}
div#dropdown-footer.dropdown-item {
  background-color: #60cae2;
  font-weight: bold;
  margin-bottom: 0px;
  font-size: 2.3vh;
  text-align: center;
}
.helpers {
}
/* div#dropdown-footer > span {
  background-color: red;
  font-weight: bold;
} */
span.vermais {
  color: blue;
  font-weight: bold;
  background-color: rgb(228, 119, 119);
  border-radius: 10px;
  border-top-right-radius: 2px;
  cursor: pointer;
  margin: 0px 5px;
  padding: 0px 5px;
  background-blend-mode: screen;
}
span.userName {
  font-weight: bold;
  font-size: 2.2vh;
  color: rgb(2, 38, 72);
  font-family: verdana;
}
</style>
