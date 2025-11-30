import { API_URL } from "@/utils/constants";

export async function createOrderApi(data) {
    try {
        const url = `${API_URL}/api/orders`;

        const params = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ data }),

        };

        console.log("🟢 Enviando a Strapi:", JSON.stringify({ data }, null, 2));


        const response = await fetch(url, params);
        const result = await response.json();
        return result;

    } catch (error) {
        console.log('error al crear la orden', error);
        return null;

    }
}


export async function getOrders(idUser) {
    try {
        const params = new URLSearchParams({
            'filters[users_permissions_user][id][$eq]': String(idUser),
            'sort': 'createdAt:desc',
            'populate': '*'
        });

        const url = `${API_URL}/api/orders?${params.toString()}`;
        console.log('GET Orders URL:', url); // <--- útil para ver exactamente qué se solicita

        const response = await fetch(url);

        // si Strapi devuelve 4xx/5xx, conviene leer el JSON para ver el detalle
        const result = await response.json();

        if (!response.ok) {
            console.error('Strapi error:', result);
            return { data: null, error: result };
        }

        return result; // normalmente es { data: [...], meta: {...} }
    } catch (error) {
        console.log("error al obtener las ordenes", error);
        return null;
    }
}

// export async function getOrders(idUser) {
//     try{
//         const response = await fetch(
//             `${API_URL}/api/orders?filters[users_permissions_user][id][$eq]=${idUser}&sort=createdAt:desc&populate=*`

//         );
//         const result =await response.json();
//         return result;
//     }catch(error){
//      console.log("error al crear la orden",error);
//      return null;
//     }
// }