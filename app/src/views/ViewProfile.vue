<template>
  <div class="container">
    <div class="header row" style="margin-bottom: 40px;">
      <div class="col-md-4 text-center">
        <img :src="imageSrc" class="picture img-fluid">
      </div>
      <div class="col-md-5">
        <h1>{{getUser(this.$route.params.visiteduserid).name}}</h1>
        <h6>Ladder position:{{getUser(this.$route.params.visiteduserid).rank[0]}}</h6>
        <span>Level:{{getUser(this.$route.params.visiteduserid).level}}</span>

        <div class="progress">
          <div
            :style="{'width': getUserProgress(this.$route.params.visiteduserid)}"
            class="progress-bar progress-bar-info"
          ></div>
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
      users: this.$store.getters.getUsers,
      imageSrc: "",
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
    this.imageSrc = this.getUser(this.$route.params.visiteduserid).picture;
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
      console.log(count);
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
  methods: {
    getUser(id) {
      return this.users.filter(user => user.id == id)[0];
    },
    getUserProgress(id) {
      console.log(
        (this.users.filter(user => user.id == id)[0].exp % 100) + "%"
      );
      return (this.users.filter(user => user.id == id)[0].exp % 100) + "%";
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
