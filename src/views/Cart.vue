<template>
  <BasicLayout>
    <h1>Resumen del pedido</h1>
    <table
      class="ui celled stackable striped unstackable responsive table"
      v-if="products"
    >
      <thead>
        <tr>
          <th>Producto</th>
          <th>Cantidad</th>
          <th>Precio</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in products" :key="product.id">
          <td>{{ product.name }}</td>
          <td>{{ product.quantity }}</td>
          <td>$ {{ product.price }}</td>
          <td style="text-align: center">
            <i
              class="trash icon"
              style="color: #ff0000; cursor: pointer"
              @click="deleteAllProductCart(product.id)"
            ></i>
          </td>
        </tr>
        <tr>
          <td></td>
          <td>Total:</td>
          <td colspan="2">${{ getTotal() }}</td>
        </tr>
      </tbody>
    </table>

    <button
      class="ui button fluid"
      @click="createOrder"
      style="background:#ff0000 "
      v-if="products"
    >
      Generar pedido
    </button>

    <h3 v-if="!products">No tienes productos en el carrito</h3>
  </BasicLayout>
</template>

<script>
import { ref, watchEffect } from "vue";
import {useRouter} from "vue-router";
import { jwtDecode } from "jwt-decode";
import BasicLayout from "../layouts/BasicLayout";
import { getProductsCartApi, deleteAllProductCartApi, deleteCartApi } from "@/api/cart";
import { createOrderApi } from "../api/order";
import { getTokenApi } from "../api/token";
import { number } from "yup";

export default {
  name: "Cart",
  components: {
    BasicLayout,
  },
  setup() {
    let products = ref([]);
    let realodCart = ref(false);
    const router =useRouter();


    watchEffect(async () => {
      realodCart.value;

      const response = await getProductsCartApi();
      // products.value = response;
      console.log("respuesta del api del carrito", response);

      if (response) {
        products.value = response.data || response;
      } else {
        products.value = [];
      }
    });

    const getTotal = () => {
      let totalTemp = 0;

      products.value.forEach((product) => {
        const price = parseFloat(product.price) || 0;
        const quantity = parseFloat(product.quantity) || 0;

        totalTemp += price * quantity;
      });
      return totalTemp;
    };

    console.log(getTotal());

    const deleteAllProductCart = (idProduct) => {
      deleteAllProductCartApi(idProduct);
      realodCart.value = !realodCart.value;
    };

    const createOrder = async () => {
    //   console.log("createOrder fue llamado");
      const token = getTokenApi();
    //   console.log("token:", token);
      const { id } = jwtDecode(token);
    //   console.log("ID del usuario:", id);

      const data = {
        users_permissions_user: id, 
        totalPayment: Number(getTotal()),
        orderDetails: products.value.map((product) => ({
          id: product.id,
          name: product.name,
          price: product.price,
          quantity: product.quantity,
          image: product.image.id,
        })),
      };

      console.log("Payload a enviar:", data);

      try {
        const response = await createOrderApi(data);
        deleteCartApi();
        router.push("/orders")
        // console.log("Enviando data a la API:", response);
      } catch (error) {
        console.log(error);
      }
    };




    return {
      products,
      getTotal,
      deleteAllProductCart,
      createOrder,
    };
  },
};
</script>

<style lang="scss" scoped>

.btn-order{
 color:#ff0000;
}
</style>