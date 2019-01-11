<template>
  <div id="searchBox">
    <div class="cont btn-group dropup">
      <button id="searchButton" type="button" class="btn btn-primary" data-toggle="dropdown">
        <i class="fas fa-search"></i>
      </button>
      <div class="dropdown-menu">
        <div class="dropdown-item botoesSearchThing">
          <div v-on:click="cTid">
            Create Thread
          </div>
        </div>
        <div class="dropdown-divider"></div>

        <div class="dropdown-item botoesSearchThing">
          <a href data-toggle="modal" data-target="#exampleModal" v-on:click="openDialog">Search</a>
        </div>
      </div>
    </div>
    <!--  -->
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
      users: this.$store.state.users,
      loginID: this.$store.getters.getloginID
    };
  },
  created(){
    console.log('alalalalal - ' + this.loginID)
  },
  methods: {
    openDialog() {
      console.log(this.users);
    },
    cTid() {
      console.log("este e o id" + this.loginID);
      this.$router.push({
        name: "createThread",
        params: { userId: this.loginID }
      });
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

.botoesSearchThing {
  padding: 0px;
  margin: 0px;
}
</style>
