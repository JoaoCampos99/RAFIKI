<template>
  <footer class="row text-center text-xs-center text-sm-left text-md-left">
    <div class="col-sm-4">
      <img alt="Vue logo" src="@/assets/logoR.png" style="width: inherit">
    </div>
    <div class="col-sm-8 text-center">
      <div class="row">
        <div class="col-md-4">
          <!-- <h3></h3> -->
        </div>
        <div class="col-md-4">
          <h3>FAQ</h3>
        </div>
        <div class="col-md-4">
          <h3>Enviar Mail</h3>
          <router-link to="contactus" id="contactus">Contacta-nos</router-link>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {};
</script>

<style scoped>
footer {
  padding: 10px;
  margin: 0;
  background: #282C35;
  color: rgba(255, 255, 255, 0.774);
  font-size: 12px;
}
#contactus {
  text-decoration: none;
}
</style>
