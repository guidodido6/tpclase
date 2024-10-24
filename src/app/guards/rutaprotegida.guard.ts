import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../modules/autentificacion/services/auth.service';
import { Router } from '@angular/router';
import {map, switchMap, of, from} from 'rxjs'

export const rutaProtegidaGuard: CanActivateFn = (route, state) => {
  const servicoAuth = inject(AuthService);

  const servicioRutas = inject(Router);

  const rolEsperado = 'admin';
  

  return from (servicoAuth.obtenerUid()).pipe(
    switchMap(uid => {
      if (uid) {
        return servicoAuth.obtenerRol(uid).pipe(
          map(rol => {
            if (rol === rolEsperado) {
              // Si coincide el rol esperado, habilita acceso al usuario
              console.log("Usuario verificado como administrador.");

              return true;
            } else {
              // Caso contrario, deniega acceso
              return false;
            }
          })
        )
      } else {
        // Ej.: No está registrado o es de tipo "visitante"
        console.log("Usuario no validado. Permisos insuficientes.");

        // Redirecciona a inicio para usuarios no validados o sin permiso de admin
        return of(servicioRutas.createUrlTree(["/inicio"]));
      }
    })
  )
};
