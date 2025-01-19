import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistroPersonaComponent } from './Pages/registro-persona/registro-persona.component';
import { InicioComponent } from './Pages/inicio/inicio.component';
import { NosotrosComponent } from './Pages/nosotros/nosotros.component';
import { PerfilComponent } from './Pages/perfil/perfil.component';
import { RecomendacionesComponent } from './Pages/recomendaciones/recomendaciones.component';
import { LoginComponent } from './Pages/login/login.component';
import { DatosPersonalesComponent } from './Components/datos-personales/datos-personales.component';
import { TiendaComponent } from './Pages/tienda/tienda.component';
import { ProductoComponent } from './Pages/producto/producto.component';
import { ForoComponent } from './Pages/foro/foro.component';
import { LugarComponent } from './Pages/lugar/lugar.component';
import { VerHotelesComponent } from './Pages/ver-hoteles/ver-hoteles.component';
import { HabitacionesComponent } from './Pages/habitaciones/habitaciones.component';

const routes: Routes = [
  {
    path:"registro",
    component:RegistroPersonaComponent
  },
  {
    path:"",
    component:InicioComponent
  },
  {
    path:"nosotros",
    component:NosotrosComponent
  },
  {
    path:"perfil",
    component:PerfilComponent
  },
  {
    path:"recomendaciones",
    component:RecomendacionesComponent
  },
  {
    path:"login",
    component:LoginComponent
  },
  {
    path:"lugar",
    component:LugarComponent
  },
  {
    path:"producto",
    component:ProductoComponent
  },
  {
    path:"foro",
    component:ForoComponent
  },
  
    path:"hoteles",
    component:VerHotelesComponent
  },
  {
    path:"habitacion",
    component:HabitacionesComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
