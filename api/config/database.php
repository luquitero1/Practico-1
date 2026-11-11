<?php

class Database
{
    public function getConnection(): PDO
    {
        $conn = new PDO(
            'mysql:host=' . getenv('DB_HOST') . ';dbname=' . getenv('DB_NAME') . ';charset=utf8mb4',
            getenv('DB_USER'),
            getenv('DB_PASS')
        );
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        return $conn;
    }
}
