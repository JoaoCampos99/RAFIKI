<template>
  <div class="container">
    <div class="row">
      <div class="col-md-6">
        <apexchart type="bar" width="100%" height="350" :options="chartOptions" :series="series"/>
      </div>
      <div class="col-md-6">
        <apexchart
          type="donut"
          width="100%"
          height="350"
          :options="chartOptions2"
          :series="series2"
        />
      </div>
    </div>
    <div class="row">
      <div class="col-md-12">
        <apexchart type="bar" width="100%" height="400" :options="chartOptions3" :series="series3"/>
      </div>
    </div>
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
      series: [
        {
          name: "Upvotes",
          data: []
        },
        {
          name: "Views",
          data: []
        },
        {
          name: "Comentarios",
          data: []
        }
      ],
      chartOptions: {
        chart: {
          stacked: true
        },
        responsive: [
          {
            breakpoint: 480,
            options: {
              legend: {
                position: "bottom",
                offsetX: -10,
                offsetY: 0
              }
            }
          }
        ],
        xaxis: {
          categories: []
        },
        fill: {
          opacity: 1
        },

        legend: {
          position: "right",
          offsetX: 0,
          offsetY: 50,
          width: 150,
          height: 75
        },
        title: {
          text: "Hot Topics",
          align: "top",
          margin: 10,
          offsetX: 0,
          offsetY: 0,
          floating: false,
          style: {
            fontSize: "20px",
            color: "#fefefe"
          }
        }
      },
      series2: [],
      chartOptions2: {
        title: {
          text: "Experience Distribution",
          align: "top",
          margin: 5,
          offsetX: 0,
          offsetY: 0,
          floating: false,
          style: {
            fontSize: "15px",
            color: "#fefefe"
          }
        },
        labels: [],
        legend: {
          position: "right",
          offsetX: 0,
          offsetY: 50,
          width: 150,
          height: 75
        },
        responsive: [
          {
            breakpoint: 480,
            options: {
              legend: {
                position: "bottom",
                offsetX: -10,
                offsetY: 0
              }
            }
          }
        ]
      },
      series3: [
        {
          data: []
        }
      ],
      chartOptions3: {
        plotOptions: {
          bar: {
            horizontal: true
          }
        },
        dataLabels: {
          enabled: false
        },
        title: {
          text: "Top Commentators",
          align: "top",
          margin: 10,
          offsetX: 0,
          offsetY: 0,
          floating: false,
          style: {
            fontSize: "30px",
            color: "#fefefe"
          }
        },
        xaxis: {
          categories: []
        }
      },
      commentators: []
    };
  },
  created() {
    //Hot Topics
    let hotTopics = this.$store.getters.getThreads.map(thread => {
      let newObj = {
        id: thread.id,
        title: thread.title,
        points: thread.upvotes + thread.views
      };
      return newObj;
    });
    console.log("Antes de receber pontos por comentarios" + hotTopics);
    let answers = this.$store.getters.getAnswers;
    let comments = this.$store.getters.getComments;
    for (let i = 0; i < hotTopics.length; i++) {
      for (let j = 0; j < answers.length; j++) {
        if (hotTopics[i].id == answers[j].idThread) {
          for (let k = 0; k < comments.length; k++) {
            if (answers[j].id == comments[k].idAnswer) {
              hotTopics[i].points += 1;
            }
          }
          hotTopics[i].points += 1;
        }
      }
    }
    console.log(hotTopics);
    hotTopics = hotTopics.sort((a, b) => {
      if (a.points > b.points) return -1;
      if (a.points < b.points) return 1;
      else return 0;
    });
    hotTopics.length = 5;
    //Push dos titulos dos hotTopics
    for (let i = 0; i < hotTopics.length; i++) {
      this.chartOptions.xaxis.categories.push(hotTopics[i].title);
    }
    console.log(this.chartOptions.xaxis.categories);

    //Agora ir buscar o numero de upvotes, Views e Comentarios

    for (let i = 0; i < hotTopics.length; i++) {
      let aux = 0;
      for (let j = 0; j < this.$store.getters.getThreads.length; j++) {
        if (hotTopics[i].id == this.$store.getters.getThreads[j].id) {
          aux =
            hotTopics[i].points -
            this.$store.getters.getThreads[j].upvotes -
            this.$store.getters.getThreads[j].views;
          console.log(aux);
          this.series[0].data.push(this.$store.getters.getThreads[j].upvotes);
          this.series[1].data.push(this.$store.getters.getThreads[j].views);
        }
      }
      this.series[2].data.push(aux);
      console.log(this.series[2].data);
    }
    //Donut Top Users XP
    let users = this.$store.getters.getUsers;

    users = users.sort((a, b) => {
      if (a.exp > b.exp) return -1;
      if (a.exp < b.exp) return 1;
      else return 0;
    });
    console.log(users);
    let count = 0;
    for (let i = 0; i < users.length; i++) {
      if (i < 5) {
        this.chartOptions2.labels.push(users[i].name);
        this.series2.push(users[i].exp);
      } else {
        count += users[i].exp;
      }
    }
    this.chartOptions2.labels.push("Others");
    this.series2.push(count);
    //Gráfico users Mais comentadores
    this.commentators = this.$store.getters.getUsers.map(user => {
      let newObj = {
        id: user.id,
        name: user.name,
        comentarios: 0
      };
      return newObj;
    });
    //Atribuir respostas
    for (let i = 0; i < this.commentators.length; i++) {
      for (let j = 0; j < this.$store.getters.getAnswers.length; j++) {
        if (
          this.commentators[i].id == this.$store.getters.getAnswers[j].idUser
        ) {
          this.commentators[i].comentarios += 1;
        }
      }
    }
    //Atribuir comentarios às respostas
    for (let i = 0; i < this.commentators.length; i++) {
      for (let j = 0; j < this.$store.getters.getComments.length; j++) {
        if (
          this.commentators[i].id == this.$store.getters.getComments[j].idUser
        ) {
          this.commentators[i].comentarios += 1;
        }
      }
    }

    //Ordenar e atribuir ao gráfico

    this.commentators = this.commentators.sort((a, b) => {
      if (a.comentarios > b.comentarios) return -1;
      if (a.comentarios < b.comentarios) return 1;
      else return 0;
    });
    for (let i = 0; i < 5; i++) {
      this.series3[0].data.push(this.commentators[i].comentarios);
      this.chartOptions3.xaxis.categories.push(this.commentators[i].name);
    }
  }
};
</script>
