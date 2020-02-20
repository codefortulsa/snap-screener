<?php

$loader = require_once __DIR__ . '/../vendor/autoload.php';

$loader->addPsr4('App\\', [
    __DIR__ . '/src',
]);

$loader->addPsr4('', [
    __DIR__ . '/lib',
]);

// TODO: add required variables checking
// TODO: find a way to load without the existence of file (e.g. Heroku)
if (is_file(__DIR__ . '/.env')) {
    $dotenv = Dotenv\Dotenv::create(__DIR__);
    $dotenv->load();
}

require_once __DIR__ . '/init.php';
