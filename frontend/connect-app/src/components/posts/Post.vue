<template>
  <div>
    <Navbar />
    <code @click="goBack">&#060;&#060;&#060; Back to Topics</code>
    <br /><br />
    <form class="form-inline">
        <input
          class="form-control mr-sm-2 search"
          type="text"
          placeholder="Search for posts"
          v-model="search"
          aria-label="Search.."
        />
      </form><br />
    <h4>
      Here you can talk about
      <strong>{{topicName}}</strong> and exchange your ideas about this topic.
    </h4>
    <div class="input-group">
      <div class="input-group-prepend">
        <span class="input-group-text">Create new post</span>
      </div>
      <input
        type="text"
        aria-label="Post name"
        class="form-control"
        id="title"
        placeholder="title"
        v-model="title"
      />
    </div>
    <textarea
      type="textarea" 
      aria-label="Post Content"
      class="form-control"
      id="content"
      placeholder="content"
      v-model="content"
    />
    <button id="btn" type="submit" variant="success" @click="createPost">POST</button>
    <li v-for="p in filteredList" :key="p._id + '-label'">
      <div class="card">
        <div class="card-header">
          <p>posted by: {{ p.postedBy.username }}</p>
        </div>

        <router-link class="link" :to="`${{url}}` + '/' + p._id">
          <button class="btn btn-edit" v-if="userId == p.postedBy._id">Edit</button>
        </router-link>

        <div class="card-body">
          <h5 class="card-title">{{ p.title }}</h5>
          <br />
          <br />
          <p class="card-text">{{ p.content }}</p>
          <router-link class="link" :to="`${{url}}` + '/' + p._id">
            <button href class="btn btn-success">{{ p.comments.length }} Comments</button>
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
      isActive: false,
      userId: localStorage.getItem("userId"),
      title: "",
      content: "",
      search: ""
    };
  },
  mounted() {
    this.getPosts();
  },
  computed:{
    filteredList() {
      return this.posts.filter(post => {
        return post.title.toLowerCase().includes(this.search.toLowerCase())
      })
    }
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
              self.title = "";
              self.content = "";
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
.search{
  float: left;
  width: max-content;
  margin: .5%;
}
.card {
  width: 90%;
  margin: 1% auto;
}
.card-header {
  background: rgb(177, 211, 198);
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
.btn-edit {
  background: rgb(219, 166, 122);
  color: rgb(80, 72, 66);
  width: max-content;
  margin: 0.5%;
  float: left;
  border: none;
}
.btn-edit:hover {
  background: rgb(172, 123, 83);
  color: rgb(240, 232, 227);
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
.card-text {
  width: 80%;
  text-align: left;
}
code {
  float: left;
  margin: 0.5%;
  cursor: pointer;
}
.img-fluid {
  width: 300px;
  height: 300px;
  position: fixed;
  top: 50%;
  left: 50%;
  margin-top: 80px;
  margin-left: -150px;
  z-index: -2;
}
h6 {
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