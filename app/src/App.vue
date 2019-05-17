<template>
<<<<<<< Updated upstream
  <div id="app2" class>
    <NavbarAdmin v-if="logged"/>
    <Navbar v-else/>
    <SearchThing/>
=======
  <div>
    <NavBar/>
>>>>>>> Stashed changes
    <router-view/>
    <Footer/>
  </div>
</template>

<script>
<<<<<<< Updated upstream
// import { mapGetters } from "vuex";
import Navbar from "@/components/NavBar.vue";
import NavbarAdmin from "@/components/Navbar2.vue";
import Footer from "@/components/Footer.vue";
import SearchThing from "@/components/searchThing.vue";
=======
import NavBar from "@/components/NavBar.vue";
import Footer from "@/components/Footer.vue";

>>>>>>> Stashed changes
export default {
  components: {
    Navbar,
    Footer,
    NavbarAdmin,
    SearchThing
  },
  data() {
    return {
      logged: this.$store.getters.getAuth
    };
  },
  computed: {},
  created() {
<<<<<<< Updated upstream
    console.log('A carregar o APP')
    this.$store.dispatch("get_users");
    this.$store.dispatch("get_threads");
    this.$store.dispatch("get_answers");
    this.$store.dispatch("get_comment");
    this.$store.dispatch("get_badges");
    
    // if (this.$store.state.preenchido == false) {
    //   //Isto está aqui para fazer com que o vuex se guarde da primeira vez que entrar no site
    //   this.$store.dispatch("save");
    // }
  },
  updated() {
    this.logged = this.$store.getters.getAuth;
=======
    this.$store.getters.getUsers;
    // console.log("ata");
    // console.log(this.$store.state.users);
    window.addEventListener(
      "unload",
      () =>
        localStorage.setItem(
          "users",
          JSON.stringify(this.$store.state.users)
        ) /*console.log(this.$store.state.users); alert('a')}*/
    );
  },
  components: {
    NavBar,
    Footer
>>>>>>> Stashed changes
  }
};
</script>

<style>
<<<<<<< Updated upstream
#app2 {
  background-color: "#FEFEFE";
  margin: 0 !important;
  width: 100% !important;
  margin-right: 0px !important;
  padding: 0;
  display: inline-block;
=======
.fitWindowWidth {
  width: inherit;
>>>>>>> Stashed changes
}
</style>
