<template>
  <div>
    <form>
      <div class="form-group">
        <label for="exampleInputEmail1">Email address</label>
        <input
          type="email"
          class="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          placeholder="Enter email"
          v-model="email"
        />
      </div>
      <div class="form-group">
        <label for="exampleInputEmail1">Username</label>
        <input
          type="text"
          class="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          placeholder="Enter username"
          v-model="username"
        />
      </div>
      <div class="form-group">
        <label for="exampleInputPassword1">Password</label>
        <input
          type="password"
          class="form-control"
          id="exampleInputPassword1"
          placeholder="Password"
          :disabled="true"
        />
      </div>
      <div class="form-check"></div>
      <button type="submit" class="btn btn-outline-secondary">Update Profile</button>
    </form>
    <br>
    <Calendar />
  </div>
</template>

 <script>
 import Calendar from './Calendar'
export default {
  name: "EditProfile",
  components: {
    Calendar
  },
  data() {
    return {
      id: "",
      username: "",
      email: "",
      password: ""
    };
  },
  mounted() {
    let url = this.$store.state.url;
    const headers = {
      headers: { authorization: "Bearer " + localStorage.getItem("jwt") }
    };
    this.$http
      .get(url + "/profile", headers)
      .then(res => {
        this.id = localStorage.getItem("ID");
        this.username = res.data.username;
        this.email = res.data.email;
        console.log(this.id);
      })
      .catch(err => {
        console.log(err);
      });
  },

  updated() {
    let url = this.$store.state.url;
    const headers = {
      headers: { authorization: "Bearer " + localStorage.getItem("jwt") }
    };
    this.$http
      .put(
        url + "/profile",
        {
          username: this.username,
          email: this.email
        },
        headers
      )
      .then(res => {
        if (res.data.updated === true) {
          console.log(res);
        }
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>
<style >
.row {
  width: 100%;
  height: 100%;
}
</style> 

