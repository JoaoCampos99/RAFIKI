<template>
  <div class="container-fluid">
    <div class="table-responsive">
      <table class="table table-striped table-hover table-bordered">
        <thead class="thead-dark">
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Level</th>
            <th>Course</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(user) in orderedUsers"
            v-bind:key="user.id"
            v-bind:class="{'table-active':(user.id==userid)}"
          >
            <td scope="row">{{user.rank[0]}}</td>
            <td>{{user.name}}</td>
            <td>{{user.level}}</td>
            <td>{{user.course}}</td>
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
      users: [],
      userid: 0
    };
  },
  created() {
    this.users = this.$store.getters.getUsers;
    if (this.$store.getters.getloginID != 0) {
      this.userid = this.$store.getters.getloginID;
    }
  },
  computed: {
    orderedUsers() {
      this.users = this.users.sort((a, b) => {
        if (a.exp > b.exp) return -1;
        if (a.exp < b.exp) return 1;
        else return 0;
      });
      for (let i = 0; i < this.users.length; i++) {
        this.users[i].rank[0] = i + 1;
      }
      return this.users;
    }
  }
};
</script>
<style>
.table-active,
.table-active > td,
.table-active > th {
  background-color: rgb(255, 223, 135);
}
</style>
