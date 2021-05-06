<template>
  <div class="wrapper" v-bind:class="{isHidden: currentRoute == 'Login'}">
    <div class="navContainer">
      <div class="navbarGroup left">
        <img class="logo" src="../assets/logo.png" alt="logo">
      </div>
      <div class="navbarGroup center">
        <div v-bind:class="{actv: currentRoute == 'Home'}" @click="nav('Home')" class="navlink">
          <p>Dashboard</p>
        </div>
        <!-- <div v-bind:class="{actv: currentRoute == 'Constestation'}" @click="nav('Constestation')" class="navlink">
          <p>Annulation de PV</p>
          <p class="sub">Récuperation de points</p>
        </div>
        <div v-bind:class="{actv: currentRoute == 'Remise'}" @click="nav('Remise')" class="navlink">
          <p>Remises</p>
          <p class="sub">de pénalités</p>
        </div>
        <div v-bind:class="{actv: currentRoute == 'Sollicitations'}" @click="nav('Sollicitations')" class="navlink">
          <p>Sollicitations</p>
          <p class="sub">de services sociaux</p>
        </div>
        <div v-bind:class="{actv: currentRoute == 'Aides'}" @click="nav('Aides')" class="navlink">
          <p>Aides & Subventions</p>
          <p class="sub">région - france - europe</p>
        </div>
        <div v-bind:class="{actv: currentRoute == 'Tarifs'}" @click="nav('Tarifs')" class="navlink">
          <p>Tarifs</p>
        </div> -->
      </div>
      <!-- <div class="navbarGroup right">
        <div v-bind:class="{actv: currentRoute == 'Profile' || currentRoute == 'Login'}" @click="nav('Profile')" class="iconLink">
          <img
            src="https://firebasestorage.googleapis.com/v0/b/drexter-f23c0.appspot.com/o/account.svg?alt=media&token=cf5274e9-f38e-4aae-9a05-c807aee14a57"
            alt="account icon"
          />
        </div>
      </div> -->
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  computed: {
    currentRoute() {
      return this.$store.state.activePage;
    }
  },
  methods: {
    nav(route) {
      this.$router.push({ name: route });
    },
  },
};
</script>

<style scoped lang="scss">

@import "../variables.scss";

.wrapper {
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100vw;
  padding: 10px;
  z-index: 2999;
  transition: all 300ms;
  &.isHidden {
    top: -164px;
  }
  .navContainer {
    height: 84px;
    width: 100%;
    padding-left: 40px;
    padding-right: 20px;
    background: $base;
    box-shadow: 0px 6px 14px rgba(0, 0, 0, 0.15);
    border-radius: 20px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    color: #ffffff;
    .navbarGroup {
      display: flex;
      flex-direction: row;
      align-items: center;
      height: 100%;
      &.left,
      &.right {
        width: 230px;
      }
      &.left {
        img.logo {
          width: 200px;
        }
      }
      &.center {
        // text-transform: capitalize;
        font-style: normal;
        font-weight: bold;
        .navlink {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100%;
          padding-left: 25px;
          padding-right: 25px;
          user-select: none;
          p {
            font-size: 15px;
            margin: 0px;
            line-height: 16px;
          }
          p.sub {
            font-weight: normal;
            text-transform: uppercase;
            font-size: 12px;
          }
          cursor: pointer;
          transition: all 50ms;
          &:hover {
            background-color: $light;
          }
          &.actv {
            background-color: $light;
          }
        }
      }
      &.right {
        justify-content: flex-end;
        .iconLink {
          display: flex;
          align-items: center;
          height: 100%;
          padding-right: 20px;
          padding-left: 20px;
          user-select: none;
          cursor: pointer;
          &:hover {
            background-color: $light;
          }
          &.actv {
            background-color: $light;
          }
        }
      }
    }
  }
}
</style>