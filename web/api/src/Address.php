<?php

namespace App;

use JMS\Serializer\Annotation\Type;

class Address {
    /**
     * @var string $street
     * @Type("string")
     */
    public $street;

    /**
     * @var string $city
     * @Type("string")
     */
    public $city;

    /**
     * @var string $state
     * @Type("string")
     */
    public $state;

    /**
     * @var string $zip
     * @Type("string")
     */
    public $zip;
}
