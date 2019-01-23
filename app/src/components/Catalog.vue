<template>
  <!-- <div class="container"> -->
  <div id="letabela">
    <!--Filtros-->
    <div style="padding:5px;">
      <span>Filter Threads By:</span>
      <select class="custom-select" style="width:30%;" v-model="searchBy">
        <option value="All">All</option>
        <option>Tag</option>
        <option>Keyword</option>
      </select>
      <p v-if="searchBy=='Tag'">Search By Tag
        <vue-tags-input
          id="inputTags"
          v-model="tag"
          :tags="tags"
          :autocomplete-items="filteredItems"
          :max-tags="1"
          @tags-changed="newTags => tags = newTags"
        />
      </p>
      <p v-if="searchBy=='Keyword'">
        Search By Keyword
        <input
          type="text"
          class="form-control"
          style="width:49%;"
          v-model="keyword"
          placeholder="Search By Keyword"
        >
      </p>
    </div>

    <div
      class="border-pill border col-sm-12"
      v-for="thread in filteredThreads"
      v-bind:key="thread.id"
      style="width: 100%;margin-bottom: 20px;"
    >
      <!-- <div class="col-sm-3">
          <img src="../assets/logo.png" class="card-img-left img-fluid" alt="...">
      </div>-->
      <div class="card-body">
        <a
          tag="h5"
          class="card-title titulo"
          v-on:click="incrementar(thread.id)"
        >{{thread.title}}</a>
        <h6 class="card-subtitle mb-2 text-muted">{{thread.date}}</h6>
        <p class="card-text">
          <span v-for="tag in thread.tags" v-bind:key="tag.id">{{tag.text}}</span>
        </p>
        <a href="#" class="card-link">{{thread.id}}</a>
        <a href="#" class="card-link">{{thread.views}}</a>
      </div>
    </div>
  </div>

  <!-- </div> -->
</template>
<script>
import VueTagsInput from "@johmun/vue-tags-input";

export default {
  components: {
    VueTagsInput
  },
  data() {
    return {
      searchBy: "All",
      tag: "",
      tags: [],
      keyword: "",
      autocompleteItems: this.$store.state.tags,
      threads: this.$store.state.threads
    };
  },
  created() {
    if (this.$store.state.searchTag != "") {
      this.searchBy = "Tag";
      this.tag = this.$store.state.searchTag;
      this.tags.push(this.tag);
    }
  },
  updated() {
    if (this.searchBy == "All") {
      this.tags.length = 0;
      this.tag = "";
      this.keyword = "";
    } else if (this.searchBy == "Tag") {
      this.keyword = "";
    } else {
      this.tags.length = 0;
      this.tag = "";
    }
    if (this.tags.length == 1) {
      this.tag = this.tags[0].text;
    }
    console.log(this.tag);
    console.log(this.keyword);
  },
  beforeDestroy() {
    this.$store.dispatch("search_tag", "");
  },
  computed: {
    filteredItems() {
      return this.autocompleteItems.filter(i => {
        return i.text.toLowerCase().indexOf(this.tag.toLowerCase()) !== -1;
      });
    },
    filteredThreads() {
      return this.threads.filter(thread => {
        if (this.tags.length == 1) {
          if (thread.tags.find(tag => tag.text == this.tag)) {
            return true;
          }
        } else if (this.keyword != "") {
          if (thread.title.toLowerCase().includes(this.keyword.toLowerCase()))
            return true;
        } else if (this.keyword == "" && this.tags.length == 0) {
          return true;
        }
      });
    }
  },
  methods: {
    incrementar(id) {
      console.log("FODACE");
      this.$router.push({
        name: "thread",
        params: {
          threadid: id
        }
      });
      this.$store.dispatch("increment_views", id);
    }
  }
};
</script>
<style scoped>
/* #letabela {
  padding-left: 30px;
  padding-right: 0px;
} */
.fitText {
  word-wrap: break-word;
}
.titulo:hover {
  cursor: pointer;
  color: blue;
}
</style>
