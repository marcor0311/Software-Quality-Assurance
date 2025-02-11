import { Person } from './person';

describe('Person', () => {

  // Prueba para verificar la creación de una instancia de Person
  it('should create an instance', () => {
    expect(new Person()).toBeTruthy();
  });

  // Pruebas parametrizadas para la clase Person
  let component: Person;

  beforeEach(() => {
    component = new Person();
  });

  // Caso de prueba para validar que la edad es asignada correctamente
  it('Casos de prueba para validar que la edad es asignada correctamente', () => {
    [
      { age: 0 },
      { age: 5 },
      { age: 17 },
    ].forEach(({ age }) => {
      component.setAge(age);
      expect(component.getAge()).toBe(age);
    });
  });

  // Caso de prueba para validar que la persona puede conducir
  it('Casos de prueba para validar que la persona puede conducir', () => {
    [
      { age: 18 },
      { age: 21 },
      { age: 99 },
    ].forEach(({ age }) => {
      component.setAge(age);
      expect(component.canDrive()).toBe(true);
    });
  });

  // Caso de prueba para validar que la persona NO puede conducir
  it('Casos de prueba para validar que la persona NO puede conducir', () => {
    [
      { age: -1 },
      { age: 10 },
      { age: 17 },
    ].forEach(({ age }) => {
      component.setAge(age);
      expect(component.canDrive()).toBe(false);
    });
  });

});