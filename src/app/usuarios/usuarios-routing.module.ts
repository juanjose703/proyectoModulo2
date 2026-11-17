import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { NativeScriptRouterModule } from '@nativescript/angular';

import { UsuariosComponent } from './usuarios.component';
import { AreasComponent } from './areas/areas.component';
import { SubareasComponent } from './subareas/subareas.component';
import { BuscarComponent } from './buscar/buscar.component';
import { DetalleComponent } from './detalle/detalle.component';
import { NuevoComponent } from './nuevo/nuevo.component';

const routes: Routes = [
  { path: '', component: UsuariosComponent },
  { path: 'areas', component: AreasComponent },
  { path: 'subareas', component: SubareasComponent },
  { path: 'buscar', component: BuscarComponent },
  { path: 'nuevo', component: NuevoComponent },
  { path: 'detalle/:id', component: DetalleComponent }
];

@NgModule({
  imports: [NativeScriptRouterModule.forChild(routes)],
  exports: [NativeScriptRouterModule]
})
export class UsuariosRoutingModule {}
