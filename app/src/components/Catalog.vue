<template>
  <!-- <div class="container"> -->
    <div class="row">
      <div id="letabela" class="col-md-10">
        <table class="table table-striped">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Nome</th>
              <th scope="col">thread</th>
              <th scope="col">Handle</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(user) in $store.state.users" v-bind:key="user.id">
              <th scope="row">{{user.id}}</th>
              <td>{{user.name}}</td>
              <td>{{user.email}}</td>
              <td>{{user.level}}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="col-md-2">
        <h3>Para aqui vêm "Notas"</h3>
        <div class="fitText">
          <br>
          <br>
          <br>
          <br>
          <br>
          <br>
          <br>ataaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
        </div>
      </div>
    </div>
  <!-- </div> -->
</template>

<style scoped>
#letabela {
  padding-left: 30px;
  padding-right: 0px;
}
.fitText {
  word-wrap: break-word;
}
</style>    
