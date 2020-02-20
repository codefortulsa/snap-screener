<?php

namespace App;

use JMS\Serializer\Annotation\Type;

class SchoolContact {
    /**
     * @var string $firstName
     * @Type("string")
     */
    public $firstName;

    /**
     * @var string $lastNamee
     * @Type("string")
     */
    public $lastName;

    /**
     * @var string $phone
     * @Type("string")
     */
    public $phone;

    /**
     * @var string $email
     * @Type("string")
     */
    public $email;

    /**
     * @var string $school
     * @Type("string")
     */
    public $school;
}
