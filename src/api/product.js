import { API_URL } from "../utils/constants";

export async function getProducts(limit = 100) {
    try {
        const response = await fetch(
            `${API_URL}/api/products?pagination[limit]=${limit}&sort=createdAt:desc&populate=image`
        );
        const result = await response.json();
        return result;

    } catch (error) {
        console.log(error);
        return null;
    }

}

export async function getProductsCategory(categorySlug) {
    try {
        const response = await fetch(
            `${API_URL}/api/products?filters[category][slug][$eq]=${categorySlug}&sort=createdAt:desc&populate=*`
        );
        const result = await response.json();
        return result;
    } catch (error) {
        console.log(error);
        return null;

    }

}