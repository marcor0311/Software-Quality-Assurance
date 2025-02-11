import { Count } from './count';

export class Client {
  nombre: string;
  apellidos: string;
  fechaNacimiento: string;
  telefono: string;
  direccion: string;
  correo: string;
  cuentas: Array<Count>;
  constructor(nombre:string, apellidos:string, fechaNacimiento:string, telefono:string, direccion:string, correo:string) {
    this.nombre = nombre;
    this.apellidos = apellidos;
    this.fechaNacimiento = fechaNacimiento;
    this.telefono = telefono;
    this.direccion = direccion;
    this.correo = correo;
    this.cuentas = new Array<Count>();
  }

  getNombre() {
    return this.nombre;
  }

  setNombre(nombre:string) {
    this.nombre = nombre;
  }

  getApellidos() {
    return this.apellidos;
  }

  setApellidos(apellidos:string) {
    this.apellidos = apellidos;
  }

  getFechaNacimiento() {
    return this.fechaNacimiento;
  }

  setFechaNacimiento(fechaNacimiento:string) {
    this.fechaNacimiento = fechaNacimiento;
  }

  getTelefono() {
    return this.telefono;
  }

  setTelefono(telefono:string) {
    this.telefono = telefono;
  }

  getDireccion() {
    return this.direccion;
  }

  setDireccion(direccion:string) {
    this.direccion = direccion;
  }

  getCorreo() {
    return this.correo;
  }

  setCorreo(correo:string) {
    this.correo = correo;
  }

  getCuentas() {
    return this.cuentas;
  }

  setCuentas(cuenta:Count) {
    this.cuentas.push(cuenta);
  }

  buscarCuenta(numeroCuenta:number) {
    for (var i = 0; i < this.cuentas.length; i++) {
      var cuenta = this.cuentas[i];
      if (cuenta.getNumCuenta() === numeroCuenta) {
        return cuenta;
      }
    }
    return null;
  }

  retirar(amount:number, numeroCuenta:number) {
    var account = this.buscarCuenta(numeroCuenta);
    if (account != null) {
      var balance = account.getCantidadDinero();
      if (amount >= 0) {
        if (balance < amount) {
          throw new Error("Fondos insuficientes");
        }
        return account.retirar(amount);
      }
      else {
        throw new Error("Valor negativo");
      }
    }
    return -1;
  }

  depositar(monto: number, numeroCuenta: number): void {
    const cuenta = this.cuentas.find(c => c.getNumCuenta() === numeroCuenta);
    if (!cuenta) {
      throw new Error('Cuenta no encontrada');
    }
    const saldoActual = cuenta.getCantidadDinero();
    cuenta.setCantidadDinero(saldoActual + monto);
  }

  liquidar(numeroCuenta: number): boolean {
    const index = this.cuentas.findIndex(cuenta => cuenta.getNumCuenta() === numeroCuenta);
    if (index !== -1) {
      this.cuentas.splice(index, 1); 
      return true;
    }
    return false;
  }
}
