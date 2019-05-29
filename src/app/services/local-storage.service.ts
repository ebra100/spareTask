import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  setItem(key: string, data: any) {

    let dataString = JSON.stringify(data)    
    localStorage.setItem(key, dataString)
  }

  getItem(key: string) {
    let data = localStorage.getItem(key);
    let dataObj = JSON.parse(data)
    return dataObj
  }
}
