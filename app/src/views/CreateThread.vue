<template>
  <div>
    <div class="container">
      <h1>Create Thread</h1>
      <div class="row">
        <div class="col-sm-8">
          <div class="form-group">
            <label for="inputTitle">Title</label>
            <input type="text" class="form-control" id="inputTitle">
          </div>
          <div class="form-group">
            <label for="inputContent">Describe your question</label>
            <vue-editor v-model="content" :editorToolbar="customToolbar"></vue-editor>
          </div>
          <div class="form-group">
            <label for="inputTags">Related Tags</label>npm
            <input type="text" class="form-control" id="inputTags">
          </div>
        </div>
        <div class="col-sm-4">
          <div class="card text-white bg-primary mb-3">
            <div class="card-header">{{cardHeader}}</div>
            <div class="card-body">
              <h5 class="card-title">{{cardTitle}}</h5>
              <p class="card-text">{{cardText}}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { VueEditor, Quill } from "vue2-editor";
export default {
  components: {
    VueEditor
  },
  data() {
    return {
      content: "",
      customToolbar: [
        ["bold", "italic", "underline"],
        [{ list: "ordered" }, { list: "bullet" }],
        ["image", "code-block"]
      ]
    };
  },
  updated() {
    console.log(this.content);
  }
};
</script>
