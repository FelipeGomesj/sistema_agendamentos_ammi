import { toast } from "react-toastify";

export function isSomeEmptyFiled(stringFieldList:Array<string>):boolean{
    for (let i = 0; i < stringFieldList.length; i++) {
        if(stringFieldList[i] === ""){
            toast.error("Por favor, preencha todos os campos para continuar.");
            return true;
        }
    }
    return false;
}