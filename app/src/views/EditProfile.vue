<template>

    


<!-- Form Name -->

<!-- Text input-->
<div class="row">
    <div class="col-md-3">
        <img :src="getUser(this.$route.params.userid).foto" class="picture img-fluid center">
        <button class="btnChange">Choose avatar</button>
    </div>
    <div class="col-md-9">
        <form>
<div class="form-group">
  <label class="col-md-4 control-label" for="textinput">Name</label>  
  <div class="col-md-8">
  <input id="textinput" name="textinput" placeholder="" class="form-control input-md" required="" type="text">
    
  </div>
</div>

<div class="form-group">
    <label class="col-md-4 control-label" for="textinput">New Password</label>  
    <div class="col-md-8">
        <input id="textinput" name="textinput" placeholder="" class="form-control input-md" required="" type="text">
    </div>
</div>

<div class="form-group">
    <label class="col-md-4 control-label" for="textinput">Confirm New Password</label>  
    <div class="col-md-8">
        <input id="textinput" name="textinput" placeholder="" class="form-control input-md" required="" type="text">
    </div>
</div>

<!-- Text input-->
<div class="form-group">
  <label class="col-md-4 control-label" for="textinput">Course</label>  
  <div class="col-md-8">
  <input id="textinput" name="textinput" placeholder="" class="form-control input-md" required="" type="text">
    
  </div>
</div>

<!-- Textarea -->
<div class="form-group">
  <label class="col-md-4 control-label" for="textarea">About Me</label>
  <div class="col-md-8">                     
    <textarea class="form-control" id="textarea" name="textarea"></textarea>
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
      users: this.$store.getters.getUsers
    };
  },
  methods: {
    getUser(id) {
      return this.users.filter(user => user.id == id)[0];
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
    margin-top:10px;
    margin-left: auto;
    margin-right: auto;
}
</style>
