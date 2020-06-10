<template>
  <div>
    <Navbar />

    <div class="card" id="post" @click="goBack">
      <div class="card-header">
        <strong>{{postTitle}}</strong>
      </div>
      <div class="card-body">
        <blockquote class="blockquote mb-0">
          <p>{{postContent}}</p>
          <br />
        </blockquote>
      </div>
      <footer class="blockquote-footer">
        posted by
        <cite title="Source Title">{{postedBy}}</cite>
      </footer>
    </div>

    <div class="input-group">
      <div class="input-group-prepend">
        <span class="input-group-text">Comment</span>
      </div>
      <input
        type="text"
        aria-label="comment"
        class="form-control"
        id="comment"
        placeholder="comment"
      />
      <button id="btn" type="submit" variant="success" @click="createComment">COMMENT</button>
    </div>
    <div v-if="!comments.length > 0">
      <img src="/svg/no-comments.svg" alt="post" class="img-fluid" />
      <h6>No comments yet</h6>
    </div>
    <li v-for="c in comments" :key="c._id + '-label'">
      <div class="card" id="comments">
        <div class="card-header1">
          <p class="commenter">commented by {{ c.commentedBy.username }}</p>
        </div>
        <div class="card-body">
          <h5 class="card-text">{{ c.content }}</h5>
        </div>
      </div>
    </li>
  </div>
</template>

<script>
import Navbar from "../navigation/Navbar";
export default {
  name: "Comment",
  props: {
    postId: String
  },
  components: {
    Navbar
  },
  data() {
    return {
      comments: [],
      postTitle: "",
      postContent: "",
      postedBy: ""
    };
  },
  mounted() {
    this.getComments();
  },
  methods: {
    getComments() {
      let url =
        "http://localhost:3000/api/v1/topic/" +
        window.location.pathname.split("/")[2] +
        "/post/" +
        window.location.pathname.split("/")[4];
      let headers = {
        headers: { authorization: "Bearer " + localStorage.getItem("jwt") }
      };
      var self = this;
      this.$http
        .get(url, headers)
        .then(res => {
          self.postTitle = res.data.postTitle;
          self.postContent = res.data.postContent;
          self.postedBy = res.data.postOwner.username;
          self.comments = res.data.cArray;
        })
        .catch(err => {
          console.log(err);
        });
    },
    createComment() {
      let comment = document.getElementById("comment").value;
      if (comment === "") {
        alert("Your comment should not be empty.");
      } else {
        let url =
          "http://localhost:3000/api/v1/topic/" +
          window.location.pathname.split("/")[2] +
          "/post/" +
          window.location.pathname.split("/")[4] +
          "/comment";
        var headers = {
          headers: { authorization: "Bearer " + localStorage.getItem("jwt") }
        };
        let body = {
          commentContent: comment
        };
        var self = this;
        this.$http
          .post(url, body, headers)
          .then(res => {
            if (res.data.success === true) {
              self.success = res.data.success;
              self.getComments();
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
    goBack() {
      this.$router.go(-1);
    }
  }
};
</script>

<style scoped>
.card {
  width: 80%;
  margin: 2% auto;
}
#post {
  box-shadow: 10px 5px 5px rgb(194, 194, 194);
  cursor: pointer;
}
.card-header {
  background: rgb(61, 172, 129);
  color: rgb(20, 61, 46);
}
.card-header1 {
  background: #ffd1dc;
}
#comments {
  box-shadow: 4px 2px 2px rgb(194, 194, 194);
}
.commenter {
  color: #1b0107;
}
.card-text {
  float: left;
  width: max-content;
}
.card-text,
p {
  font-size: 1em;
  float: left;
  list-style: none;
  margin: 0.5%;
  width: 90%;
  text-align: left;
}
* {
  list-style: none;
}
footer {
  float: left;
}
.input-group {
  width: 70%;
  margin: 2% auto;
}
#btn {
  background: #88bbe4;
  color: rgb(75, 104, 128);
  border: none;
}
#btn:hover {
  background: rgb(86, 164, 228);
  color: rgb(255, 255, 255);
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
  margin-left: -120px;
  font-size: 2em;
  background: blanchedalmond;
}
</style>