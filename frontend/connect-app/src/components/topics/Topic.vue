<template>
  <div>
    <Navbar />
    <h1>{{ topicId | uppercase }}</h1>
    <div class="input-group">
      <div class="input-group-prepend">
        <span class="input-group-text">Create new topic</span>
      </div>
      <input
        type="text"
        aria-label="Topic name"
        class="form-control notAvailable"
        id="input"
        v-bind:placeholder="topicId"
        @input="handleInput"
      />
      <b-button id="btn" type="submit" variant="success" @click="createTopic">CREATE</b-button>
    </div>
    <div>
      <table class="table table-hover">
        <thead>
          <tr>
            <th scope="col">Created by</th>
            <th scope="col">Topic Name</th>
            <th scope="col">Date</th>
            <th scope="col">Edit</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="topic in topics" :key="topic._id">
            <td>{{ topic._id }}</td>
            <router-link class="link" :to="'/module/{{ topicId }}/' + topic._id">
              <td>{{ topic.name }}</td>
            </router-link>

            <td class="date">{{ topic.date.split("T")[0] }}</td>
            <td>edits</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import Navbar from "../navigation/Navbar";
export default {
  name: "Topic",
  props: {
    topicId: String
  },
  data() {
    return {
      topics: []
      //updateTable: true
      //search: ""
    };
  },
  components: {
    Navbar
  },
  /*computed: {
    filterTopics() {
      let searchTerm = (!this.search.includes("First") || "")
      return this.topics.filter(function(item) {
        let title = (item.name || "")
        return title.indexOf(searchTerm) > -1;
      });
    }
  },*/
  mounted() {
    this.getTopic();
  },
  methods: {
    getTopic() {
      let url = "http://localhost:3000/api/v1/topic";
      let headers = {
        headers: { authorization: "Bearer " + localStorage.getItem("jwt") }
      };
      var self = this;
      this.$http
        .get(url, headers)
        .then(res => {
          //self.topics = res.data.allTopics;
          var currentUrl = window.location.pathname.split("/")[2];
          var replace = currentUrl.replace(/[^A-Za-z]/g, "");
          //currentUrl.split("/")
          console.log(replace);

          const filt = res.data.allTopics;
          self.topics = filt.filter(f => f.name.includes(replace));
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    },
    createTopic() {
      let input = document.getElementById("input").value;
      if (
        input === "" ||
        document.getElementById("input").classList.contains("notAvailable")
      ) {
        alert("Topic Name already exists.");
      } else {
        let url = "http://localhost:3000/api/v1/topic";
        let headers = {
          headers: { authorization: "Bearer " + localStorage.getItem("jwt") }
        };
        let body = {
          name: input.toLowerCase().trim()
        };
        //var self = this;
        this.$http
          .post(url, body, headers)
          .then(res => {
            if (res.data.success === true) {
              //this.updateTable = true
              //self.topics = res.data;
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
    handleInput() {
      let input = document.getElementById("input").value.trim();
      if (input === "") {
        document
          .getElementById("input")
          .classList.replace("isAvailable", "notAvailable");
      }

      let url = "http://localhost:3000/api/v1/topic/checkTopicTitle";
      let headers = {
        headers: { authorization: "Bearer " + localStorage.getItem("jwt") }
      };
      let body = {
        name: input
      };
      this.$http
        .post(url, body, headers)
        .then(res => {
          if (res.data.topicAvailable === true) {
            document
              .getElementById("input")
              .classList.replace("notAvailable", "isAvailable");
          } else {
            document
              .getElementById("input")
              .classList.replace("isAvailable", "notAvailable");
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    getUrl() {
      var currentUrl = window.location.pathname.split("/")[2];
      var replace = currentUrl.replace(/[^A-Za-z-0-9]/g, "");
      return replace;
    }
  },
  filters: {
    uppercase: function(v) {
      return v.toUpperCase();
    }
  }
};
</script>

<style scoped>
h1 {
  margin: 1%;
}
.table,
.input-group {
  width: 70%;
  margin: 2% auto;
}
.date {
  color: #d9534f;
}
.link>td {
  font-weight: bolder;
  width: 240px;
}

.table {
  border-collapse: collapse;
}
th {
  background-color: #5cb85c;
  color: white;
}
td {
  width: 150px;
  text-align: center;
  border: 1px solid rgb(61, 61, 61);
  padding: 5px;
}
th {
  width: 150px;
  text-align: center;
  padding: 5px;
}
</style>