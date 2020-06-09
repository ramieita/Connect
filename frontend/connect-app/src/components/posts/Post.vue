<template>
  <div>
    <Navbar />
    <code @click="goBack">&#060;&#060;&#060; Back to Topics</code>
    <br />
    <h4>
      Here you can talk about
      <strong>{{topicName}}</strong> and exchange your ideas about this topic.
    </h4>
    <div class="input-group">
      <div class="input-group-prepend">
        <span class="input-group-text">Create new post</span>
      </div>
      <input type="text" aria-label="Post name" class="form-control" id="title" placeholder="title" />
    </div>
    <textarea
      type="textarea"
      aria-label="Post Content"
      class="form-control"
      id="content"
      placeholder="content"
    />
    <button id="btn" type="submit" variant="success" @click="createPost">POST</button>
    <li v-for="p in posts" :key="p._id + '-label'">
      <div class="card">
        <div class="card-header">
          <p>posted by: {{ p.postedBy.username }}</p>
        </div>
        <div class="card-body">
          <h5 class="card-title">{{ p.title }}</h5>
          <br />
          <br />
          <p class="card-text">{{ p.content }}</p>
          <router-link class="link" :to="`${{url}}` + '/' + p._id">
          <button href class="btn btn-success">Comments</button>
          </router-link>
        </div>
      </div>
    </li>
    <img src="/svg/post.svg" alt="post" class="img-fluid" />
    <h6>Let's discuss!</h6>
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
      posts: [],
      topicName: window.location.pathname
        .split("/")[3]
        .replace(/[^A-Za-z]/g, " "),
      success: false,
      url: window.location.pathname,
      isActive: false
    };
  },
  mounted() {
    this.getPosts();
  },
  methods: {
    getPosts() {
      let url =
        "http://localhost:3000/api/v1/topic/" +
        window.location.pathname.split("/")[2];
      let headers = {
        headers: { authorization: "Bearer " + localStorage.getItem("jwt") }
      };
      var self = this;
      this.$http
        .get(url, headers)
        .then(res => {
          self.posts = res.data.postArray;
        })
        .catch(err => {
          console.log(err);
        });
    },
    createPost() {
      let title = document.getElementById("title").value;
      let content = document.getElementById("content").value;
      if (title === "") {
        alert("Title should not be empty.");
      } else {
        let url =
          "http://localhost:3000/api/v1/topic/" +
          window.location.pathname.split("/")[2] +
          "/post";
        var headers = {
          headers: { authorization: "Bearer " + localStorage.getItem("jwt") }
        };
        let body = {
          title: title,
          content: content
        };
        var self = this;
        this.$http
          .post(url, body, headers)
          .then(res => {
            if (res.data.success === true) {
              self.success = res.data.success;
              //inputTitle = res.data.postTitle,
              //textArea = res.data.postContent
              self.getPosts();
              console.log(res);
            } else {
              console.log("Something went wrong");
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    /*editPost() {
      let title = document.getElementById("title").value;
      let content = document.getElementById("content").value;
      let url =
          "http://localhost:3000/api/v1/topic/" +
          window.location.pathname.split("/")[2] +
          "/post";
        var headers = {
          headers: { authorization: "Bearer " + localStorage.getItem("jwt") }
        };
        let body = {
          title: title,
          content: content
        };

    },*/
    alert() {
      alert(
        "http://localhost:3000/api/v1/topic/" +
          window.location.pathname.split("/")[3] +
          "/post"
      );
    },
    goBack() {
      this.$router.go(-1);
    }
  }
};
</script>

<style scoped>
.card {
  width: 90%;
  margin: 1% auto;
}
.btn-success {
  float: right;
}
h4 {
  margin: 2% auto;
}
.card-title,
.card-text {
  float: left;
  width: max-content;
}
.card-text,
p {
  font-size: 1em;
  float: left;
  list-style: none;
}
* {
  list-style: none;
}
.btn-success {
  background: rgb(61, 172, 129);
  color: rgb(24, 48, 39);
  border: none;
}
.btn-success:hover {
  background: rgb(61, 172, 129);
}
#btn {
  background: #88bbe4;
  color: rgb(75, 104, 128);
  border: none;
  margin: 0.5% auto;
}
#btn:hover {
  background: rgb(86, 164, 228);
  color: rgb(255, 255, 255);
}
.btn-warning {
  width: 6%;
  margin: 0.5%;
}
.input-group {
  width: 70%;
  margin: 2% auto;
}
textarea {
  width: 70%;
  margin: auto;
}
code {
  float: left;
  margin: 0.5%;
  cursor: pointer;
}
.img-fluid{
  width: 300px;
  height: 300px;
  position: fixed;
  top: 50%;
  left: 50%;
  margin-top: 80px;
  margin-left: -150px;
  z-index: -2;
}
h6{
  z-index: -1;
  position: fixed;
  top: 50%;
  left: 50%;
  margin-top: 230px;
  margin-left: -85px;
  font-size: 2em;
  background: blanchedalmond;
}
</style>