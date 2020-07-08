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
        <img class="card-img-top img-1" src="@/assets/img/undraw_mathematics_4otb.png" alt="Card image cap" />
        <div class="card-body">
          <router-link to="/module/mathe1">
            <h5 class="card-title" id="mathe1">Mathematik I</h5>
          </router-link>
          <p
            class="card-text"
          >Aussagenlogik, Prädikatenlogik, Kombinatorik, Relationen</p>
        </div>
      </div>

      <div class="card">
        <img class="card-img-top" src="@/assets/img/undraw_analyze_17kw.png" alt="Card image cap" />
        <div class="card-body">
          <router-link to="/module/gti">
            <h5 class="card-title" id="gti">Grundlagen der Theoretischen Informatik</h5>
          </router-link>
          <p
            class="card-text"
          >Endliche Automaten, Reguläre Ausdrücke, Grammatiken</p>
        </div>
      </div>

      <div class="card">
        <img class="card-img-top" src="@/assets/img/undraw_designer_life_w96d.png" alt="Card image cap" />
        <div class="card-body">
          <router-link to="/module/mediendesign">
            <h5 class="card-title" id="design">Mediendesign Grundlagen</h5>
          </router-link>
          <p
            class="card-text"
          >Digitale Entwürfe, GUI, Typographie, Layout</p>
        </div>
      </div>

      <div class="card">
        <img class="card-img-top" src="@/assets/img/undraw_growth_analytics_8btt.png" alt="Card image cap" />
        <div class="card-body">
          <router-link to="/module/tgi">
            <h5 class="card-title" id="tgi">Technische Grundlagen der Informatik</h5>
          </router-link>
          <p
            class="card-text"
          >Zahlensysteme, Rechnerhardware, Lokale Grundkonzepte</p>
        </div>
      </div>

      <div class="card">
        <img class="card-img-top img-1" src="@/assets/img/undraw_programming_2svr.png" alt="Card image cap" />
        <div class="card-body">
          <router-link to="/module/prog1">
            <h5 class="card-title" id="prog1">Programmierung I</h5>
          </router-link>
          <p
            class="card-text"
          >Variablen + Datentypen, Anweisungen, Klassen + Objekte</p>
        </div>
      </div>
      <!-- 2.Sem-->
      <div class="card">
        <img class="card-img-top img-1" src="@/assets/img/undraw_mathematics_4otb.png" alt="Card image cap" />
        <div class="card-body">
          <router-link to="/module/mathe2">
            <h5 class="card-title" id="mathe2">Mathematik II</h5>
          </router-link>
          <p
            class="card-text"
          >Lineare Algebra, Elemente der Analysis</p>
        </div>
      </div>
      <div class="card">
        <img class="card-img-top" src="@/assets/img/undraw_setup_analytics_8qkl.png" alt="Card image cap" />
        <div class="card-body">
          <router-link to="/module/algo">
            <h5 class="card-title" id="algo">Algorithmen und Datenstrukturen</h5>
          </router-link>
          <p
            class="card-text"
          >O-Notation, Sortieralgorithmen, Graphen</p>
        </div>
      </div>
      <div class="card">
        <img class="card-img-top" src="@/assets/img/undraw_hacker_mind_6y85.png" alt="Card image cap" />
        <div class="card-body">
          <router-link to="/module/datenbanksysteme">
            <h5 class="card-title" id="db">Datenbanksysteme</h5>
          </router-link>
          <p
            class="card-text"
          >DB-Entwurf, SQL, ER-Modell, Relationenalgebra</p>
        </div>
      </div>
      <div class="card">
        <img class="card-img-top" src="@/assets/img/undraw_programming_2svr.png" alt="Card image cap" />
        <div class="card-body">
          <router-link to="/module/prog2">
            <h5 class="card-title" id="prog2">Programmierung II</h5>
          </router-link>
          <p
            class="card-text"
          >JUnit, Objektsammlungen, Serialisierung, GUI</p>
        </div>
      </div>
      <div class="card">
        <img class="card-img-top" src="@/assets/img/undraw_hacker_mind_6y85.png" alt="Card image cap" />
        <div class="card-body">
          <router-link to="/module/betriebssysteme">
            <h5 class="card-title" id="mathe1">Betriebssysteme</h5>
          </router-link>
          <p
            class="card-text"
          >Unix Shell, Dateisysteme, moderne Skriptsprachen</p>
        </div>
      </div>
      <!-- 3.semter -->
      <div class="card">
        <img class="card-img-top img-1" src="@/assets/img/undraw_software_engineer_lvl5.png" alt="Card image cap" />
        <div class="card-body">
          <router-link to="/module/softwareeng1">
            <h5 class="card-title" id="se1">Software Engineering I</h5>
          </router-link>
          <p
            class="card-text"
          >Pflichtenheft, Geschäftsprozesse, Klassendiagramm</p>
        </div>
      </div>
      <div class="card">
        <img class="card-img-top" src="@/assets/img/undraw_image_focus_wm20.png" alt="Card image cap" />
        <div class="card-body">
          <router-link to="/module/computergrafik">
            <h5 class="card-title" id="cg">Computergrafik Grundlagen</h5>
          </router-link>
          <p
            class="card-text"
          >Vektoren, Licht + Farbe, Kameramodelle</p>
        </div>
      </div>
      <div class="card">
        <img class="card-img-top" src="@/assets/img/undraw_visionary_technology_33jy.png" alt="Card image cap" />
        <div class="card-body">
          <router-link to="/module/medientechnologien">
            <h5 class="card-title" id="medtech">Medientechnologien</h5>
          </router-link>
          <p
            class="card-text"
          >Schallwellen, Messtechnik, Bild- und Videokompression</p>
        </div>
      </div>
      <div class="card">
        <img class="card-img-top" src="@/assets/img/undraw_open_source_1qxw.png" alt="Card image cap" />
        <div class="card-body">
          <router-link to="/module/verteilte-systeme">
            <h5 class="card-title" id="mathe1">Verteilte Systeme</h5>
          </router-link>
          <p
            class="card-text"
          >Architekturen, IP-Protokolle, Sicherheit</p>
        </div>
      </div>
      <div class="card">
        <img class="card-img-top" src="@/assets/img/undraw_static_website_0107.png" alt="Card image cap" />
        <div class="card-body">
          <router-link to="/module/webeng1">
            <h5 class="card-title" id="prog2">Web Engineering I</h5>
          </router-link>
          <p
            class="card-text"
          >HTML + CSS, responsive Gestaltung, JavaScript</p>
        </div>
      </div>

      <!-- 4.semter-->

      <div class="card">
        <img class="card-img-top" src="@/assets/img/undraw_software_engineer_lvl5.png" alt="Card image cap" />
        <div class="card-body">
          <router-link to="/module/softwareeng2">
            <h5 class="card-title" id="prog2">Software Engineering II</h5>
          </router-link>
          <p
            class="card-text"
          >UML, Entwurfsmodelle, Implementierung(OOP)</p>
        </div>
      </div>
      <div class="card">
        <img class="card-img-top img-2" src="@/assets/img/undraw_static_website_0107.png" alt="Card image cap" />
        <div class="card-body">
          <router-link to="/module/webeng2">
            <h5 class="card-title" id="prog2">Web Engineering II</h5>
          </router-link>
          <p
            class="card-text"
          >Client-Server, REST-APIs, Frameworks</p>
        </div>
      </div>
      <div class="card">
        <img class="card-img-top" src="@/assets/img/undraw_Artificial_intelligence_oyxx.png" alt="Card image cap" />
        <div class="card-body">
          <router-link to="/module/hci">
            <h5 class="card-title" id="prog2">Human Computer Interaction</h5>
          </router-link>
          <p
            class="card-text"
          >User Experience, Personas, Evaluationen</p>
        </div>
      </div>
    </div>
    <h3>Coming soon...</h3>
    <img src="/svg/coming-soon.svg" alt="coming-soon" class="img-fluid" />
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

h5:hover,
a:hover {
  list-style: none;
  text-decoration: none;
  background: #fffc5e;
}
.img-fluid{
  width: 22%;
}
h3{
  position: relative;
  font-size: 1.4em;
  text-align: center;
}
.card-img-top{
    width:  350px;
    height: 250px;
    object-fit: cover;
}
</style> 
