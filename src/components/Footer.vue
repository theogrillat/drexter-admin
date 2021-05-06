<template>
  <div class="foooter">
    <div class="cont">
      <div class="links">
        <p @click="nav('about')" class="link">Qui sommes-nous ?</p>
        <p @click="nav('CGVU')" class="link">CGVU</p>
        <p @click="nav('RGPD')" class="link">RGPD</p>
        <p @click="nav('mentions')" class="link">Mentions légales</p>
        <p @click="nav('FAQ')" class="link">FAQ</p>
      </div>
      <div class="contactCard">
        <Contact />
      </div>
    </div>
    <div class="cont last">
        <p class="text">© {{year}} Drexter. Tous droits réservés.</p>
    </div>
  </div>
</template>

<script>
import Contact from "./Contact";
export default {
  methods: {
    nav(route) {
      this.$router.replace({ path: route });
    }
  },
  data() {
    return {};
  },
  computed: {
    year() {
      return new Date().getFullYear();
    },
  },
  components: {
    Contact,
  },
};
</script>

<style lang="scss" scoped>
@import "../variables.scss";
.foooter {
  width: 100vw;
  padding: 50px;
  background-color: $dark;
  .cont {
    display: flex;
    justify-content: space-between;
    &.last {
        margin-top: 50px;
        justify-content: center;
    }
    p.text {
        font-size: 13px;
        color: white;
        text-align: center;
    }
    .links {
      text-align: left;
      p.link {
        position: relative;
        left: 15px;
        color: white;
        font-weight: 700;
        margin-bottom: 5px;
        &::before {
          content: "";
          position: absolute;
          top: 10px;
          left: -15px;
          height: 5px;
          width: 5px;
          border-radius: 5px;
          background-color: white;
        }
      }
    }
    .contactCard {
      width: fit-content;
      background-color: $light;
      border-radius: 25px;
      padding: 20px;
      color: white;
      box-shadow: 0px 6px 17px -5px rgba(0, 0, 0, 0.25);
    }
  }
}
</style>