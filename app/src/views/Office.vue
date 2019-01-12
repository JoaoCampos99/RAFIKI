<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-12">
        <br>
        <h2>Users</h2>
        <hr>
      </div>
    </div>
    <div class="table-responsive">
      <table class="table table-striped table-hover table-bordered">
        <thead class="thead-dark">
          <tr>
            <th></th>
            <th>Name</th>
            <th>Rank</th>
            <th>Level</th>
            <th>Course</th>
            <th>Actions</th>

          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(user) in $store.state.users"
            v-bind:key="user.id">
            <td><img v-bind:src="user.foto" class="img-fluid pic"></td>
            <td>{{user.name}}</td>
            <td>{{user.rank}}</td>
            <td>{{user.level}}</td>
            <td>{{user.course}}</td>
            <td><button type="button" class="btn btn-danger btn-sm"> X </button> </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- BADGES -->
    <div class="row">
      <div class="col-md-12">
        <br>
        <h2>Badges</h2>
        <hr>
      </div>
    </div>
    <div class="table-responsive">
      <table class="table table-striped table-hover table-bordered">
        <thead class="thead-dark">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Goal</th>
            <th>Category</th>
            <th>Actions</th>

          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(badge) in $store.state.badges"
            v-bind:key="badge.id">
            <td>{{badge.id}}</td>
            <td>{{badge.name}}</td>
            <td>{{badge.desc}}</td>
            <td>{{badge.category}}</td>
            <td><button type="button" class="btn btn-danger btn-sm"> X </button> </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- THREADS -->
    <div class="row">
      <div class="col-md-12">
        <br>
        <h2>Threads</h2>
        <hr>
      </div>
    </div>
    <div class="table-responsive">
      <table class="table table-striped table-hover table-bordered">
        <thead class="thead-dark">
          <tr>
            <th>Title</th>
            <th>Date</th>
            <th>Owner</th>
            <th>Actions</th>

          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(thread) in $store.state.threads"
            v-bind:key="thread.id">
            <td>{{thread.title}}</td>
            <td>{{thread.date}}</td>
            <td></td>
            <td><button type="button" class="btn btn-danger btn-sm"> X </button> </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- TAGS -->
    <div class="row">
      <div class="col-md-12">
        <br>
        <h2>Tags</h2>
        <hr>
      </div>
    </div>
    <div class="table-responsive">
      <table class="table table-striped table-hover table-bordered">
        <thead class="thead-dark">
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(tag) in $store.state.tags"
            v-bind:key="tag.id">
            <td>{{tag.id}}</td>
            <td>{{tag.text}}</td>
            <td><button type="button" class="btn btn-danger btn-sm"> X </button> </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {

    };
  },
  created() {
    
  },
  methods: {
    
  }
};
</script>
<style>
.pic {
  width:50px;
  height:50px;
  border-radius:25px;
  border: 4px solid rgb(0, 89, 255);
}
</style>

