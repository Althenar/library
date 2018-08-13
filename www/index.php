<?php
require_once __DIR__ . '/vendor/autoload.php';

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Silex\Application;
use Symfony\Component\Debug\ErrorHandler;
use Symfony\Component\Debug\ExceptionHandler;

ExceptionHandler::register();
ErrorHandler::register();

$app = new Silex\Application();
$app['debug'] = true;

$app->register(new Silex\Provider\DoctrineServiceProvider(), array(
    'db.options' => array(
        'driver'    => 'pdo_mysql',
        'host'      => '127.0.0.1',
        'dbname'    => 'r_library',
        'user'      => 'php_library',
        'password'  => 'php_library',
        'charset'   => 'utf8'
    ),
));

$app->register(new Silex\Provider\TwigServiceProvider(), array(
    'twig.path' => __DIR__.'/views',
));

$app->get('/{new}', function(Request $request, $new) use ($app) {
    if ($new == 'new') {
        $bookcases = $app['db']->fetchAll('SELECT * FROM bookcase', array());
        return $app['twig']->render('index2.html.twig', array(
            'bookcases' => $bookcases
        ));
    } else {
    $bookcases = $app['db']->fetchAll('SELECT * FROM bookcase');
    foreach ($bookcases as &$b) {
        $b['shelves'] = $app['db']->fetchAll('SELECT * FROM shelf WHERE id_bookcase = ? ORDER BY row DESC, col ASC', array((int) $b['id']));
        foreach($b['shelves'] as &$s) {
            $s['books'] = $app['db']->fetchAll('SELECT * FROM book WHERE id_shelf = ?', array((int) $s['id']));
        }
    }
        return $app['twig']->render('index.html.twig', array(
            'bookcases' => $bookcases
        ));
    }
})->value('new', 'no');

$app->view(function (array $controllerResult) use ($app) {
    return $app->json($controllerResult);
});

$app->POST('/api/book', function(Application $app, Request $request) {
    $book = $request->request->all();
    $app['db']->insert('book', $book);
    $book['id'] = $app['db']->lastInsertId();

    return $book;
});


$app->POST('/api/bookcase', function(Application $app, Request $request) {


            return new Response('How about implementing addBookcase as a POST method ?');
            });


$app->POST('/api/shelf', function(Application $app, Request $request) {
    $shelf = $request->request->all();
    $app['db']->insert('shelf', $shelf);
    $shelf['id'] = $app['db']->lastInsertId();

    return $shelf;
});


$app->DELETE('/api/book/{id}', function(Application $app, Request $request, $id) {

            $app['db']->executeQuery('DELETE FROM book WHERE id = ?', array((int) $id));
            return new Response('OK');
            });


$app->DELETE('/api/bookcase/{id}', function(Application $app, Request $request, $id) {

            return $app['db']->executeQuery('DELETE FROM bookcase WHERE id = ?', array((int) $id));
            });


$app->DELETE('/api/shelf/{id}', function(Application $app, Request $request, $id) {
            $app['db']->executeQuery('DELETE FROM shelf WHERE id = ?', array((int) $id));
            return new Response('OK');
            });


$app->GET('/api/book/{id}', function(Application $app, Request $request, $id) {
            return $app['db']->fetchAll('SELECT * FROM book WHERE id = ?', array((int) $id));
            });

$app->GET('/api/shelf/{id}/books', function(Application $app, Request $request, $id) {
            return $app['db']->fetchAll('SELECT * FROM book WHERE id_shelf = ?', array((int) $id));
            });

$app->GET('/api/bookcase/{id}/shelves', function(Application $app, Request $request, $id) {
            return $app['db']->fetchAll('SELECT * FROM shelf WHERE id_bookcase = ? ORDER BY row DESC, col ASC', array((int) $id));
            });


$app->GET('/api/bookcase/{id}', function(Application $app, Request $request, $id) {

            return $app['db']->fetchAll('SELECT * FROM bookcase WHERE id = ?', array((int) $id));
            });


$app->GET('/api/bookcase', function(Application $app, Request $request) {
            return $app['db']->fetchAll('SELECT * FROM bookcase', array());
            });


$app->get('/api/book', function(Application $app, Request $request) {


            return $app['db']->fetchAll('SELECT * FROM book', array());
            });

$app->GET('/api/bookList', function(Application $app, Request $request) {

            return $app['db']->fetchAll("SELECT id, CONCAT('[', isbn, '] ', author, ' - ', title) name FROM book", array());
            });

$app->GET('/api/shelf/{id}', function(Application $app, Request $request, $id) {

            return $app['db']->fetchAll('SELECT * FROM shelf WHERE id = ?', array((int) $id));
});


$app->GET('/api/shelf', function(Application $app, Request $request) {

            return $app['db']->fetchAll('SELECT * FROM shelf', array());
            });

$app->GET('/api/book/externalData/{isbn}', function(Application $app, Request $request, $isbn) {
    $curl = curl_init();
    curl_setopt_array($curl, array(
        CURLOPT_RETURNTRANSFER => 1,
        CURLOPT_URL => 'https://www.goodreads.com/search.xml?key=vqiDyOjwahioB6ALBvIt8w&q='.$isbn,
        CURLOPT_USERAGENT => 'Codular Sample cURL Request'
    ));
    $result = curl_exec($curl);
    $xml = simplexml_load_string($result);
    $json = json_encode($xml);
    $array = json_decode($json,TRUE);
    return $array;
});

$app->PUT('/api/book/{id}', function(Application $app, Request $request, $id) {
    $book = $request->request->all();
    $app['db']->update('book', $book, array('id' => (int) $id));

    return $app['db']->fetchAll('SELECT * FROM book WHERE id = ?', array((int) $id))[0];
});

$app->run();
