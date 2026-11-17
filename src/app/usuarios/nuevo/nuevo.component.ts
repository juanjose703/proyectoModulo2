import { Component } from '@angular/core';
import { RouterExtensions } from '@nativescript/angular';
import { Dialogs } from '@nativescript/core';
import { CATEGORIAS, Categoria } from '../../models/directorio.models';
import { DirectorioService } from '../../services/directorio.service';
import { NotificacionesService } from '../../services/notificaciones.service';

@Component({
  selector: 'ns-nuevo',
  templateUrl: './nuevo.component.html',
  styleUrls: ['./nuevo.component.scss'],
  standalone: false,
})
export class NuevoComponent {
  // Modelo del formulario: cada campo se enlaza con [(ngModel)]
  modelo: { nombre: string; correo: string; subarea: string; categoria: Categoria } = {
    nombre: '',
    correo: '',
    subarea: 'Desarrollo',
    categoria: 'Colaborador'
  };

  constructor(
    private directorio: DirectorioService,
    private notificaciones: NotificacionesService,
    private routerExtensions: RouterExtensions
  ) {}

  async elegirSubarea(): Promise<void> {
    const elegida = await Dialogs.action({ title: 'Subárea', cancelButtonText: 'Cancelar', actions: this.directorio.subareas });
    if (elegida && elegida !== 'Cancelar') { this.modelo.subarea = elegida; }
  }

  async elegirCategoria(): Promise<void> {
    const elegida = await Dialogs.action({ title: 'Categoría', cancelButtonText: 'Cancelar', actions: [...CATEGORIAS] });
    if (elegida && elegida !== 'Cancelar') { this.modelo.categoria = elegida as Categoria; }
  }

  guardar(): void {
    const persona = this.directorio.agregar({
      nombre: this.modelo.nombre.trim(),
      correo: this.modelo.correo.trim(),
      subarea: this.modelo.subarea,
      categoria: this.modelo.categoria
    });
    this.notificaciones.mostrar(`${persona.nombre} fue agregado al directorio`, true);
    this.routerExtensions.back();
  }

  volver(): void {
    this.routerExtensions.back();
  }
}
