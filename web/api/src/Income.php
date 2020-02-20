<?php

namespace App;

class Income {
    use IntegerNormalizerTrait;

    /** @var int $amount */
    public $amount;

    /** @var string $period */
    public $period;

    public function setAmount($amount) {
        $this->amount = $this->integerNormalizer($amount);
    }

    public function monthly() {
        switch ($this->period) {
            case 'monthly':
                return $this->amount;
            case 'yearly':
                return round($this->amount / 12);
            case 'weekly':
                return round(($this->amount * 52) / 12);
            case '2-weeks':
                return round(($this->amount * (52 / 2)) / 12);
        }

        throw new Exception('Invalid period: ' . $this->period);
    }
}
