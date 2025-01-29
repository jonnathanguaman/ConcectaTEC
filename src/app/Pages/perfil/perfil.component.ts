import { Component } from '@angular/core';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent {
  activarTabla: string = 'tab4'; 

  seleccionarTablaactiva(tab: string): void {
    this.activarTabla = tab;
  }
}
