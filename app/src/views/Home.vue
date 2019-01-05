<template>
  <div id="containerHome" class="container">
    <h1>Isto é uma página home</h1>
    <div class="row">
      <div class="col-md-10">
        <Catalog/>
      </div>
      <div class="col-md-2" style="padding: 0 0 0 5">
        <h3>Para aqui vêm "Notas"</h3>
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
  }
};
</script>
<style>
.fitWindow {
  height: calc(100vh - 200px);
}
</style>
