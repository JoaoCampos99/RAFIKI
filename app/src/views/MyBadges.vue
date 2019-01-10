<template>
  <div>
    <div class="row">
      <div class="col-md-12">
        <br>
        <h2>Badges</h2>
        <br>
        <h4>Helpful Awards</h4>
        <hr>
      </div>
    </div>
    <div class="row">
      <div
        class="col-xs-12 col-sm-6 col-md-4 col-lg-3"
        v-for="badge in myBadges"
        v-bind:key="badge.id"
        v-if="badge.category==='help'"
      >
        <div class="offer offer-radius offer-success">
          <div class="shape">
            <div class="shape-text">
              <p>{{badge.id}}</p>
            </div>
          </div>
          <div>
            <h3 class="offer-content">{{badge.name}}</h3>
            <p class="offer-content2">{{badge.desc}}</p>
          </div>
        </div>
      </div>
    </div>
    <!-- AQUI COMEÇAM OS RANKING AWARDS-->
    <div class="row">
      <div class="col-md-12">
        <br>
        <h4>Ranking Awards</h4>
        <hr>
      </div>
    </div>
    <div class="row">
      <div
        class="col-xs-12 col-sm-6 col-md-4 col-lg-3"
        v-for="badge in myBadges"
        v-if="badge.category==='rank'"
        v-bind:key="badge.id"
      >
        <div class="offer offer-radius offer-warning">
          <div class="shape">
            <div class="shape-text">
              <p>{{badge.id}}</p>
            </div>
          </div>
          <div>
            <h3 class="offer-content">{{badge.name}}</h3>
            <p class="offer-content2">{{badge.desc}}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// class User {
//   constructor(id, nome, pass, mail, exp, desc, foto, follow, skill) {
//     //fazer nos getter's a atribuição de badges, level e rank
//     this.id = id; //Não vai ser preciso fazer o getId aqui, porque já é feito nos dois sitios onde os utilizadores são adicionados
//     this.name = nome;
//     this.password = pass;
//     this.email = mail;
//     this.exp = exp;
//     this.level = this.getLevel();
//     this.rank = this.getRank();
//     this.badges = this.getBadges();
//     this.desc = desc;
//     this.foto = foto;
//     this.follow = follow;
//     this.skill = skill; //Isto devia ser um array, um gadjo pode ter váriass skills
//   }

//   getLevel() {
//     return Math.floor(this.exp / 100) + 1;
//   }

//   getRank() {
//     //Vai ter que se fazer um switch para dar os nomes aos ranks
//     let rank = Math.floor(this.level / 10);
//     let trueRank = null;

//     switch (
//       rank //O calculo do rank deve estar mal....
//     ) {
//       case 0:
//         trueRank = "A começar";
//         break;
//       case 1:
//         trueRank = "grande";
//         break;
//       case 2:
//         trueRank = "muito grande";
//         break;
//     }
//     console.log(trueRank);
//     console.log(rank);
//     return [rank, trueRank];
//   }

//   set badges(value){
//     this.badges = this.getBadges()
//   }

//   getBadges() {
//     let badges = []
//     let thisUser = this.$store.getters.getUsers.find(us => us.id == this.id);
//     console.log(thisUser)
//     console.log('ataaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
//     for (let badge of this.$store.getters.getBadges) {
//       if (badge.goal(thisUser)) {
//         this.badges.push(badge.id);
//       }
//     }
//     return badges;
//   }

//   d(){
//     console.log(this)
//   }
// }
export default {
  data() {
    return {
      myBadges: []
    };
  },
  created() {
    // console.log(this.$store.getters.getloginID);
    let user = this.$store.getters.getUsers.filter(
      user => user.id == this.$store.getters.getloginID
    )[0];

    let auxUser = new this.$store.state.Userclass(
      user.id,
      user.name,
      user.password,
      user.email,
      user.exp,
      user.desc,
      user.foto,
      user.follow,
      user.skill
    );

    console.log(this.$store.state.Userclass);
    console.log(user);

    auxUser.badges = auxUser.getBadges(this.$store.getters.getBadges, this.$store.getters.getThreads);
    console.log(auxUser);

    // this.myBadges = auxUser.badges.filter();

    for (let i of auxUser.badges) {
      for (let badge of this.$store.state.badges) {
        if (i == badge.id) this.myBadges.push(badge);
      }
    }
    console.log(this.myBadges);

    // console.log(allBadges);
    // console.log(badges);
    // for (let i = 0; i < allBadges.length; i++) {
    //   // console.log(allBadges[i]);
    //   for (let j = 0; j < badges.length; j++) {
    //     if (allBadges[i].id == badges[j]) {
    //       console.log("Deu");
    //       this.myBadges.push(allBadges[i]);
    //     }
    //   }
    // }
    // console.log(this.myBadges);
  }
};
</script>
<style>
.shape {
  border-style: solid;
  border-width: 0 70px 40px 0;
  float: right;
  height: 0px;
  width: 0px;
  -ms-transform: rotate(360deg); /* IE 9 */
  -o-transform: rotate(360deg); /* Opera 10.5 */
  -webkit-transform: rotate(360deg); /* Safari and Chrome */
  transform: rotate(360deg);
}
.offer {
  background: #fff;
  border: 1px solid #ddd;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  margin: 15px 0;
  overflow: hidden;
}

.offer-radius {
  border-radius: 7px;
}
.offer-danger {
  border-color: #d9534f;
}
.offer-danger .shape {
  border-color: transparent #d9534f transparent transparent;
}
.offer-success {
  border-color: #5cb85c;
}
.offer-success .shape {
  border-color: transparent #99ff99 transparent transparent;
}
.offer-default {
  border-color: #999999;
}
.offer-default .shape {
  border-color: transparent #999999 transparent transparent;
}
.offer-primary {
  border-color: #428bca;
}
.offer-primary .shape {
  border-color: transparent #428bca transparent transparent;
}
.offer-info {
  border-color: #5bc0de;
}
.offer-info .shape {
  border-color: transparent #5bc0de transparent transparent;
}
.offer-warning {
  border-color: #f0ad4e;
}
.offer-warning .shape {
  border-color: transparent #f0ad4e transparent transparent;
}

.shape-text {
  color: #fff;
  font-size: 12px;
  font-weight: bold;
  position: relative;
  right: -50px;
  top: 2px;
  white-space: nowrap;
  -ms-transform: rotate(30deg); /* IE 9 */
  -o-transform: rotate(360deg); /* Opera 10.5 */
  -webkit-transform: rotate(30deg); /* Safari and Chrome */
  transform: rotate(30deg);
}
.offer-content {
  padding: 0 20px 10px;
  text-align: center;
  font-size: 14px;
}

.offer-content2 {
  padding: 0 20px 10px;
  text-align: left;
}

@media (min-width: 487px) {
  .container {
    max-width: 750px;
  }
  .col-sm-6 {
    width: 50%;
  }
}
@media (min-width: 900px) {
  .container {
    max-width: 970px;
  }
  .col-md-4 {
    width: 33.33333333333333%;
  }
}

@media (min-width: 1200px) {
  .container {
    max-width: 1170px;
  }
  .col-lg-3 {
    width: 25%;
  }
}
</style>
