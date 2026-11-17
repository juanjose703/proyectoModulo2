import { Component } from '@angular/core';
import { Application, EventData, Switch } from '@nativescript/core';
import { RadSideDrawer } from 'nativescript-ui-sidedrawer';
import { Subarea } from '../../models/directorio.models';
import { FechasActualizacionService } from '../../services/fechas-actualizacion.service';

@Component({
  selector: 'ns-subareas',
  templateUrl: './subareas.component.html',
  styleUrls: ['./subareas.component.scss'],
  standalone: false,
})
export class SubareasComponent {
  readonly registros: Subarea[] = [
    { nombre: 'Desarrollo', codigo: 'SUB-001', actualizacion: '2026-07-03' },
    { nombre: 'Soporte', codigo: 'SUB-002', actualizacion: '2026-06-25' },
    { nombre: 'Marketing', codigo: 'SUB-003', actualizacion: '2026-09-11' },
    { nombre: 'Contabilidad', codigo: 'SUB-004', actualizacion: '2026-07-09' },
    { nombre: 'Diseño gráfico', codigo: 'SUB-005', actualizacion: '2026-08-25' },
    { nombre: 'Ventas', codigo: 'SUB-006', actualizacion: '2026-09-04' }
  ];

  constructor(public fechas: FechasActualizacionService) {}

  cambiarFechas(evento: EventData): void {
    this.fechas.mostrarFechasDeActualizacion((evento.object as Switch).checked);
  }

  abrirMenu(): void {
    (Application.getRootView() as RadSideDrawer).showDrawer();
  }
}
