<?php

namespace Admin\Testservertrade\App\Connection;

use Admin\Testservertrade\App\Connection\DatabaseConnectionInterface;

class DatabaseConnection implements DatabaseConnectionInterface
{

    protected static $instance;

    private function __construct() {
        try {
            self::$instance = new \PDO("mysql:host=" . DB_HOST . ";dbname=" . DB_NAME, DB_USER, DB_PASS);
        } catch (\PDOException $e) {
            echo "MySql Connection Error: " . $e->getMessage();
        }
    }

    public static function getInstance() {
        if (!self::$instance) {
            new DatabaseConnection();
        }

        return self::$instance;
    }
}
