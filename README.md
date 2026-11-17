# Directorio interno

App móvil (NativeScript + Angular) con navegación por side drawer para consultar, buscar y agregar personas, áreas y subáreas de una organización.
Parte del template [`template-drawer-navigation-ng`](https://github.com/NativeScript/template-drawer-navigation-ng).

## Requerimientos

Angular declara Node ^22.22.3 || ^24.15.0 || >=26.0.0.

    npm install -g nativescript@9.1.1
    ns doctor

Android SDK **35**, Build Tools **35**, mínimo Android API **24**.

    npm install        # incluye @nativescript-community/ui-pulltorefresh y @triniwiz/nativescript-toasty
    ns run android     # o: ns run ios

## Consigna del módulo (formularios, animaciones, imágenes y splash)

| # | Requisito | Dónde verlo |
|---|-----------|-------------|
| 1 | Página de búsqueda con `ListView` y plantilla anidada con `FlexboxLayout` | `usuarios/buscar/buscar.component.html` (`<ListView>` → `<ng-template>` → `<FlexboxLayout>`; además chips de filtro en otro `FlexboxLayout`) |
| 2 | Listado → detalle con `RouterExtensions.navigate` | `usuarios.component.ts` → `verDetalle()` navega a `/usuarios/detalle/:id` (`detalle/detalle.component.*`); también desde la búsqueda |
| 3 | Pull to refresh que agrega elementos aleatorios | `usuarios.component.html` (`<PullToRefresh>` + `<ListView>`), `actualizarListado()` y `DirectorioService.generarAleatorios()` |
| 4 | Diálogo tipo "action" que modifica un atributo | Botón con ícono de etiqueta en cada ítem: `elegirCategoria()` usa `Dialogs.action` y cambia `persona.categoria` |
| 5 | Toast | `services/notificaciones.service.ts` (`Toasty`), usado al refrescar, cambiar categoría, favoritos y guardar |
| 6 | Two way binding `[(ngModel)]` | `buscar.component.html` (`SearchBar`) y `nuevo/nuevo.component.html` (formulario) |
| 7 | Validador personalizado con directiva | `usuarios/validadores/minimo-caracteres.directive.ts` y `correo-valido.directive.ts` (`NG_VALIDATORS`), usados en `nuevo.component.html` |
| 8 | Ícono con detección de gestos | Doble toque (`doubleTap`) en la estrella del listado y toque prolongado (`longPress`) en el avatar del detalle |
| 9 | Animación en un ícono | `usuarios/animaciones.ts` → `animarFavorito()`: gira 360° y escala la estrella |
| 10 | Splash screen personalizado para Android | `App_Resources/Android/src/main/res/`: `drawable-nodpi/splash_screen.xml`, `drawable-*/logo.png` y `background.png` (propios), `values-v31/styles.xml` (splash de Android 12+) |

## Puntos de módulos anteriores (se mantienen)

Template drawer-navigation-ng con `loadChildren`, módulo `UsuariosModule` con su ruteo, drawer integrado, services globales (`providedIn: 'root'`), `*ngFor`, estilos con sobrecarga Android/iOS (`*.android.scss` / `*.ios.scss`), ícono propio en `App_Resources` y asignación solo en Android (`usuarios.component.ts`: `if (isAndroid) {...}`).

## Estructura

    src/app/
    ├── models/directorio.models.ts
    ├── services/
    │   ├── directorio.service.ts           # datos, búsqueda, alta y personas aleatorias
    │   ├── notificaciones.service.ts       # toast
    │   └── fechas-actualizacion.service.ts
    └── usuarios/
        ├── usuarios.component.*            # listado: ListView + pull to refresh
        ├── buscar/  detalle/  nuevo/       # búsqueda, detalle y formulario
        ├── areas/  subareas/
        ├── validadores/                    # directivas validadoras
        └── animaciones.ts
