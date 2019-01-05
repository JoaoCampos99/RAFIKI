<template>
  <div id="searchBox">
    <div>
      <button id="searchButton" class="btn btn-primary" v-on:click="search">
        <i class="fas fa-search"></i>
      </button>
    </div>
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
    search() {
      console.log(this.users);
      JSON.parse(localStorage["vuex"]).users = JSON.stringify(this.users)
      console.log(JSON.parse(localStorage["vuex"]).users);

      // /*const {value: } = await*/ Swal({
      //   title: 'oh pa mim',
      //   html: '<ul><li v-for="(user, cont) in users" v-bind:key="user.id">{{cont}}<li></ul>',
      //   focusConfirm: false

      // })
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
#searchBox > div {
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
