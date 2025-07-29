import { unionBy, countBy, uniqBy } from "lodash";
import { API_URL, PRODUCTS } from "../utils/constants";



export function addProductCartApi(idProduct) {
  // console.log(getCartApi());
  const products = getCartApi();
  products.push(idProduct);

  localStorage.setItem(PRODUCTS, JSON.stringify(products));
}

export function getCartApi() {
  const products = localStorage.getItem(PRODUCTS);

  if (!products) return [];

  return JSON.parse(products);
}

export async function getProductsCartApi() {
  const idProducts = getCartApi();

  if (idProducts.length === 0) return null;

  try {
    const products = [];
    for await (const idProduct of idProducts) {
      const response = await fetch(`${API_URL}/api/products?filters[id][$eq]=${idProduct}&populate=*`)

      const result = await response.json();
      const product = result.data?.[0];
      // console.log("resultado; ", result);
      

      if(!product){
        console.warn(`Producto con ID ${idProduct} no encontrado`);
        continue;
        
      }
      products.push(product);
    }  
    
    const productsCount = countBy(products,(product) => {
    return product.name;
    });

    

    const combined = uniqBy(products, (product) =>{
      const productTemp = product;
      productTemp.quantity = productsCount[product.name];
      return productTemp.name;
    })
    
  //  console.log(combined);
   
  return combined
   

  } catch (error) {
    console.log(error);
    return null;
  }
}

export function delateProductCartApi(idProduct){
 const products = getCartApi();

 const index = products.indexOf(idProduct);
 if(index > -1) products.splice(index, 1)

  localStorage.setItem(PRODUCTS, JSON.stringify(products));
}

export function deleteAllProductCartApi(idProduct){
 const products = getCartApi();

 const index = products.indexOf(idProduct);

 if(index > - 1){
  products.splice(index,1);
  localStorage.setItem(PRODUCTS, JSON.stringify(products));
  deleteAllProductCartApi(idProduct);
}
}

export function deleteCartApi(){
  localStorage.removeItem(PRODUCTS);
}
