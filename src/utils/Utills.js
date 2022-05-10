import { isShowLog } from "./globals";

export function log(...args){
    if(isShowLog){
        console.log(args);
    }
}