<?php
require __DIR__.'/../vendor/autoload.php';
// Load Config
require_once __DIR__.'/../config/config.php';

set_time_limit(0);

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");


use Admin\Testservertrade\Controllers\TradeController;
// use Admin\Testservertrade\App\Exceptions\LogicException;

$controller = new TradeController();

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    try {
        $controller->indexAction();
        
    } catch (\Exception $e) {
        echo $e;
        exit;
    }
}

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    try {
        $request = file_get_contents('php://input');
        $controller->createAction($request);
    } catch (\Exception $e) {
        echo $e;
        exit;
    }
    
}





 