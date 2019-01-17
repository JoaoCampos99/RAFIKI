<template>
  <div class="container">
    <div class="row">
      <div class="col-md-9">
        <div class="row mb-2">
          <div class="col-md-12">
            <div class="card">
              <div class="card-body">
                <div class="row">
                  <div class="col-md-12">
                    <div class="news-title">
                      <h2>{{thread.title}}</h2>
                    </div>
                    <div class="news-cats">
                      <ul class="list-unstyled list-inline mb-1">
                        <li class="list-inline-item">
                          <i class="fa fa-folder-o text-danger"></i>
                          <a href="#">
                            <small>{{thread.course}}</small>
                          </a>
                        </li>

                        <li class="list-inline-item">
                          <i class="fa fa-folder-o text-danger"></i>
                          <a href="#">
                            <small>{{thread.date}}</small>
                            <p></p>
                            <small>Thread id = {{thread.id}}</small>
                            <!-- Isto e o <p> de cima vão sair, é só para ver o id da thread -->
                          </a>
                        </li>
                      </ul>
                    </div>
                    <hr>

                    <div class="news-content">
                      <p v-html="thread.question"></p>
                    </div>
                    <hr>
                    <div class="news-footer">
                      <div class="news-likes">
                        <button type="button" class="btn btn-outline-secondary">
                          <i class="fa fa-thumbs-o-up text-success"></i>
                          <span class="badge">Upvotes {{thread.upvotes}}</span>
                        </button>
                      </div>
                    </div>
                    <hr>
                    <div class="news-tags">
                      <h5>Tags</h5>
                      <button
                        type="button"
                        class="btn btn-sm btn-secondary"
                        v-for="(tag, cont) in thread.tags"
                        v-bind:key="cont"
                      >{{tag.text}}</button>
                    </div>
                    <hr>
                    <div class="news-author">
                      <div class="row">
                        <div class="col-md-auto">
                          <a href="#" title>
                            <img
                              v-bind:src="user.foto"
                              alt="Author image"
                              class="rounded-circle"
                              style="width:100px"
                            >
                          </a>
                        </div>
                        <div class="col">
                          <div class="auth-title">
                            <h4 class="author h4">
                              <router-link
                                v-bind:to="{name: 'viewprofile', params: {visiteduserid: user.id}}"
                              >{{user.name}}</router-link>
                            </h4>
                            <ul class="list-unstyled list-inline">
                              <li class="list-inline-item">Rank: {{user.rank}}</li>
                              <li class="list-inline-item">
                                <a
                                  class="float-right btn text-white btn-success ml-2"
                                  v-on:click="upvoteThread(thread.id)"
                                >
                                  <i
                                    class="fas fa-thumbs-up"
                                  > | {{thread.upvotes == 0 ? '' : thread.upvotes}}</i>
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <!-- Respostas e Comentários -->
          <div class="card" v-for="ans in threadAns" v-bind:key="ans.id">
            <div class="card-body">
              <div class="row">
                <div class="col-md-2">
                  <img v-bind:src="userFoto(ans.idUser)" class="img img-rounded img-fluid">
                  <!-- <p class="text-secondary text-center">15 Minutes Ago</p> -->
                </div>
                <div class="col-md-10">
                  <p>
                    <a
                      class="float-left"
                      href="https://maniruzzaman-akash.blogspot.com/p/contact.html"
                    >
                      <strong>{{userNome(ans.idUser)}}</strong>
                    </a>
                  </p>
                  <div class="clearfix"></div>
                  <p>{{ans.answer}}</p>
                  <p>
                    <a
                      class="float-right btn btn-outline-primary ml-2"
                      v-on:click="answerToThread(ans.id)"
                    >
                      <i class="fa fa-reply"></i>
                    </a>
                    <a
                      class="float-right btn text-white btn-success ml-2"
                      v-on:click="upvoteAns(ans.id)"
                    >
                      <i class="fas fa-thumbs-up">| {{ans.upvotes == 0 ? '' : ans.upvotes}}</i>
                    </a>
                    <a
                      class="float-right btn text-white btn-danger"
                      v-on:click="hideComments(ans.id)"
                    >
                      <i class="fas fa-caret-up"></i>
                    </a>
                  </p>
                </div>
              </div>
<<<<<<< HEAD
              <div v-bind:class="className(ans.id)">
                <div
                  class="card card-inner"
                  v-for="com in comments"
                  v-bind:key="com.id"
                  v-if="com.idAnswer == ans.id"
                >
                  <div class="card-body">
                    <div class="row">
                      <div class="col-md-2">
                        <img src class="img img-rounded img-fluid">
                        <!-- <p class="text-secondary text-center">15 Minutes Ago</p> -->
                      </div>
                      <div class="col-md-10">
                        <p>
                          <a href>
                            <strong>{{userNome(com.idUser)}}</strong>
                          </a>
                        </p>
                        <p>{{com.text}}</p>
                        <p>
                          <!-- <a class="float-right btn btn-outline-primary ml-2">
                            <i class="fa fa-reply"></i>
                          </a>-->
                          <a
                            class="float-right btn text-white btn-success ml-2"
                            v-on:click="upvoteComment(com.id)"
                          >
                            <i
                              class="fas fa-thumbs-up"
                            >| {{com.upvotes == 0 ? '' : parseInt(com.upvotes)}}</i>
                          </a>
                        </p>
                      </div>
=======
              <div
                class="card card-inner"
                v-for="com in comments"
                v-bind:key="com.id"
                v-if="com.idAnswer == ans.id"
              >
                <div class="card-body">
                  <div class="row">
                    <div class="col-md-2">
                      <img src class="img img-rounded img-fluid">
                      <!-- <p class="text-secondary text-center">15 Minutes Ago</p> -->
                    </div>
                    <div class="col-md-10">
                      <p>
                        <a href>
                          <strong>{{userNome(com.idUser)}}</strong>
                        </a>
                      </p>
                      <p>{{com.text}}</p>
                      <p>
                        <a class="float-right btn btn-outline-primary ml-2">
                          <i class="fa fa-reply"></i>
                        </a>
                        <a class="float-right btn text-white btn-success ml-2">
                          <i class="fas fa-thumbs-up"></i>
                        </a>
                      </p>
>>>>>>> d32148e8125c39422c854b326633cf198c6eddeb
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="row" v-show="showAnswerDiv">
          <div class="col-md-12 text-left">
            <h4>Responder</h4>
            <textarea
              name
              id="resposta"
              cols="30"
              rows="10"
              style="width: inherit"
              placeholder="Escreve aqui a tua resposta"
              v-model="textoResposta"
            ></textarea>

            <div class="text-right" style="margin-bottom: 15px;">
              <button class="btn btn-outline-success" v-on:click="adicionarResposta">Responder</button>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-3">
        <div class="row mb-2">
          <div class="col-md-12">
            <div class="card">
              <div class="row">
                <div class="col-md-12">
                  <div class="card">
                    <div class="card-body">
                      <h5>Related</h5>
                    </div>
                  </div>
                </div>
              </div>
              <div class="list-group">
                <a href="#" class="list-group-item list-group-item-action active">First item</a>
                <a href="#" class="list-group-item list-group-item-action">Second item</a>
                <a href="#" class="list-group-item list-group-item-action">Third item</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
   <!-- <span class="float-right">
                      <i class="text-warning fa fa-star"></i>
                    </span>
                    <span class="float-right">
                      <i class="text-warning fa fa-star"></i>
                    </span>
                    <span class="float-right">
                      <i class="text-warning fa fa-star"></i>
                    </span>
                    <span class="float-right">
                      <i class="text-warning fa fa-star"></i>
                    </span> Estrelas -->
<script>
window.addEventListener("click", contarClicks);
function contarClicks(nClicks) {}

export default {
  data() {
    return {
      thread: null,
      user: null,
      answers: this.$store.getters.getAnswers,
      comments: this.$store.getters.getComments,
      thisAnswers: [],
      thisComments: [],
      textoResposta: "",
      showAnswerDiv: this.$store.getters.getAuth
    };
  },
  created() {
    let threadid = this.$route.params.threadid;
    this.thread = this.$store.getters.getThreads.filter(
      thread => thread.id == threadid
    )[0];
    this.user = this.$store.getters.getUsers.filter(
      user => this.thread.userid == user.id
    )[0];
    console.log("OLAAAA");
    console.log(this.thread);
    console.log(this.user);
    if (!this.$store.getters.getAuth) {
      localStorage.setItem("setLastThread", threadid);
    }
  },
  computed: {
    threadAns() {
      this.thisAnswers = this.answers.filter(
        ans => ans.idThread == this.thread.id
      );
      return this.thisAnswers;
    },
    ansComments() {
      this.thisComments = this.comments.filter(com => {
        for (let ans of this.thisAnswers) {
          if (com.idAnswer == ans.id) {
            return true;
          }
        }
        console.log(this.thisComments);
        return false;
      });
    }
  },
  methods: {
    userFoto(iduser) {
      return this.$store.getters.getUsers.filter(us => us.id == iduser)[0].foto;
    },
    userNome(iduser) {
      return this.$store.getters.getUsers.filter(us => us.id == iduser)[0].name;
    },
    adicionarResposta() {
      console.log(this.textoResposta);
    },
    upvoteAns(id) {
      console.log(id);
      for (let ans of this.answers) {
        if (ans.id == id) {
          ans.upvotes++;
          console.log(`Answer (${id}) upvotes = ${ans.upvotes}`);
        }
      } //Falta fazer update à store
    },
    upvoteComment(id) {
      console.log(id);
    },
    answerToThread(id) {
        // for(let com of this.comments)
    },
    upvoteThread() {
      this.thread.upvotes++;
    },
    className(id) {
      return { id: true };
    }
  }
};
</script>

<style>
img {
  width: 100%;
}
.card-inner {
  margin-left: 4rem;
}
</style>
