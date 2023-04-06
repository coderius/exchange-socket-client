<?php
namespace Admin\Testservertrade\Models;

interface ModelInterface{
    // public function findOne(int $id);
    public static function findLastOne();
    public static function findAll();
    public function save();
    public function insert();
    public function update($id);
}