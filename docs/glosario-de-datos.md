**entidad: rol**

- Tipo entidad: Maestra
- Se albergan los roles que puede tener un usuario dentro del sitio. El rol define a qué secciones puede entrar cada usuario (Administrador o Usuario).
  - [id_rol (int ai), nombre_rol (varchar(50) not null)]

**entidad: usuario**

- Tipo entidad: Subordinada (rol)
- Se albergan los datos de las personas que pueden iniciar sesión en el sitio: su nombre, el correo y la contraseña (guardada como hash) con los que ingresan, si la cuenta está activa y la fecha en que se creó.
  - [id_usuario (int ai), nombre_usuario (varchar(80) not null), email (varchar(100) not null), password (varchar(255) not null), activo (boolean not null), creado (datetime not null), id_rol (int foranea rol:id_rol)]

**entidad: categoria**

- Tipo entidad: Maestra
- Se albergan las categorías o géneros en los que se clasifican los libros del catálogo (novela, cuentos, fantasía, etc.).
  - [id_categoria (int ai), nombre_categoria (varchar(60) not null)]

**entidad: editorial**

- Tipo entidad: Maestra
- Se albergan las editoriales que publican los libros del catálogo, con su nombre y su país.
  - [id_editorial (int ai), nombre_editorial (varchar(100) not null), pais (varchar(60) null)]

**entidad: autor**

- Tipo entidad: Maestra
- Se albergan los autores de los libros del catálogo, con su nombre y su nacionalidad.
  - [id_autor (int ai), nombre_autor (varchar(100) not null), nacionalidad (varchar(60) null)]

**entidad: libro**

- Tipo entidad: Subordinada (categoria, editorial)
- Se albergan los artículos del catálogo de la biblioteca. Cada artículo puede ser un libro, una novela ligera, una revista o un audiolibro (campo tipo), y guarda su título, descripción, imagen de tapa y año de publicación.
  - [id_libro (int ai), titulo (varchar(150) not null), descripcion (text null), tipo (enum('Book','Light novel','Magazine','Audiobook') not null), imagen (varchar(255) null), anio_publicacion (smallint null), id_categoria (int foranea categoria:id_categoria), id_editorial (int null foranea editorial:id_editorial)]

**entidad: libro_autor**

- Tipo entidad: Subordinada (libro, autor)
- Se alberga qué autores escribieron cada libro. Es la tabla intermedia de la relación muchos a muchos entre libro y autor: un libro puede tener varios autores y un autor varios libros.
  - [id_libro (int foranea libro:id_libro), id_autor (int foranea autor:id_autor)]
