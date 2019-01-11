<template>
  <!-- Form Name -->
  <!-- Text input-->
  <div class="row">
    <div class="col-md-3">
      <img :src="userImage" class="picture img-fluid center">
      <!-- <button class="btnChange">Choose avatar</button> -->
      <div v-if="!userImage">
        <input type="file" round class="change-profile-image" @change="onFileChange">
      </div>
      <div v-else>
        <button
          class="delete-profile-image"
          color="secondary"
          icon="delete"
          @click="removeImage"
        >Delete</button>
      </div>
    </div>
    <div class="col-md-9">
      <form>
        <div class="form-group">
          <label class="col-md-4 control-label" for="textinput">Name</label>
          <div class="col-md-8">
            <input
              id="textinput"
              name="textinput"
              placeholder
              class="form-control input-md"
              required
              type="text"
              v-model="newName"
            >
          </div>
        </div>

        <div class="form-group">
          <label class="col-md-4 control-label" for="textinput">New Password</label>
          <div class="col-md-8">
            <input
              id="textinput"
              name="textinput"
              placeholder
              class="form-control input-md"
              required
              type="text"
              v-model="newPW"
            >
          </div>
        </div>

        <div class="form-group">
          <label class="col-md-4 control-label" for="textinput">Confirm New Password</label>
          <div class="col-md-8">
            <input
              id="textinput"
              name="textinput"
              placeholder
              class="form-control input-md"
              required
              type="text"
              v-model="newCPW"
            >
          </div>
        </div>

        <!-- Text input-->
        <div class="form-group">
          <label class="col-md-6 control-label" for="textinput">Course</label>
          <div class="col-md-6">
            <input
              id="textinput"
              name="textinput"
              placeholder
              class="form-control input-md"
              required
              type="text"
              v-model="newCourse"
            >
          </div>
          <label class="col-md-2 control-label" for="yearinput">Year</label>
          <div class="col-md-2">
            <input
              id="yearinput"
              name="yearinput"
              placeholder
              class="form-control input-md"
              required
              type="number"
              v-model="newYear"
            >
          </div>
        </div>

        <!-- Textarea -->
        <div class="form-group">
          <label class="col-md-4 control-label" for="textarea">Bio:</label>
          <div class="col-md-8">
            <textarea class="form-control" id="textarea" name="textarea" v-model="newDesc"></textarea>
          </div>
        </div>

        <!-- Button (Double) -->
        <div class="form-group">
          <div class="col-md-8">
            <button id="btnSave" name="btnSave" class="btn btn-success">Save</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      users: this.$store.getters.getUsers,
      userImage: "",
      newDesc:"",
      newPW:"",
      newYear:"",
      newCourse:"",
      newEmail:"",
      newName:"",

    };
  },
  created() {
    this.userImage = this.getUser(this.$route.params.userid).foto;
    this.newDesc = this.getUser(this.$route.params.userid).desc;
    this.newPW = this.getUser(this.$route.params.userid).password;
    //this.newYear = this.getUser(this.$route.params.userid).year;
    this.newEmail = this.getUser(this.$route.params.userid).email;
    //this.newCourse = this.getUser(this.$route.params.userid).course;
    this.newName = this.getUser(this.$route.params.userid).name;
    
    
    

  },
  updated() {
    console.log(this.userImage);
  },
  methods: {
    getUser(id) {
      return this.users.filter(user => user.id == id)[0];
    },
    onFileChange(e) {
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length) {
        return;
      }
      this.createImage(files[0]);
    },
    createImage(file) {
      var reader = new FileReader();
      var vm = this;

      reader.onload = e => {
        vm.userImage = e.target.result;
      };
      reader.readAsDataURL(file);
    },
    removeImage: function(e) {
      this.userImage = "";
    }
  }
};
</script>
<style>
.center {
  display: block;
  margin-left: auto;
  margin-right: auto;
  border-radius: 50%;
}
.btnChange {
  display: block;
  margin-top: 10px;
  margin-left: auto;
  margin-right: auto;
}
</style>
