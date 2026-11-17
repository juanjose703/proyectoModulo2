import { Injectable } from '@angular/core';
import { ToastDuration, ToastPosition, Toasty } from '@triniwiz/nativescript-toasty';

/** Centraliza los "toast" de la app para que todas las pantallas se vean igual. */
@Injectable({ providedIn: 'root' })
export class NotificacionesService {
  mostrar(texto: string, largo = false): void {
    new Toasty({
      text: texto,
      position: ToastPosition.BOTTOM,
      duration: largo ? ToastDuration.LONG : ToastDuration.SHORT,
      backgroundColor: '#283593',
      textColor: '#ffffff'
    }).show();
  }
}
