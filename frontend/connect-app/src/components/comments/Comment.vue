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

     <div class="container" >

    <article class="media">
  <figure class="media-left">
    <p class="image is-64x64">
      <img src="https://bulma.io/images/placeholders/128x128.png">
    </p>
  </figure>
  <div class="media-content">
    <div class="field">
      <p class="control">
        <textarea class="textarea"  id="comment" v-model="comment" placeholder="Add a comment..."></textarea>
      </p>
      
    </div>
    <div class="field">
      <p class="control">
        <button class="button"  type="submit"  @click="createComment">Comment</button>
      </p>
    </div>
  </div>
</article>

      <!-- hier muus  -->
    <div v-if="!comments.length > 0">
      <img src="/svg/no-comments.svg" alt="post" class="img-fluid" />
      <h6>No comments yet</h6>
    </div>
    <li v-for="c in comments" :key="c._id + '-label'">
     
    <div class="space">
     <article class="media">
      <figure class="media-left">
       <p class="image is-64x64">
      <img src="https://bulma.io/images/placeholders/128x128.png">
       </p>
      </figure>
       <div class="media-content">
        <div class="content">
         <p>
        <strong>{{c.commentedBy.username}}</strong> <small>{{c.commentedBy.date}}</small>
        <br>
        {{c.content}}
        <br>
      </p>
     <div class="media-right">
    <button class="delete" @click="deleteComment(c._id)"
            v-if="userId == c.commentedBy._id"></button>
  </div>
    </div>
  </div>
  
    </article>
</div>
   


    </li>
  </div>
  
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
      postedBy: "",
      postOwner: "",
      comment: "",
      edited: false,
      userId: localStorage.getItem("userId")
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
  }
};
</script>

<style scoped>


.media .avatar {
    width: 64px;
}
.shadow-textarea textarea.form-control::placeholder {
    font-weight: 300;
}
.shadow-textarea textarea.form-control {
    padding-left: 0.8rem;
}
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
  background: rgb(219, 166, 122);
  color: rgb(80, 72, 66);
  width: 12%;
  margin: 0.5%;
  border-radius: 6%;
  float: left;
  border: none;
}
#editbtn:hover {
  background: rgb(172, 123, 83);
  color: rgb(240, 232, 227);
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
  width: 100%;
  font-weight: bolder;
  float: left;
  background-color: transparent;
  border: none;
  padding: 8px;
}
#title:hover{
  background:rgb(102, 192, 158);
}
#content {
  padding: 8px;
  width: 100%;
  background-color: transparent;
  border: none;
}
#content:hover{
  background:rgb(235, 234, 221);
}
.button{
    background: rgb(77, 202, 154);
}
.button:hover{
  background: rgb(57, 150, 114);
  color: white;
}
</style>
