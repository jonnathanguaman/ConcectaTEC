import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Mesa } from './mesas';
import { Observable } from 'rxjs';
import { environment } from '../../../enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class MesasService {

constructor(private http:HttpClient) { }

  getMesasDeRestaurante(id:number):Observable<Mesa[]>{
    return this.http.get<Mesa[]>(`${environment.urlHost + "/mesasDeRestaurante"}/${id}`)
  }

  getMesaById(idMesa:number):Observable<Mesa>{
    return this.http.get<Mesa>(`${environment.urlHost + "/mesas"}/${idMesa}`)
  }
}
