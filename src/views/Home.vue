<template>
  <div class="landing">
    <section class="one">
      <div class="content-w">
        <div class="content">
          <h1>La Loi en votre faveur !</h1>
          <p class="subdesc-title">
            Drexter écrit pour vous à l’Administration afin d’obtenir:
          </p>
          <div class="desc">
            <p class="subdesc">L’annulation de vos amendes</p>
            <p class="subdesc">La récupération de vos points de permis</p>
            <p class="subdesc">La remise gracieuse de vos pénalités</p>
            <p class="subdesc">une prestation sociale</p>
            <p class="subdesc">une aide ou subvention</p>
          </div>
          <button @click="nav('Constestation')" class="button btn">
            <p>C'est partie</p>
          </button>
        </div>
      </div>
    </section>
    <section class="two">
      <div class="cardGrid">
        <Card
          @nav="nav('constestation')"
          :isDesact="false"
          route="amendes"
          title="Amende & Points"
          subtitle="Annulation de PV – Récupération de points"
          text="Nous contestons votre amende auprès de l’Administrations en vue de la faire annuler. 80% des dossiers acceptés – Réponse sous 12 heures – Traitement sous 6 jours."
        />
        <Card
          :isDesact="true"
          title="Pénalités"
          subtitle="Remise de Pénalités"
          text="Nous écrivons à l’Administration en votre nom pour solliciter une remise gracieuse de vos pénalités."
        />
        <Card
          :isDesact="true"
          title="Services sociaux"
          subtitle="Sollicitation de Services sociaux"
          text="Nous sollicitons auprès des Administrations concernées une place en crèche, un Hlm, une place en Ephad, une allocation…"
        />
        <Card
          :isDesact="true"
          title="Aides & Subventions"
          subtitle="Aides et subventions aux entreprises"
          text="Nous vous fournissons une synthèse organisée et classée de la liste des 5637 subventions que vous pouvez obtenir à titre de particulier ou d’entreprise auprès des diverses institutions régionales, nationale ou européenne."
        />
      </div>
    </section>
    <section class="three">
      <p class="title">On s'occupe de tout !</p>
      <p class="subtitle">c'est tellement simple.</p>
      <Sep :paddingT="50" :paddingB="50"/>
      <div class="reassurances">
        <div class="item">
          <img
            src="../assets/stopwatch.png"
            alt="stopwatch icon"
            class="icon"
          />
          <p class="title">C’est Rapide.</p>
          <p class="desc">
            Quelques minutes suffisent pour vous inscrire sur la platforme et
            télécharger vos pièces
          </p>
        </div>
        <div class="item">
          <img src="../assets/law.png" alt="law icon" class="icon" />
          <p class="title">Parfaitement Legal.</p>
          <p class="desc">
            La contestation d’un PV est parfaitement légal. Nous détectons les
            vices de forme pour annuler votre amende et récuperer vos points.
          </p>
        </div>
        <div class="item">
          <img
            src="../assets/checklist.png"
            alt="checklist icon"
            class="icon"
          />
          <p class="title">Et Optimal.</p>
          <p class="desc">
            Nous acceptons 93% des demandes PV et 100% des autres demandes.
          </p>
        </div>
      </div>
    </section>
    <Footer/>
  </div>
</template>

<script>
import Card from "@/components/Card.vue";
import Sep from "@/components/Sep.vue";
import Footer from '@/components/Footer.vue';
export default {
  components: {
    Card,
    Sep,
    Footer,
  },
  methods: {
    nav(route) {
      this.$router.replace({ path: route });
    },
  },
};
</script>

<style scoped lang="scss">

@import '../variables.scss';

section.one {
  height: 90vh;
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
      position: relative;
      top: -80px;
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
    }
  }
}
section.two {
  position: relative;
  top: -200px;
  .cardGrid {
    display: grid;
    grid-template-columns: repeat(2, auto);
    grid-template-rows: repeat(2, auto);
    justify-content: center;
  }
}
section.three {
  position: relative;
  top: -100px;
  padding-top: 80px;
  padding-bottom: 80px;
  background-color: $veryLight;
  p.title {
    font-family: Montserrat;
    font-style: normal;
    font-weight: bold;
    font-size: 50px;
  }
  p.subtitle {
    font-family: Quicksand;
    font-style: normal;
    font-weight: normal;
    font-size: 15px;
  }
  .reassurances {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: flex-start;
    .item {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: flex-start;
      width: 300px;
      text-align: left;
      margin: 30px;
      img.icon {
        width: 40px;
        height: 40px;
      }
      p.title {
        font-family: Montserrat;
        font-style: normal;
        font-weight: bold;
        font-size: 16px;
        margin-top: 10px;
        margin-bottom: 10px;
      }
      p.desc {
        font-family: Quicksand;
        font-style: normal;
        font-weight: normal;
        font-size: 15px;
        // line-height: 15px;
      }
    }
  }
}
</style>
