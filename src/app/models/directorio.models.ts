export const CATEGORIAS = ['Administrador', 'Colaborador', 'Invitado'] as const;
export type Categoria = (typeof CATEGORIAS)[number];

export interface Persona {
  id: number;
  nombre: string;
  correo: string;
  subarea: string;
  categoria: Categoria;
  favorito: boolean;
  creacion: string;
  actualizacion: string;
}

export interface Area {
  nombre: string;
  codigo: string;
  actualizacion: string;
}

export interface Subarea {
  nombre: string;
  codigo: string;
  actualizacion: string;
}
