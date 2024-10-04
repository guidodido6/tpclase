import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';

// ARCHIVO DE RUTAS
import { ProductoRoutingModule } from './producto-routing.module';

// VISTAS
import { ProductoComponent } from './pages/producto/producto.component';
import { IndumentariaComponent } from './pages/indumentaria/indumentaria.component';

import { JuguetesComponent } from './pages/juguetes/juguetes.component';

import {MatCardModule} from '@angular/material/card';
// COMPONENTES LOCALES
import { CardComponent } from './components/card/card.component';
import { CardJuguetesComponent } from './components/card-juguetes/card-juguetes.component';
import { CarruselComponent } from './components/carrusel/carrusel.component';
import { AlimentacionComponent } from './pages/alimentacion/alimentacion.component';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    ProductoComponent,
    IndumentariaComponent,
    AlimentacionComponent,
    JuguetesComponent,
    CardComponent,
    CardJuguetesComponent,
    CarruselComponent
  ],
  imports: [
    CommonModule,
    ProductoRoutingModule,
    MatTabsModule,
    MatCardModule,
    MatButtonModule
 
  ],
  exports: [
    ProductoComponent,
    IndumentariaComponent,
    AlimentacionComponent,
    JuguetesComponent,
    CardComponent,
    CardJuguetesComponent,
    CarruselComponent,
    MatTabsModule,
    MatCardModule,
    MatButtonModule
  
  ]
})
export class ProductoModule { }
