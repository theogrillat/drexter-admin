<template>
  <div class="page">
    <div class="cont">
      <Pending type="remises" />
    </div>
    <Footer />
  </div>
</template>

<script>
import Pending from "../components/Pending";
import Footer from "../components/Footer";
export default {
  components: {
    Pending,
    Footer,
  },
};
</script>

<style lang="scss" scoped>
.cont {
  height: 100vh;
}
</style>