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

// export async function getProductsCartApi() {
//   const idProducts = getCartApi();

//   if (idProducts.length === 0) return null;

//   try {
//     const products = [];
//     for await (const idProduct of idProducts) {
//       const response = await fetch(`${API_URL}/api/products?filters[id][$eq]=${idProduct}&populate=image`)

//       const result = await response.json();
//       const product = result.data?.[0];
//       // console.log("resultado; ", result);


//       if(!product){
//         console.warn(`Producto con ID ${idProduct} no encontrado`);
//         continue;

//       }
//       products.push(product);
//     }  

//     const productsCount = countBy(products,(product) => {
//     return product.name;
//     });



//     const combined = uniqBy(products, (product) =>{
//       const productTemp = product;
//       productTemp.quantity = productsCount[product.name];
//       return productTemp.name;
//     })

//   //  console.log(combined);

//   return combined


//   } catch (error) {
//     console.log(error);
//     return null;
//   }
// }

export async function getProductsCartApi() {
  const idProducts = getCartApi();          // [2,2,4,...] (puede haber repetidos)
  if (idProducts.length === 0) return null;

  try {
    // 1) Conteo de cantidades por ID
    const qtyById = countBy(idProducts, (id) => String(id));

    // 2) IDs únicos para no pedir N veces
    const uniqueIds = Object.keys(qtyById); // ['2','4',...]
    const params = new URLSearchParams();

    // filters[id][$in]=2&filters[id][$in]=4 ...
    uniqueIds.forEach((id) => params.append("filters[id][$in]", id));
    params.set("populate", "image");
    params.set("pagination[limit]", String(uniqueIds.length));
    params.set("sort", "createdAt:desc");

    const url = `${API_URL}/api/products?${params.toString()}`;
    const res = await fetch(url);

    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      throw new Error(`HTTP ${res.status} - ${body?.error?.message || "Error"}`);
    }

    const json = await res.json();
    const rawList = Array.isArray(json?.data) ? json.data : [];

    // 3) Normaliza (v5: campos planos; image es OBJETO)
    const byId = new Map(
      rawList.map((p) => {
        const img = p?.image || null;
        const fmts = img?.formats || {};
        const rel =
          fmts.small?.url ||
          fmts.thumbnail?.url ||
          img?.url ||
          null;

        const normalized = {
          id: p.id,
          name: p.name,
          price: p.price,
          // dejamos image original por compatibilidad con tu UI
          image: img || null,
          // y agregamos una URL lista para <img>
          imageUrl: rel ? `${API_URL}${rel}` : null,
        };
        return [String(p.id), normalized];
      })
    );

    // 4) Construye el arreglo final respetando cantidades
    const combined = uniqueIds
      .map((id) => {
        const prod = byId.get(id);
        if (!prod) return null;
        return { ...prod, quantity: qtyById[id] };
      })
      .filter(Boolean);

    return combined; // <- tu carrito ya con quantity e imageUrl

  } catch (error) {
    console.error("getProductsCartApi error:", error);
    return null;
  }
}


export function delateProductCartApi(idProduct) {
  const products = getCartApi();

  const index = products.indexOf(idProduct);
  if (index > -1) products.splice(index, 1)

  localStorage.setItem(PRODUCTS, JSON.stringify(products));
}

export function deleteAllProductCartApi(idProduct) {
  const products = getCartApi();

  const index = products.indexOf(idProduct);

  if (index > - 1) {
    products.splice(index, 1);
    localStorage.setItem(PRODUCTS, JSON.stringify(products));
    deleteAllProductCartApi(idProduct);
  }
}

export function deleteCartApi() {
  localStorage.removeItem(PRODUCTS);
}
