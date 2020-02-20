<?php

use DI\Container;
use Nette\Mail\Message;
use Nette\Mail\SendmailMailer;
use Nette\Mail\SmtpMailer;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Psr\Http\Server\RequestHandlerInterface as RequestHandler;
use Slim\Exception\HttpBadRequestException;
use Slim\Factory\AppFactory;
use Symfony\Component\Serializer\Encoder\JsonEncode;

use App\Form;
use App\Serde;

/**
 * Load Contacts for School
 *
 * @param string $school
 * @param Serde $serde
 * @return array
 */
function load_contacts($school, Serde $serde) {
    $json = file_get_contents(__DIR__ . '/data/contacts.json');
    $data = json_decode($json, $assoc=true);

    if (array_key_exists($school, $data)) {
        return array_map(function ($contact) use ($serde) {
             return $serde->deserialize(json_encode($contact), App\SchoolContact::class, 'json');
        }, $data[$school]);
    }

    return [];
}

/**
 * Send Email Notification
 *
 * @param Form $form
 * @param bool $eligible
 * @param Serde $serde
 * @return void
 */
function send_email(Form $form, bool $eligible, Serde $serde) {
    $json = $serde->serialize($form, 'json', [JsonEncode::OPTIONS => JSON_PRETTY_PRINT]);

    $mail = new Message;
    $mail->setFrom(getenv('APP_NOTIFY_FROM'));

    $contacts = load_contacts($form->childAttendsSchool, $serde);
    if ($contacts) {
        foreach($contacts as $contact) {
            $mail->addTo($contact->email, "{$contact->firstName} {$contact->lastName}");
        }
        $mail->addCc(getenv('APP_NOTIFY_CC'));
    } else {
        $mail->addTo(getenv('APP_NOTIFY_CC'));
    }

    $mail->setSubject('SNAP Screener Form Submission [' . ($eligible ? 'Eligible' : 'Ineligible') . ']');
    $mail->setBody(implode("\n\n", [
        "A submission has been recieved from the SNAP Screener Form",
        "Eligible: " . ($eligible ? 'Yes' : 'No'),
        "---",
        "Raw Input:\n$json",
    ]));

    $mailer = new SmtpMailer([
        'host' => getenv('APP_MAIL_HOST'),
        'port' => getenv('APP_MAIL_PORT'),
        'username' => getenv('APP_MAIL_USERNAME'),
        'password' => getenv('APP_MAIL_PASSWORD'),
        'secure' => getenv('APP_MAIL_SECURE'),
    ]);

    $mailer->send($mail);
}

$container = new Container();
$container->set('Serde', function () {
    return new Serde;
});

$app = \DI\Bridge\Slim\Bridge::create($container);
$app->addRoutingMiddleware();
$app->setBasePath('/api');

/**
 * CORS
 *
 * https://www.slimframework.com/docs/v3/cookbook/enable-cors.html
 */
$app->options('/{routes:.+}', function (
    Request $request,
    Response $response
) {
    return $response;
});

$app->add(function (Request $request, RequestHandler $handler) {
    $response = $handler->handle($request);

    if (getenv('APP_ENV') === 'development') {
        $response = $response
            ->withHeader('Access-Control-Allow-Origin', '*')
            ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
            ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    }

    return $response;
});

/**
 * Middleware for application/json API only
 */
$app->add(function (Request $request, RequestHandler $handler) {
    if ($request->getMethod() === 'OPTIONS') {
        return $handler->handle($request);
    }

    list($contentType) = explode(';', $request->getHeaderLine('Content-Type'));

    if (strtolower($contentType) !== 'application/json') {
        throw new HttpBadRequestException($request, "required content type: application/json");
    }

    return $handler->handle($request)->withHeader('Content-Type', 'application/json');
});

$app->post('/form-submit', function (
    Request $request,
    Response $response,
    Serde $serde
) {
    $jsonData = $request->getBody();

    $form = $serde->deserialize($jsonData, Form::class, 'json');
    $eligible = $form->eligible();
    $eligibility = $eligible ? 'eligible' : 'ineligible';
    $output = json_encode(compact('eligibility'));

    $response->getBody()->write($output);

    send_email($form, $eligible, $serde);

    return $response;
});

$errorMiddleware = $app->addErrorMiddleware(true, true, true);
$errorMiddleware->getDefaultErrorHandler()->forceContentType('application/json');

$app->run();
