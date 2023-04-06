<?php
namespace Admin\Testservertrade\App\Exceptions;

use \Exception;

class LogicException extends Exception
{
    /**
     * @return string the user-friendly name of this exception
     */
    public function getName()
    {
        return 'Logic Exception';
    }

    public function __toString(){
        return $this->getName() . ": " . $this->getMessage() . " in file " . $this->getFile() . " at line " . $this->getLine();
    }
    

}