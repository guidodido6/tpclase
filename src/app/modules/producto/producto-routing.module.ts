// Importación de NgModule de Angular
import { NgModule } from '@angular/core';
// Importación de RouterModule y Routes para configurar las rutas
import { RouterModule, Routes } from '@angular/router';

// IMPORTACIONES DE LOS COMPONENTES DEL MÓDULO PRODUCTO
import { ProductoComponent } from './pages/producto/producto.component';
import { AlimentacionComponent } from './pages/alimentacion/alimentacion.component';
import { JuguetesComponent } from './pages/juguetes/juguetes.component';
import { IndumentariaComponent } from './pages/indumentaria/indumentaria.component';

// Definición de las rutas para el módulo de producto
const routes: Routes = [
  {
    path: "producto", component: ProductoComponent // Ruta para el componente ProductoComponent
  },
  {
    path: "alimentacion", component: AlimentacionComponent // Ruta para el componente AlimentacionComponent
  },
  {
    path: "juguetes", component: JuguetesComponent // Ruta para el componente JuguetesComponent
  },
  {
    path: "indumentaria", component: IndumentariaComponent // Ruta para el componente IndumentariaComponent
  }
];

// Decorador NgModule que define las configuraciones del módulo de rutas
@NgModule({
  imports: [RouterModule.forChild(routes)], // Importa RouterModule y configura las rutas definidas
  exports: [RouterModule] // Exporta RouterModule para que esté disponible en otros módulos
})
export class ProductoRoutingModule { }

