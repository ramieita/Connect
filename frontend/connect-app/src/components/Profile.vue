<template>
<div>
 <Navbar />
 <div class="oberklasse">
 <div class="test">
 <Editprofile /> 
 </div>
 <div class="unterklasse">
  <div class="card">
  <card class="card-user"   >
    <div slot="image">
      <img src="@/assets/img/background.jpg" alt="...">
    </div>
    <div>
      <div class="author">
        <img class="avatar border-white" src="@/assets/img/icons8.png" alt="...">
        <h4 class="title">{{username}} 
          <br>
            <small>{{email}}</small>
          
        </h4>
      </div>
      <p class="description text-center">
        "I like the way you work it
        <br> I am Student
        <br> I wanna bag it up"
      </p>
    </div>
    
   
  </card>
  </div>
 </div>
 </div> 
 <Footer />
 </div>
   
</template>

 <script>
import Navbar from "./navigation/Navbar";
import Editprofile from "./Editprofile"
import Footer from "./Footer"
export default { 
  name: "Profile",
  components: {
    Navbar,
    Editprofile,
    Footer
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
<style>

@import "../assets/style/profile.css";

</style> 