<template>
  <BasicLayout>
    <h1>Ultimos Productos</h1>
    <div class="ui grid">
      <!-- responsibe se realiza con los estilos de sematic -->
      <div class="sixten wide mobile eigth wide tablet four wide computer column"
       v-for="product in products"
        :key="product.id">

        <Product :product="product" />
      </div>
    </div>
  </BasicLayout>
</template>

<script>
import { ref, onMounted } from "vue";
import BasicLayout from "../layouts/BasicLayout.vue";
import { getProducts } from "../api/product";
import Product from "../components/Product.vue"

export default {
  name: "Home",
  components: {
    BasicLayout,
    Product,

  },
  setup() {
    let products = ref([]);

    onMounted(async () => {
      const response = await getProducts(20) //se pide los productos que necesitamos
      // console.log(response);
      products.value = response.data;


    });

    return {
      products,
    }

  },
};
</script>
