import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';


import { Observable } from 'rxjs';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private rolusuario:string | null = null;

  constructor(private auth: AngularFireAuth, private serviceFirestore: AngularFirestore) { }
  //funcion para el registro
  registrar(email:string, password:string){
    //retorna el valor que es creado con elmetodo "create email"
    return this.auth.createUserWithEmailAndPassword(email, password)
  }
  //funcion de inicio de sesion
  iniciosesion(email:string, password:string){
    //valida la informacion del usuario y si existe en la coleccion
    return this.auth.signInWithEmailAndPassword(email, password)
  }
  //funcion para cerrar sesion
  cerrarsesion(){
    //devuelve una promesa vacia - quita token
    return this.auth.signOut();
  }

  //funcion para tomar el uid
  async obtenerUid(){
    //nos va a generar una promesea, y la constante la va a capturar
    const user=await this.auth.currentUser;

    //si el usuario no respeta la estructura de la interfaz 
    //o si tuvo problemas para el registro -> ejemplo: mal internet
    if(user == null){
      return null;
    }else{
      return user.uid;
    }
  }

  obtenerUsuario(email:string){

    /*
    RETORNAMOS DEL SERVICIO FIRESTORE LA COLECCION USUARIOS, BUSCAMOS UNA REFERENCIA EN LOS EMAILS REGISTRADOS
    Y LOS COMPARAMOS CON LOS QUE INGRESE EL USUARIO AL INICIAR SESION, Y LO OBTIENE CON EL .GET(), LO VUELVE UNA PROMESA
    => DA RESULTADO RESUELTO O RECHAZADO */
    return this.serviceFirestore.collection('usuarios', ref => ref.where('email.','==', email)).get().toPromise();
  }

  obtenerRol(uid:string): Observable <string | null>{
    return this.serviceFirestore.collection('usuarios').doc(uid).valueChanges()
    .pipe(map((usuario:any) => usuario ? usuario.rol : null));
  }

  enviarRolUsuario(rol: string){
    this.rolusuario = rol;
  }

  obtenerRolUsuario(): string | null {
    return this.rolusuario
  }
}
