<template>
  <div class="cart-body" v-if="products">
    <div class="product" v-for="product in products" :key="product.id">

      <img v-if="product.image?.[0]" class="ui image fluid" :src="API_URL + product.image[0]?.url"
        :alt="product.name" />
      <div class="info">
        <p>{{ product.name }}</p>
        <div class="price">
          <p>{{ product.price }} $</p>
         <div class="quantity">
          <button class="ui button" size="large" @click.stop="increaseProductCart(product.id)">+</button>
          <p> {{ product.quantity }}</p>
          <button class="ui button " size="large"  @click.stop="decreaseProductCart(product.id)">-</button>
          </div>
         </div> 
        </div>
      

    </div>
  </div>
</template>

<script>
import {addProductCartApi, delateProductCartApi} from "../../api/cart"
import {API_URL} from "../../utils/constants"


export default {
name: "CartBody",
props:{
   products: Array, 
   reloadCartFunction: Function,
},
setup(props){

  const increaseProductCart = (id) =>{
  addProductCartApi(id);
  props.reloadCartFunction();

  
  };

  const decreaseProductCart = (id) => {
    delateProductCartApi(id)
    props.reloadCartFunction();
  }


  return{
    API_URL,
    increaseProductCart,
    decreaseProductCart,

  }
},
};
</script>

<style lang="scss" scoped>
 .cart-body{
  padding: 20px 10px;
  overflow-y: scroll;
  height: calc(100vh - 50px - 90px);

  &::-webkit-scrollbar {
    display: none;
  }
  .product {
    display: flex;

    .ui.image.fluid{
     width: 100px !important;
    
    }
  }
    .info{
      display: flex;
      padding: 10px;
      flex-direction: column;
      justify-content: center;
      width: 100%;
      height: 100%;
    }
    .price {
      display: flex;
      justify-content: space-between;
      

      p{
        margin: 0;
      }
    }
    .quantity{
      display: flex;
      align-items: center;

      p{
        margin: 0 10px;
    }
    button{
      padding: 5px 10px;
      background-color: #FF0000;
    }
  }
 }


</style>