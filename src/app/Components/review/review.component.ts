import { Component, Input, OnInit } from '@angular/core';
import { ReviewLugaresService } from '../../Services/review-lugares/review-lugares.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ReviewLugar } from '../../Services/review-lugares/reviewLugares';
import { environment } from '../../../enviroments/enviroment';
import { AuthRegisterService } from '../../Services/auth/authRegister.service';
import { TokenPayload } from '../../Services/DatosPersonales/TokenPayload ';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css'],
})
export class ReviewComponent implements OnInit{
  
  @Input() idLugar?:number

  constructor(
    private reviewLugares:ReviewLugaresService,
    private fb:FormBuilder,
    private authService: AuthRegisterService,
  ){}
  isModalOpen = false;
  rating: number = 0;
  stars: number[] = [1, 2, 3, 4, 5];

  openModal(): void {
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
  }

  rate(star: number): void {
    this.rating = star;
  }

  ngOnInit(): void {
    this.obtenerReseña()
  }

  todasreviewLugares:ReviewLugar[]

  obtenerReseña(){
    this.reviewLugares.obtenerReviewByIdLugares(this.idLugar).subscribe({
      next:(lugares)=>{
        this.todasreviewLugares = lugares
      }
    })
  }

  reviewForm = this.fb.group({
    contenido:['',[Validators.required]],
    calificacion:[0,[Validators.required]]
  })

  crearReviewLugar(){
    const token = sessionStorage.getItem("token")
    const payload: TokenPayload = jwtDecode(token);
    if(token){
      this.authService.getIdPerson(payload.sub).subscribe({
        next: (idUser) => {
          this.reviewForm.controls.calificacion.setValue(this.rating)
          this.reviewLugares.crearReviewLugares(this.reviewForm.value as unknown as ReviewLugar,idUser,this.idLugar).subscribe({
            next:()=>{
              environment.mensajeToast('success','Reseña publicada','Gracias con compartir tu experiencia')
            },
            complete:()=>{
              this.obtenerReseña()
              this.closeModal()
            }
          })
        }})
      }else{
        environment.mensajeToast('warning','Error al crear la reseña','Por favor inicie sesión')
      }
    }
    
}