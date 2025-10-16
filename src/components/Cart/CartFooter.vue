<template>
  <div class="cart-footer">
    <p>Total: $ {{total}} </p>
    <router-link to="/cart">
     <button class="ui button fluid btn-buy" @click="closeCart">
        Hacer pedido</button>
    </router-link>
  </div>
</template>

<script>
import router from "@/router";
import {ref, watchEffect} from "vue";
export default {
name: "CartFooter",
props:{
   products: Array,
   closeCart: Function,
},
setup(props){
    let total = ref(0);

    watchEffect(() =>{
      

      let totalTemp = 0;
      props.products.forEach((product) => {
       totalTemp += product.price * product.quantity;
      })
      total.value = totalTemp.toFixed(2);
});

    return{
    total,
    };
}
}
</script>

<style lang="scss" scoped>

.cart-footer{
    p{text-align: center;}
    padding: 10px;

    button{
      background-color: #FF0000;
    }
}

</style>