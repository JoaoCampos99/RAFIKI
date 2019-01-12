<template>
  <!-- <div class="container"> -->
  <div id="letabela">
    <div
      class="border-pill border col-sm-12"
      v-for="thread in $store.state.threads"
      v-bind:key="thread.id"
      style="width: 100%;margin-bottom: 20px;"
    >
      <!-- <div class="col-sm-3">
          <img src="../assets/logo.png" class="card-img-left img-fluid" alt="...">
      </div>-->
      <div class="card-body">
        <router-link
          v-bind:to="{name: 'thread', params: {threadid: thread.id}}"
          tag="h5"
          class="card-title titulo"
        >{{thread.title}}</router-link>
        <h6 class="card-subtitle mb-2 text-muted">{{thread.date}}</h6>
        <p class="card-text">{{thread.tags}}</p>
        <a href="#" class="card-link">{{thread.id}}</a>
        <a href="#" class="card-link">{{thread.views}}</a>
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
.titulo:hover {
  cursor: pointer;
  color: blue;
}
</style>    
