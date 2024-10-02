import { Component } from '@angular/core';
import { otros } from 'src/app/models/otros';

@Component({
  selector: 'app-juguetes',
  templateUrl: './juguetes.component.html',
  styleUrls: ['./juguetes.component.css']
})
export class JuguetesComponent {
  // PROPIEDAD PÚBLICA (TIPO ARRAY)
  public info: otros[];

  constructor(){
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
        alt: "Fat Cap "
      }
    ]
  }
}
