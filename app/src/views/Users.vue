<template>
  <div class="container">
    <div class="row">
      <div class="col-md-4">
        <br>
        <h2>Users</h2>
        <br>
        <input
          class="form-control mr-sm-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
          v-model="userSearch"
        >
      </div>
    </div>
    <br>
    <br>
    <div class="row">
      <div
        class="col-lg-3"
        v-for="(user) in filterUsers()"
        v-bind:key="user.id"
        @click="goToUserProfile(user.id)"
      >
        <div class="user-show">
          <div class="user-front">
            <img v-bind:src="user.foto" class="img-fluid">
            <a class="userName">{{user.name}}</a>
            <p>LEVEL - {{user.level}}</p>
            <p>RANK - {{user.rank[1]}}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userSearch: "",
      users: []
    };
  },
  methods: {
    filterUsers() {
      // console.log(this.$store.state.users)
      // console.log(this.userSearch)
      // // this.users = this.$store.state.users;
      let cenas = [];
      cenas = this.$store.state.users.filter(user => {
        // user = user.name
        if (this.userSearch == "") {
          return true;
        }

        if (this.userSearch != "") {
          return user.name
            .toUpperCase()
            .includes(this.userSearch.toUpperCase());
        }
      });
      // console.log(cenas)
      return cenas;
    },
    goToUserProfile(userid) {
      if (this.$store.getters.getloginID != userid) {
        this.$router.push({
          name: "About",
          params: {
            visiteduserid: userid
          }
        });
      }else{
      this.$router.push({
          name: "AboutMe",
          params: {
            userid: userid
          }
        });
      }
    }
  }
};
</script>

<style>
.user-show {
  width: 100%;
  height: auto;
  border-bottom: 5px #00ccff solid;
  background: #fff;
  text-align: center;
  border-radius: 10px;
  overflow: hidden;
  position: relative;
  transition: 0.5s;
  margin-bottom: 28px;
}

.user-show img {
  border-radius: 50%;
  margin-bottom: 20px;
  width: 90px;
}

.userName {
  font-size: 15px;
  font-weight: 700;
  font-style: none;
  text-align: center;
  color: black;
}

.user-show p {
  margin-bottom: 0;
}

.user-front {
  width: 100%;
  height: auto;
  position: relative;
  z-index: 10;
  background: #ffffff;
  padding: 15px;
  bottom: 0px;
}

.user-front {
  cursor: pointer;
}
</style>
