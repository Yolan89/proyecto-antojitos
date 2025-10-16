<template>
  <BasicLayout>
   <div class="ui grid stackable doubling">
  <div 
    v-for="product in products" 
    :key="product.id" 
    class="sixteen wide mobile eight wide tablet four wide computer column"
  >
    <Product :product="product" />
  </div>
</div>
  </BasicLayout>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router'
import BasicLayout from '@/layouts/BasicLayout.vue';
import Product from '@/components/Product.vue';
import { getProductsCategory } from '../api/product'

export default {
  name: "Category",
  components: {
    BasicLayout,
    Product,
  },
  watch: {
    $route(to, from) {
      this.getProducts(to.params.category)
    }
  },
  setup() {
    let products = ref([]);
    const { params } = useRoute();

    onMounted(() => {
      getProducts(params.category);

    });

    const getProducts = async (category) => {
      const response = await getProductsCategory(category)
      products.value = response.data;
      console.log(response);
    }
    return { 
      getProducts, 
      products, 
    };
  },

};
</script>

<style></style>