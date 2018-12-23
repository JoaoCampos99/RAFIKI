<template>
  <div class="container">
    <div>Isto é o perfil do {{$route.params.userid}}</div>
        <div class="list-group col-md-3">
          <router-link :to="{name:'AboutMe'}" :class="{'list-group-item list-group-item-action':true, 'active':true}">About Me</router-link>
                    <router-link :to="{name:'MyThreads'}" :class="{'list-group-item list-group-item-action':true, }">My Threads</router-link>
          <router-link :to="{name:'MyGroups'}" :class="{'list-group-item list-group-item-action':true,}">My Groups</router-link>
          <router-link :to="{name:'MyBadges'}" :class="{'list-group-item list-group-item-action':true, }">Badges</router-link>
          <router-link :to="{name:'MyRankings'}" :class="{'list-group-item list-group-item-action':true, }">Rankings</router-link>
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
