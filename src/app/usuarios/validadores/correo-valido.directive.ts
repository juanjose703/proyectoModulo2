import { Directive, forwardRef } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';

const PATRON_CORREO = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;

/** Validador propio: el correo debe tener formato usuario@dominio.ext */
@Directive({
  selector: '[nsCorreoValido][ngModel]',
  providers: [{ provide: NG_VALIDATORS, useExisting: forwardRef(() => CorreoValidoDirective), multi: true }],
  standalone: false
})
export class CorreoValidoDirective implements Validator {
  validate(control: AbstractControl): ValidationErrors | null {
    const valor = (control.value ?? '').toString().trim();
    if (!valor) { return null; }
    return PATRON_CORREO.test(valor) ? null : { correoInvalido: true };
  }
}
