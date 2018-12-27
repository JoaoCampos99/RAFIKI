<template>
  <div id="containerHome" class="container">
    <h1>Isto é uma página home</h1>
    <Catalog/>
  </div>
</template>

<script>
import Catalog from "@/components/Catalog.vue";

// document.getElementById('containerHome').
export default {
  components: {
    Catalog
  }
};
</script>
<style>
.fitWindow {
  height: calc(100vh - 200px);
}
</style>
