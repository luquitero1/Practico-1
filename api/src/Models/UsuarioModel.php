<?php

class UsuarioModel
{
    private $db;

    public function __construct($db)
    {
        $this->db = $db;
    }

    public function buscarPorEmail(string $email): ?array
    {
        $stmt = $this->db->prepare(
            'SELECT u.nombre_usuario AS nombre, u.password, u.id_rol, r.nombre_rol AS rol
               FROM usuario u
               INNER JOIN rol r ON r.id_rol = u.id_rol
              WHERE u.email = :email AND u.activo = 1'
        );
        $stmt->execute(['email' => $email]);

        return $stmt->fetch(PDO::FETCH_ASSOC) ?: null;
    }
}
