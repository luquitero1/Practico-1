<?php

class LibroModel
{
    private $db;

    public function __construct($db)
    {
        $this->db = $db;
    }

    public function listar(): array
    {
        return $this->db->query(
            'SELECT id_libro, titulo, descripcion, tipo, imagen FROM libro ORDER BY id_libro'
        )->fetchAll(PDO::FETCH_ASSOC);
    }
}
