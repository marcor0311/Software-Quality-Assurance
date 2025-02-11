import { Library } from './library.model';
import { Book } from './book.model';
import { Author } from './author';
import { mock, instance, when } from 'ts-mockito';

describe('Library', () => {
  let library: Library;
  let book1: Book;
  let book2: Book;

  beforeEach(() => {
    library = new Library();
  });

  // Prueba 1: Agregar libros a la biblioteca
  it('1. Debería agregar libros a la biblioteca', () => {
    // Objetivo: Validar que los libros se agreguen correctamente.
    // Datos de prueba: 'It' y 'The Shining' de 'Stephen King'
    // Resultado esperado: La biblioteca debe contener 2 libros.

    const authorMock = mock<Author>(); // Crear un mock de Author
    // uso de getName de la interfaz Author
    when(authorMock.getName()).thenReturn('Stephen King');
    // uso de equals de la interfaz Author
    when(authorMock.equals('Stephen King')).thenReturn(true);

    book1 = new Book('It', instance(authorMock), 5);
    book2 = new Book('The Shining', instance(authorMock), 4.8);

    library.addBook(book1);
    library.addBook(book2);

    expect(library.size()).toBe(2);
  });

  // Prueba 2: Buscar libros por autor
  it('2. Debería encontrar libros por el autor especificado', () => {
    // Objetivo: Verificar que se encuentren los libros del autor.
    // Datos de prueba: Autor 'Stephen King'
    // Resultado esperado: Debe devolver ambos libros ('It' y 'The Shining').

    const authorMock = mock<Author>(); 
    // uso de getName de la interfaz Author
    when(authorMock.getName()).thenReturn('Stephen King');
    // uso de equals de la interfaz Author
    when(authorMock.equals('Stephen King')).thenReturn(true);
    when(authorMock.equals('James Dashner')).thenReturn(false);

    book1 = new Book('It', instance(authorMock), 5);
    book2 = new Book('The Shining', instance(authorMock), 4.8);

    library.addBook(book1);
    library.addBook(book2);

    const books = library.searchByAuthor('Stephen King').getBooks();
    expect(books.length).toBe(2);
    expect(books[0].getTitle()).toBe('It');
    expect(books[1].getTitle()).toBe('The Shining');
  });
});