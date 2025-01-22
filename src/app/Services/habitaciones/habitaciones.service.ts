import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Habitaciones } from './habitaciones';
import { environment } from '../../../enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class HabitacionesService {

  constructor(private http:HttpClient) { }

  getHabitacionDeHotel(id:number):Observable<Habitaciones[]>{
    return this.http.get<Habitaciones[]>(`${environment.urlHost + "/habitacionesDeHotel"}/${id}`)
  }

  getHabitacionById(id:number):Observable<Habitaciones>{
    return this.http.get<Habitaciones>(`${environment.urlHost + "/habitaciones"}/${id}`)
  }
}
