<template>
  <div id="app">
    <Navbar />
    <transition name="component-fade" mode="out-in">
      <router-view />
    </transition>
  </div>
</template>

<script>
// import {firebase} from "./firebase";
import Navbar from "@/components/Navbar.vue";

// console.log(firebase);
export default {
  components: {
    Navbar,
  },
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Quicksand:wght@300;400;500;600;700&display=swap");
@import "./variables.scss";

#app {
  // font-family: 'Montserrat', sans-serif;
  font-family: "Quicksand", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: $text;
  * {
    box-sizing: border-box;
  }
}

body {
  margin: 0px;
}

html {
  background-color: $warmWhite !important;
}

.page {
  padding-top: 104px;
}

p.link {
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
}

.component-fade-enter-active,
.component-fade-leave-active {
  transition: opacity 300ms ease;
}
.component-fade-enter, .component-fade-leave-to
/* .component-fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.3s ease;
}
// .slide-fade-leave-active {
//   transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
// }
.slide-fade-enter
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(-50px);
  opacity: 0;
}
.slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(50px);
  opacity: 0;
}

.button.btn {
  background: $grad;
  border-radius: 15px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 120px;
  height: 50px;
  border: none;
  * {
    font-family: Quicksand;
    color: white;
    font-style: normal;
    font-weight: bold;
    font-size: 15px;
  }
  &:hover {
    background: $gradHover;
  }
}

input {
  border: 3px solid rgba($color: #000000, $alpha: 0) !important;
  -webkit-box-shadow: none !important;
  box-shadow: none !important;
  background-color: #f5f5f5 !important;
  height: 60px !important;
  transition: all 300ms;
  margin-bottom: 20px !important;
  width: 400px;
  border-radius: 15px !important;
  font-size: 1.5rem;
}

.select select:focus,
.taginput .taginput-container.is-focusable:focus,
.textarea:focus,
.input:focus,
.select select.is-focused,
.taginput .is-focused.taginput-container.is-focusable,
.is-focused.textarea,
.is-focused.input,
.select select:active,
.taginput .taginput-container.is-focusable:active,
.textarea:active,
.input:active,
.select select.is-active,
.taginput .is-active.taginput-container.is-focusable,
.is-active.textarea,
.is-active.input {
  border: 3px solid $base !important;
  -webkit-box-shadow: none !important;
  box-shadow: none !important;
}

/* Change the white to any color */
input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
input:-webkit-autofill:active {
  -webkit-box-shadow: 0 0 0 30px #f5f5f5 inset !important;
  box-shadow: 0 0 0 30px #f5f5f5 inset !important;
  border: none !important;
  &.is-focused,
  &is-active {
    border: 3px solid $base !important;
  }
}

// Import Bulma's core
@import "~bulma/sass/utilities/_all";

// Set your colors
$primary: $base;
$primary-light: findLightColor($primary);
$primary-dark: findDarkColor($primary);
$primary-invert: findColorInvert($primary);
$twitter: #4099ff;
$twitter-invert: findColorInvert($twitter);

// Lists and maps
$custom-colors: null !default;
$custom-shades: null !default;

$steps-marker-default-border: .2em solid #925F64;
$steps-default-color: #925F64;
$steps-maker-default-color: #925F64;
// $steps-active-color: green;
// $steps-previous-color: green;

// Setup $colors to use as bulma classes (e.g. 'is-twitter')
$colors: mergeColorMaps(
  (
    "white": (
      $white,
      $black,
    ),
    "black": (
      $black,
      $white,
    ),
    "light": (
      $light,
      $light-invert,
    ),
    "dark": (
      $dark,
      $dark-invert,
    ),
    "primary": (
      $primary,
      $primary-invert,
      $primary-light,
      $primary-dark,
    ),
    "link": (
      $link,
      $link-invert,
      $link-light,
      $link-dark,
    ),
    "info": (
      $info,
      $info-invert,
      $info-light,
      $info-dark,
    ),
    "success": (
      $success,
      $success-invert,
      $success-light,
      $success-dark,
    ),
    "warning": (
      $warning,
      $warning-invert,
      $warning-light,
      $warning-dark,
    ),
    "danger": (
      $danger,
      $danger-invert,
      $danger-light,
      $danger-dark,
    ),
  ),
  $custom-colors
);

// Links
$link: $primary;
$link-invert: $primary-invert;
$link-focus-border: $primary;

@import "~bulma";
@import "~buefy/src/scss/buefy";

.button {
  border-radius: 15px;
}
</style>
