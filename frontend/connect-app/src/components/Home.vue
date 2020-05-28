<template id="home">
  <div class="home">
    <Navbar />
    <h1>Connect</h1>
  </div>
</template>

<script>
import Navbar from "./navigation/Navbar"
export default {
name: "Home",
  components: {
    Navbar,
  },
  methods: {
  }
};
</script>

<style scoped>
 
h1 {
  font-size: 1.6em; 
  color: black;
  margin: 1% auto;
}

body {
  background: #ffffff !important;
}
</style>
