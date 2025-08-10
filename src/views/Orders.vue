<template>
  <BasicLayout>
    <h1>Mis pedidos</h1>
    <h3 v-if="!orders">No tienes pedidos</h3>

    <template v-if="orders">
      <div class="order" v-for="order in orders" :key="order.id">
        <div class="header">
          <span class="date">{{ formatDate(order.createdAt) }}</span>
          <p>ID: {{order.id}}</p>
          <p>Total: ${{order.totalPayment}}</p>
        </div>
        <div class="products">
            <div class="product" v-for="product in order.orderDetails " :key="product.id">
             <div>
                <!-- <p>order.data: {{order.orderDetails}}</p> -->
                <p>{{product.name}}</p>
             </div>
             <div>
                {{product.quantity}} x ${{product.price}}
             </div>
            </div>
        </div>
      </div>
    </template>
  </BasicLayout>
</template>

<script>
import { ref, onMounted } from "vue";
import BasicLayout from "../layouts/BasicLayout.vue";
import { getOrders } from "../api/order";
import { getTokenApi } from "../api/token";
import { jwtDecode } from "jwt-decode";
import {API_URL} from "../utils/constants";
export default {
  name: "Orders",
  components: {
    BasicLayout,
  },

  setup() {
    function formatDate(date) {
      if (!date) return "Sin fecha";
      return new Date(date).toLocaleDateString("es-MX", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });

      
    }

    
    //   console.log(formatDate());

    let orders = ref([]);
    onMounted(async () => {
      const token = getTokenApi();
      const { id } = jwtDecode(token);
      const response = await getOrders(id);
      console.log(response);

      orders.value = response.data

    
      
    });

    return {
      orders,
      formatDate,
      API_URL,
    };
  },
};
</script>

<style lang="scss" scoped>
.order{
    border: 1px solid #000;
    margin-bottom: 20px;
    margin-top: 40px;

    .header{
        position: relative;
        display: flex;
        align-items: center;
        justify-content:space-between;
        padding: 10px;

        p{
            margin: 0;
        }
        span{
            position: absolute;
            top: -20px;
            left: 0;
            font-size: 12px;
        }
    }

    .products{
        border-top:1px solid #000;
    }
    .product{
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 5px;
    }
}
</style>