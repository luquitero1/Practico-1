<?php

class LibroController
{
    private LibroModel $libros;

    public function __construct($db)
    {
        $this->libros = new LibroModel($db);
    }

    public function listar(): void
    {
        responder(['libros' => $this->libros->listar()]);
    }
}
