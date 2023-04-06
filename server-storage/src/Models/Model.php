<?php

namespace Admin\Testservertrade\Models;

use PDO;
use Admin\Testservertrade\Models\ModelInterface;
use Admin\Testservertrade\App\Connection\DatabaseConnection as DB;

class Model implements ModelInterface
{

    /** @var PDO $db */
    private $query;
    protected $table;
    protected $attributes;
    protected $attributesChanged = []; //by setters

    public function __construct()
    {
    }

    public function populate($array, $isSelect)
    {
        foreach ($array as $name => $value) {
            $setter = 'set' . $name;
            if (method_exists($this, $setter)) {
                $this->$setter($value);
            }
        }

        if ($isSelect) {
            $this->cleanAttributesChanged();
        }
    }

    public function attributes()
    {
        $array = [];
        foreach ($this->attributes as $name) {
            $getter = 'get' . $name;
            if (method_exists($this, $getter)) {
                $array[$name] = $this->$getter();
            }
        }
        return $array;
    }

    public function updateAttributesChanged($name)
    {
        if (in_array($name, $this->attributesChanged) === false) {
            array_push($this->attributesChanged, $name);
        }
    }

    public function cleanAttributesChanged()
    {
        $this->attributesChanged = [];
    }

    public function getAttributesChanged()
    {
        return $this->attributesChanged;
    }

    public function isAttributeChanged($name)
    {
        return in_array($name, $this->attributesChanged);
    }

    // SELECT * FROM statistic ORDER BY id DESC LIMIT 1;
    public static function findLastOne()
    {
        $className = get_called_class();
        $model = new $className();

        $sql = "SELECT
            *
            FROM $model->table
            ORDER BY id 
            DESC 
            LIMIT 1";

        $stmt = DB::getInstance()->prepare($sql);

        $stmt->execute();
        $result = $stmt->fetch(PDO::FETCH_ASSOC);
        // var_dump($result);exit;
        if ($result) {
            $model->populate($result, true);
            $model->setQuery($sql);
            return $model;
        } else {
            return false;
        }
    }

    public static function findAll()
    {
        $className = get_called_class();
        $model = new $className();

        $sql = "SELECT * FROM $model->table";
        $model->setQuery($sql);
        // $stmt = DB::getInstance()->prepare($sql);

        // $stmt->execute();
        $stmt = DB::getInstance()->query($sql);
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

        $collection = [];
        if ($result) {
            foreach ($result as  $item) {
                $c = new $className();
                $c->populate($item, true);
                $collection[] = $c;
            }

            return $collection;
        } else {
            return false;
        }
    }

    public function save()
    {
        $id = $this->getId();
        if ($id !== null) {
            return $this->update($id);
        } else {
            return $this->insert();
        }
    }

    public function insert()
    {
        $sql = "INSERT INTO $this->table (";
        foreach ($this->attributes() as $name => $value) {
            $sql .= "$name,";
        }
        $sql = rtrim($sql, ",");
        $sql .= ") ";
        $sql .= "VALUES(";

        foreach ($this->attributes() as $name => $value) {
            $sql .= ":$name,";
        }
        $sql = rtrim($sql, ",");
        $sql .= ")";

        $this->setQuery($sql);
        // var_dump($this->getQuery($sql));
        $stmt = DB::getInstance()->prepare($sql);

        $execute = [];
        foreach ($this->attributes() as $name => $value) {
            $execute[":$name"] = $value;
        }

        return $stmt->execute($execute);
    }

    public function update($id)
    {
        $sql = "UPDATE $this->table SET ";

        foreach ($this->attributes() as $name => $value) {
            if ($this->isAttributeChanged($name)) {
                $sql .= "$name=:$name,";
            }
        }
        $sql = rtrim($sql, ",");
        $sql .= " WHERE id=" . $this->getId();

        $this->setQuery($sql);
        // var_dump($this->getQuery($sql));
        $stmt = DB::getInstance()->prepare($sql);

        $execute = [];
        foreach ($this->attributes() as $name => $value) {
            if ($this->isAttributeChanged($name)) {
                $execute["$name"] = "$value";
            }
        }

        return $stmt->execute($execute);
    }

    /**
     * Get the value of query
     */
    public function getQuery()
    {
        return $this->query;
    }

    /**
     * Set the value of query
     *
     * @return  self
     */
    public function setQuery($query)
    {
        $this->query = $query;

        return $this;
    }
}
