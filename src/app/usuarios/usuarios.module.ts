import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule, NativeScriptFormsModule, registerElement } from '@nativescript/angular';
import { PullToRefresh } from '@nativescript-community/ui-pulltorefresh';

import { UsuariosRoutingModule } from './usuarios-routing.module';
import { UsuariosComponent } from './usuarios.component';
import { AreasComponent } from './areas/areas.component';
import { SubareasComponent } from './subareas/subareas.component';
import { BuscarComponent } from './buscar/buscar.component';
import { DetalleComponent } from './detalle/detalle.component';
import { NuevoComponent } from './nuevo/nuevo.component';
import { MinimoCaracteresDirective } from './validadores/minimo-caracteres.directive';
import { CorreoValidoDirective } from './validadores/correo-valido.directive';

// El plugin pull-to-refresh no trae módulo de Angular: se registra como elemento.
registerElement('PullToRefresh', () => PullToRefresh);

@NgModule({
  imports: [NativeScriptCommonModule, NativeScriptFormsModule, UsuariosRoutingModule],
  declarations: [
    UsuariosComponent, AreasComponent, SubareasComponent,
    BuscarComponent, DetalleComponent, NuevoComponent,
    MinimoCaracteresDirective, CorreoValidoDirective
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class UsuariosModule {}
