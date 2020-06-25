<template>
<div>
<Navbar/>
  <div class=" portfolio">
	<div class="row">
		<div class="col-md-12">
			<div class="heading">				
				<img src="https://image.ibb.co/cbCMvA/logo.png" />
			</div>
		</div>	
	</div>
	<div class="bio-info">
		<div class="row">
			<div class="col-md-6">
				<div class="row">
					<div class="col-md-12">
						<div class="bio-image">
							<img src="https://image.ibb.co/f5Kehq/bio-image.jpg" alt="image" />
						</div>			
					</div>
				</div>	
			</div>
			<div class="col-md-6">
				<div class="bio-content">
					<h1>{{username}}</h1>
                    <br>
					<h6> Email:  {{email}}</h6>
                    <br>
					<p>Bio: {{text}}</p>
				</div>
			</div>
		</div>	
	</div>
  </div>
 
 <Edit/>
 <Footer/>
</div>
</template>
<script>
import Navbar from "./navigation/Navbar";
import Footer from "./Footer"
import Edit from "./Edit"
export default { 
  name: "Profile",
  components: {
    Navbar,
    Edit,
    
    Footer
  },
  data() {
    return {
      username: "",
      email: "",
      text : "",
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
        this.text = res.data.text;
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>

<style scoped>
@import "../assets/style/Profile.css";


</style>