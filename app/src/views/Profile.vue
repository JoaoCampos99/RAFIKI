<template>
  <div class="container" style="margin-top:80px">
        <div class="list-group col-md-3" id="nav">
          <router-link :to="{name:'AboutMe'}" :class="{'list-group-item list-group-item-action':true, 'nav-link':true}">About Me</router-link>
                    <router-link :to="{name:'MyThreads'}" :class="{'list-group-item list-group-item-action':true,'nav-link':true}">My Threads</router-link>
          <router-link :to="{name:'MyGroups'}" :class="{'list-group-item list-group-item-action':true,'nav-link':true}">My Groups</router-link>
          <router-link :to="{name:'MyBadges'}" :class="{'list-group-item list-group-item-action':true, 'nav-link':true}">Badges</router-link>
          <router-link :to="{name:'MyRankings'}" :class="{'list-group-item list-group-item-action':true, 'nav-link':true}">Rankings</router-link>
    <router-view></router-view>
</div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  }
};
</script>
<style>
#nav a.router-link-exact-active {
  color: #212529;
  background-color: #007bff;
  border-color: #007bff;
}
</style>
