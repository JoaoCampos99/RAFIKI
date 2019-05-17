<template>
  <div v-if="users != [] || users != undefined" class="container">
    <div class="header row" style="margin-bottom: 40px;">
      <div class="col-md-4 text-center">
        <img :src="user.imageSrc" class="picture img-fluid">
      </div>
      <div class="col-md-5">
        <h1>{{user.name}}</h1>
        <h6>Ladder position:{{user.rank}}</h6>
        <span>Level:{{user.level}}</span>

        <div class="progress">
          <div :style="{'width': user.width}" class="progress-bar progress-bar-info"></div>
        </div>
      </div>
      <div class="col-md-3">
        <apexchart
          ref="demoradar"
          type="radar"
          height="250"
          :options="chartOptions"
          :series="series"
          @
        />
      </div>
    </div>
    <ul class="nav nav-tabs" id="nav" style="margin-bottom:1em">
      <li class="nav-item">
        <router-link :to="{name:'About'}" :class="{'nav-link':true}">About</router-link>
      </li>
      <li class="nav-item">
        <router-link :to="{name:'UserThreads'}" :class="{'nav-link':true}">User Threads</router-link>
      </li>
      <li class="nav-item">
        <router-link :to="{name:'UserBadges'}" :class="{'nav-link':true}">User Badges</router-link>
      </li>
    </ul>
    <transition name="fade" mode="out-in">
      <router-view id="router-view"></router-view>
    </transition>
  </div>
</template>

<script>
import VueApexCharts from "vue-apexcharts";
export default {
  components: {
    apexchart: VueApexCharts
  },
  data() {
    return {
      user: {
        name: "",
        rank: "",
        level: 0,
        imageSrc: "",
        width: 0
      },
      // user: this.$store.getters.getUser(this.$route.params.visiteduserid),
      users: [],
      series: [
        {
          name: "You",
          data: []
        },
        {
          name: "This User",
          data: []
        }
      ],

      chartOptions: {
        chart: {
          dropShadow: {
            enabled: true,
            blur: 1,
            left: 1,
            top: 1
          },
          size: undefined
        },
        stroke: {
          width: 1
        },
        yaxis: {
          show: false
        },
        fill: {
          opacity: 0.5
        },
        plotOptions: {
          radar: {
            size: 70
          }
        },
        labels: ["Upvotes/100", "Threads", "Comments", "Level"]
      }
    };
  },
  created() {
    if(this.$store.state.users.length != 0) {
      this.users = this.$store.getters.getUsers
      this.loadGraphics()
    }
    // console.log(this.users, "primeria volta no created (users)");

    // setTimeout(() => {
    //   console.log(this.$store.state.users, "mama mia");
    //   console.log(this.$store.getters.getUsers, "mama users local");
    // }, 5000);
  },
  watch: {
    "$store.state.doneUsers": function(newValue, oldValue) {
      console.log("Alalalalaal valores alterados no state.doneUsers");
      console.log(newValue, oldValue);
      console.log(this.users, "users alalalala");
      if (this.$store.state.doneUsers)
        this.users = this.$store.getters.getUsers;
      this.loadGraphics();
    }
  },
  methods: {
    loadGraphics() {
      //User
      let { name, rank, level } = this.getUser(
        this.$route.params.visiteduserid
      );
      this.user.name = name;
      this.user.rank = rank[0];
      this.user.level = level;
      this.user.width = this.getUserProgress(this.$route.params.visiteduserid);
      console.log(this.user, "useeeeeeeeeeeeeeeeeeeeeer");
      //Imagem de perfil
      this.user.imageSrc = this.getUser(
        this.$route.params.visiteduserid
      ).picture;

      //Ordenar users
      this.users.sort((a, b) => {
        if (a.level > b.level) return -1;
        if (a.level < b.level) return 1;
        else return 0;
      });
      console.log(this.users);

      //Ordenar users ranking global
      for (let i = 0; i < this.users.length; i++) {
        this.users[i].rank[0] = i + 1;
      }

      if (!this.$store.getters.getAuth) {
        this.series.splice(0, 1);
        //Enviar Para o Gráfico o numero
        let nUpvotes = 0;
        for (let i = 0; i < this.$store.getters.getThreads.length; i++) {
          if (
            this.$store.getters.getThreads[i].userid ==
            this.$route.params.visiteduserid
          ) {
            nUpvotes += this.$store.getters.getThreads[i].upvotes;
          }
        }
        this.series[0].data.push(nUpvotes / 100);
        //Enviar o Nº de Threads
        let count = this.$store.getters.getThreads.filter(
          thread => thread.userid == this.$route.params.visiteduserid
        ).length;
        this.series[0].data.push(count);
        //Enviar o Nº de comments
        count = this.$store.getters.getComments.filter(
          comment => comment.idUser == this.$route.params.visiteduserid
        ).length;
        count += this.$store.getters.getAnswers.filter(
          comment => comment.idUser == this.$route.params.visiteduserid
        ).length;
        console.log(count);
        this.series[0].data.push(count);
        //Enviar o level
        this.series[0].data.push(
          this.getUser(this.$route.params.visiteduserid).level
        );
      } else {
        //Enviar Para o Gráfico o numero
        let nUpvotes = 0;
        for (let i = 0; i < this.$store.getters.getThreads.length; i++) {
          if (
            this.$store.getters.getThreads[i].userid ==
            this.$route.params.visiteduserid
          ) {
            nUpvotes += this.$store.getters.getThreads[i].upvotes;
          }
        }

        this.series[1].data.push(nUpvotes / 100);
        nUpvotes = 0;
        for (let i = 0; i < this.$store.getters.getThreads.length; i++) {
          if (
            this.$store.getters.getThreads[i].userid ==
            this.$store.getters.getloginID
          ) {
            nUpvotes += this.$store.getters.getThreads[i].upvotes;
          }
        }
        console.log(nUpvotes);
        this.series[0].data.push(nUpvotes / 100);
        //Enviar o Nº de Threads
        let count = this.$store.getters.getThreads.filter(
          thread => thread.userid == this.$route.params.visiteduserid
        ).length;
        this.series[1].data.push(count);
        count = this.$store.getters.getThreads.filter(
          thread => thread.userid == this.$store.getters.getloginID
        ).length;
        this.series[0].data.push(count);
        //Enviar o Nº de comments
        count = this.$store.getters.getComments.filter(
          comment => comment.idUser == this.$route.params.visiteduserid
        ).length;
        count += this.$store.getters.getAnswers.filter(
          comment => comment.idUser == this.$route.params.visiteduserid
        ).length;
        console.log(count, "count");
        this.series[1].data.push(count);
        count = this.$store.getters.getComments.filter(
          comment => comment.idUser == this.$store.getters.getloginID
        ).length;
        count += this.$store.getters.getAnswers.filter(
          comment => comment.idUser == this.$store.getters.getloginID
        ).length;
        this.series[0].data.push(count);

        //Enviar o level

        this.series[1].data.push(
          this.getUser(this.$route.params.visiteduserid).level
        );
        this.series[0].data.push(
          this.getUser(this.$store.getters.getloginID).level
        );
      }
    },
    getUser(id) {
      return this.users.filter(user => user.id == id)[0];
    },
    getUserProgress(id) {
      console.log(
        (this.users.filter(user => user.id == id)[0].experience % 100) + "%"
      );
      return (
        (this.users.filter(user => user.id == id)[0].experience % 100) + "%"
      );
    },
    removeImageTag(content) {
      content = content.replace(/<img[^>]*>/g, "");
      content = content.replace(/<br>/g, "");
      return content;
    }
  }
};
</script>

<style>
#nav a.router-link-exact-active {
  color: #ffffff;
  background-color: #007bff;
  border-color: #007bff;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.header {
  color: #808080;
  margin-left: 10%;
}

.picture {
  height: 200px;
  width: 150px;
  /* position: absolute; */
  /* top: 75px;
  left: -75px; */
}

.picture_mob {
  position: absolute;
  width: 35%;
  left: 35%;
  bottom: 70%;
}
</style>
