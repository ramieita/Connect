<template id="home">
  <div class="home">
    <h1>Welcome to the Homepage</h1>
    <button @click="logout">Logout</button>
  </div>
</template>

<script>
export default {
  name: "Home",
  components: {},
  methods: {
    logout() {
      localStorage.removeItem("jwt");
      this.$router.push("/login");
    }
  }
};
</script>

<style>
 
h1 {
  font-size: 1.6em;
  color: black;
}
</style>
