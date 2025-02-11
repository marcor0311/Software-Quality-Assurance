import { Component, OnInit } from '@angular/core';
import { CalculadoraService } from './calculadora.service';

@Component({
  selector: 'app-calculadora',
  standalone: true,
  imports: [],
  templateUrl: './calculadora.component.html',
  styleUrls: ['./calculadora.component.css']
})
export class CalculadoraComponent implements OnInit {

  // Declaración de las variables
  private numero1: string = "";
  private numero2: any = "";
  private resultado: any = 0;
  private operacion: any = "";
  private calculadoraService: CalculadoraService;

  constructor() {
    // Inicialización del servicio
    this.calculadoraService = new CalculadoraService();
  }

  // Método para mostrar los datos en el campo de texto
  get display(): string {
    if (this.resultado !== null) {
      return this.resultado.toString();
    }
    if (this.numero2 !== null) {
      return this.numero2;
    }
    return this.numero1;
  }

  // Método para limpiar los datos
  limpiar(): void {
    this.numero1 = '0';
    this.numero2 = null;
    this.resultado = null;
    this.operacion = null;
  }

  // Inicialización de la calculadora
  ngOnInit() {
    this.limpiar();
  }

  adicionarNumero(numero: string): void {
    if (this.operacion === null) {
      this.numero1 = this.concatenarNumero(this.numero1, numero);
    } else {
      this.numero2 = this.concatenarNumero(this.numero2, numero);
    }
  }
  
  concatenarNumero(numAtual: string, numConcat: string): string {
    if (numAtual === '0' || numAtual === null) {
      numAtual = '';
    }
    if (numConcat === '.' && numAtual === '') {
      return '0.';
    }
    if (numConcat === '.' && numAtual.indexOf('.') > -1) {
      return numAtual;
    }
    return numAtual + numConcat;
  }

  // Método para definir la operación
  definirOperacion(operacion: string): void {
    if (this.operacion === null || this.operacion === "") {
      this.operacion = operacion;
      return;
    }
  }

  // Método para calcular el resultado
  calcular(): void {
    if (this.numero2 === null) {
      return;
    }

    this.resultado = this.calculadoraService.calcular(
      parseFloat(this.numero1),
      parseFloat(this.numero2),
      this.operacion
    );
  }

  
}