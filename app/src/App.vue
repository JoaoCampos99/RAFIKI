<template>
  <router-view/>
</template>

<script>
// import { mapGetters } from "vuex";
export default {
  data() {
    return {};
  },
  computed: {},
  created() {
    this.$store.getters.getUsers;
    console.log('ata')
    console.log(this.$store.state.users)
    window.addEventListener("unload", () => localStorage.setItem('users', JSON.stringify(this.$store.state.users)) /*console.log(this.$store.state.users); alert('a')}*/)
  }
};
</script>