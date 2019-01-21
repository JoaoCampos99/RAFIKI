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
    <a class="navbar-brand" href="/">Rafiki</a>
    <div class="navbar-collapse collapse w-100 order-1 order-md-0 dual-collapse2">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item">
          <router-link :to="{ name: 'faq' }" :class="{ 'nav-link': true }">FAQ</router-link>
        </li>
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
          <router-link :to="{ name: 'office' }" :class="{ 'nav-link': true }" v-if="loginID==1">Office</router-link>
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
                <i class="fas fa-bell" style="color: red;">2</i>
              </span>
            </a>
            <div id="drops" class="dropdown-menu">
              <a href class="dropdown-item">oaoakodk</a>
              <a href class="dropdown-item">BOas</a>
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
      loginUser: null
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
    }
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
}
</style>

