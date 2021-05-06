<template>
  <div>
    <section class="one">
      <div class="content-w">
        <div class="content">
          <h1>Vous en avez assez de :</h1>
          <div class="desc">
            <p class="subdesc">Vous ruiner en amendes incessantes</p>
            <p class="subdesc">Perdre vos points de permis</p>
            <p class="subdesc">
              Payer pour des infractions absolument pas dangereuses
            </p>
            <p class="subdesc">
              Perdre un temps fou en tracasseries administratives
            </p>
          </div>
          <p class="para">
              Nous écrivons en votre nom à l’Administration pour <span>contester votre
              amende</span> en vue la faire <span>annuler</span>.<br><br><i><span class="underline">Attention</span> : payer son amende
              revient à en reconnaître la validité et entraîne automatiquement
              la perte des points de permis.</i><br><br>Nous traitons tous les types de
              contraventions de la <span>classe 1 à la classe 4</span>, à partir des amendes
              <span>à 11 €</span>, mais ne traitons pas pour l’instant les FPS (Forfait Post
              Stationnement).<br>Nous vous faisons connaître notre acceptation de
              votre dossier sous <span>12 heures ouvrées</span>,<br>et une fois accepté, nous le
              traitons en <span>6 jours ouvrés.</span><br><br>Vous reporter aux FAQ Contestation
              amendes pour plus de réponses à vos questions
            </p>
          <button v-if="loggedIn" @click="startProcess" class="button btn">
            <p>C'est partie</p>
          </button>
          <button v-else @click="nav('Login')" class="button btn">
            <p>S'inscrire</p>
          </button>
        </div>
      </div>
    </section>
    <Footer />
  </div>
</template>

<script>
import Footer from "../components/Footer";
import { firebase } from "../firebase";
export default {
  components: {
    Footer,
  },
  methods: {
    nav(route) {
      this.$router.replace({ path: route });
    },
    startProcess() {
      this.nav('constestation-first');
    },
  },
  asyncComputed: {
    async loggedIn() {
      const user = await firebase.getCurrentUser();
      console.log(user);
      return user != null ? true : false;
    },
  },
};
</script>

<style lang="scss" scoped>
section.one {
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-repeat: no-repeat;
  background-size: cover;
  background-image: url("https://firebasestorage.googleapis.com/v0/b/drexter-f23c0.appspot.com/o/banner-squashed.jpg?alt=media&token=f333d561-217a-4019-9127-e4f6f31ad8e4");
  .content-w {
    height: 100%;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.4);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .content {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      h1 {
        font-family: Montserrat;
        font-style: normal;
        font-weight: bold;
        font-size: 50px;
        line-height: 61px;
        text-align: center;
        letter-spacing: 0.2px;
        color: #ffffff;
        text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
      }
      .desc {
        margin-bottom: 50px;
      }
      p.subdesc-title {
        color: white;
        font-weight: bolder;
        text-align: left;
        font-family: Montserrat;
        font-size: 25px;
        margin-top: 30px;
      }
      p.subdesc {
        margin: 0px;
        color: white;
        font-weight: bold;
        text-align: left;
        position: relative;
        font-size: 20px;
        &::before {
          content: "";
          position: absolute;
          left: -20px;
          top: 8px;
          height: 10px;
          width: 10px;
          background: white;
          border-radius: 100%;
        }
      }
      p.para {
        margin-top: 20px;
        margin-bottom: 60px;
        color: white;
        font-weight: 500;
        text-align: center;
        font-size: 18px;
        max-width: 1100px;
        span {
          font-weight: bolder;
          &.underline {
            text-decoration: underline;
          }
        }
      }
    }
  }
}
</style>