<template>
    <div class="ui card product">

        <div class="image">
            <img v-if="product.image && product.image.length > 0" :src="API_URL + product.image[0].url"
                :alt="product.name" />
        </div>
        <div class="content">
            <div class="header">{{ product.name }}</div>
            <div class="description">$ {{ product.price }}</div>
        </div>
        <div class="ui button"  @click="addProductCart(product.id)"> Comprar</div>
    </div>

</template>

<script>
import { API_URL } from '@/utils/constants'; 
import {addProductCartApi} from "../api/cart";

export default {
    name: "Product",
    props: {
        product: Object,
    },
    setup(props) {
        //  console.log(props.product)

        const addProductCart =(idProduct) =>{
            addProductCartApi(idProduct)
        }
        return {
            API_URL,
            addProductCart,
        }
    }
}
</script>

<style lang="scss" scoped>
.product {
    &:hover {
        .ui.button {
            min-height: 26px;
        }

    }

    .ui.button {
        max-height: 0;
        min-height: 0;
        overflow: hidden;
        padding: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: min-height 0.06s ease;
        background-color: #FF0000;
    }
}
</style>