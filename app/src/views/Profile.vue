<template>
  <div class="container">
    <div class="header row" style="margin-bottom: 40px;">
      <div class="col-md-4 text-center">
        <img :src="imageSrc" class="picture img-fluid">
      </div>
      <div class="col-md-8">
        <h1>{{getUser(this.$route.params.userid).name}}</h1>
        <span>Level:{{getUser(this.$route.params.userid).level}}</span>

        <div class="progress">
          <div
            :style="{'width': getUserProgress(this.$route.params.userid)}"
            class="progress-bar progress-bar-info"
          ></div>
        </div>
      </div>
    </div>
    <!-- <div class="list-group text-center" id="nav" style="margin-bottom: 50px;">
      <router-link
        :to="{name:'AboutMe'}"
        :class="{'list-group-item list-group-item-action':true, 'nav-link':true, 'col-md-6':true}"
      >About Me</router-link>
      <router-link
        :to="{name:'MyThreads'}"
        :class="{'list-group-item list-group-item-action':true,'nav-link':true, 'col-md-6':true}"
      >My Threads</router-link>
      <router-link
        :to="{name:'MyGroups'}"
        :class="{'list-group-item list-group-item-action':true,'nav-link':true, 'col-md-6':true}"
      >My Groups</router-link>
      <router-link
        :to="{name:'MyBadges'}"
        :class="{'list-group-item list-group-item-action':true, 'nav-link':true, 'col-md-6':true}"
      >Badges</router-link>
      <router-link
        :to="{name:'MyRankings'}"
        :class="{'list-group-item list-group-item-action':true, 'nav-link':true, 'col-md-6':true}"
      >Rankings</router-link>
    </div>-->
    <ul class="nav nav-tabs" id="nav" style="margin-bottom:1em">
      <li class="nav-item">
        <router-link :to="{name:'AboutMe'}" :class="{'nav-link':true}">About Me</router-link>
      </li>
      <li class="nav-item">
        <router-link :to="{name:'MyThreads'}" :class="{'nav-link':true}">My Threads</router-link>
      </li>
      <li class="nav-item">
        <router-link :to="{name:'MyGroups'}" :class="{'nav-link':true}">My Groups</router-link>
      </li>
      <li class="nav-item">
        <router-link :to="{name:'MyBadges'}" :class="{'nav-link':true}">My Badges</router-link>
      </li>
      <li class="nav-item">
        <router-link :to="{name:'MyRankings'}" :class="{'nav-link':true}">My Ranking</router-link>
      </li>
      <li class="nav-item">
        <router-link :to="{name:'EditProfile'}" :class="{'nav-link':true}">Edit Profile</router-link>
      </li>
    </ul>
    <transition name="fade" mode="out-in">
      <router-view id="router-view"></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      users: this.$store.getters.getUsers,
      imageSrc: ""
    };
  },
  created() {
    this.imageSrc = this.getUser(this.$route.params.userid).foto;
  },
  methods: {
    getUser(id) {
      return this.users.filter(user => user.id == id)[0];
    },
    getUserProgress(id) {
      console.log(
        (this.users.filter(user => user.id == id)[0].exp % 100) + "%"
      );
      return (this.users.filter(user => user.id == id)[0].exp % 100) + "%";
    },
    removeImageTag(content) {
      content = content.replace(/<img[^>]*>/g, "");
      content = content.replace(/<br>/g, "");
      return content;
    }
  }
};
</script>
<style>
#nav a.router-link-exact-active {
  color: #ffffff;
  background-color: #007bff;
  border-color: #007bff;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.header {
  color: #808080;
  margin-left: 10%;
}

.picture {
  height: 200px;
  width: 150px;
  /* position: absolute; */
  /* top: 75px;
  left: -75px; */
}

.picture_mob {
  position: absolute;
  width: 35%;
  left: 35%;
  bottom: 70%;
}
</style>
