<template>
  <div>
    <div class="basic-layout">
    <Menu />
     <div class="ui container">
      <slot/>
     </div>
  </div>
  <Cart />
  </div>
</template>

<script>
import Menu from  "../components/Menu.vue";
import Cart from "@/components/Cart/Cart.vue";
export default {
name:"BasicLayout",
  components: {
    Menu,
    Cart,
  },
};
</script>

<style>

/*body{
  padding:50px;
}*/

body, h1, h2, h3, h4, h5, h6, p, span, div, a {
  font-family: 'Abel', sans-serif !important;
  font-weight: 400;
  font-style: normal;
}
.ui.grid > .column {
  padding: 0.5rem !important;
}

</style>