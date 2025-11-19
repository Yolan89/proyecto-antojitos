// import { API_URL } from "../utils/constants";

// export async function getProducts(limit = 100) {
//     try {
//         const response = await fetch(
//             `${API_URL}/api/products?pagination[limit]=8&sort=createdAt:desc&populate=image&fields[0]=name&fields[1]=price`


//             // `${API_URL}/api/products?pagination[limit]=${limit}&sort=createdAt:desc&populate=image`
//         );
//         const result = await response.json();
//         return result;

//         // console.log(result);

//     } catch (error) {
//         console.log(error);
//         return null;
//     }

// }

// src/api/product.js
import { API_URL } from "@/utils/constants";

export async function getProducts() {
    const url = `${API_URL}/api/products?sort=createdAt:desc&pagination[limit]=8&populate=image`;

    try {
        const res = await fetch(url);
        if (!res.ok) {
            const body = await res.json().catch(() => ({}));
            throw new Error(`HTTP ${res.status} - ${body?.error?.message || "Error"}`);
        }
        const json = await res.json();

        const products = (json?.data ?? []).map(p => {
            // v5: image es OBJETO (o null)
            const img = p?.image || null;
            const fmts = img?.formats || {};
            const rel =
                fmts.small?.url ||        // usa small si existe
                fmts.thumbnail?.url ||    // o thumbnail
                img?.url ||               // o el original
                null;

            return {
                id: p.id,
                name: p.name,
                price: p.price,
                imageUrl: rel ? `${API_URL}${rel}` : null,  // URL absoluta lista para <img>
            };
        });

        return { data: products, meta: json?.meta || {} };
    } catch (error) {
        console.error("getProducts error:", error);
        return { data: [], meta: {}, error };
    }
}


// export async function getProductsCategory(categorySlug) {
//     try {
//         const response = await fetch(
//             `${API_URL}/api/products?filters[category][slug][$eq]=${categorySlug}&sort=createdAt:desc&populate=*`
//         );
//         const result = await response.json();
//         return result;
//     } catch (error) {
//         console.log(error);
//         return null;

//     }

// }

export async function getProductsCategory(categorySlug) {
  const slug = encodeURIComponent(categorySlug);
  const url = `${API_URL}/api/products?filters[category][slug][$eq]=${slug}&sort=createdAt:desc&populate=image`;

  try {
    const res = await fetch(url);
    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      throw new Error(`HTTP ${res.status} - ${body?.error?.message || "Error"}`);
    }

    const json = await res.json();

    const data = (json?.data ?? []).map((p) => {
      // v5: image es OBJETO (no array)
      const img  = p?.image || null;
      const fmts = img?.formats || {};
      const rel  = fmts.small?.url || fmts.thumbnail?.url || img?.url || null;

      return {
        id: p.id,
        name: p.name,
        price: p.price,
        slug: p.slug,            // si luego agregas UID
        imageUrl: rel ? `${API_URL}${rel}` : null,
        // por si tu Product.vue todavía usa 'image':
        image: img || null,
        category: p?.category || null,
      };
    });

    return { data, meta: json?.meta || {} };
  } catch (error) {
    console.error("getProductsCategory error:", error);
    return { data: [], meta: {}, error };
  }
}