import { Injectable } from '@angular/core';

/**
 * Servicio global (providedIn: 'root'): una única instancia compartida por
 * Usuarios, Áreas y Subáreas, así el switch queda sincronizado entre pantallas.
 */
@Injectable({ providedIn: 'root' })
export class FechasActualizacionService {
  mostrarFechas = false;

  mostrarFechasDeActualizacion(activar: boolean): void {
    this.mostrarFechas = activar;
  }

  alternar(): void {
    this.mostrarFechas = !this.mostrarFechas;
  }
}
