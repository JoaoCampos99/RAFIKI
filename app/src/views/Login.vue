<template>
  <div>
    <NavBar/>
    <button v-on:click="login">Clica - me</button>
    <Footer/>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar.vue";
import Footer from "@/components/Footer.vue";

import Swal from "../../node_modules/sweetalert2/dist/sweetalert2.js";
import "../../node_modules/sweetalert2/src/sweetalert2.scss";

export default {
  data() {
    return {
      a1: "",
      a2: "",
      cenas: ""
    };
  },
  methods: {
    login() {
      let a = (async function getFormValues() {
        let b = [];
        const { value: nomePass } = await Swal({
          title: "Login",
          html:
            '<input id="login" class="swal2-input">' +
            '<input id="pass" class="swal2-input">',
          focusConfirm: false,
          preConfirm: () => {
            return [
              document.getElementById("login").value,
              document.getElementById("pass").value
            ];
          }
        });

        if (nomePass) {
          // this.cenas = nomePass[0]
          console.log(nomePass[0]);
        }
      })().then(value => {
        console.log(value);
      });
      // console.log(a)
    }
  },
  components: {
    NavBar,
    Footer
  }
};
</script>
