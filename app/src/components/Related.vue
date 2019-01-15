<template>
  <div class="fitText">
    <p>asdas</p>
    <div style="padding: 0 0 0 5; padding-inline-start: 20px" class="list-group">
      <a
        style="width:100%"
        class="list-group-item"
        v-for="thread in relatedThreads"
        v-bind:key="thread.id"
        @click="goToThread(thread.id)"
      >{{thread.title}}</a>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      relatedThreads: [],
      relatedTags: []
    };
  },
  created() {
    let threadid = JSON.parse(localStorage.getItem("setLastThread"));
    console.log(threadid);
    if (threadid) {
      let userid = this.$store.getters.getloginID;
      console.log(userid);
      //SE tiver loggado
      if (userid != 0) {
        this.relatedTags = this.$store.getters.getThreads.filter(
          thread => thread.userid == userid
        )[0].tags;
        console.log(this.relatedTags);
      } else {
        //Senao tiver loggado
        this.relatedTags = this.$store.getters.getThreads.filter(
          thread => thread.id == threadid
        )[0].tags;
        this.relatedThreads = this.$store.getters.getThreads.filter(thread => {
          let tagExists = false;
          for (let i = 0; i < this.relatedTags.length; i++) {
            console.log(this.relatedTags[i]);
            console.log(thread.tags);
            // if (thread.tags.find(tag=>tag.) {
            //   tagExists = true;
            // }
          }
          return tagExists;
        });
        console.log(this.relatedTags);
      }
    }
  }
};
</script>
