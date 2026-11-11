
```mermaid
erDiagram
    ROL ||--o{ USUARIO : "tiene"
    CATEGORIA ||--o{ LIBRO : "clasifica"
    EDITORIAL |o--o{ LIBRO : "publica"
    LIBRO }o--o{ AUTOR : "es escrito por"

    ROL {
        int id_rol PK
        varchar nombre_rol
    }

    USUARIO {
        int id_usuario PK
        varchar nombre_usuario
        varchar email
        varchar password
        boolean activo
        datetime creado
    }

    CATEGORIA {
        int id_categoria PK
        varchar nombre_categoria
    }

    EDITORIAL {
        int id_editorial PK
        varchar nombre_editorial
        varchar pais
    }

    AUTOR {
        int id_autor PK
        varchar nombre_autor
        varchar nacionalidad
    }

    LIBRO {
        int id_libro PK
        varchar titulo
        text descripcion
        enum tipo
        varchar imagen
        smallint anio_publicacion
    }
```

## Entidades y atributos

Las claves primarias están marcadas con **(PK)**.

| Entidad | Atributos |
|---|---|
| **Rol** | **id_rol (PK)**, nombre_rol |
| **Usuario** | **id_usuario (PK)**, nombre_usuario, email, password, activo, creado |
| **Categoría** | **id_categoria (PK)**, nombre_categoria |
| **Editorial** | **id_editorial (PK)**, nombre_editorial, pais |
| **Autor** | **id_autor (PK)**, nombre_autor, nacionalidad |
| **Libro** | **id_libro (PK)**, titulo, descripcion, tipo, imagen, anio_publicacion |

`Libro` representa cualquier artículo del catálogo: el atributo `tipo` indica si es un libro, una novela ligera, una revista o un audiolibro.

## Relaciones y cardinalidades

| Relación | Cardinalidad | Lectura |
|---|---|---|
| Rol **tiene** Usuario | 1 : N | Un rol puede tener muchos usuarios (o ninguno). Cada usuario tiene exactamente un rol. |
| Categoría **clasifica** Libro | 1 : N | Una categoría puede tener muchos libros (o ninguno). Cada libro pertenece a exactamente una categoría. |
| Editorial **publica** Libro | 1 : N | Una editorial puede publicar muchos libros (o ninguno). Cada libro tiene una editorial, o ninguna si no se conoce. |
| Libro **es escrito por** Autor | N : M | Un libro puede tener varios autores y un autor puede haber escrito varios libros. |

## Cómo leer el diagrama

- `||` significa "exactamente uno".
- `|o` significa "cero o uno".
- `o{` significa "cero o muchos".

Por ejemplo, `ROL ||--o{ USUARIO` se lee: *un rol tiene cero o muchos usuarios, y cada usuario tiene exactamente un rol*.
