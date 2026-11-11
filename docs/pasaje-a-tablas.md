# Pasaje a tablas

Biblioteca Virtual **E-Book** — Práctico 2

Pasaje del [MER](MER.md) al modelo relacional. La base implementada está en [`api/config/init.sql`](../api/config/init.sql).

Notación: la **clave primaria** va en negrita y subrayada, y las claves foráneas llevan **(FK)**.

## Tablas

- rol (<ins>**id_rol**</ins>, nombre_rol)
- usuario (<ins>**id_usuario**</ins>, nombre_usuario, email, password, activo, creado, id_rol **(FK)**)
- categoria (<ins>**id_categoria**</ins>, nombre_categoria)
- editorial (<ins>**id_editorial**</ins>, nombre_editorial, pais)
- autor (<ins>**id_autor**</ins>, nombre_autor, nacionalidad)
- libro (<ins>**id_libro**</ins>, titulo, descripcion, tipo, imagen, anio_publicacion, id_categoria **(FK)**, id_editorial **(FK)**)
- libro_autor (<ins>**id_libro**</ins> **(FK)**, <ins>**id_autor**</ins> **(FK)**)

## Claves foráneas

| Tabla | Clave foránea | Referencia |
|---|---|---|
| usuario | id_rol | rol (id_rol) |
| libro | id_categoria | categoria (id_categoria) |
| libro | id_editorial | editorial (id_editorial) |
| libro_autor | id_libro | libro (id_libro) |
| libro_autor | id_autor | autor (id_autor) |

## Cómo se pasó cada relación

| Relación del MER | Cardinalidad | Resultado en tablas |
|---|---|---|
| Rol tiene Usuario | 1 : N | La clave de `rol` pasa como foránea a `usuario` (`id_rol`, obligatoria). |
| Categoría clasifica Libro | 1 : N | La clave de `categoria` pasa como foránea a `libro` (`id_categoria`, obligatoria). |
| Editorial publica Libro | 1 : N | La clave de `editorial` pasa como foránea a `libro` (`id_editorial`, puede ser nula). |
| Libro es escrito por Autor | N : M | Se crea la tabla intermedia `libro_autor`, cuya clave primaria es la combinación de las dos foráneas. |

## Detalle de campos

### rol

| Campo | Tipo | Restricciones |
|---|---|---|
| id_rol | INT | PK, auto incremental |
| nombre_rol | VARCHAR(50) | NOT NULL, UNIQUE |

### usuario

| Campo | Tipo | Restricciones |
|---|---|---|
| id_usuario | INT | PK, auto incremental |
| nombre_usuario | VARCHAR(80) | NOT NULL |
| email | VARCHAR(100) | NOT NULL, UNIQUE |
| password | VARCHAR(255) | NOT NULL (hash de la contraseña) |
| activo | BOOLEAN | NOT NULL, por defecto TRUE |
| creado | DATETIME | NOT NULL, por defecto la fecha actual |
| id_rol | INT | NOT NULL, FK a rol (id_rol) |

### categoria

| Campo | Tipo | Restricciones |
|---|---|---|
| id_categoria | INT | PK, auto incremental |
| nombre_categoria | VARCHAR(60) | NOT NULL, UNIQUE |

### editorial

| Campo | Tipo | Restricciones |
|---|---|---|
| id_editorial | INT | PK, auto incremental |
| nombre_editorial | VARCHAR(100) | NOT NULL |
| pais | VARCHAR(60) | NULL |

### autor

| Campo | Tipo | Restricciones |
|---|---|---|
| id_autor | INT | PK, auto incremental |
| nombre_autor | VARCHAR(100) | NOT NULL |
| nacionalidad | VARCHAR(60) | NULL |

### libro

| Campo | Tipo | Restricciones |
|---|---|---|
| id_libro | INT | PK, auto incremental |
| titulo | VARCHAR(150) | NOT NULL |
| descripcion | TEXT | NULL |
| tipo | ENUM('Book', 'Light novel', 'Magazine', 'Audiobook') | NOT NULL, por defecto 'Book' |
| imagen | VARCHAR(255) | NULL |
| anio_publicacion | SMALLINT | NULL |
| id_categoria | INT | NOT NULL, FK a categoria (id_categoria) |
| id_editorial | INT | NULL, FK a editorial (id_editorial) |

### libro_autor

| Campo | Tipo | Restricciones |
|---|---|---|
| id_libro | INT | PK (compuesta), FK a libro (id_libro) |
| id_autor | INT | PK (compuesta), FK a autor (id_autor) |
