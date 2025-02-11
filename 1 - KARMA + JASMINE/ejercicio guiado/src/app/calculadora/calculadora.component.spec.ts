import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculadoraComponent } from './calculadora.component';

describe('CalculadoraComponent', () => {
  let component: CalculadoraComponent;
  let fixture: ComponentFixture<CalculadoraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalculadoraComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalculadoraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  describe('Concatenar número', function () {
    it("concatenar 2 + 5 = 25", function() {
      expect(component.concatenarNumero("2", "5")).toBe("25");
    });

    it("concatenar Vacío + . = 0.", function() {
      expect(component.concatenarNumero("", ".")).toBe("0.");
    });

    it("concatenar Decimal 5. + 5 = 5.5", function() {
      expect(component.concatenarNumero("5.", "5")).toBe("5.5");
    });

    it("concatenar Más de un punto 5.5 + . = 5.5", function() {
      expect(component.concatenarNumero("5.5", ".")).toBe("5.5");
    });
  });
});