<template>
  <div id="app2" class="container-fluid">
    <NavbarAdmin v-if="logged"/>
    <Navbar v-else/>
    <router-view/>
    <Footer/>
  </div>
</template>

<script>
// import { mapGetters } from "vuex";
import Navbar from "@/components/NavBar.vue";
import NavbarAdmin from "@/components/Navbar2.vue";
import Footer from "@/components/Footer.vue";
export default {
  components: {
    Navbar,
    Footer,
    NavbarAdmin
  },
  data() {
    return {
      logged: this.$store.getters.getAuth
    };
  },
  computed: {},
  created() {
    this.$store.getters.getUsers;
    console.log("ata");
    console.log(this.$store.state.users.uniq);
    // window.addEventListener(
    //   "unload",
    //   () =>
    //     localStorage.setItem(
    //       "users",
    //       JSON.stringify(this.$store.state.users)
    //     ) /*console.log(this.$store.state.users); alert('a')}*/
    // );
  },
  updated() {
    this.logged = this.$store.getters.getAuth;
  }
};
</script>

<style>
  #app2{
    background-color: "#FEFEFE";
    margin: 0 !important; 
    width: 100% !important; 
    margin-right: 0px !important;
    padding: 0;
    display: inline-block;
  }
</style>
