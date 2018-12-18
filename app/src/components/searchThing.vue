<template>
  <div id="main">
    <div id="searchBar">
      <input type="text" placeholder="Que procuras?" v-show="showSearchBar">
      
      <button type="button" class="btn btn-success">
        <!-- Ver a cena do bubbling-->
        <i class="fas fa-search" v-on:click="ola()"></i>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showSearchBar: true
    };
  },
  methods: {
    ola() {
      console.log('Ola  ' + this.showSearchBar);
    }
  }
};
</script>

<style>
#main {
  position: absolute;
  right: 0;
  display: inline-block;
  text-align: right;
}
</style>
