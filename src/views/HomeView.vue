<template>
  <BasicLayout>
    <div class="banner">
      <h1>Antojitos Ofe</h1>
      <img src="../assets/ajochile.jpg" alt="banner" />
    </div>
    <h2>Ultimos Productos</h2>
    <div class="ui grid">
      <!-- responsibe se realiza con los estilos de sematic -->
      <div
        class="sixten wide mobile eigth wide tablet four wide computer column"
        v-for="product in products"
        :key="product.id"
      >
        <Product :product="product" />
      </div>
    </div>

    <div class="info">
      <h2>ofrecemos</h2>
      <h3>Desayunos</h3>
      <h3>Comidas</h3>
      <h3>Antojitos</h3>
    </div>

    <div class="ubicación">
      <h4>ubicación</h4>
      <p>Bellavista 5, Casa Blanca, Iztapalapa, 09860 Ciudad de México, CDMX</p>
      <p>GOOGLE MAPS</p>
    </div>
    <div.contacUs>
      <h4>Contactanos</h4>
      <p>T.5523674538</p>
      <img class="ui big image" src="../assets/whatsapp.png" alt="icon" />
    </div.contacUs>
  </BasicLayout>
</template>

<script>
import { ref, onMounted } from "vue";
import BasicLayout from "../layouts/BasicLayout.vue";
import { getProducts } from "../api/product";
import Product from "../components/Product.vue";

export default {
  name: "Home",
  components: {
    BasicLayout,
    Product,
  },
  setup() {
    let products = ref([]);

    onMounted(async () => {
      const response = await getProducts(20); //se pide los productos que necesitamos
      // console.log(response);
      products.value = response.data;
    });

    return {
      products,
    };
  },
};
</script>

<style lang="scss" scoped>
.banner {
  // background-position: center;
  // background-size: cover;
  // background-repeat: no-repeat;
  // text-align: center;
  // text-shadow: 0px 0px 2px rgba(77, 70, 70, 0.6);
  width: 100%;
  height: 500px;
  overflow: hidden;
  position: relative;

  .ui big image {
    width: 100%;
    height: 400px;
  }
}
</style>