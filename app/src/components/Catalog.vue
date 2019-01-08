<template>
  <!-- <div class="container"> -->
  <div id="letabela">
    <div
      class="border-pill border col-sm-12"
      v-for="user in $store.state.users"
      v-bind:key="user.id"
      style="width: 100%;margin-bottom: 20px;"
    >
      <!-- <div class="col-sm-3">
          <img src="../assets/logo.png" class="card-img-left img-fluid" alt="...">
      </div>-->
      <div class="card-body">
        <h5 class="card-title">{{user.name}}</h5>
        <h6 class="card-subtitle mb-2 text-muted">{{user.email}}</h6>
        <p class="card-text">{{user.skills}}</p>
        <a href="#" class="card-link">{{user.id}}</a>
        <a href="#" class="card-link">{{user.rank[1]}}</a>
      </div>
    </div>
  </div>

  <!-- </div> -->
</template>

<style scoped>
/* #letabela {
  padding-left: 30px;
  padding-right: 0px;
} */
.fitText {
  word-wrap: break-word;
}
</style>    
