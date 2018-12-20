<template>
  <div>
    <Navbar/>
    <router-view/>
    <Footer/>
  </div>
</template>

<script>
// import { mapGetters } from "vuex";
import Navbar from "@/components/NavBar.vue";
import Footer from "@/components/Footer.vue";
export default {
  components: {
    Navbar,
    Footer
  },
  data() {
    return {};
  },
  computed: {},
  created() {
    this.$store.getters.getUsers;
    console.log("ata");
    console.log(this.$store.state.users);
    // window.addEventListener(
    //   "unload",
    //   () =>
    //     localStorage.setItem(
    //       "users",
    //       JSON.stringify(this.$store.state.users)
    //     ) /*console.log(this.$store.state.users); alert('a')}*/
    // );
  }
};
</script>
