<template>
  <div>
    <div class="cont">
      <h1 class="title">Qui sommes-nous ?</h1>
      <p>
        Nous sommes une équipe de rédacteurs administratifs expérimentés
        désireux d’apporter notre connaissance approfondie de l’univers kafkaïen
        de l’Administration aux citoyens ordinaires, aux demandeurs de services
        sociaux, aux automobilistes, aux solliciteurs de subventions. Notre
        postulat est que la sollicitation d’une remise de pénalités, d’un
        service social, d’une aide ou d’une subvention, parfaitement légitime,
        ou la contestation d’un Pv, parfaitement légale, ne doit pas être
        réservée à une élite. Nous étudions depuis 10 ans tous les textes
        administratifs et les lois votées par le Parlement concernant ces
        questions, et avons constitué une bibliothèque exhaustive des
        jurisprudences en la matière, que nous enrichissons quotidiennement.
        Nous mettons au service de cette source riche et complexe d’informations
        notre maîtrise du vocabulaire précis et de la syntaxe scrupuleuse des
        formulations de la langue administrative, ce qui nous permet d’offrir ce
        service à tous avec un taux de réussite exceptionnel. Nous n’acceptons
        jamais un dossier qu’avec la certitude de le faire aboutir avec succès.
        Enfin, la taille de notre structure nous autorise à avoir une réactivité
        hors-norme, et à pratiquer des tarifs de 5 à 8 fois inférieurs à ceux
        d’un cabinet d’avocats.
      </p>
    </div>
    <Footer />
  </div>
</template>

<script>
import Footer from "../components/Footer";
export default {
  components: {
    Footer,
  },
};
</script>

<style lang="scss" scoped>
.cont {
  margin: auto;
  height: 100vh;
  max-width: 1440px;
  padding-bottom: 100px;
  padding-top: 140px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: justify;
  h1.title {
    margin-top: 30px;
    margin-bottom: 80px;
    font-family: Montserrat;
    font-weight: 700;
  }
}
</style>