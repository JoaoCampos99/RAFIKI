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
      loginID: this.$store.getters.getloginID
    };
  },
  created() {
    console.log(this.loginID);
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
