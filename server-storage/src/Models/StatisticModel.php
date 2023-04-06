<?php

namespace Admin\Testservertrade\Models;

use Admin\Testservertrade\Models\Model;

class StatisticModel extends Model{
    
    private $id;
    private $minExchange;
    private $maxExchange;
    private $arithmeticMean;
    private $standardDeviation;
    private $countLostExchanges;
    private $mode;
    private $startDateTime;
    private $computeAllExecTime;
    private $computeExecTime;



    public function __construct() {
        parent::__construct();
        
        //Code here ...
        $this->table = "statistic";

        //Table mutable attributes
        $this->attributes = [
            'minExchange',
            'maxExchange',
            'arithmeticMean',
            'standardDeviation',
            'countLostExchanges',
            'mode',
            'startDateTime',
            'computeAllExecTime',
            'computeExecTime',
        ];
    }

    public function jsonSerialize()
    {
        return get_object_vars($this);
    }

    
    /**
     * Get the value of id
     */ 
    public function getId()
    {
        return $this->id ? $this->id : null;
    }

    /**
     * Set the value of id
     *
     * @return  self
     */ 
    public function setId($id)
    {
        $this->id = $id;
        return $this;
    }

    /**
     * Get the value of minExchange
     */ 
    public function getMinExchange()
    {
        return $this->minExchange;
    }

    /**
     * Set the value of minExchange
     *
     * @return  self
     */ 
    public function setMinExchange($minExchange)
    {
        $this->minExchange = $minExchange;
        $this->updateAttributesChanged('minExchange');
        // var_dump($this->getAttributesChanged());die;
        return $this;
    }

    /**
     * Get the value of maxExchange
     */ 
    public function getMaxExchange()
    {
        return $this->maxExchange;
    }

    /**
     * Set the value of maxExchange
     *
     * @return  self
     */ 
    public function setMaxExchange($maxExchange)
    {
        $this->maxExchange = $maxExchange;
        $this->updateAttributesChanged('maxExchange');
        return $this;
    }

    /**
     * Get the value of arithmeticMean
     */ 
    public function getArithmeticMean()
    {
        return $this->arithmeticMean;
    }

    /**
     * Set the value of arithmeticMean
     *
     * @return  self
     */ 
    public function setArithmeticMean($arithmeticMean)
    {
        $this->arithmeticMean = $arithmeticMean;
        $this->updateAttributesChanged('arithmeticMean');
        return $this;
    }

    /**
     * Get the value of standardDeviation
     */ 
    public function getStandardDeviation()
    {
        return $this->standardDeviation;
    }

    /**
     * Set the value of standardDeviation
     *
     * @return  self
     */ 
    public function setStandardDeviation($standardDeviation)
    {
        $this->standardDeviation = $standardDeviation;
        $this->updateAttributesChanged('standardDeviation');
        return $this;
    }

    /**
     * Get the value of countLostExchanges
     */ 
    public function getCountLostExchanges()
    {
        return $this->countLostExchanges;
    }

    /**
     * Set the value of countLostExchanges
     *
     * @return  self
     */ 
    public function setCountLostExchanges($countLostExchanges)
    {
        $this->countLostExchanges = $countLostExchanges;
        $this->updateAttributesChanged('countLostExchanges');
        return $this;
    }

    /**
     * Get the value of mode
     */ 
    public function getMode()
    {
        return $this->mode;
    }

    /**
     * Set the value of mode
     *
     * @return  self
     */ 
    public function setMode($mode)
    {
        $this->mode = $mode;
        $this->updateAttributesChanged('mode');
        return $this;
    }

    /**
     * Get the value of startDateTime
     */ 
    public function getStartDateTime()
    {
        return $this->startDateTime;
    }

    /**
     * Set the value of startDateTime
     *
     * @return  self
     */ 
    public function setStartDateTime($startDateTime)
    {
        $this->startDateTime = $startDateTime;
        $this->updateAttributesChanged('startDateTime');
        return $this;
    }

    /**
     * Get the value of computeAllExecTime
     */ 
    public function getComputeAllExecTime()
    {
        return $this->computeAllExecTime;
    }

    /**
     * Set the value of computeAllExecTime
     *
     * @return  self
     */ 
    public function setComputeAllExecTime($computeAllExecTime)
    {
        $this->computeAllExecTime = $computeAllExecTime;
        $this->updateAttributesChanged('computeAllExecTime');
        return $this;
    }

    /**
     * Get the value of computeExecTime
     */ 
    public function getComputeExecTime()
    {
        return $this->computeExecTime;
    }

    /**
     * Set the value of computeExecTime
     *
     * @return  self
     */ 
    public function setComputeExecTime($computeExecTime)
    {
        $this->computeExecTime = $computeExecTime;
        $this->updateAttributesChanged('computeExecTime');
        return $this;
    }
    
}