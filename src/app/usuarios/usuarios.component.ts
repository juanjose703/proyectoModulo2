import { Component, OnDestroy } from '@angular/core';
import { Application, Dialogs, EventData, GestureEventData, ItemEventData, Switch, View, isAndroid } from '@nativescript/core';
import { RouterExtensions } from '@nativescript/angular';
import { PullToRefresh } from '@nativescript-community/ui-pulltorefresh';
import { RadSideDrawer } from 'nativescript-ui-sidedrawer';
import { Subscription } from 'rxjs';
import { CATEGORIAS, Categoria, Persona } from '../models/directorio.models';
import { DirectorioService } from '../services/directorio.service';
import { FechasActualizacionService } from '../services/fechas-actualizacion.service';
import { NotificacionesService } from '../services/notificaciones.service';
import { animarFavorito } from './animaciones';

@Component({
  selector: 'ns-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss'],
  standalone: false,
})
export class UsuariosComponent implements OnDestroy {
  usuariosVisibles: Persona[] = [];
  limiteInicial: number;
  avisoVista = 'Mostrando todo el directorio';
  mostrarTodos = false;

  private readonly suscripcion: Subscription;

  constructor(
    public fechas: FechasActualizacionService,
    private directorio: DirectorioService,
    private notificaciones: NotificacionesService,
    private routerExtensions: RouterExtensions
  ) {
    this.limiteInicial = this.directorio.usuarios.length;

    // Estos valores se asignan ÚNICAMENTE cuando la app corre en Android.
    if (isAndroid) {
      this.limiteInicial = 5;
      this.avisoVista = 'Vista compacta (Android): primeras 5 personas';
    }

    this.sincronizar();
    // Si otra pantalla agrega gente (p. ej. el formulario), el listado se actualiza solo.
    this.suscripcion = this.directorio.cambios$.subscribe(() => this.sincronizar());
  }

  ngOnDestroy(): void {
    this.suscripcion.unsubscribe();
  }

  get totalUsuarios(): number {
    return this.directorio.usuarios.length;
  }

  private sincronizar(): void {
    const todos = this.directorio.usuarios;
    this.usuariosVisibles = this.mostrarTodos ? [...todos] : todos.slice(0, this.limiteInicial);
  }

  alternarListado(): void {
    this.mostrarTodos = !this.mostrarTodos;
    this.sincronizar();
  }

  // ---- Navegación listado -> detalle (RouterExtensions.navigate) ----
  verDetalle(evento: ItemEventData): void {
    const persona = this.usuariosVisibles[evento.index];
    this.routerExtensions.navigate(['/usuarios/detalle', persona.id], { transition: { name: 'slide' } });
  }

  irA(ruta: string): void {
    this.routerExtensions.navigate([ruta], { transition: { name: 'slide' } });
  }

  // ---- Pull to refresh: agrega personas aleatorias (simula un servicio) ----
  actualizarListado(evento: EventData): void {
    const pull = evento.object as PullToRefresh;
    setTimeout(() => {
      const nuevas = this.directorio.generarAleatorios(2);
      pull.refreshing = false;
      this.notificaciones.mostrar(`Se agregaron ${nuevas.length} personas: ${nuevas.map(n => n.nombre).join(' y ')}`, true);
    }, 1200);
  }

  // ---- Diálogo de tipo "action": cambia un atributo del objeto ----
  async elegirCategoria(persona: Persona): Promise<void> {
    const elegida = await Dialogs.action({
      title: `Categoría de ${persona.nombre}`,
      message: `Actual: ${persona.categoria}`,
      cancelButtonText: 'Cancelar',
      actions: [...CATEGORIAS]
    });
    if (elegida && elegida !== 'Cancelar') {
      persona.categoria = elegida as Categoria;
      this.notificaciones.mostrar(`${persona.nombre} ahora es ${persona.categoria}`);
    }
  }

  // ---- Gesto (doble toque) + animación sobre el ícono de favorito ----
  alternarFavorito(persona: Persona, evento: GestureEventData): void {
    persona.favorito = !persona.favorito;
    animarFavorito(evento.object as View);
    this.notificaciones.mostrar(persona.favorito ? `${persona.nombre} agregado a favoritos` : `${persona.nombre} quitado de favoritos`);
  }

  cambiarFechas(evento: EventData): void {
    this.fechas.mostrarFechasDeActualizacion((evento.object as Switch).checked);
  }

  abrirMenu(): void {
    (Application.getRootView() as RadSideDrawer).showDrawer();
  }
}
