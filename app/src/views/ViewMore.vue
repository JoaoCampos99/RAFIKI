<template>
  <div class="container">
    <h3>Notifications</h3>
    <div
      class="alert alert-info"
      v-for="(noti, cont) of notificacoes"
      v-bind:key="cont"
      v-on:click="notificacaoVista(noti.id)"
      v-bind:class="{seen: noti.visto}"
    >
      <div class="container">
        <div>
          <router-link v-bind:to="{name: 'thread', params: {threadid: noti.idThread}}">
            <i class="far fa-flag ii"></i>
            <span class="Info">Info alert: </span>
            <span class="userName"> {{users.find(us => us.id == noti.idUserFirst).name}}</span>
            {{noti.text}}
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loginID: this.$store.getters.getloginID,
      loginUser: null,
      users: this.$store.getters.getUsers
    };
  },
  created() {
    //Encontrar user logado
    this.loginUser = this.$store.getters.getUsers.filter(
      us => us.id == this.loginID
    )[0];
  },
  methods: {
    notificacaoVista(id) {
      let indexUser = this.users.findIndex(us => us.id == this.loginUser.id);
      let indexNoti = this.loginUser.notifications.findIndex(
        not => not.id == id
      );
      //Mandar index user e index notificacao no user
      this.$store.dispatch("change_notification_status", {
        indexUser: indexUser,
        indexNoti: indexNoti
      });
    }
  },
  computed: {
    notificacoes() {
      let aux = this.loginUser.notifications;
      aux = aux.reverse();
      let aux2 = [];
      for (let i = 0; i < aux.length; i++) {
        if (aux[i] != undefined) aux2.push(aux[i]);
      }
      // console.log(aux2);
      return aux2;
    }
  }
};
</script>
<style>
.alert {
  border: 0;
  border-radius: 10px;
  padding: 20px 15px !important;
  font-weight: 400;
  color: #fff !important;
}
.seen {
  background-color: white !important;
}
span.Info {
  font-weight: bold;
  font-size: 2.2vh;
  font-family: verdana;
}
</style>