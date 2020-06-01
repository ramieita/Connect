<template>
  <div>
    <Navbar />Post Page
  </div>
</template>

<script>
import Navbar from "../navigation/Navbar";
export default {
  name: "Post",
  props: {
    postId: String
  },
  components: {
      Navbar
  }
};
</script>