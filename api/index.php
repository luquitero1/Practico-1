<?php

ini_set('display_errors', '0');
session_start();

foreach (@file(__DIR__ . '/.env', FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES) ?: [] as $linea) {
    if (strpos($linea, '=') !== false && $linea[0] !== '#') {
        putenv(trim($linea));
    }
}

require __DIR__ . '/config/database.php';
require __DIR__ . '/src/Models/UsuarioModel.php';
require __DIR__ . '/src/Models/LibroModel.php';
require __DIR__ . '/src/Controllers/AuthController.php';
require __DIR__ . '/src/Controllers/LibroController.php';

function responder(array $datos, int $codigo = 200): void
{
    http_response_code($codigo);
    header('Content-Type: application/json; charset=utf-8');
    exit(json_encode($datos));
}

$rutas = [
    'POST /api/login'  => ['AuthController', 'login'],
    'POST /api/logout' => ['AuthController', 'logout'],
    'GET /api/me'      => ['AuthController', 'me'],
    'GET /api/libros'  => ['LibroController', 'listar'],
];

$ruta = $_SERVER['REQUEST_METHOD'] . ' ' . rtrim(parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH), '/');

if (!isset($rutas[$ruta])) {
    responder(['message' => 'Route not found.'], 404);
}

[$clase, $metodo] = $rutas[$ruta];
(new $clase((new Database())->getConnection()))->$metodo();
