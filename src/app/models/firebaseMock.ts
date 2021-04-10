import { Observable } from "rxjs";

export class firebaseMock {

    getContact() {
        return new Observable<any>();
    };
    listContact(){
      return new Observable<any>();
    }  
  
    listCats(){
      return new Observable<any>();
    }  

    listCatPropertie(){
      return new Observable<any>();
    }  
  
  };