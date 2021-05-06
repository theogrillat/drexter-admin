<template>
  <div class="sep" v-bind:style="{ paddingTop: paddingT + 'px', paddingBottom: paddingB + 'px',}">
      <div class="bar"></div>
      <div class="dot"></div>
  </div>
</template>

<script>
export default {
  props: {
    paddingT: { 
      type: Number,
      default: 0,
      required: false
    },
    paddingB: { 
      type: Number,
      default: 0,
      required: false
    },
  },

}
</script>

<style scoped lang="scss">

@import "../variables.scss";

$h: 5px;

.sep {
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: center;
    * {
        border-radius: 1000px;
        background: $lightGrad;
    }
    .bar {
        height: $h;
        width: 150px;
        margin-right: 3px;
    }
    .dot {
        height: $h;
        width: $h;
        margin-left: 3px;
        background: $light;
    }
}

</style>