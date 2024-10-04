import { Component } from '@angular/core';
import { Aerosol } from 'src/app/models/aerosol';

@Component({
  selector: 'app-alimentacion',
  templateUrl: './alimentacion.component.html',
  styleUrls: ['./alimentacion.component.css']
})

export class AlimentacionComponent {
  // PROPIEDAD PÚBLICA (TIPO ARRAY)
  public info: Aerosol[];

  constructor(){
    this.info = [
      {
        id: "",
        nombre: "Aerosol Violeta",
        edad: 10000,
        imagen: 'https://dcdn.mitiendanube.com/stores/666/345/products/hard21-8d36defa1060f3328116694821287656-640-0.jpg',
        alt: "Posca Mop'r Rosado"
      },
      {
        id: "",
        nombre: "Aerosol Verde",
        edad: 10000,
        imagen: "https://www.dmentalgraffitishop.com/wp-content/uploads/2021/10/VERDE-HARDCORE-400-ML-600x600.jpg",
        alt: "Marcador Posca Amarillo"
      },
      {
        id: "",
        nombre: "Aerosol Rojo",
        edad: 10000,
        imagen: "https://mcartsupplies.com/cdn/shop/products/Prometheus-Orange-MTN-Hardcore-Spray-Paint_grande.png?v=1617335807",
        alt: "Aerosol Hardcore"
      },
      {
        id: "",
        nombre: "Aerosol Rosado",
        edad: 10000,
        imagen: "https://www.dmentalgraffitishop.com/wp-content/uploads/2021/10/MORADO-HARDCORE-400-ML-600x600.jpg",
        alt: "Aerosol Hardcore"
      }
    ]
  }
}
