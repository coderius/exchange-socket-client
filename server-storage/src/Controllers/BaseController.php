<?php

namespace Admin\Testservertrade\Controllers;

abstract class BaseController
{
    protected function __construct() {
        
    }

    abstract public function dump($data);

    public function renderJson($data)
	{
		header('Content-Type: application/json; charset=utf-8');
		echo $data;
	}

}    