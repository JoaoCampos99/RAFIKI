<template>
  <!-- Renders the navbar with the respective router-links -->
  <!-- <nav class="navbar navbar-expand-sm bg-dark navbar-dark fixed-top">
    <a class="navbar-brand" href="/">CinemaAPP</a>
    <ul class="navbar-nav">
      <li class="nav-item">
        <router-link :to="{ name: 'actor-list' }" :class="{ 'nav-link': true }"
          >Actor List</router-link
        >
      </li>
      <li class="nav-item">
        <router-link :to="{ name: 'contacts' }" :class="{ 'nav-link': true }"
          >Contacts</router-link
        >
      </li>
    </ul>
  </nav>-->
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
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
    <a class="navbar-brand" href="/">RAFIKI</a>

    <div class="collapse navbar-collapse" id="navbarTogglerDemo03">
      <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
        <li class="nav-item">
          <router-link :to="{ name: 'login' }" :class="{ 'nav-link': true }">Login</router-link>
        </li>
        <li class="nav-item">
          <router-link :to="{ name: 'faq' }" :class="{ 'nav-link': true }">FAQ</router-link>
        </li>
        <li class="nav-item">
          <router-link :to="{ name: 'thread' }" :class="{ 'nav-link': true }">Thread</router-link>
        </li>
        <li class="nav-item">
          <router-link :to="{ name: 'badges' }" :class="{ 'nav-link': true }">Badges</router-link>
        </li>
        <li class="nav-item">
          <router-link :to="{ name: 'ranking' }" :class="{ 'nav-link': true }">Ranking</router-link>
        </li>
      </ul>
      <form class="form-inline my-2 my-lg-0">
        <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
        <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
      </form>
    </div>
  </nav>
</template>