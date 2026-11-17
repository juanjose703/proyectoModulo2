import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RouterExtensions } from '@nativescript/angular';
import { Dialogs, GestureEventData, View } from '@nativescript/core';
import { CATEGORIAS, Categoria, Persona } from '../../models/directorio.models';
import { DirectorioService } from '../../services/directorio.service';
import { FechasActualizacionService } from '../../services/fechas-actualizacion.service';
import { NotificacionesService } from '../../services/notificaciones.service';
import { animarFavorito } from '../animaciones';

@Component({
  selector: 'ns-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss'],
  standalone: false,
})
export class DetalleComponent {
  persona?: Persona;

  constructor(
    route: ActivatedRoute,
    directorio: DirectorioService,
    public fechas: FechasActualizacionService,
    private notificaciones: NotificacionesService,
    private routerExtensions: RouterExtensions
  ) {
    const id = Number(route.snapshot.paramMap.get('id'));
    this.persona = directorio.obtenerPorId(id);
  }

  // Gesto: mantener presionado el avatar marca / desmarca favorito
  alMantenerPresionado(evento: GestureEventData): void {
    if (!this.persona) { return; }
    this.persona.favorito = !this.persona.favorito;
    animarFavorito(evento.object as View);
    this.notificaciones.mostrar(this.persona.favorito ? 'Marcado como favorito' : 'Quitado de favoritos');
  }

  async cambiarCategoria(): Promise<void> {
    if (!this.persona) { return; }
    const elegida = await Dialogs.action({
      title: 'Cambiar categoría',
      cancelButtonText: 'Cancelar',
      actions: [...CATEGORIAS]
    });
    if (elegida && elegida !== 'Cancelar') {
      this.persona.categoria = elegida as Categoria;
      this.notificaciones.mostrar(`Categoría actualizada: ${elegida}`);
    }
  }

  volver(): void {
    this.routerExtensions.back();
  }
}
