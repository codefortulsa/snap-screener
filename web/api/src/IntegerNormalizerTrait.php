<?php

namespace App;

trait IntegerNormalizerTrait {
    public function integerNormalizer(string $input) {
        return (int) preg_replace('/[^\d]/', '', $input);
    }
}
