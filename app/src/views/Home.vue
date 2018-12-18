<template>
  <div id="containerHome" class="firWindow">
    <NavBar/>
    <h1>Isto é uma página home</h1>
    <Catalog/>
    <Footer/>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar.vue";
import Footer from "@/components/Footer.vue";
import Catalog from "@/components/Catalog.vue";

// document.getElementById('containerHome').
export default {
  components: {
    NavBar,
    Footer,
    Catalog
  }
};
</script>
<style>
.fitWindow {
  height: calc(100vh - 200px);
}
</style>



