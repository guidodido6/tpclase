// Importación de la clase Component de Angular
import { Component } from '@angular/core';
// Importación de la interfaz otros desde la ruta especificada
import { otros } from 'src/app/models/otros';

@Component({
  selector: 'app-juguetes', // Define el selector del componente
  templateUrl: './juguetes.component.html', // Ruta al archivo de plantilla HTML del componente
  styleUrls: ['./juguetes.component.css'] // Ruta al archivo de estilos CSS del componente
})
export class JuguetesComponent {
  // Propiedad pública de tipo array que contendrá información de otros productos
  public info: otros[];

  // Constructor del componente
  constructor(){
    // Inicialización del array info con datos predefinidos
    this.info = [
      {
        id: "",
        nombre: "Cartuchera",
        edad: 12000,
        imagen: "https://ocresart.es/wp-content/uploads/2022/02/estuche-maletin-60-rotuladores-posca-1_1024x1024.jpg",
        alt: "Cartuchera de la marca posca"
      },
      {
        id: "",
        nombre: "Libro Graffiti",
        edad: 17500,
        imagen: "https://www.lexuseditores.com.ar/wp-content/uploads/2019/01/grafiti_arte_urbano_LXGAU1-600x600.jpg",
        alt: "Libro de Graffiti y Arte Urbano"
      },
      {
        id: "",
        nombre: "Fat Cap",
        edad: 3000,
        imagen: "https://artwhale.ph/wp-content/uploads/2019/10/MTN-Hardcore-Fat-Cap.jpg",
        alt: "Fat Cap"
      },
      {
        id: "",
        nombre: "Cuaderno",
        edad: 3000,
        imagen: "https://ih1.redbubble.net/image.1214313966.8725/sn,x600-pad,600x600,f8f8f8.jpg",
        alt: "Cuaderno"
      }
    ];
  }
}
