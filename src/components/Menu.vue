<template>
  <div class="ui secondary menu">
    <div class="ui container">

        <div class="left menu">
           <router-link class="item" to="/">
            <img  class="ui small image"
             src="../assets/logo_a.png" alt="ecommerce"/>
             <template v-for="category in categories" :key="category.id">
                <router-link v-if="category && category.slug" class="item" :to="category.slug">
                 {{ category.title }}
                </router-link>
             </template>
           </router-link>
        </div>

        <div class="right menu">
            <router-link class="item" to="/login" v-if="!token">
                Iniciar sesión
            </router-link>
            <template v-if="token"> 
              <router-link class="item" to="/orders"> Pedidos
              </router-link>  
               <span class="ui item cart" @click="openCart">
                <i class="shopping cart icon"></i>
               </span>
               <span class="ui item logout" @click="logout">
                <i class="lock icon"></i>
               </span>
            </template>
        </div>
    </div>
  </div>
</template>

<script>
import {ref, onMounted} from "vue";
import {useStore} from "vuex";
import {getTokenApi, deleteTokenApi} from "../api/token";
import {getCategoriesApi} from "../api/category";
export default {
name: "Menu",
setup(){
    let categories = ref([]);
    const token = getTokenApi();
    const store = useStore();
    
    onMounted(async () => {
        try {
        const response =await getCategoriesApi();
        if (Array.isArray(response.data)) {
          categories.value = response.data;
        //   console.log(response);
          
        } else {
          console.log("No es un arreglo");
        }
            
        } catch (error) {
            console.error('Error al cargar las categorías:', error);
        categories.value = [];
        }
    });
    
    
     const logout = () =>{
      deleteTokenApi();
      location.replace("/");
    };
    
    const openCart = () =>{
      store.commit("setShowCart", true)
    }

    return{
        token,
        logout,
        categories,
        openCart,
    };
},
};
</script>

<style lang="scss" scoped>
.ui.menu.secondary{
    background-color:#FF0000;
    .item{
        color: #fff;
        &:hover{
            color: #000; ;
        }
    }

    .menu.left{
        width: 50%;
        .ui.image{
            width: 60px;
            margin-right: 10px;
        }
    }
    .menu.right{
        width: 50%;
        justify-content: flex-end;

        .logout,
        .cart{
            &:hover{
                cursor:pointer;
                
            }
        }

    }
}

</style>