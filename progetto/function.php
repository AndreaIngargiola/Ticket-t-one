<?php

require_once 'database.php';

if(isset($_POST['action']) && !empty($_POST['action'])) {
    $action = $_POST['action'];
    switch($action) {
        case 'save' : $data->save();break;
        default : break;
       
    }
}

if (isset($_REQUEST['notifiche'])) {
    $articoli =  $data->checkNotif();
               header('Content-Type: application/json');
               echo json_encode($articoli);
}

if (isset($_REQUEST['allMessages'])) {
    $articoli =  $data->getAllNotif();
               header('Content-Type: application/json');
               echo json_encode($articoli);
}

if (isset($_REQUEST['readMessages'])) {
    $articoli =  $data->readNotif();
               header('Content-Type: application/json');
               echo json_encode($articoli);
}

if (isset($_REQUEST['organizzatore'])) {                
    $articoli =  $data->becomeOrg();


                header('Content-Type: application/json');
                echo json_encode($articoli);
}

if (isset($_REQUEST['evento'])) {                
    $evento =  $data->getEvent($_REQUEST['evento']);
    $featuring = $data->getFeaturing($_REQUEST['evento']);
    $biglietti = $data->getEventTickets($_REQUEST['evento']);
    $host = $data->getHostingByEvent($_REQUEST['evento']);
    $articoli = array('event' =>$evento, 'featuring'=>$featuring, 'biglietti'=> $biglietti, 'hosts' => $host);
  

                header('Content-Type: application/json');
                echo json_encode($articoli);
}

if (isset($_REQUEST['tour'])) {                
    $tour =  $data->getTour($_REQUEST['tour']);
    $eventi= $data->getTourEvents($_REQUEST['tour']);
    $host = $data->getHosting($_REQUEST['tour']);
    

    $articoli = array('tour'=>$tour, 'eventi' =>$eventi, 'hosts' =>$host);

                header('Content-Type: application/json');
                echo json_encode($articoli);
}

if (isset($_REQUEST['cerca'])) {                
$articoli =  $data->search($_REQUEST['mode'], $_REQUEST['stringa']);

            header('Content-Type: application/json');
            echo json_encode($articoli);
}


if (isset($_REQUEST['artist'])) {
    $articoli = $data->getPopularArtists(8);
  
    
            header('Content-Type: application/json');
            echo json_encode($articoli);
}

if (isset($_REQUEST['recentEvent'])) {
    $articoli = $data->getMostRecentEvents(10);

    
            header('Content-Type: application/json');
            echo json_encode($articoli);
}

if (isset($_REQUEST['topTour'])) {

    $articoli = $data->getTopTour(5);

    header('Content-Type: application/json');
    echo json_encode($articoli);
}

if (isset($_POST['getTourByEvent'])) {
    $info = $data->getTourByEvent($_POST['idEvento']);
 
    $nomeTour = $info['nomeTour'];
    $citta = $info['città'];
    $data = $info['data'];
    $infoTour = array('nomeTour' => $nomeTour, 'data'=> $data, 'citta' =>$citta);
    header('Content-Type: application/json');
    echo json_encode($infoTour);
}

if (isset($_POST['inviaMess'])) {

    $buyers = $data->getBuyers($_POST['idEvento']);
    $id = $_POST['idEvento'];
    $nomeTour = $_POST['nomeTour'];
    $citta = $_POST['citta'];


    $text1 =  "L'organizzatore dell'evento {$id} del tour {$nomeTour} che si terrà a {$citta} ti ha mandato un messaggio:<br/>";

    $text2 = $_POST['messaggio'];
    $text = $text1.$text2;
   
    foreach($buyers as $client){
        $articolo = $data->notify($client['acquirente'], $_POST['idEvento'], $text);
     
    }
    header('Content-Type: application/json');
    echo json_encode(true);
}

if (isset($_REQUEST['concerti'])) {
    $articoli = $data->getAccordionEvents(8, 'Concerto');

            header('Content-Type: application/json');
            echo json_encode($articoli);
}

if (isset($_REQUEST['partite'])) {
    $articoli = $data->getAccordionEvents(8, "Manifestazione Sportiva");
    
            header('Content-Type: application/json');
            echo json_encode($articoli);
}

if (isset($_REQUEST['spettacoli'])) {
    $articoli = $data->getAccordionEvents(8, "Spettacolo Teatrale");
    
            header('Content-Type: application/json');
            echo json_encode($articoli);
}

if (isset($_REQUEST['cinema'])) {
    $articoli = $data->getAccordionEvents(8, "Proiezione Cinematografica");
    
            header('Content-Type: application/json');
            echo json_encode($articoli);
}

if (isset($_REQUEST['esaurimento'])) {
 $articoli = $data->getNearSoldoutEvents(10);
    
            header('Content-Type: application/json');
            echo json_encode($articoli);
}

if (isset($_REQUEST['svuota'])) {
    $item_data = "";
    setcookie($_SESSION['email'], $item_data, time() + (86400 * 30));
    $articoli ="Il carrello è vuoto";
               header('Content-Type: application/json');
               echo json_encode($articoli);
   }

   
   if (isset($_POST['acquista'])) {
        $posizione = $_POST['posizione'];
        $prezzo = $_POST['prezzo'];
        $quantita = $_POST['quantita'];
        $evento = $_POST['evento'];

      $articoli = $data->buyTicket($posizione, $prezzo, $quantita, $evento);

   }

   if (isset($_POST['inserisciTour'])) {

    $nome  = $_POST['nome'];
    $tipologia  = $_POST['tipologia'];
    $descrizione  = $_POST['descrizione'];
    $quadrata  = $_POST['quadrata'];
    $orizzontale  = $_POST['orizzontale'];
    $verticale  = $_POST['verticale'];
    $host = $_POST['host'];

  $articoli = $data->insertTour($nome, $tipologia, $descrizione, $quadrata, $orizzontale, $verticale, $host);


}
   
   if (isset($_POST['inserisciEvento'])) {

    $tour  = $_POST['nomeTour'];
    $regione  = $_POST['regione'];
    $citta  = $_POST['citta'];
    $indirizzo  = $_POST['indirizzo'];
    $date = $_POST['date'];
    $dataPrenotazione = $_POST['dataPrenotazione'];
    $descrizione = $_POST['descrizione'];
    $nomeLuogo = $_POST['nomeLuogo'];
    $feature = $_POST['feature'];

   $articoli = $data->insertEvent($tour, $regione, $citta, $indirizzo, $date, $dataPrenotazione, $descrizione, $nomeLuogo, $feature);


      header('Content-Type: application/json');
    echo json_encode($articoli);
}

if (isset($_POST['inserisci'])) {

    $posizione  = $_POST['posizione'];
    $prezzo  = $_POST['prezzo'];
    $quantita  = $_POST['numero'];
    $idEvento  = $_POST['id'];
    

$articoli = $data->insertTicket($posizione, $prezzo, $quantita, $idEvento);

  
  header('Content-Type: application/json');
  echo json_encode($articoli);

}

if (isset($_POST['modificaEvento'])) {

    $eventID  = $_POST['idEvento'];
    $newDate  = $_POST['date'];

$articoli = $data-> editEvent($eventID, $newDate);

  
  header('Content-Type: application/json');
  echo json_encode($articoli);

}

   if (isset($_REQUEST['getCookies'])) {
    if(!empty($_COOKIE[$_SESSION['email']])) {
        $cart_data = json_decode($_COOKIE[$_SESSION['email']], true);
    
    header('Content-Type: application/json');
               echo json_encode($cart_data);
    }else{
        header('Content-Type: application/json');
               echo json_encode("error");
    }
}
if (isset($_REQUEST['getBoughtTiketAccount'])) {

        $articoli = $data->getBoughtTicket(8);

    
            header('Content-Type: application/json');
            echo json_encode($articoli);

    
}

if (isset($_REQUEST['getAllBoughtTiket'])) {

    $articoli = $data->getBoughtTicket();


        header('Content-Type: application/json');
        echo json_encode($articoli);


}

if (isset($_REQUEST['getMyTour'])) {

    $allEvents;
    $articoli = $data->getMyTour();
 /*   foreach($articoli as $tour){
        $eventi= $data->getTourEvents($tour["nome"]);
        $allEvents[]=$eventi;
    }

*/
        header('Content-Type: application/json');
        echo json_encode($articoli);


}


if (isset($_REQUEST['rimuovi'])) {
    if(!empty($_COOKIE[$_SESSION['email']])) {
        $cart_data = json_decode($_COOKIE[$_SESSION['email']], true);
         $message ="";
        foreach($cart_data as $biglietto => $values){
           
            if( $cart_data[$biglietto]['idEvento'] == $_REQUEST['idEvento'] &&  $cart_data[$biglietto]['posizione'] == $_REQUEST['posizione'] &&  $cart_data[$biglietto]['prezzo'] == $_REQUEST['prezzo'] ){
                unset($cart_data[$biglietto]);
                ksort($cart_data);
                $cart_data=array_values($cart_data);
              
         
                
             $item_data = json_encode($cart_data);
             setcookie($_SESSION['email'], $item_data, time() + (86400 * 30));
             
             header('Content-Type: application/json');
             echo json_encode($message);
       
             break;
            }
        }
    } 

}

if (isset($_REQUEST['modifica'])) {
    if(!empty($_COOKIE[$_SESSION['email']])) {
        $cart_data = json_decode($_COOKIE[$_SESSION['email']], true);
      $message ="";
        foreach($cart_data as $biglietto => $values){
           
            if( $cart_data[$biglietto]['idEvento'] == $_REQUEST['idEvento'] &&  $cart_data[$biglietto]['posizione'] == $_REQUEST['posizione'] &&  $cart_data[$biglietto]['citta'] == $_REQUEST['citta'] &&  $cart_data[$biglietto]['data'] == $_REQUEST['data'] && $cart_data[$biglietto]['prezzo'] == $_REQUEST['prezzo']){
                $cart_data[$biglietto]['quantita'] = $_REQUEST['quantita'];
            }
        }
        $item_data = json_encode($cart_data);
        setcookie($_SESSION['email'], $item_data, time() + (86400 * 30));
       ;

    
    header('Content-Type: application/json');
    echo json_encode($message);
     } 
}

if(isset($_REQUEST['carrello'])){
    $vuoto = true;
    $errore = false;
    if(!empty($_COOKIE[$_SESSION['email']])) {
        $cart_data = json_decode($_COOKIE[$_SESSION['email']], true);
      
        foreach($cart_data as $biglietto => $values){
           
            if( $cart_data[$biglietto]['idEvento'] == $_REQUEST['idEvento'] &&  $cart_data[$biglietto]['posizione'] == $_REQUEST['posizione'] &&  $cart_data[$biglietto]['citta'] == $_REQUEST['citta'] &&  $cart_data[$biglietto]['data'] == $_REQUEST['data'] && $cart_data[$biglietto]['prezzo'] == $_REQUEST['prezzo']){
              if(  $_REQUEST['rimanenti'] >= $cart_data[$biglietto]['quantita'] + $_REQUEST['quantita']){
                    $cart_data[$biglietto]['quantita'] = $cart_data[$biglietto]['quantita'] + $_REQUEST['quantita'];
                    $vuoto= false;
              }else{
                $errore = true;
                $n = $cart_data[$biglietto]['quantita'];
                $message = "Quantità non disponibile. Hai già $n biglietti di questa categoria nel carrello";
                $array = array(
                    'success' => false,
                    'message' => $message
                );
              }
            }
        }
     } 
     if(!$errore){
        if($vuoto) {
            $item_array = array(
                'posizione' => $_REQUEST['posizione'],
                'prezzo' => $_REQUEST['prezzo'],
                'idEvento' => $_REQUEST['idEvento'],
                'quantita' => $_REQUEST['quantita'],
                "img" => $_REQUEST['img'],
                'nome' => $_REQUEST['nome'],
                'rimanenti' => $_REQUEST['rimanenti'],
                'citta' => $_REQUEST['citta'],
                'data' => $_REQUEST['data']
            );

        
            $cart_data = array();

            if(!empty($_COOKIE[$_SESSION['email']])) {
                $cart_data = json_decode($_COOKIE[$_SESSION['email']], true);
            }
        
        array_push($cart_data, $item_array);
        }
        $item_data = json_encode($cart_data);
        setcookie($_SESSION['email'], $item_data, time() + (86400 * 30));
        
        $evento = $_REQUEST['nome'];
        $biglitto = $_REQUEST['posizione'];

        $message = "$evento, $biglitto, aggiunto al carrello";
        $array = array(
            'success' => true,
            'message' => $message
        );

    }
    header('Content-Type: application/json');
    echo json_encode($array);

}



?>