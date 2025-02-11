import { inject, TestBed } from '@angular/core/testing';
import { SortedListOfImmutables } from './sorted-list-of-immutables.model';
import { Listable } from './listable';

// Crear un objeto simulado que cumpla con la interfaz Listable
const mockListable: Listable = {
  getName: () => 'MockItem',  // Simula el nombre del ítem
  getWholesaleCost: () => 100, // Simula el costo mayorista del ítem
  getRetailValue: () => 150,    // Simula el valor de venta al público del ítem
  equals: (other: any) => other.getName() === 'MockItem' // Método equals para comparar si el ítem es igual al mock
};

describe('SortedListOfImmutables', () => {
  let lista: SortedListOfImmutables; // Variable para la lista a probar

  beforeEach(() => {
    // Inicializar la lista principal con una instancia vacía antes de cada prueba
    lista = new SortedListOfImmutables(null as any);
  });

  afterEach(() => {
    // Limpiar la lista después de cada prueba
    lista = null as any;
  });

  // ------------------------------------------------------------------------------------------------------------------------------------------------
  // Método 1: checkAvailability(itemToFind: Listable): boolean
  // Nombre de la prueba: revisar la disponibilidad de un ítem
  // Objetivo: Comprobar si un ítem está en la lista, devolviendo verdadero si está y falso si no está

  describe('checkAvailability', () => { 
    // Caso de prueba 1
    // Datos de prueba: ítem simulado
    // Resultado esperado: verdadero, el ítem está en la lista
    it('debería devolver verdadero si el ítem está en la lista', () => {
      // Arrange
      lista.add(mockListable); // Añadir un ítem simulado a la lista

      // Act
      const resultado = lista.checkAvailability(mockListable); // Comprobar si el ítem simulado está en la lista

      // Assert
      expect(resultado).toBe(true);
    });
    // Caso de prueba 2
    // Datos de prueba: ningún ítem
    // Resultado esperado: falso, el ítem no está en la lista
    it('debería devolver falso si el ítem no está en la lista', () => {
      // Arrange
      // (no se añade el ítem a la lista)

      // Act
      const resultado = lista.checkAvailability(mockListable); // Comprobar si el ítem simulado no está en la lista vacía

      // Assert
      expect(resultado).toBe(false);
    });
  });

  // ------------------------------------------------------------------------------------------------------------------------------------------------
  // Método 2: checkAvailabilityToList(listToCheck: SortedListOfImmutables): boolean
  // Nombre de la prueba: revisar la disponibilidad de una lista de ítems
  // Objetivo: Comprobar si todos los ítems de una lista están en la lista principal, devolviendo verdadero si están y falso si no están

  describe('checkAvailabilityToList', () => {
    it('debería devolver verdadero si todos los ítems de la lista están en la lista principal', () => {
      // Caso de prueba 1
      // Datos de prueba: ítem simulado
      // Resultado esperado: verdadero, todos los ítems de la lista secundaria están en la lista principal

      // Arrange
      lista.add(mockListable); // Añadir un ítem simulado a la lista principal
      const listaSecundaria = new SortedListOfImmutables(null as any);
      listaSecundaria.add(mockListable); // Crear una lista con el mismo ítem simulado

      // Act
      const resultado = lista.checkAvailabilityToList(listaSecundaria); // Comprobar si todos los ítems de la lista secundaria están en la lista principal

      // Assert
      expect(resultado).toBe(true);
    });

    it('debería devolver falso si no todos los ítems de la lista están en la lista principal', () => {
      // Caso de prueba 2
      // Datos de prueba: ítem simulado y otro ítem diferente
      // Resultado esperado: falso, no todos los ítems de la lista secundaria están en la lista principal

      // Arrange
      lista.add(mockListable); // Añadir un ítem simulado a la lista principal
      const listaSecundaria = new SortedListOfImmutables(null as any);
      listaSecundaria.add({ ...mockListable, getName: () => 'DifferentItem' }); // Crear una lista con un ítem diferente al simulado

      // Act
      const resultado = lista.checkAvailabilityToList(listaSecundaria); // Comprobar si no todos los ítems de la lista secundaria están en la lista principal

      // Assert
      expect(resultado).toBe(false);
    });
  });

  // ------------------------------------------------------------------------------------------------------------------------------------------------
  // Método 3: add(item: Listable): void
  // Nombre de la prueba: añadir un ítem a la lista
  // Objetivo: Añadir un ítem a la lista y comprobar que se añade correctamente
  // Datos de prueba: lista vacía, lista con un ítem simulado, lista con dos ítems simulados
  // Resultado esperado: tamaño de la lista según los ítems añadidos (0, 1, 2) según el caso de prueba

  describe('add', () => {
    it('debería validar que los ítems se añaden correctamente a la lista', () => {
      // Arrange
      const testCases = [
        // Parametrizado 1
        { input: [], expected: 0 },  // Lista vacía
        // Parametrizado 2
        { input: [mockListable], expected: 1 }, // Lista con un ítem simulado
        // Parametrizado 3
        { input: [mockListable, { ...mockListable, getName: () => 'MockItem2' }], expected: 2 } // Lista con dos ítems simulados
      ];

      // Act & Assert
      testCases.forEach(({ input, expected }) => {
        // Inicializar la lista antes de cada prueba
        lista = new SortedListOfImmutables(null as any); 

        // Agregar cada ítem a la lista
        input.forEach(item => lista.add(item));
        
        // Assert
        expect(lista.getSize()).toBe(expected); // Comprobar el tamaño final de la lista
      });
    });
  });
  
});