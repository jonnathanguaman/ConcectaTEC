import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, tap, throwError } from 'rxjs';
import { LoginRequest } from './LoginRequest';
import { environment } from '../../../enviroments/enviroment';
import { TokenPayload } from '../DatosPersonales/TokenPayload ';
import { jwtDecode } from 'jwt-decode';
import { AuthRegisterService } from '../auth/authRegister.service';
import { authRegister } from '../auth/authRegister';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  admin: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  user: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  currentUserLoginOn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  currentUserData: BehaviorSubject<String> = new BehaviorSubject<String>("");

  constructor(private http:HttpClient, private authRegisterService:AuthRegisterService,private router:Router) {
    if (typeof window !== 'undefined' && sessionStorage) {
      this.currentUserLoginOn = new BehaviorSubject<boolean>(sessionStorage.getItem("token") != null);
      this.currentUserData = new BehaviorSubject<String>(sessionStorage.getItem("token") || "");
      
    } else {
      this.currentUserLoginOn = new BehaviorSubject<boolean>(false);
      this.currentUserData = new BehaviorSubject<String>("");
    }  
  }

  login(credentials:LoginRequest):Observable<any>{
    return this.http.post<any>(environment.urlAut+"/public/login",credentials).pipe(
      tap((userData) => {
        sessionStorage.setItem("token",userData.token)
        this.currentUserData.next(userData.token)
        this.currentUserLoginOn.next(true)
        this.getRoles()
      }),
      map((userData) => userData.token),
      catchError(this.handleError)
    )
  }

  getRoles() {
    const token = sessionStorage.getItem('token');
    if (token) {
      try {
        const payload: TokenPayload = jwtDecode(token);
  
        // Consultar roles desde el backend
        this.authRegisterService.getIdPerson(payload.sub).subscribe({
          next: (idUser) => {
            this.authRegisterService.getAuthById(idUser).subscribe({
              next: (auth: authRegister) => {
  
                const isAdmin = auth.authorities.some((role: any) => role.authority === 'admin');
                const isUser = auth.authorities.some((role: any) => role.authority === 'user');
  
                this.admin.next(isAdmin);
                this.user.next(isUser);
              },
              error: (err) => {
                console.error('Error al obtener roles desde el backend:', err);
              },
            });
          },
          error: (err) => {
            console.error('Error al obtener el ID del usuario:', err);
          },
        });
      } catch (error) {
        console.error('Error al decodificar el token:', error);
      }
    } else {
      console.error('No se encontró un token en el sessionStorage.');
    }
  }

  private handleError(error:HttpErrorResponse){
    if(error.status === 0){
      console.log('Se ha produciodo un error ' + error)
    }else{
      console.log('El backend retorno el codigo del error ' + error)
    }
    return throwError(() => new Error('Algo falló, Por fvor intente de nuevo'))
  }

  logOut():void{
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("id");
    this.admin.next(false);
    this.user.next(false);
    this.currentUserLoginOn.next(false)
    this.router.navigateByUrl("/")

  }
  get userDate():Observable<String>{
    return this.currentUserData.asObservable();
  }

  get userLoginOn():Observable<boolean>{
    return this.currentUserLoginOn.asObservable();
  }

  get rolAdmin():Observable<boolean>{
    return this.admin.asObservable();
  }

  get rolUser():Observable<boolean>{
    return this.user.asObservable();
  }

  get userToken():String{
      return this.currentUserData.value
  }


  
}
