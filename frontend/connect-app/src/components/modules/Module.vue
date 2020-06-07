<template>
  <div class="test">
    <HomeNav />
    <br />
    <nav class="navbar navbar-light bg-light">
      <form class="form-inline">
        <input
          class="form-control mr-sm-2"
          type="text"
          placeholder="Search"
          id="myInput"
          aria-label="Search.."
        />
      </form>
    </nav>

    <div class="card-columns">
      <div class="card">
        <img class="card-img-top" src="@/assets/img/pic.jpg" alt="Card image cap" />
        <div class="card-body">
          <router-link to="/module/mathe1"><h5 class="card-title" id="mathe1">Mathematik I</h5></router-link>
          <p
            class="card-text"
          >This card has supporting text below as a natural lead-in to additional content.</p>
          <p class="card-text">
            <small class="text-muted">Last updated 3 mins ago</small>
          </p>
        </div>
      </div>

      <div class="card">
        <img class="card-img-top" src="@/assets/img/pic.jpg" alt="Card image cap" />
        <div class="card-body">
          <router-link to="/module/gti"><h5 class="card-title" id="gti">Grundlagen der Theoretischen Informatik</h5></router-link>
          <p
            class="card-text"
          >This card has supporting text below as a natural lead-in to additional content.</p>
          <p class="card-text">
            <small class="text-muted">Last updated 3 mins ago</small>
          </p>
        </div>
      </div>

      <div class="card">
        <img class="card-img-top" src="@/assets/img/pic.jpg" alt="Card image cap" />
        <div class="card-body">
          <router-link to="/module/mediendesign"><h5 class="card-title" id="design">Mediendesign Grundlagen</h5></router-link>
          <p
            class="card-text"
          >This card has supporting text below as a natural lead-in to additional content.</p>
          <p class="card-text">
            <small class="text-muted">Last updated 3 mins ago</small>
          </p>
        </div>
      </div>

      <div class="card">
        <img class="card-img-top" src="@/assets/img/pic.jpg" alt="Card image cap" />
        <div class="card-body">
          <router-link to="/module/tgi"><h5 class="card-title" id="tgi">Technische Grundlagen der Informatik</h5></router-link>
          <p
            class="card-text"
          >This card has supporting text below as a natural lead-in to additional content.</p>
          <p class="card-text">
            <small class="text-muted">Last updated 3 mins ago</small>
          </p>
        </div>
      </div>

      <div class="card">
        <img class="card-img-top" src="@/assets/img/pic.jpg" alt="Card image cap" />
        <div class="card-body">
          <router-link to="/module/prog1"><h5 class="card-title" id="prog1">Programmierung I</h5></router-link>
          <p
            class="card-text"
          >This card has supporting text below as a natural lead-in to additional content.</p>
          <p class="card-text">
            <small class="text-muted">Last updated 3 mins ago</small>
          </p>
        </div>
      </div>
      <!-- 2.Sem-->
      <div class="card">
        <img class="card-img-top" src="@/assets/img/pic.jpg" alt="Card image cap" />
        <div class="card-body">
          <router-link to="/module/mathe2"><h5 class="card-title" id="mathe2">Mathematik II</h5></router-link>
          <p
            class="card-text"
          >This card has supporting text below as a natural lead-in to additional content.</p>
          <p class="card-text">
            <small class="text-muted">Last updated 3 mins ago</small>
          </p>
        </div>
      </div>
      <div class="card">
        <img class="card-img-top" src="@/assets/img/pic.jpg" alt="Card image cap" />
        <div class="card-body">
          <router-link to="/module/algo"><h5 class="card-title" id="algo">Algorithmen und Datenstrukturen</h5></router-link>
          <p
            class="card-text"
          >This card has supporting text below as a natural lead-in to additional content.</p>
          <p class="card-text">
            <small class="text-muted">Last updated 3 mins ago</small>
          </p>
        </div>
      </div>
      <div class="card">
        <img class="card-img-top" src="@/assets/img/pic.jpg" alt="Card image cap" />
        <div class="card-body">
          <router-link to="/module/datenbanksysteme"><h5 class="card-title" id="db">Datenbanksysteme</h5></router-link>
          <p
            class="card-text"
          >This card has supporting text below as a natural lead-in to additional content.</p>
          <p class="card-text">
            <small class="text-muted">Last updated 3 mins ago</small>
          </p>
        </div>
      </div>
      <div class="card">
        <img class="card-img-top" src="@/assets/img/pic.jpg" alt="Card image cap" />
        <div class="card-body">
          <router-link to="/module/prog2"><h5 class="card-title" id="prog2">Programmierung II</h5></router-link>
          <p
            class="card-text"
          >This card has supporting text below as a natural lead-in to additional content.</p>
          <p class="card-text">
            <small class="text-muted">Last updated 3 mins ago</small>
          </p>
        </div>
      </div>
      <div class="card">
        <img class="card-img-top" src="@/assets/img/pic.jpg" alt="Card image cap" />
        <div class="card-body">
          <router-link to="/module/betriebssysteme"><h5 class="card-title" id="mathe1">Betriebssysteme</h5></router-link>
          <p
            class="card-text"
          >This card has supporting text below as a natural lead-in to additional content.</p>
          <p class="card-text">
            <small class="text-muted">Last updated 3 mins ago</small>
          </p>
        </div>
      </div>
      <!-- 3.semter -->
      <div class="card">
        <img class="card-img-top" src="@/assets/img/pic.jpg" alt="Card image cap" />
        <div class="card-body">
          <router-link to="/module/softwareeng1"><h5 class="card-title" id="se1">Software Engineering I</h5></router-link>
          <p
            class="card-text"
          >This card has supporting text below as a natural lead-in to additional content.</p>
          <p class="card-text">
            <small class="text-muted">Last updated 3 mins ago</small>
          </p>
        </div>
      </div>
      <div class="card">
        <img class="card-img-top" src="@/assets/img/pic.jpg" alt="Card image cap" />
        <div class="card-body">
          <router-link to="/module/computergrafik"><h5 class="card-title" id="cg">Computergrafik Grundlagen</h5></router-link>
          <p
            class="card-text"
          >This card has supporting text below as a natural lead-in to additional content.</p>
          <p class="card-text">
            <small class="text-muted">Last updated 3 mins ago</small>
          </p>
        </div>
      </div>
      <div class="card">
        <img class="card-img-top" src="@/assets/img/pic.jpg" alt="Card image cap" />
        <div class="card-body">
          <router-link to="/module/medientechnologien"><h5 class="card-title" id="medtech">Medientechnologien</h5></router-link>
          <p
            class="card-text"
          >This card has supporting text below as a natural lead-in to additional content.</p>
          <p class="card-text">
            <small class="text-muted">Last updated 3 mins ago</small>
          </p>
        </div>
      </div>
      <div class="card">
        <img class="card-img-top" src="@/assets/img/pic.jpg" alt="Card image cap" />
        <div class="card-body">
          <router-link to="/module/verteilte-systeme"><h5 class="card-title" id="mathe1">Verteilte Systeme</h5></router-link>
          <p
            class="card-text"
          >This card has supporting text below as a natural lead-in to additional content.</p>
          <p class="card-text">
            <small class="text-muted">Last updated 3 mins ago</small>
          </p>
        </div>
      </div>
      <div class="card">
        <img class="card-img-top" src="@/assets/img/pic.jpg" alt="Card image cap" />
        <div class="card-body">
          <router-link to="/module/webeng1"><h5 class="card-title" id="prog2">Web Engineering I</h5></router-link>
          <p
            class="card-text"
          >This card has supporting text below as a natural lead-in to additional content.</p>
          <p class="card-text">
            <small class="text-muted">Last updated 3 mins ago</small>
          </p>
        </div>
      </div>

      <!-- 4.semter-->

      <div class="card">
        <img class="card-img-top" src="@/assets/img/pic.jpg" alt="Card image cap" />
        <div class="card-body">
          <router-link to="/module/softwareeng2"><h5 class="card-title" id="prog2">Software Engineering II</h5></router-link>
          <p
            class="card-text"
          >This card has supporting text below as a natural lead-in to additional content.</p>
          <p class="card-text">
            <small class="text-muted">Last updated 3 mins ago</small>
          </p>
        </div>
      </div>
      <div class="card">
        <img class="card-img-top" src="@/assets/img/pic.jpg" alt="Card image cap" />
        <div class="card-body">
          <router-link to="/module/webeng2"><h5 class="card-title" id="prog2">Web Engineering II</h5></router-link>
          <p
            class="card-text"
          >This card has supporting text below as a natural lead-in to additional content.</p>
          <p class="card-text">
            <small class="text-muted">Last updated 3 mins ago</small>
          </p>
        </div>
      </div>
      <div class="card">
        <img class="card-img-top" src="@/assets/img/pic.jpg" alt="Card image cap" />
        <div class="card-body">
          <router-link to="/module/hci"><h5 class="card-title" id="prog2">Human Computer Interaction</h5></router-link>
          <p
            class="card-text"
          >This card has supporting text below as a natural lead-in to additional content.</p>
          <p class="card-text">
            <small class="text-muted">Last updated 3 mins ago</small>
          </p>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import $ from "jquery";

$(document).ready(function() {
  $("#myInput").on("keyup", function() {
    var value = $(this)
      .val()
      .toLowerCase();

    $("div[class^=card]")
      .hide()
      .filter(function() {
        var cardTitle = $(this)
          .find(".card-title")
          .text()
          .toLowerCase();

        return cardTitle.includes(value);
      })
      .show();
  });
});
//
import HomeNav from "./HomeNav";
import Footer from "../Footer";
export default {
  name: "Module",
  components: {
    HomeNav,
    Footer
  }
};
</script>

<style  scoped>
.test {
  padding: 10px;
}

h5:hover, a:hover{
  list-style: none;
  text-decoration: none;
  background: #fffc5e;
}
</style> 
