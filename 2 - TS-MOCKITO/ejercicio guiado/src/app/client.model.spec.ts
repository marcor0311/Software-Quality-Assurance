import { mock, when, instance} from 'ts-mockito';
import { Client } from './client.model';
import { Count } from './count';

describe('Client', () => {
  let client: Client;
  const nombre = "Juan";
  const apellidos = "Pérez";
  const fechaNacimiento = "25-01-76";
  const telefono = "2401-3117";
  const direccion = "Alajuela";
  const correo = "jperez@gmail.com";

  beforeEach(() => {
    client = new Client(nombre, apellidos, fechaNacimiento, telefono, direccion, correo);
  });

  // Caso de prueba en donde se realizan dos depósitos válidos y verifique que el saldo de la cuenta coincide con la suma de los dos depósitos.
  it('6. Depositar monto válido', function () {
    var cuenta = mock<Count>();

    when(cuenta.getNumCuenta()).thenReturn(12345);

    let saldo = 0;
    when(cuenta.getCantidadDinero()).thenCall(() => saldo);

    var mockito = instance(cuenta);

    client.setCuentas(mockito);
    expect(client.getCuentas().length).toBe(1);

    saldo += 1000; 
    client.depositar(1000, 12345);
    saldo += 2000;
    client.depositar(2000, 12345);

    expect(client.getCuentas()[0].getCantidadDinero()).toBe(3000);
  });

  // al liquidar una cuenta de un cliente de una sucursal, la cantidad de cuentas del cliente disminuye en 1.
  it('7. Liquidar cuenta disminuye la cantidad de cuentas en 1', function () {
    var cuenta = mock<Count>();

    when(cuenta.getNumCuenta()).thenReturn(12345);

    var mockito = instance(cuenta);

    client.setCuentas(mockito);
    expect(client.getCuentas().length).toBe(1); 

    const resultado = client.liquidar(12345);
    expect(resultado).toBe(true); 
    expect(client.getCuentas().length).toBe(0);
  });

});