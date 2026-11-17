import { View } from '@nativescript/core';

/** Animación del ícono de favorito: gira 360° y "late" (escala) antes de volver a su tamaño. */
export function animarFavorito(vista: View): void {
  vista
    .animate({ rotate: 360, scale: { x: 1.6, y: 1.6 }, duration: 280 })
    .then(() => vista.animate({ scale: { x: 1, y: 1 }, duration: 180 }))
    .then(() => { vista.rotate = 0; })
    .catch(() => { vista.rotate = 0; vista.scaleX = 1; vista.scaleY = 1; });
}
