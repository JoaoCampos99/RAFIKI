<template>
  <div class="container" style="margin-top:80px;margin-bottom:80px">
    <div class="row">
      <div class="col-md-8" style="margin-left:100px;padding-bottom:100px">
        <img :src="getUser(this.$route.params.userid).foto" class="img-thumbnail picture hidden-xs">
        <div class="header">
          <br>
          <br>
          <br>
          <div class="row">
            <div class="col md-3">
              <h1>{{getUser(this.$route.params.userid).name}}</h1>
              <span>Level:{{getUser(this.$route.params.userid).level}}</span>
            </div>
          </div>
          <div class="progress">
            <div
              :style="{'width': getUserProgress(this.$route.params.userid)}"
              class="progress-bar progress-bar-info"
            ></div>
          </div>
        </div>
      </div>
    </div>
    <div class="list-group col-md-4" id="nav">
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
      <router-view class="col-sm-4"></router-view>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      users: this.$store.getters.getUsers
    };
  },
  methods: {
    getUser(id) {
      return this.users.filter(user => user.id == id)[0];
    },
    getUserProgress(id) {
      console.log(this.users.filter(user => user.id == id)[0].exp + "%");
      return this.users.filter(user => user.id == id)[0].exp + "%";
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

.header {
  color: #808080;
  margin-left: 10%;
}

.picture {
  height: 200px;
  width: 150px;
  position: absolute;
  top: 75px;
  left: -75px;
}

.picture_mob {
  position: absolute;
  width: 35%;
  left: 35%;
  bottom: 70%;
}
</style>
