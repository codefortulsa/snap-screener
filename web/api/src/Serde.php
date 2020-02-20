<?php

namespace App;

use Symfony\Component\PropertyInfo\Extractor\ReflectionExtractor;
use Symfony\Component\Serializer\Encoder\JsonEncoder;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
use Symfony\Component\Serializer\Serializer;
use Symfony\Component\Serializer\SerializerInterface;

use Doctrine\Common\Annotations\AnnotationRegistry;
use JMS\Serializer\SerializerBuilder;

class Serde implements SerializerInterface {
    /** @var Serializer $serializer */
    private $serializer;

    public function __construct() {
        $encoders = [new JsonEncoder()];
        $normalizers = [new ObjectNormalizer(null, null, null, new ReflectionExtractor())];
        $this->serializer = new Serializer($normalizers, $encoders);
   }

    public function serialize($data, string $format, array $context = []) {
        return $this->serializer->serialize($data, $format, $context);
    }

    public function deserialize($data, string $type, string $format, array $context = []) {
        return $this->serializer->deserialize($data, $type, $format, $context);
    }
}
