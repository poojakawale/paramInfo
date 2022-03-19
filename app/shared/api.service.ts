import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  postEmployee(data:any){
    return this.http.post<any>("https://retoolapi.dev/iM9Vc5/employees", data).pipe(map((resp:any)=>{
      return resp;
    }))
  }

  getEmployee(){
    return this.http.get<any>("https://retoolapi.dev/iM9Vc5/employees").pipe(map((resp:any)=>{
      return resp;
    }))
  }

  updateEmployee(data:any, id:number){
    return this.http.put<any>("https://retoolapi.dev/iM9Vc5/employees/"+id, data).pipe(map((resp:any)=>{
      return resp;
    }))
  }

  deleteEmployee(id:number){
    return this.http.delete<any>("https://retoolapi.dev/iM9Vc5/employees/"+id).pipe(map((resp:any)=>{
      return resp;
    }))
  }
}
