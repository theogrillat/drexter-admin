<template>
  <div class="card" v-bind:class="{ desactive: isDesact }">
    <h1 class="cardTitle">{{ title }}</h1>
    <div class="subcard">
      <div>
        <p class="sub">{{ subtitle }}</p>
        <p class="desc">{{ text }}</p>
      </div>
      <div v-if="isDesact" class="soonW">
        <p class="soon">Bientôt dispo !</p>
      </div>
      <button v-else @click="nav" class="button btn">
        <p>Choisir</p>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: "ERROR",
      required: true,
    },
    subtitle: {
      type: String,
      default: "ERROR",
      required: true,
    },
    text: {
      type: String,
      default: "ERROR",
      required: true,
    },
    isDesact: {
      type: Boolean,
      default: true,
      required: false,
    },
    route: {
      type: String,
      default: undefined,
      required: false,
    },
  },
  data() {
    return {};
  },
  methods: {
    nav() {
      this.$emit("nav");
    },
  },
};
</script>

<style scoped lang="scss">
@import "../variables.scss";

.card {
  margin: 10px;
  width: 420px;
  background: $base;
  box-shadow: 0px 6px 17px -5px rgba(0, 0, 0, 0.25);
  border-radius: 20px;
  padding: 10px;
  padding-top: 15px;
  transition: all 300ms;
  &:hover {
    transform: translateY(-7px) scale(1.01);
    box-shadow: 0px 13px 17px -5px rgba(0, 0, 0, 0.35);
  }
  &.desactive {
    background: $dark;
  }
  h1.cardTitle {
    font-family: Montserrat;
    font-style: normal;
    font-weight: 700;
    font-size: 28px;
    text-align: center;
    margin-bottom: 15px;
    color: #ffffff;
  }
  .subcard {
    background: #ffffff;
    box-shadow: 0px 4px 24px -5px rgba(0, 0, 0, 0.25);
    border-radius: 11px;
    padding: 30px;
    width: 100%;
    height: 250px;
    text-align: left;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    p.sub {
      font-family: Montserrat;
      font-style: normal;
      font-weight: bold;
      font-size: 16px;
      line-height: 20px;
      letter-spacing: 0.2px;
      color: $text;
      margin-bottom: 10px;
    }
    p.desc {
      font-family: Quicksand;
      font-style: normal;
      font-weight: 500;
      font-size: 15px;
      line-height: 15px;
      letter-spacing: 0.2px;

      color: $text;
    }
    button.button.btn {
      display: block;
      margin: auto;
      height: 45px;
      margin-top: 30px;
    }
    .soonW {
      height: 45px;
      margin-top: 30px;
      p.soon {
        font-family: Quicksand;
        font-style: normal;
        font-weight: bold;
        font-size: 15px;
        line-height: 19px;
        letter-spacing: 0.2px;
        color: $disabled;
        text-align: center;
      }
    }
  }
}
</style>