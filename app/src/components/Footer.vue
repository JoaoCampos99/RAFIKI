<template>
  <footer class="row">
    <div class="col-sm-4">
      <img alt="Vue logo" src="@/assets/logoR.png">
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
  position: fixed;
  right: 0;
  bottom: 0;
  left: 0;
  padding: 1rem;
  background: black;
  /* margin-top: 50px; */
  color: white;
}
#contactus {
  text-decoration: none;
}
</style>
