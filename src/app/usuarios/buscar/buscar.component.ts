import { Component, OnDestroy } from '@angular/core';
import { RouterExtensions } from '@nativescript/angular';
import { ItemEventData } from '@nativescript/core';
import { Subscription } from 'rxjs';
import { CATEGORIAS, Categoria, Persona } from '../../models/directorio.models';
import { DirectorioService } from '../../services/directorio.service';

@Component({
  selector: 'ns-buscar',
  templateUrl: './buscar.component.html',
  styleUrls: ['./buscar.component.scss'],
  standalone: false,
})
export class BuscarComponent implements OnDestroy {
  consulta = '';                               // enlazado con [(ngModel)]
  filtros: ('Todas' | Categoria)[] = ['Todas', ...CATEGORIAS];
  filtroActivo: 'Todas' | Categoria = 'Todas';
  resultados: Persona[] = [];

  private readonly suscripcion: Subscription;

  constructor(private directorio: DirectorioService, private routerExtensions: RouterExtensions) {
    this.filtrar(this.consulta);
    this.suscripcion = this.directorio.cambios$.subscribe(() => this.filtrar(this.consulta));
  }

  ngOnDestroy(): void {
    this.suscripcion.unsubscribe();
  }

  filtrar(texto: string): void {
    this.resultados = this.directorio.buscar(texto, this.filtroActivo);
  }

  elegirFiltro(filtro: 'Todas' | Categoria): void {
    this.filtroActivo = filtro;
    this.filtrar(this.consulta);
  }

  limpiar(): void {
    this.consulta = '';
    this.filtroActivo = 'Todas';
    this.filtrar('');
  }

  verDetalle(evento: ItemEventData): void {
    const persona = this.resultados[evento.index];
    this.routerExtensions.navigate(['/usuarios/detalle', persona.id], { transition: { name: 'slide' } });
  }

  volver(): void {
    this.routerExtensions.back();
  }
}
