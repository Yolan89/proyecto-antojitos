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

    const products = (json?.data ?? []).map((p) => {
      // ⚠️ En Strapi v5 los campos van dentro de "attributes"
      const attrs = p?.attributes || {};
      const imgData = attrs?.image?.data || null;
      const imgAttr = imgData?.attributes || {};
      const fmts = imgAttr?.formats || {};

      // URL que trae Strapi (small > thumbnail > original)
      const rawUrl =
        fmts.small?.url ||
        fmts.thumbnail?.url ||
        imgAttr?.url ||
        null;

      // ✅ Si ya empieza con http, es Cloudinary (o absoluta) → usar tal cual
      // ✅ Si es relativa (/uploads/...), la pegamos a API_URL
      const imageUrl = rawUrl
        ? rawUrl.startsWith("http")
          ? rawUrl
          : `${API_URL}${rawUrl}`
        : null;

      return {
        id: p.id,
        name: attrs.name,
        price: attrs.price,
        imageUrl,
        // por compatibilidad si en algún lado usas product.image
        image: imageUrl,
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

eexport async function getProductsCategory(categorySlug) {
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
      const attrs = p?.attributes || {};
      const imgData = attrs?.image?.data || null;
      const imgAttr = imgData?.attributes || {};
      const fmts = imgAttr?.formats || {};

      const rawUrl =
        fmts.small?.url ||
        fmts.thumbnail?.url ||
        imgAttr?.url ||
        null;

      const imageUrl = rawUrl
        ? rawUrl.startsWith("http")
          ? rawUrl
          : `${API_URL}${rawUrl}`
        : null;

      return {
        id: p.id,
        name: attrs.name,
        price: attrs.price,
        slug: attrs.slug,
        imageUrl,
        image: imageUrl,
        category: attrs.category || null,
      };
    });

    return { data, meta: json?.meta || {} };
  } catch (error) {
    console.error("getProductsCategory error:", error);
    return { data: [], meta: {}, error };
  }
}
