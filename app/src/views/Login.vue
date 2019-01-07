<template>
  <div>
    <div class="container login-container">
      <div class="row">
        <div class="col-md-6 login-form-1" style="border-radius: 10px;">
          <h3>Login Now</h3>
          <form v-on:submit.prevent="submitfp()">
            <div class="form-group">
              <input
                type="email"
                class="form-control"
                placeholder="Your Email *"
                v-model="inputEmail"
                value
              >
            </div>
            <div class="form-group">
              <input
                type="password"
                class="form-control"
                placeholder="Your Password *"
                v-model="inputPassword"
                value
              >
            </div>
            <div class="form-group">
              <input
                type="button"
                class="btnSubmit"
                value="Login"
                @click="login"
                :disabled="inputEmail==''"
              >
            </div>
            <div class="form-group">
              <p
                href="#"
                class="btnForgetPwd"
                v-on:click="showfp = !showfp; emailfp = null"
              >Forgot Password?</p>
              <div class="col-md-12" v-show="showfp">
                <p class="form-text">Insere o teu e-mail e nós mandamos-te um manguito</p>
                <input
                  type="email"
                  v-model="emailfp"
                  class="form-control"
                  placeholder="E-mail..."
                  required
                >
                <div class="col-md-12 text-right" style="margin-top: 1rem;">
                  <button type="submit" class="btn btn-success">Enviar</button>
                </div>
              </div>
            </div>
          </form>
        </div>
        <div class="col-md-6 login-form-2" style="border-radius: 10px;">
          <h3>Register Now</h3>
          <form>
            <div class="form-group">
              <input
                id="inputReg"
                type="text"
                class="form-control"
                placeholder="Your Username"
                v-model="newUsername"
                required
              >
            </div>
            <div class="form-group">
              <input
                type="email"
                class="form-control"
                placeholder="Your Email"
                v-model="newEmail"
                required
              >
            </div>
            <div class="form-group">
              <input
                type="password"
                class="form-control"
                placeholder="Your Password *"
                v-model="newPassword"
                required
              >
            </div>
            <div class="form-group">
              <input
                type="password"
                class="form-control"
                placeholder="Confirm Password *"
                v-model="newCPassword"
                required
              >
            </div>
            <div class="form-group">
              <input type="button" class="btnSubmit" value="Register" @click="addUser">
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from "../../node_modules/sweetalert2/dist/sweetalert2.js";
import "../../node_modules/sweetalert2/src/sweetalert2.scss";

export default {
  data() {
    return {
      users: this.$store.getters.getUsers,
      inputEmail: "",
      inputPassword: "",
      newUsername: "",
      newEmail: "",
      newPassword: "",
      newCPassword: "",
      showfp: false,
      emailfp: null
    };
  },
  methods: {
    getLastID() {
      let maior;
      if (this.users.length != 0) {
        this.users.sort(function(a, b) {
          if (a.id > b.id) return 1;
          if (a.id < b.id) return -1;
        });
        //Por isto a dar
        console.log("Dá?" + this.users.length);
        console.log("ID:" + this.users);
        maior = this.users[this.users.length - 1].id;
        console.log(maior);
        return maior;
      } else {
        return 0;
      }
    },
    addUser() {
      //Verificar email, depois username
      let emailExists = this.users.some(user => user.email == this.newEmail);
      let usernameExists = this.users.some(
        user => user.name == this.newUsername
      );
      console.log("Email Existe:" + emailExists);
      console.log("Nome existe:" + usernameExists);

      if (this.newPassword == this.newCPassword) {
        let id = this.getLastID() + 1;
        if (emailExists || usernameExists) {
          Swal("Já Existe alguém com essas credenciais");
        } else {
          this.$store.dispatch("addUserAct", {
            id: id,
            name: this.newUsername,
            email: this.newEmail,
            password: this.newPassword,
            level: 0,
            exp: 0,
            badges: [], //Em testes para meter los de forma dinamica.
            rank: 0,
            desc: "Newbie",
            foto:
              "http://www.coffeebrain.org/wiki/images/9/93/PEOPLE-NoFoto.JPG",
            follow: []
          });
          Swal("Utilizador registado com sucesso");
          this.$store.dispatch("authentication");
          this.$store.dispatch("change_loginid", id);
          this.$router.push({
            name: "AboutMe",
            params: { userid: id }
          });
        }
      } else {
        Swal("Password Diferente de Confirmar Password");
      }
    },
    login() {
      console.log(this.users);
      let id = this.users.filter(user => {
        if (
          user.email == this.inputEmail &&
          user.password == this.inputPassword
        ) {
          return true;
        } else {
          return 0;
        }
      })[0].id;
      console.log(id);
      if (id) {
        this.$store.dispatch("authentication");
        this.$store.dispatch("change_loginid", id);
        this.$router.push({
          name: "AboutMe",
          params: { userid: id }
        });
      }
    },
    submitfp() {
      console.log("E-mail Forgot Password - " + this.emailfp);
      console.log(this.users);

      //Ver se o email está na "base de dados"
      let esquecido = this.users.find(user => user.email == this.emailfp);

      if (esquecido != undefined) {
        let user = {
          user_name: esquecido.name,
          user_pass: esquecido.password,
          user_email: esquecido.email
        };

        Swal({
          title: "A enviar",
          // showLoaderOnConfirm: true,
          onBeforeOpen: () => {
            Swal.showLoading();

            emailjs.send("outlook", "template_n921A41V", user).then(
              response => {
                console.log("SUCCESS!", response.status, response.text);

                Swal({
                  type: "success",
                  title: "Tranquilo",
                  text: `Mandamos um mail para o ${
                    this.emailfp
                  } com a tua passe!!!`,
                  animation: false,
                  customClass: "animated tada"
                });
              },
              error => {
                console.log("Falhou.....!", JSON.parse(error.text));
                Swal({
                  type: "error",
                  title: "Alguma coisa correu mal, \nTenta mais tarde.",
                  text: `Erro: ${JSON.parse(error.text).error}`
                });
              }
            );
          }
        });
      } else {
        let focusReg = false;
        focusReg = Swal({
          title: "O teu e-mail não está registado ainda",
          text: "Podes te registar na caixa vermelha e tá",
          type: "error",
          animation: false,
          customClass: "animated tada",
          confirmButtonText: "Registar-me",
          preConfirm: resp => {
            document.getElementById("inputReg").focus();
            return true;
          }
        });

        console.log(focusReg.preConfirm);

        if (focusReg) {
          console.log("ata");
          document.getElementById("inputReg").focus();
        }
      }
    }
  }
};
</script>


<style>
.login-container {
  margin-top: 5%;
  margin-bottom: 15%;
}
.login-form-1 {
  padding: 1rem;
  background: rgba(9, 71, 204, 0.904);
  box-shadow: 0 5px 8px 0 rgba(0, 0, 0, 0.2), 0 9px 26px 0 rgba(0, 0, 0, 0.19);
}
.login-form-1 h3 {
  text-align: center;
  margin-bottom: 12%;
  color: #fff;
}
.login-form-2 {
  padding: 1rem;
  background: #f05837;
  box-shadow: 0 5px 8px 0 rgba(0, 0, 0, 0.2), 0 9px 26px 0 rgba(0, 0, 0, 0.19);
}
.login-form-2 h3 {
  text-align: center;
  margin-bottom: 12%;
  color: #fff;
}
.btnSubmit {
  font-weight: 600;
  width: 50%;
  color: #282726;
  background-color: #fff;
  border: none;
  border-radius: 1.5rem;
  padding: 2%;
}
.btnForgetPwd {
  color: rgb(255, 212, 212);
  /* text-decoration: none; */
  font-family: "Arial Narrow Bold", sans-serif;
}
.btnForgetPwd:active {
  text-decoration: none;
  cursor: help;
  animation: 0.2s change_font;
}
.btnForgetPwd:hover {
  cursor: help;
}
@keyframes change_font {
  from {
    font-family: "Arial Narrow Bold", sans-serif;
  }
  to {
    font-family: Tahoma, "Arial Narrow Bold", sans-serif;
    font-weight: 500;
  }
}
.form-text {
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  color: white;
  text-align: center;
}
</style>
