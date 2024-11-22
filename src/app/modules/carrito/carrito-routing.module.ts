// Importaciones necesarias de Angular
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// Importación del componente PedidoComponent
import { PedidoComponent } from './components/pedido/pedido.component';

// Definición de las rutas para el módulo de carrito
const routes: Routes = [
  {
    path: 'carrito', // Ruta para el componente de carrito
    component: PedidoComponent // Componente que se carga cuando la ruta es 'carrito'
  }
];

// Decorador NgModule que define las configuraciones del módulo de rutas
@NgModule({
  imports: [RouterModule.forChild(routes)], // Importa RouterModule y configura las rutas definidas
  exports: [RouterModule] // Exporta RouterModule para que esté disponible en otros módulos
})
export class CarritoRoutingModule { }
