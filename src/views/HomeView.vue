<template>
  <BasicLayout>
    <div class="banner">
      <img src="../assets/ajochile.jpg" alt="banner" />
      <h1>Antojitos Ofe</h1>
    </div>

    <h2>Últimos Productos</h2>
    <div class="ui grid">
      <!-- responsibe se realiza con los estilos de sematic -->
      <div
        class="sixteen wide mobile eighth wide tablet four wide computer column"
        v-for="product in products"
        :key="product.id"
      >
        <Product :product="product" />
      </div>
    </div>

    <div>
     <h2>Ofrecemos</h2>
    </div>

    <div class="info">
      <h3>Desayunos</h3>
      <h3>Comidas</h3>
      <h3>Antojitos</h3>
    </div>

    <div class="ubicacion">
      <h3>ubicación</h3>
      <p>Bellavista 5, Casa Blanca, Iztapalapa, 09860 Ciudad de México, CDMX</p>

      <p>
      <a href="https://www.google.com/maps/place/Bellavista+5,+Casa+Blanca,+Iztapalapa,+09860+Ciudad+de+M%C3%A9xico,+CDMX/@19.3306936,-99.0704631,17z/data=!3m1!4b1!4m6!3m5!1s0x85ce027aab46a2fd:0x8f46fd41316717eb!8m2!3d19.3306886!4d-99.0678882!16s%2Fg%2F11rg5_mypw?entry=ttu&g_ep=EgoyMDI1MDgwNi4wIKXMDSoASAFQAw%3D%3D" target="_blank" rel="noopener noreferrer">
      GOOGLE MAPS
      </a>
      </p>
    </div>
    <div class="contacUs">
      <h3>Contactanos</h3>
      <p>T.5523674538</p>
    </div>

  <div class="footer">
   <img src="../assets/whatsapp.png" alt="icon" />
  </div>
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
      const response = await getProducts(8); //se pide los productos que necesitamos
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

.abel-regular {
  font-family: "Abel", sans-serif;
  font-weight: 400;
  font-style: normal;
}

.banner {
  width: 100%;
  height: 500px;
  position: relative;
  display: flex;            
  justify-content: center;   
  align-items: center;  
  overflow: hidden;  


 img{
  position: absolute;
  top: 0;
  let: 0;
  width: 100%;       
  height: 100%;       
  object-fit: cover;  
  object-position: center; 
  z-index: 0;
 }

 h1{
  z-index: 1; 
  color: white;           
  font-size: 4rem;          
  text-shadow: 0px 0px 2px rgba(77, 70, 70, 0.6);
  margin: 0;
}
}

h2{
  padding-top: 30px;
  padding-bottom: 30px;
  justify-self: center;
  }
.info{
  display: flex;
  justify-content: space-between;
  }

  .info h3{
  margin: 0;
}
.ubicacion{
  display: block;
}
.ubicacion h3{
  padding-top: 30px;
  padding-bottom:20px;
  justify-self:center;
}

.ubicacion p{
  padding-top: 10px;
  padding-bottom:10px;
  justify-self:center;
}

.ubicacion a{

}

.contacUs{
  display: block;
}
.contacUs h3{
  padding-top: 30px;
  padding-bottom:20px;
  justify-self:center;
}
.contacUs p{
  padding-top: 10px;
  padding-bottom:10px;
  justify-self:center;
}


::v-deep(.footer) {
  background-color: #FF0000;
  width: 100vw; 
  height: 70px;
  margin: 0;
  padding: 0 20px; /* un poco de espacio lateral */
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  
  display: flex;            
  justify-content: flex-end;
  align-items: center;    
}

.footer img {
  width: 50px;
  height: 50px;
}

</style>