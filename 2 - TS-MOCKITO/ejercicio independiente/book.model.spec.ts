import { Book } from './book.model';
import { Author } from './author';
import { instance, mock, when } from 'ts-mockito';

describe('Book', () => {
  let authorMock: Author;
  let book: Book;

  beforeEach(() => {
    authorMock = mock<Author>();

    // Stephen King Autor de libros de terror
    // James Dashner Autor de la saga Maze Runner
    when(authorMock.getName()).thenReturn('Stephen King');
    when(authorMock.equals('Stephen King')).thenReturn(true);
    when(authorMock.equals('James Dashner')).thenReturn(false);

    // Crear una instancia de Book con el mock del autor
    book = new Book('Goosebumps', instance(authorMock), 5);
  });

  // Prueba 1: Devolver el nombre del autor
  it('1. Debería devolver el nombre correcto del autor', () => {
    // Objetivo: Devolver el nombre correcto del autor.
    // Datos de prueba: 'Stephen King'
    // Resultado esperado: 'Stephen King'

    // uso de getName de la interfaz Author
    const name = book.getAuthor().getName();
    expect(name).toBe('Stephen King');
  });

  // Prueba 2: Comparar correctamente los nombres de autores
  it('2. Debería comparar correctamente los nombres de autores', () => {
    // Objetivo: Comparar correctamente los nombres de autores.
    // Datos de prueba: 'Stephen King', 'James Dashner'
    // Resultado esperado: true para 'Stephen King', false para 'James Dashner'
    
    // uso de equals de la interfaz Author
    expect(book.getAuthor().equals('Stephen King')).toBeTrue();
    expect(book.getAuthor().equals('James Dashner')).toBeFalse();
  });
});