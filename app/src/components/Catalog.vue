<template>
  <!-- <div class="container"> -->
  <div class="row" style="width: inherit">
    <div id="letabela" class="col-md-10">
      <table class="table table-striped" style="width: inherit">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Nome</th>
            <th scope="col">thread</th>
            <!-- <th scope="col">Handle</th> -->
          </tr>
        </thead>
        <tbody>
          <tr v-for="(user) in $store.state.users" v-bind:key="user.id">
            <th scope="row">{{user.id}}</th>
            <td>{{user.name}}</td>
            <td>{{user.email}}</td>
            <!-- <td>{{user.level}}</td> -->
          </tr>
        </tbody>
      </table>
    </div>
    <div class="col-md-2" style="padding: 0 0 0 5">
      <h3>Para aqui vêm "Notas"</h3>
      <div class="fitText">
        <ul style="padding: 0 0 0 5; padding-inline-start: 5px">
          <li
            style="margin-bottom: 20px; margin-bottom: 20px; "
          >
            <h6>Lorem ipsum dolor sit amet consectetur adipisicing elit.</h6>Ea fuga sed beatae eligendi? Nihil ipsa, illo, alias ab dolorem repellendus quis aut sed illum ullam modi facilis quo voluptatum. Esse!
          </li>
        </ul>
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
