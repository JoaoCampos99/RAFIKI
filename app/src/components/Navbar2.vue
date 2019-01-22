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
    <a  href="/"><img alt="Vue logo" src="@/assets/logoR.png" style="width: 100px" ></a>
    <div class="navbar-collapse collapse w-100 order-1 order-md-0 dual-collapse2">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item">
          <router-link :to="{ name: 'badges' }" :class="{ 'nav-link': true }">Badges</router-link>
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
        <li class="nav-item" @click="profile">
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
          <div class="dropdown dropleft">
            <a
              class="nav-link"
              data-toggle="dropdown"
              role="button"
              style="background-color: white;border-radius: 20px;"
            >
              <img
                v-bind:src="loginUser.foto"
                alt="Ups"
                class="rounded-circle"
                style="height: 2rem; width: auto;"
              >
              <!-- O span vai se mostrar se houver notificações e o innerHTML do "sino" Vai ser o numero de notificações -->
              <span>
                <i
                  class="fas fa-bell"
                  style="color: red;"
                >{{loginUser.notifications.filter(noti => noti.visto == false).length}}</i>
              </span>
            </a>
            <div
              id="drops"
              class="dropdown-menu"
              v-for="noti of loginUser.notifications"
              v-bind:key="noti.id"
            >
              <router-link
                v-bind:to="{name: 'thread', params: {threadid: noti.idThread}}"
                class="dropdown-item"
                v-on:click="notificacaoVista(noti.id)"
              >{{users.find(us => us.id == noti.idUserFirst).name}} {{noti.text}}</router-link>

              <!-- <a href class="dropdown-item">oaoakodk</a>
              <a href class="dropdown-item">BOas</a>
              <span class="vermais text-right" v-on:click="verMais()">Ver Mais</span>-->
            </div>
          </div>
        </li>
        <li class="nav-item" @click="logout">
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
    };
  },
  created() {
    console.log(this.loginID);

    //Encontrar user logado
    this.loginUser = this.$store.getters.getUsers.filter(
      us => us.id == this.loginID
    )[0];
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
      let indexUser = this.users.findIndex(us => us.id == this.loginUser.id);
      let indexNoti = this.loginUser.findIndex(not => not.id == id);
      //Mandar index user e index notificacao no user
      console.log('aatatatatattatatat')
      this.$store.dispatch("change_notification_status", {
        indexUser: indexUser,
        indexNoti: indexNoti
      })
    }
  },
  computed: {
    userNotificacionsÑotSeen() {}
  }
};
</script>

<style>
div#drops {
  margin-top: 40px;
  background-color: inherit !important;
  border: none;
}
div#drops > a.dropdown-item {
  overflow-wrap: inherit !important;
  background-color: orange !important;
  border-radius: 20px;
  margin-bottom: 10px;
  border-top-right-radius: 3px;
}
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
</style>

