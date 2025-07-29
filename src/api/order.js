import { API_URL } from "@/utils/constants";

export async function createOrderApi(data) {
    try{
    const url = `${API_URL}/api/orders`;
    
    const params = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        }, 
        body: JSON.stringify({data}),
        
    };

    console.log("🟢 Enviando a Strapi:", JSON.stringify({ data }, null, 2));


    const response = await fetch(url, params);
    const result = await response.json();
    return result;

    }catch(error){
        console.log('error al crear la orden', error);
        return null;       
    
    } 
}