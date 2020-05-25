<template>
  <div>
    <div>
      <b-navbar type="dark" variant="dark">
        <b-navbar-brand href="/">Connect</b-navbar-brand>
        <b-navbar-nav class="ml-auto">
          <b-nav-item class="profile" href="/profile" right>{{ username }}</b-nav-item>
          <b-button id="logout" @click="logout" variant="outline-warning">Logout</b-button>
        </b-navbar-nav>
      </b-navbar>
    </div>
  </div>
</template>

<script>
export default {
  name: "Navbar",
  components: {},
  data() {
    return {
      username: ""
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
      })
      .catch(err => {
        console.log(err);
      });
  },
  methods: {
    logout() {
      localStorage.removeItem("jwt");
      this.$router.push("/login");
    }
  },
};
</script>

<style scoped>
.navbar {
    position: fixed;
    top: 0;
    width: 100%;
}

#logout{
  margin-right: 4%;
}

.nav-item {
  margin-right: 4%;
}
</style>