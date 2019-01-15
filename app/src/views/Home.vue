<template>
  <div id="containerHome" class="container">
    <h1>Isto é uma página home</h1>
    <div class="row">
      <div class="col-md-9">
        <Catalog/>
      </div>
      <div class="col-md-3" style="padding: 0 0 0 5">
        <h4 style="padding: 0 0 0 5; padding-inline-start: 20px">Most viewed Topics</h4>
        <div class="fitText">
          <div style="padding: 0 0 0 5; padding-inline-start: 20px" class="list-group">
            <a
              style="width:100%"
              class="list-group-item"
              v-for="thread in viewedThreads"
              v-bind:key="thread.id"
              @click="goToThread(thread.id)"
            >{{thread.title}}</a>
          </div>
        </div>
        <h3>Related Topics</h3>
        <related></related>
      </div>
    </div>
  </div>
</template>

<script>
import Catalog from "@/components/Catalog.vue";
import Related from "@/components/Related.vue";

// document.getElementById('containerHome').
export default {
  components: {
    Catalog,
    Related
  },
  data() {
    return {
      viewedThreads: []
    };
  },
  created() {
    this.viewedThreads = this.$store.getters.getThreads.sort((a, b) => {
      if (a.views > b.views) return -1;
      if (a.views > b.views) return 1;
      else return 0;
    });
    this.viewedThreads.length = 5;
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
