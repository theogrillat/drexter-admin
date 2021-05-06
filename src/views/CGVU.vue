<template>
  <div>
    <div class="cont">
      <h1 class="title">Page CGVU</h1>
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
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>