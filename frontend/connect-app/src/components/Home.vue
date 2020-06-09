<template id="home">
  <div class="home">
    <Navbar />
    <Module />
  </div>
</template>

<script>
import Navbar from "./navigation/Navbar";

import Module from "../components/modules/Module";
export default {
  name: "Home",
  components: {
    Navbar,
    Module
  },
  methods: {}
};
</script>

<style scoped>
h1 {
  font-size: 1.6em;
  color: black;
}

body {
  background: #ffffff !important;
}
.img-fluid {
  width: 15px;
}
</style>
