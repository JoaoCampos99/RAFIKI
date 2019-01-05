<template>
  <div id="searchBox">
    <div class="cont">
      <button id="searchButton" type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal" v-on:click="openDialog">
        <i class="fas fa-search"></i>
      </button>
    </div>

    <!-- Modal -->
    <dialog>
      <h1>ola</h1>
    </dialog>
  </div>
</template>

<script>
/*npm Libraries*/
import Swal from "../../node_modules/sweetalert2/dist/sweetalert2.js";
import "../../node_modules/sweetalert2/src/sweetalert2.scss";

export default {
  data() {
    return {
      showSearchBar: true,
      users: this.$store.state.users
    };
  },
  methods: {
    openDialog() {
      console.log(this.users);
    }
  },
  computed: {
    fillArray() {
      this.users = this.$store.state.users;
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

#searchBox {
  display: block;
  position: fixed;
  right: 10px;
  bottom: 0;
  z-index: 100;
}
#searchBox > div.cont {
  padding: 2px;
  border-radius: 5px;
  margin: 5px;
  background-color: green;

  /* animation: 2s infinite alternate moving-lines; */

  animation: 10s infinite trocarCoresDiv;
}
#searchButton {
  background-color: initial;
  border: none;
}

@keyframes trocarCoresDiv {
  from {
    background-color: rgb(133, 231, 133);
  }
  to {
    background-color: rgb(66, 66, 104);
  }
}
</style>
