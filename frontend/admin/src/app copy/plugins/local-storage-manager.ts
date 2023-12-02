import { localStorageKeys } from "../interfaces";

export const localStorageSystem = {
    save: <t>(key: localStorageKeys, value: t):void => localStorage.setItem(key, (typeof value != "string") ? JSON.stringify(value) : value),
    clearAll: (): void => localStorage.clear(),
    clearItem: (key: localStorageKeys):void => localStorage.removeItem(key),
    getInString: (key: localStorageKeys):string => {
        const result = (typeof window !== "undefined") ? window.localStorage : null;
        if(result && !!localStorage.getItem(key)) {
            return localStorage.getItem(key) ?? '';
        }

        return "";
    },
    getParse: (key: localStorageKeys): any =>{
        const result = (typeof window !== "undefined") ? window.localStorage : null;
        if(result && !!localStorage.getItem(key)) {
            return JSON.parse(localStorage.getItem(key) ?? '');
        }

        return "";
    } 
}