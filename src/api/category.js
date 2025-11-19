// import {API_URL} from "../utils/constants";

// export async function getCategoriesApi() {
//     try {
//         const response = await fetch(`${API_URL}/api/categories`);
//         const result = await response.json();
//         return result;


//     } catch (error) {
//       console.log(error);
//       return null;

//     }

// }

// src/api/category.js (o donde la tengas)
import { API_URL } from "@/utils/constants";

export async function getCategoriesApi() {
  const url = `${API_URL}/api/categories?fields[0]=name&fields[1]=slug&pagination[pageSize]=50`;
  try {
    const res = await fetch(url);
    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      throw new Error(`HTTP ${res.status} - ${body?.error?.message || "Error"}`);
    }
    const json = await res.json().catch(() => ({}));
    const raw = Array.isArray(json?.data) ? json.data : [];

    // v5: campos planos → normalizamos a { id, title, slug }
    const data = raw.map(c => ({
      id: c.id,
      title: c.name,   // <- para que tu template actual funcione sin cambios
      slug: c.slug,
    }));

    return { data, meta: json?.meta || {} };
  } catch (err) {
    console.error("getCategoriesApi error:", err);
    // ¡Importante! Mantener la forma para que el caller no truene
    return { data: [], meta: {}, error: err };
  }
}
