<template>
  <div class="container">
    <div class="header row" style="margin-bottom: 40px;">
      <div class="col-md-4 text-center">
        <img :src="imageSrc" class="picture img-fluid">
      </div>
      <div class="col-md-5">
        <h1>{{getUser(this.$route.params.userid).name}}</h1>
        <span>Level:{{getUser(this.$route.params.userid).level}}</span>

        <div class="progress">
          <div
            :style="{'width': getUserProgress(this.$route.params.userid)}"
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
        <router-link :to="{name:'AboutMe'}" :class="{'nav-link':true}">About Me</router-link>
      </li>
      <li class="nav-item">
        <router-link :to="{name:'MyThreads'}" :class="{'nav-link':true}">My Threads</router-link>
      </li>
      <li class="nav-item">
        <router-link :to="{name:'MyGroups'}" :class="{'nav-link':true}">My Groups</router-link>
      </li>
      <li class="nav-item">
        <router-link :to="{name:'MyBadges'}" :class="{'nav-link':true}">My Badges</router-link>
      </li>
      <li class="nav-item">
        <router-link :to="{name:'MyRankings'}" :class="{'nav-link':true}">My Ranking</router-link>
      </li>
      <li class="nav-item">
        <router-link :to="{name:'EditProfile'}" :class="{'nav-link':true}">Edit Profile</router-link>
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
          name: "Average",
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
        yaxis: {
          show: false
        },
        stroke: {
          width: 1
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
    this.imageSrc = this.getUser(this.$route.params.userid).foto;
    //Enviar para o gráfico o numero de upvotes
    let nUpvotes = 0;
    for (let i = 0; i < this.$store.getters.getThreads.length; i++) {
      if (
        this.$store.getters.getThreads[i].userid == this.$route.params.userid
      ) {
        nUpvotes += this.$store.getters.getThreads[i].upvotes;
      }
    }

    let threadsUpvotes = this.$store.getters.getThreads.map(
      thread => thread.upvotes
    );
    let avgUpvotes =
      threadsUpvotes.reduce(
        (total = 0, value, index) =>
          index + 1 <= threadsUpvotes.length ? (total += value) : 0
      ) / threadsUpvotes.length;

    console.log(threadsUpvotes);
    console.log(nUpvotes);
    console.log(avgUpvotes);

    this.series[0].data.push(nUpvotes / 100);
    this.series[1].data.push(avgUpvotes / 100);
    //Enviar o Nº de Threads
    let count = this.$store.getters.getThreads.filter(
      thread => thread.userid == this.$route.params.userid
    ).length;
    this.series[0].data.push(count);
    let max = 0;
    let aux = 0;
    let min = 1000;
    for (let i = 0; i < this.users.length; i++) {
      for (let j = 0; j < this.$store.getters.getThreads.length; j++) {
        if (this.users[i].id == this.$store.getters.getThreads[j].userid) {
          aux++;
        }
      }
      if (aux > max) {
        max = aux;
      }
      if (aux < min) {
        min = aux;
      }
      aux = 0;
    }
    console.log("O Maximo" + max);
    console.log("O Minimo" + min);
    let avgThreads = (max + min) / 2;
    this.series[1].data.push(avgThreads);
    //Enviar o Nº de comments
    count = this.$store.getters.getComments.filter(
      comment => comment.idUser == this.$route.params.userid
    ).length;
    count += this.$store.getters.getAnswers.filter(
      comment => comment.idUser == this.$route.params.userid
    ).length;
    console.log(count);
    this.series[0].data.push(count);
    max = 0;
    min = 1000;
    aux = 0;
    for (let i = 0; i < this.users.length; i++) {
      aux = this.$store.getters.getComments.filter(
        comment => comment.idUser == this.users[i].id
      ).length;
      aux += this.$store.getters.getAnswers.filter(
        comment => comment.idUser == this.users[i].id
      ).length;
      if (aux > max) {
        max = aux;
      }
      if (aux < min) {
        min = aux;
      }
      aux = 0;
    }
    console.log(max);
    console.log(min);
    console.log("ResultadoFinal" + (max + min) / 2);
    this.series[1].data.push((max + min) / 2);
    //Enviar o Level
    this.series[0].data.push(this.getUser(this.$route.params.userid).level);
    let avgLevel = 0;
    for (let i = 0; i < this.users.length; i++) {
      avgLevel += this.users[i].level;
    }
    avgLevel = avgLevel / this.users.length;
    this.series[1].data.push(avgLevel);
    //Dar Scale aos dados para melhor compreendimento do Radar
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
.apexcharts-canvas {
  background: #8d8b8bb6;
}
</style>
