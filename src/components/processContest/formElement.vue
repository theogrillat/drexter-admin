<template>
  <div class="input-w">
    <p class="title">Numero de Pv</p>
    <input
      placeholder="N° de PV"
      id="nbrpv"
      type="text"
      class="input is-large"
      name="nbrpv"
      value
      required
      autofocus
      v-model="vModel"
    />
  </div>
</template>

<script>
export default {
  props: {
      title: String,
      placeholder: String,
      type: String,
      name: String,
      vModel: String
  },

};
</script>

<style lang="scss" scoped>
</style>