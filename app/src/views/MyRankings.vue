<template>
  <div class="container">
    <table class="table table-striped" v-if="ranks.length>0">
      <thead class="thead-dark">
        <tr>
          <th scope="col">#</th>
          <th scope="col">Name</th>
          <th scope="col">Level</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="rank in ranks" v-bind:key="rank.id">
          <th scope="row">{{rank.rank}}</th>
          <td>{{rank.name}}</td>
          <td>{{rank.level}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ranks: [],
      users: this.$store.getters.getUsers
    };
  },
  created() {
    this.users.sort((a, b) => {
      if (a.level > b.level) return -1;
      if (a.level < b.level) return 1;
      else return 0;
    });
    for (let i = 0; i < this.users.length; i++) {
      this.users[i].rank = i;
    }

    let pos = this.getIndexByID();
    console.log(pos);
    let cont = 5;
    if (pos === 0) {
      console.log("Está em primeiro na ladder");
      for (let i = 0; i < cont; i++) {
        this.ranks.push(this.users[i]);
      }
    } else if (pos >= 5) {
      console.log("Está a meio ou no fim da ladder");
      for (let i = pos + 1 - cont; i < pos + 1; i++) {
        this.ranks.push(this.users[i]);
      }
    }
  },
  methods: {
    getIndexByID() {
      return this.users.findIndex(
        user => user.id == this.$store.getters.getloginID
      );
    }
  }
};
</script>
