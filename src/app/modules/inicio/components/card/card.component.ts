import { Component } from '@angular/core';
// IMPORTAMOS INTERFAZ
import { Animal } from 'src/app/models/animal';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {
  // PROPIEDAD PÚBLICA (TIPO ARRAY)
  public info: Animal[];

  constructor(){
    this.info = [
      {
        id: "",
        nombre: "Posca Mop'r",
        edad: 8000,
        imagen: "https://www.artisticarubens.com.ar/media/catalog/product/cache/fe834d3b1b015d6516f54b6ea9487258/m/a/marcador-uniposca-mop-pcm22-rosa_1.jpg",
        alt: "Posca Mop'r Rosado"
      },
      {
        id: "",
        nombre: "Posca Marc",
        edad: 5700,
        imagen: "https://acdn.mitiendanube.com/stores/001/421/947/products/amarillo1-0e6d8923aed4c6853616409610867820-1024-1024.jpg",
        alt: "Marcador Posca Amarillo"
      },
      {
        id: "",
        nombre: "Aerosol",
        edad: 10000,
        imagen: "https://www.dmentalgraffitishop.com/wp-content/uploads/2021/10/MORADO-HARDCORE-400-ML-600x600.jpg",
        alt: "Aerosol Hardcore"
      }
    ]
  }
}
