<template>
  <div>
    <Navbar />
    <h4>Profile</h4>
    <h6>Username</h6>
    <p>{{ username }}</p>
    <h6>Email</h6>
    <p>{{ email }}</p>
    <button @click="$bvModal.show('modal-scoped')" variant="success">Edit Profile</button>
    <b-modal id="modal-scoped">
      <template>
        <p>Username:</p>
        <input type="text" placeholder="Username" v-model="username" />
        <br />
        <br />
        <p>Email:</p>
        <input type="email" placeholder="Email" v-model="email" />
      </template>
      <template v-slot:modal-footer="{ edit, cancel }">
        <b-button size="sm" variant="success">Edit</b-button>
        <b-button size="sm" variant="danger" @click="cancel()">Cancel</b-button>
      </template>
    </b-modal>
  </div>
</template>

<script>
import Navbar from "./navigation/Navbar";
export default { 
  name: "Profile",
  components: {
    Navbar
  },
  data() {
    return {
      username: "",
      email: ""
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
        this.username = res.data.username;
        this.email = res.data.email;
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>

<style scoped>
</style>