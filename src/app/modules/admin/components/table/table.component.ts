import { Component } from '@angular/core';
import { Producto } from 'src/app/models/producto';
import { CrudService } from '../../services/crud.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent {
  // Crear colección de productos del tipo producto -> lo definimos como un array
  coleccionProductos: Producto[] = [];

  // Variable para manejar el estado de Edición y Eliminación de productos
  modalVisibleProducto: boolean = false;

  // Variable va a tomar el producto que nosotros elijamos
  productoSeleccionado!: Producto; // <- recibe valores vacíos

  nombreImagen!: string; // Obtendrá el nombre de la imagen

  imagen!: string; // Obtendrá la ruta de la imagen

  // Definimos formulario para los productos
  /**
   * Atributos alfanuméricos (string) se inicializan con comillas simples
   * Atributos numéricos (number) se inicializan con cero ('0')
   */
  producto = new FormGroup({
    nombre: new FormControl('', Validators.required),
    precio: new FormControl(0, Validators.required),
    descripcion: new FormControl('', Validators.required),
    categoria: new FormControl('', Validators.required),
    // imagen: new FormControl('', Validators.required),
    alt: new FormControl('', Validators.required),
    stock: new FormControl (0, Validators.required)
  })

  constructor(public servicioCrud: CrudService) { }

  ngOnInit(): void {
    // subscribe -> notifica constantemente los cambios actuales del sistema
    this.servicioCrud.obtenerProducto().subscribe(producto => {
      // guarda la información recibida como un nuevo "producto" a la colección
      this.coleccionProductos = producto;
    })
  }

  async agregarProducto() {
    // validamos los valores del producto agregado
    if (this.producto.valid) {
      let nuevoProducto: Producto = {
        // idProducto no se toma porque es generado por la BD y no por el usuario
        idProducto: '',
        // el resto es tomado con información ingresada por el usuario
        nombre: this.producto.value.nombre!,
        descripcion: this.producto.value.descripcion!,
        precio: this.producto.value.precio!,
        categoria: this.producto.value.categoria!,
        // imagen ahora toma la URL generada desde Storage
        imagen: '',
        alt: this.producto.value.alt!,
        stock
      }

      // Enviamos nombre y url de la imagen; definimos carpeta de imágenes como "productos"
      await this.servicioCrud.subirImagen(this.nombreImagen, this.imagen, "productos")
        .then(resp => {
          // Encapsulamos respuesta y envíamos la información obtenida
          this.servicioCrud.obtenerUrlImagen(resp)
            .then(url => {
              // Ahora método crearProducto recibe los datos del formulario y la URL formateada
              this.servicioCrud.crearProducto(nuevoProducto, url)
                .then(producto => {
                  alert("Ha agregado un nuevo producto con éxito :)");

                  // Limpiamos formulario para agregar nuevos productos
                  this.producto.reset();
                })
                .catch(error => {
                  alert("Hubo un problema al agregar un nuevo producto :(");

                  this.producto.reset();
                })
            })
        })
    }
  }

  // Función para alertar al usuario del producto que desea eliminar
  mostrarBorrar(productoSeleccionado: Producto) {
    // abre el modal
    this.modalVisibleProducto = true;

    // toma los valores del producto elegido
    this.productoSeleccionado = productoSeleccionado;
  }

  // Función para eliminar definitivamente al producto
  borrarProducto() {
    //eniva id del productoeliminado y la ubicacion en el almacenamiento de STORAGE
    this.servicioCrud.eliminarProducto(this.productoSeleccionado.idProducto, this.productoSeleccionado.imagen)
      .then(respuesta => {
        alert("El producto se ha eliminado correctamente.")
      })
      .catch(error => {
        alert("No se ha podido eliminar el producto \n" + error);
      })
  }

  // Función para seleccionar el producto a editar
  mostrarEditar(productoSeleccionado: Producto) {
    this.productoSeleccionado = productoSeleccionado;

    // Enviar o "setear" los nuevos valores y reasignarlos a las variables
    // El ID no se vuelve a enviar ni se modifica, por ende no lo llamamos
    this.producto.setValue({
      nombre: productoSeleccionado.nombre,
      precio: productoSeleccionado.precio,
      descripcion: productoSeleccionado.descripcion,
      categoria: productoSeleccionado.categoria,
      //imagen: productoSeleccionado.imagen,
      alt: productoSeleccionado.alt,
      stock: productoSeleccionado.stock
    })
  }

  editarProducto() {
    let datos: Producto = {
      // Solo el ID toma y deja igual su valor
      idProducto: this.productoSeleccionado.idProducto,
      nombre: this.producto.value.nombre!,
      precio: this.producto.value.precio!,
      descripcion: this.producto.value.descripcion!,
      categoria: this.producto.value.categoria!,
      imagen: this.productoSeleccionado.imagen!,
      alt: this.producto.value.alt!,
      stock:this.producto.value.stock!
    }

    if(this.imagen){
      this.servicioCrud.subirImagen(this.nombreImagen, this.imagen, "productos")
      .then(resp => {
        this.servicioCrud.obtenerUrlImagen(resp)
        .then(url => {
          //actualizamos la url de la mig en los datos del fomrulario
          datos.imagen=url;

          //actualizamso url de la imagen en los datos del formulario
          this.actualizarProducto(datos);

          //vaciamos casillas del formulario
          this.producto.reset();

        })
        .catch(error=>{
          alert("hubo un problema al subir la imagen :( \n" +error)

          this.producto.reset();
        })
      })
    }else{
        /**
         * 
         * 
         * 
        */
       this.actualizarProducto(datos);
    }
  }

    //actualiza la info ya existente de los productos
  actualizarProducto(datos : Producto) {
    this.servicioCrud.modificarProducto(this.productoSeleccionado.idProducto, datos)
    .then(producto => {
      alert("El producto fue modificado con éxito.");
    })
    .catch(error => {
      alert("Hubo un problema al modificar el producto.");
    })
   }

  //metodo para cargar imagenes
  cargarImagen(event: any) {
    //VAriable para obtener el archivo subido desde el input del html
    let archivo = event.target.files[0];

    //variable para crear un nuevo objeto de tipo archivo o file y poder leerlo
    let reader = new FileReader();

    if (archivo != undefined) {
      /*
    llamamos a metodo ReadAsDataurl para leer toda la info recibida.
    Enviamos como parametro el archivo porqwue sera el encargadp de tener la info
    ingresada por el usuario    
    */
      reader.readAsDataURL(archivo);

      // Definimos que  haremos con la info mediante la funcion ficha
      reader.onloadend = () => {
        let url = reader.result;

        if (url != null) {
          //definimos nombre de la img con atributo y diferente a nula
          this.nombreImagen = archivo.name;

          //definimos ruta de la img segun url recibid en formato de cadena (string)
          this.imagen = url.toString();
        }
      }

    }
  }
}
