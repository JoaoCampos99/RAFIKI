<template>
  <div>
    <NavBar/>
    <div class="text-center" style="margin-bottom: 100px;">
      <h1>isto é a página para nos contactar</h1>

      <form v-on:submit.prevent="submit">
        <div class="row" style="margin-bottom: 20px">
          <div class="col-md-2"></div>

          <div class="col-md-8" style="text-align: left">
            <div>
              <select v-model="form.subject">
                <option value disabled selected hidden>Escolhe</option>
                <option value="duvida">Duvida</option>
                <option value="recomendacao">Recomendação</option>
                <option value="reclamacao">Reclamação</option>
              </select>
            </div>
            <h4>{{form.user_name}}</h4>Nome:
            <input type="text" v-model="form.user_name" class="form-control">
            <h4>{{form.user_email}}</h4>Mail:
            <input type="text" v-model="form.user_email" class="form-control">
            <br>
            <br>
            <h4>Mensagem</h4>
            <textarea cols="30" rows="17" v-model="form.text" class="form-control"></textarea>
          </div>
          <div class="col-md-2"></div>
        </div>
        <button type="submit" class="btn btn-danger">Ola</button>
      </form>
    </div>
    <Footer/>
  </div>
</template>

<script>
/*Components*/
import NavBar from "@/components/NavBar.vue";
import Footer from "@/components/Footer.vue";

/*npm Libraries*/
import Swal from "C:/Users/Álvaro/Desktop/Faculdade ESMAD/2º Ano/PW1/Project Rafiki/RAFIKI/app/node_modules/sweetalert2/dist/sweetalert2.js";
import "C:/Users/Álvaro/Desktop/Faculdade ESMAD/2º Ano/PW1/Project Rafiki/RAFIKI/app/node_modules/sweetalert2/src/sweetalert2.scss";

export default {
  data() {
    return {
      form: {
        subject: "",
        user_name: "",
        user_email: "",
        text: ""
      }
    };
  },
  methods: {
    submit() {
      const conf = Swal.mixin({
        position: "center",
        showConfirmButton: false,
        timer: 3000
      });

      if (this.form.subject != "") {
        emailjs.send("gmail", "contact_form", this.form).then(
          response => {
            console.log("SUCCESS!", response.status, response.text);
            conf({
              type: "success",
              text:
                "E-mail enviado com sucesso, \nResponderemos o mais breve possivel."
            });
          },
          error => {
            console.log("Falhou.....!", error);
            conf({
              type: "error",
              text: "Alguma coisa correu mal, \nTenta mais tarde."
            });
          }
        );
      } else {
        console.log("Escolhe uma categoria");
      }
    }
  },
  components: {
    NavBar,
    Footer
  }
};
</script>

<style>
textarea {
  resize: none;
}
</style>

