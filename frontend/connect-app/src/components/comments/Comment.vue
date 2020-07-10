<template>
  <div>
    <Navbar />

    <div class="card" id="post">
      <div class="card-header">
        <input
          type="text"
          v-model="postTitle"
          id="title"
          :class="{view: userId !== postOwner}"
          :disabled="userId !== postOwner"
        />
      </div>
      <div class="card-body">
        <blockquote class="blockquote mb-0">
          <textarea
            type="text"
            v-model="postContent"
            id="content"
            :class="{view: userId !== postOwner}"
            :disabled="userId !== postOwner"
          />
          <br />
        </blockquote>
      </div>
      <div class="media-right">
                <span class="icon is-small">
                    <i @click="increaseVotes()" class="fa fa-chevron-up"></i>
                    <strong class="has-text-info">{{ post.votes }}</strong>
                </span>
      </div>
      <button
        @click="editPost"
        v-if="userId == postOwner"
        type="submit"
        variant="success"
        id="editbtn"
      >Edit</button>
      
      <footer class="blockquote-footer">
        posted by
        <cite title="Source Title">{{postedBy}}</cite>
        <cite v-if="edited"><i> --- edited ---</i></cite>
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
        v-model="comment"
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
          <button
            class="btn btn-delete"
            @click="deleteComment(c._id)"
            v-if="userId == c.commentedBy._id"
          >Delete</button>
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
    postId: String,
    //upvote props
    post: null,
    //votes: Number
    //upvote props end
  },
  components: {
    Navbar
  },
  data() {
    return {
      comments: [],
      postTitle: "",
      postContent: "",
      postedBy: "",
      postOwner: "",
      comment: "",
      edited: false,
      userId: localStorage.getItem("userId"),
      votes: 0
    };
  },
  mounted() {
    this.getComments();
  },
  methods: {
    increaseVotes: function () {
            this.post.votes++;
        },
    

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
          self.postOwner = res.data.postOwner._id;
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
              self.comment = "";
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
    editPost() {
      let title = document.getElementById("title").value;
      let content = document.getElementById("content").value;
      let url =
        "http://localhost:3000/api/v1/topic/" +
        window.location.pathname.split("/")[2] +
        "/post/" +
        window.location.pathname.split("/")[4];
      var headers = {
        headers: { authorization: "Bearer " + localStorage.getItem("jwt") }
      };
      let body = {
        title: title,
        content: content
      };
      this.$http
        .put(url, body, headers)
        .then(res => {
          alert("Post updated");
          this.edited = true;
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    },
    deleteComment(id) {
      let url =
        "http://localhost:3000/api/v1/topic/" +
        window.location.pathname.split("/")[2] +
        "/post/" +
        window.location.pathname.split("/")[4] +
        "/comment/" +
        id;
      var headers = {
        headers: { authorization: "Bearer " + localStorage.getItem("jwt") }
      };
      this.$http
        .delete(url, headers)
        .then(res => {
          var self = this;
          self.comments.splice(
            self.comments.findIndex(i => i._id == id),
            1
          );
          alert("Deleted");
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    },
    goBack() {
      this.$router.go(-1);
    }
  },

  computed: {
        isHot: function () {
            return this.post.votes >= 20;
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
  background: #edc9af;
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
#editbtn {
  background: #f0ad4e;
  color: #463115;
  border: none;
  width: 8%;
  margin: 0.5%;
}
.btn-delete{
  background: #d9534f;
  margin: .5%;
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
textarea {
  width: 90%;
  float: left;
}
.view {
  border-color: transparent;
  background-color: initial;
}
#title {
  width: 90%;
  float: left;
  background-color: rgb(70, 202, 151);
  border-color: rgb(29, 83, 62);
  padding: 8px;
}
#content {
  padding: 8px;
}
</style>