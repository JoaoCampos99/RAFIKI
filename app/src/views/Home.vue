<template>
  <div id="containerHome" class="container">
    <h1>Isto é uma página home</h1>
    <div class="row">
      <div class="col-md-9">
        <Catalog/>
      </div>
      <div class="col-md-3" style="padding: 0 0 0 5">
        <h4 style="padding: 0 0 0 5; padding-inline-start: 20px">Hot Topic</h4>
        <div class="fitText">
          <div style="padding: 0 0 0 5; padding-inline-start: 20px" class="list-group">
            <a
              style="width:100%"
              class="list-group-item"
              v-for="thread in hotThreads"
              v-bind:key="thread.id"
              @click="goToThread(thread.id)"
            >{{thread.title}}</a>
          </div>
        </div>
        <h3>Para aqui vêm Related</h3>
        <div class="fitText">
          <ul style="padding: 0 0 0 5; padding-inline-start: 20px">
            <li style="margin-bottom: 20px; margin-bottom: 20px; ">
              <h6>Lorem ipsum dolor sit amet consectetur adipisicing elit.</h6>Ea fuga sed beatae eligendi? Nihil ipsa, illo, alias ab dolorem repellendus quis aut sed illum ullam modi facilis quo voluptatum. Esse!
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Catalog from "@/components/Catalog.vue";

// document.getElementById('containerHome').
export default {
  components: {
    Catalog
  },
  data() {
    return {
      hotThreads: []
    };
  },
  created() {
    this.hotThreads = this.$store.getters.getThreads.sort((a, b) => {
      if (a.views > b.views) return -1;
      if (a.views > b.views) return 1;
      else return 0;
    });
    console.log(this.hotThreads);
    this.hotThreads.length = 5;
  },
  methods: {
    goToThread(id) {
      this.$router.push({
        name: "thread",
        params: {
          threadid: id
        }
      });
    }
  }
};
</script>
<style>
.fitWindow {
  height: calc(100vh - 200px);
}
</style>
