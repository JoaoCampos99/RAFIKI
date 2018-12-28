<template>
  <div class="span8">
    <div v-for="thread in mythreads" v-bind:key="thread.id">
      <h4>
        <strong>
          <a>{{thread.title}}</a>
        </strong>
      </h4>

      <div class="span6">
        <!--Descrição-->
        <p>{{thread.question}}</p>
        <p>
          <a class="btn btn-primary">Read more</a>
          <!--Depois alterar-->
        </p>
      </div>

      <p>
        <i class="icon-calendar"></i>
        {{thread.date}}
        <!--Data-->
        |
        <i class="icon-tags"></i> Tags :
        <!--TAGS-->
        <a v-for="tag in thread.tags" v-bind:key="tag">
          <!---->
          <span class="label label-info">{{tag}}</span>
        </a>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      mythreads: []
    };
  },
  created() {
    let id = this.$store.getters.getloginID;
    this.mythreads = this.$store.getters.getThreads.filter(
      thread => thread.userid == id
    );
    this.mythreads.push({
      //Só para testar
      id: 1,
      userid: 807,
      question: "How do i build a SPA?",
      title: "Build a SPA",
      tags: ["javascript", "vue-js"],
      idgroup: "",
      upvotes: 0,
      date: "28/12/2018",
      views: 0,
      course: "TSIW",
      closeDate: "xx/xx/xx"
    });
  }
};
</script>
