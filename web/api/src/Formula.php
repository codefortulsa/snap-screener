<?php

namespace App;

class Formula {
    /** @var int $add */
    public $add;

    /** @var int[] $table */
    public $table;

    public function __construct(int $add, array $table) {
        $this->add = $add;
        $this->table = $table;
    }

    public function calculate_limit(int $persons) {
        if (array_key_exists($persons, $this->table)) {
            return $this->table[$persons];
        }

        $keys = array_keys($this->table);
        $k = max($keys);
        $v = $this->table[$k];

        return $v + (($persons - $k) * $this->add);
    }
}
