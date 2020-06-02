<template>
  <div>
    <Navbar />Post Page
    <p>List</p>
    <p>Here you can talk about <strong>{{topicName}}</strong> and exchange your ideas about this topic.</p>
    <li v-for="p in posts" :key="p.title">{{ p.title }}</li>
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
  },
  data() {
    return {
      posts: [
        {
          title: "Hi"
        }
      ], 
      topicName: window.location.pathname.split("/")[3].replace(/[^A-Za-z]/g, " "),
    };
  },

  /*mounted() {
    let url =
      'http://localhost:3000/api/v1/topic/'+ window.location.href.split("/")[5];
      console.log(window.location.href.split("/")[5])
    let headers = {
      headers: { authorization: "Bearer " + localStorage.getItem("jwt") }
    };
    var self = this;
    this.$http
      .get(url, headers)
      .then(res => {
        self.posts = res.data.posts;
        console.log(self.posts)
      })
      .catch(err => {
        console.log(err);
      });
  }*/
};
</script>