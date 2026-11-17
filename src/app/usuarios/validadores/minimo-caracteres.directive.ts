import { Directive, Input, forwardRef } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';

/** Validador propio: exige una longitud mínima (sin contar espacios de los extremos). */
@Directive({
  selector: '[nsMinimoCaracteres][ngModel]',
  providers: [{ provide: NG_VALIDATORS, useExisting: forwardRef(() => MinimoCaracteresDirective), multi: true }],
  standalone: false
})
export class MinimoCaracteresDirective implements Validator {
  @Input('nsMinimoCaracteres') minimo: number | string = 3;

  validate(control: AbstractControl): ValidationErrors | null {
    const valor = (control.value ?? '').toString().trim();
    if (!valor) { return null; } // el caso vacío lo cubre `required`
    const requerido = Number(this.minimo);
    return valor.length >= requerido ? null : { minimoCaracteres: { requerido, actual: valor.length } };
  }
}
