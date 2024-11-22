// Importaciones necesarias para las pruebas en Angular
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InicioSesionComponent } from './inicio-sesion.component';

describe('InicioSesionComponent', () => {
  // Declaración de variables para el componente y el fixture
  let component: InicioSesionComponent;
  let fixture: ComponentFixture<InicioSesionComponent>;

  // Bloque que se ejecuta antes de cada prueba
  beforeEach(() => {
    // Configuración del módulo de pruebas
    TestBed.configureTestingModule({
      declarations: [InicioSesionComponent]  // Declarar el componente que se va a probar
    });

    // Crear el componente y el fixture
    fixture = TestBed.createComponent(InicioSesionComponent);
    component = fixture.componentInstance;

    // Detectar cambios en el componente
    fixture.detectChanges();
  });

  // Caso de prueba: verifica que el componente se crea correctamente
  it('should create', () => {
    expect(component).toBeTruthy();  // Verificar que la instancia del componente es verdadera (existe)
  });
});
