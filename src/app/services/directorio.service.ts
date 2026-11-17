import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { CATEGORIAS, Categoria, Persona } from '../models/directorio.models';

const NOMBRES = ['Sofía', 'Nicolás', 'Isabela', 'Tomás', 'Mariana', 'Felipe', 'Luciana', 'Emilio', 'Paula', 'Santiago'];
const APELLIDOS = ['Zapata', 'Londoño', 'Salazar', 'Arango', 'Bedoya', 'Montoya', 'Vélez', 'Ospina', 'Cadavid', 'Franco'];

const sinTildes = (texto: string): string =>
  texto.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
const hoy = (): string => new Date().toISOString().slice(0, 10);
const alAzar = <T>(lista: readonly T[]): T => lista[Math.floor(Math.random() * lista.length)];

/**
 * Fuente de datos global (providedIn: 'root'). Todas las pantallas leen y
 * modifican los MISMOS objetos, y avisan los cambios por `cambios$`.
 */
@Injectable({ providedIn: 'root' })
export class DirectorioService {
  readonly subareas = ['Desarrollo', 'Soporte', 'Marketing', 'Contabilidad', 'Diseño gráfico', 'Ventas'];
  readonly cambios$ = new Subject<void>();

  readonly usuarios: Persona[] = [
    { id: 1, nombre: 'Laura Mejía', correo: 'laura.mejia@empresa.com', subarea: 'Desarrollo', categoria: 'Administrador', favorito: false, creacion: '2024-04-09', actualizacion: '2026-08-02' },
    { id: 2, nombre: 'Andrés Restrepo', correo: 'andres.restrepo@empresa.com', subarea: 'Soporte', categoria: 'Colaborador', favorito: false, creacion: '2024-12-17', actualizacion: '2026-09-06' },
    { id: 3, nombre: 'Camila Duque', correo: 'camila.duque@empresa.com', subarea: 'Marketing', categoria: 'Colaborador', favorito: true, creacion: '2025-06-18', actualizacion: '2026-09-12' },
    { id: 4, nombre: 'Sebastián Ortiz', correo: 'sebastian.ortiz@empresa.com', subarea: 'Contabilidad', categoria: 'Invitado', favorito: false, creacion: '2024-11-29', actualizacion: '2026-09-07' },
    { id: 5, nombre: 'Valentina Ríos', correo: 'valentina.rios@empresa.com', subarea: 'Desarrollo', categoria: 'Colaborador', favorito: false, creacion: '2025-12-01', actualizacion: '2026-08-01' },
    { id: 6, nombre: 'Julián Cardona', correo: 'julian.cardona@empresa.com', subarea: 'Soporte', categoria: 'Invitado', favorito: false, creacion: '2025-03-23', actualizacion: '2026-09-02' },
    { id: 7, nombre: 'Daniela Pineda', correo: 'daniela.pineda@empresa.com', subarea: 'Marketing', categoria: 'Administrador', favorito: false, creacion: '2026-01-12', actualizacion: '2026-09-13' },
    { id: 8, nombre: 'Mateo Gómez', correo: 'mateo.gomez@empresa.com', subarea: 'Contabilidad', categoria: 'Colaborador', favorito: false, creacion: '2025-09-22', actualizacion: '2026-08-28' }
  ];

  private siguienteId = 9;

  obtenerPorId(id: number): Persona | undefined {
    return this.usuarios.find(usuario => usuario.id === id);
  }

  /** Filtra por texto (nombre, correo o subárea) y, opcionalmente, por categoría. */
  buscar(texto: string, categoria: Categoria | 'Todas' = 'Todas'): Persona[] {
    const consulta = sinTildes((texto || '').trim());
    return this.usuarios.filter(u =>
      (categoria === 'Todas' || u.categoria === categoria) &&
      (!consulta || sinTildes(`${u.nombre} ${u.correo} ${u.subarea}`).includes(consulta)));
  }

  agregar(datos: { nombre: string; correo: string; subarea: string; categoria: Categoria }): Persona {
    const persona: Persona = { id: this.siguienteId++, favorito: false, creacion: hoy(), actualizacion: hoy(), ...datos };
    this.usuarios.unshift(persona);
    this.cambios$.next();
    return persona;
  }

  /** Simula la respuesta de un servicio: crea personas aleatorias (para pull-to-refresh). */
  generarAleatorios(cantidad = 2): Persona[] {
    const nuevas: Persona[] = [];
    for (let i = 0; i < cantidad; i++) {
      const nombre = alAzar(NOMBRES);
      const apellido = alAzar(APELLIDOS);
      nuevas.push({
        id: this.siguienteId++,
        nombre: `${nombre} ${apellido}`,
        correo: `${sinTildes(nombre)}.${sinTildes(apellido)}@empresa.com`,
        subarea: alAzar(this.subareas),
        categoria: alAzar(CATEGORIAS),
        favorito: false,
        creacion: hoy(),
        actualizacion: hoy()
      });
    }
    this.usuarios.unshift(...nuevas);
    this.cambios$.next();
    return nuevas;
  }
}
