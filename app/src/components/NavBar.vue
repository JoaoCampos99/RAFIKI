<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarTogglerDemo03"
      aria-controls="navbarTogglerDemo03"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <router-link :to="{name:'home'}">
      <img alt="Vue logo" src="@/assets/logoR.png" style="width: 100px">
    </router-link>
    <div class="collapse navbar-collapse" id="navbarTogglerDemo03">
      <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
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
      </ul>
      <!-- <div class="navbar-brand">
        <img src="../assets/logoR.png" class="d-inline-block align-top img-fluid" alt="">
      </div>-->
      <!-- <div class="navbar-collapse collapse w-100 order-3 dual-collapse"> -->
      <ul class="navbar-nav ml-auto">
        <li class="nav-item">
          <router-link :to="{ name: 'login' }" :class="{ 'nav-link': true }">Login</router-link>
        </li>
      </ul>
      <!-- </div> -->
    </div>
  </nav>
</template>

<style>
.navi {
  padding: 10px;
}
nav {
  margin-bottom: 2rem;
}

.navLogo {
  width: 100px;
}
</style>
