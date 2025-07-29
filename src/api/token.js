import {TOKEN} from "../utils/constants"

//función que guarda el token
export function setTokenApi(token){
    localStorage.setItem(TOKEN,token);
}

export function getTokenApi(){
    return localStorage.getItem(TOKEN);
}

export function deleteTokenApi(){
  return localStorage.removeItem(TOKEN);
}