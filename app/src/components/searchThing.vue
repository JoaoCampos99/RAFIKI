<template>
  <div id="searchBox">
    <div class="cont btn-group dropup">
      <button id="searchButton" type="button" class="btn btn-primary" data-toggle="dropdown">
        <i class="fas fa-search"></i>
      </button>
      <div class="dropdown-menu text-right">
        <div class="dropdown-item drop text-right">
          <div v-on:click="cTid" class="botoesSearchThing">Create Thread</div>
        </div>
        <div class="dropdown-divider"></div>

        <div class="dropdown-item drop">
          <a
            class="botoesSearchThing"
            data-toggle="modal"
            data-target="#modalSearch"
            v-on:click="openDialog"
          >Search</a>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <div
      class="modal fade"
      id="modalSearch"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <!-- data-backdrop="false", para não deixar a modal ao clicar fora desta -->
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-body">
            <div class="col-md-12">
              <h1 class="text-center" style="display: inline-block; width: 50%;">Pesquisar</h1>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true bg-blue">&times;</span>
              </button>
            </div>
            <div class="col-md-12">
              <div class="searchbar">
                <input
                  id="search"
                  type="text"
                  class="search_input form-control"
                  placeholder="Search..."
                  v-model="searchText"
                >
                <a class="search_icon">
                  <i class="fas fa-search"></i>
                </a>
              </div>
            </div>
            <div class="row containerDropdowns">
              <div v-for="(res, cont) in theSearch" v-bind:key="cont" class="col-md-12 dropdowns">
                <div class="userImg text-center">
                  <i v-if="res.name == undefined" class="fas fa-atom"></i>
                  <i v-else class="fas fa-user"></i>
                </div>
                <div class="desc">
                  <router-link
                    v-if="res.name == undefined"
                    v-bind:to="{name: 'thread', params: {threadid: res.id}}"
                  >{{res.title}}</router-link>
                  <router-link
                    v-else
                    v-bind:to="{name: 'viewprofile', params: {visiteduserid: res.id}}"
                  >{{res.name}}</router-link>
                </div>
              </div>
            </div>
            <div v-if="cont>10" class="col-md-12 midlePagination">
              <nav aria-label="Page navigation example" class>
                <ul class="pagination">
                  <li class="page-item">
                    <a class="page-link" href="#" aria-label="Previous">
                      <span aria-hidden="true">&laquo;</span>
                      <span class="sr-only">Previous</span>
                    </a>
                  </li>
                  <li class="page-item">
                    <a class="page-link" href="#">1</a>
                  </li>
                  <li class="page-item">
                    <a class="page-link" href="#">2</a>
                  </li>
                  <li class="page-item">
                    <a class="page-link" href="#">3</a>
                  </li>
                  <li class="page-item">
                    <a class="page-link" href="#" aria-label="Next">
                      <span aria-hidden="true">&raquo;</span>
                      <span class="sr-only">Next</span>
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
          <hr class="devilhr">
          <div class="modal-footer">
            <!-- <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button> -->
            <button type="button" class="btn">Look Up!</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/*npm Libraries*/
import Swal from "../../node_modules/sweetalert2/dist/sweetalert2.js";
import "../../node_modules/sweetalert2/src/sweetalert2.scss";

export default {
  data() {
    return {
      showSearchBar: true,
      users: this.$store.state.users,
      threads: this.$store.state.threads,
      loginID: this.$store.getters.getloginID,
      searchText: null,
      cont: 0
    };
  },
  created() {
    console.log("alalalalal - " + this.loginID);
  },
  methods: {
    openDialog() {
      // let dialog = document.getElementById('dialogSearch')
      // dialog.show()
      // console.log(this.users);
    },
    cTid() {
      console.log("este e o id" + this.loginID);
      this.$router.push({
        name: "createThread",
        params: { userId: this.loginID }
      });
    },
    trimTitle(title) {
      let index1 = title.indexOf(">");
      let index2 = title.indexOf("<", index1);

      return title.substring(index1 + 1, index2);
    }
  },
  computed: {
    fillArray() {
      this.users = this.$store.state.users;
    },
    theSearch() {
      // console.log("ata");
      // console.log(this.users);
      // if (document.getElementById("search") != null)
      //   this.searchText = document.getElementById("search").value;

      let aux = [];
      // console.log(this.)
      if (this.searchText != null) {
        aux = this.users.filter(user =>
          user.name.toUpperCase().includes(this.searchText.toUpperCase())
        );

        // console.log(aux)
        let auxThreads = [];
        // console.log(this.threads)
        auxThreads = this.threads.filter(thread =>
          thread.title.toUpperCase().includes(this.searchText.toUpperCase())
        );

        if (auxThreads.length > 0) {
          for (let thread of auxThreads) {
            // console.log(auxThreads)
            if (thread.title[0] == "<") {
              thread.title = this.trimTitle(thread.title);
            }
            aux.push(thread);
          }
        }
      }

      if (this.searchText == "") {
        aux = [];
      }

      this.cont = aux.length;

      // console.log(aux)
      // console.log(this.cont)
      return aux;
    }
  }
};
</script>

<style>
#main {
  position: absolute;
  right: 0;
  display: inline-block;
  text-align: right;
}

#searchBox {
  display: block;
  position: fixed;
  right: 10px;
  bottom: 0;
  z-index: 100;
}
#searchBox > div.cont {
  padding: 2px;
  border-radius: 5px;
  margin: 5px;
  background-color: green;

  /* animation: 2s infinite alternate moving-lines; */

  animation: 10s infinite trocarCoresDiv;
}
#searchButton {
  background-color: initial;
  border: none;
}

@keyframes trocarCoresDiv {
  from {
    background-color: rgb(80, 253, 80);
  }
  to {
    background-color: rgb(223, 139, 43);
  }
}
div.dropdown-divider {
  border: 1px solid green;
  width: 50%;
  margin-left: 75px;
  animation: 10s infinite trocarCoresBorder;
}
@keyframes trocarCoresBorder {
  from {
    border-color: rgb(80, 253, 80);
  }
  to {
    border-color: rgb(223, 139, 43);
  }
}
.botoesSearchThing {
  padding: 0px 5px 0px 0px;
  margin: 0px;
  border: 1px solid green;
  border-radius: 10px;
  background-color: white;
  width: fit-content;
  text-align: right;

  animation: 10s infinite trocarCoresBorder;
}
div.dropdown-item.drop {
  padding: 0px;
  margin: 0px;
}
div.dropdown-menu {
  border: none;
  cursor: pointer;
  padding: 0px 10px 10px 0px;
  background-color: rgba(255, 255, 255, 0);
}
.drop > div {
  margin-left: 50px;
}
/* #modalSearch {
  z-index: -1;
} */
.modal-backdrop {
  display: none;
}
div.searchbar {
  margin-bottom: auto;
  margin-top: auto;
  height: 60px;
  background-color: #353b48;
  border-radius: 30px;
  padding: 10px;
}
div.searchbar > input.search_input,
input.search_input:focus {
  color: white;
  border: 0;
  outline: 0;
  background: none;
  caret-color: transparent;
  line-height: 40px;
  border-color: #353b48;
  width: 85%;
  margin: 0 !important;
  display: inline-block;
}
.devilhr {
  border: 3px solid #282c35;
  border-radius: 10px;
  width: 70%;
  /* transition: all 5s; */

  animation: 2s infinite alternate moving-lines;
  /*animation-delay: 2s;*/
}
@keyframes moving-lines {
  from {
    /* stroke-dashoffset: 6000; */
    border-color: black;
  }
  to {
    /* stroke-dashoffset: 0; */
    border-color: rgb(68, 68, 214);
  }
}
div.modal-footer {
  padding: 0px;
  padding-right: 10%;
  border: 0;
  padding-bottom: 2%;
}
div.searchbar > a.search_icon {
  margin-left: 5%;
  height: auto;
  color: white;
  padding: 2px;
}
div.searchbar > a.search_icon:hover {
  caret-color: red;
  color: red;
  background-color: white;
  border-radius: 50px;
}
button.btn {
  background-color: #353b48;
  color: green;
}
div.row > div.dropdowns {
  margin-bottom: 2px;
  margin-top: 2px;
  height: 60px;
  background-color: white;
  border-radius: 30px;
  border: 1px solid black;
  padding: 10px;
}
div.row.containerDropdowns {
  width: 95%;
  margin: 3% 2.5%;
}
div.dropdowns:hover {
  background-color: rgb(226, 171, 52) !important;
  cursor: pointer;
}
div.userImg {
  width: 20%;
  background-color: grey;
  border-radius: 20px;
  display: inline-block !important;
}
div.desc {
  width: 80%;
  display: inline-block !important;
  padding-left: 5px;
}
div.midlePagination {
  padding: 0% 10%;
  display: inline-block;
  text-align: center;
}
</style>
