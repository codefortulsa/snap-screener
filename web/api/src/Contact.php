<?php

namespace App;

use JMS\Serializer\Annotation\Type;

class Contact {
    /**
     * @var string $firstName
     * @Type("string")
     */
    public $firstName;

    /**
     * @var string $contactMe
     * @Type("string")
     */
    public $contactMe;

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
     * @var string $contactPreference
     * @Type("string")
     */
    public $contactPreference;
}
