<?php

$data = new DatabaseHelper();
require_once 'security.php';
sec_session_start();
  
    class DatabaseHelper{

        private $db;

        //costruttore che inizializza la connessione al db
        public function  __construct(){
            $dbhost = "localhost";
            $dbuser = "root";
            $dbpass = "";
            $db = "tecweb";
            $this->db = new mysqli($dbhost, $dbuser, $dbpass,$db) or die("Connect failed: %s\n". $this->db -> error);
        }

        //funzione di utility per ottenere un pezzo di array di risultati
       function getRange($from, $to, $source){
            for($i=$from; $i<$to; $i++){
                $output[] = $source[$i];
            }
            return $output; 
        }

        //funzione di utility per ottenere tutto l'array di risultati
        function getArray($source){
            foreach($source as $single_element){
                $output[] = $single_element;
            }
            return $output;
        }

        //ottieni i tour più popolari basati sul numero di click
        function getTopTour($numberRequested){

            $stmt = $this->db->prepare("SELECT * FROM tour ORDER BY numeroVisite DESC LIMIT $numberRequested");

            $stmt->execute();
            $result = $stmt->get_result()->fetch_all(MYSQLI_ASSOC);
            return $this->getArray($result);
        }

        //ottieni gli eventi ordinati per data di creazione appartenenti a una specifica categoria
        function getAccordionEvents($numberRequested, $category){

            $stmt = $this->db->prepare("SELECT e.*, t.pathOrizzontale 
                                        FROM evento as e, tour as t 
                                        WHERE (e.nomeTour = t.nome AND t.tipologia = ?)  
                                        ORDER BY e.dataCreazione
                                        LIMIT ?");
            $stmt ->bind_param("si", $category, $numberRequested);
                                        
                                        

            $stmt->execute();
            $result = $stmt->get_result()->fetch_all(MYSQLI_ASSOC);
            return $this->getArray($result);
        }

        //ottieni gli artisti più popolari basati sul numero di biglietti venduti
        function getPopularArtists($numberRequested){

            $stmt = $this->db->prepare("SELECT a.*, count(*)bVend
                                        FROM tour t, artista a, evento e, biglietto b, featuring f 
                                        WHERE (t.nome = e.nomeTour AND f.idEvento = e.idEvento AND a.nickname = f.nickname AND b.idEvento = e.idEvento AND b.acquirente IS NOT NULL) 
                                        GROUP BY a.nickname
                                        ORDER BY bVend DESC
                                        LIMIT $numberRequested ");           

            $stmt->execute();
            $result = $stmt->get_result()->fetch_all(MYSQLI_ASSOC);
            return $this->getArray($result);
        }

        //ottieni numberRequested eventi (non filtrati per categoria) ordinati per data di creazione
        function getMostRecentEvents($numberRequested){

            $stmt = $this->db->prepare("SELECT  e.*, t.pathVerticale
                                        FROM evento e, tour t
                                        WHERE e.nomeTour = t.nome
                                        ORDER BY e.dataCreazione DESC
                                        LIMIT $numberRequested");
                                        

            $stmt->execute();
            $result = $stmt->get_result()->fetch_all(MYSQLI_ASSOC);
            return $this->getArray($result);
        }

        //funzione di ricerca
        function search($mode, $keyword){
            //prepara la query in base alla modalità
            $keyword = str_replace("+", " ", $keyword);
            switch($mode){
                case "luogo":
                    $citta = $keyword . "%";
                    $regione = $keyword . "%";
                    $stmt = $this->db->prepare("SELECT  e.*, t.pathQuadrata, h.nicknameArtista
                                                FROM evento e, tour t, hosting h
                                                WHERE (e.regione LIKE ? OR e.città LIKE ?) AND e.nomeTour = t.nome AND h.nomeTour = t.nome
                                                ORDER BY e.dataCreazione DESC");
                    $stmt ->bind_param("ss", $regione , $citta);
                break;

                case "nome":
                    $title = "%";
                    $keyword .= "%";
                    $title .= $keyword;
                    $stmt = $this->db->prepare("SELECT  e.*, t.pathQuadrata, h.nicknameArtista
                                                FROM evento e , tour t, hosting h
                                                WHERE e.nomeTour LIKE ? AND e.nomeTour = t.nome AND h.nomeTour = t.nome
                                                ORDER BY e.dataCreazione DESC");
                    $stmt ->bind_param("s", $title);
                break;

                case "artista":
                    $artist = "%";
                    $keyword .= "%";
                    $artist .= $keyword;
                    $stmt = $this->db->prepare("SELECT  e.*, t.pathQuadrata, h.nicknameArtista
                                                FROM evento e, featuring f, tour t, hosting h
                                                WHERE f.nickname LIKE ? AND e.nomeTour = t.nome AND e.idEvento = f.idEvento AND h.nomeTour = t.nome
                                                ORDER BY e.dataCreazione DESC");
                    $stmt ->bind_param("s", $artist);
                break;
            }

            $stmt->execute();
            $result = $stmt->get_result()->fetch_all(MYSQLI_ASSOC);
            if($result == null){$result = "error";
            return $result;}
            return $this->getArray($result);
          
        }

        //restituisce tutte le informazioni relative a un tour
        function getTour($tourName){
            $tourName = str_replace("+", " ", $tourName);

            $stmt = $this->db->prepare("SELECT  *
                                        FROM tour t, hosting h
                                        WHERE t.nome = ? AND t.nome = h.nomeTour");
            
            $stmt ->bind_param("s", $tourName);

            $stmt->execute();
            $result = $stmt->get_result()->fetch_all(MYSQLI_ASSOC);
            return $this->getArray($result);
        }

       //restituisce tutti gli eventi di un tour, inclusi posti rimanenti e biglietto con costo minimo per tour
       function getTourEvents($tourName){
        $tourName = str_replace("+", " ", $tourName);
        $stmt = $this->db->prepare("SELECT idEvento, sum(postiRimanenti) as postiRimanenti, sum(prezzoMinimo) as prezzoMinimo, descrizione, data, numeroBiglietti, prenotabileDal, indirizzo, città, regione, nomeTour, dataCreazione, pathQuadrata, location
                                    FROM(										
                                        SELECT  e.*, COUNT(*)postiRimanenti, t.pathQuadrata, MIN(b.prezzo)prezzoMinimo, l.nome AS location  
                                        FROM biglietto b, evento e, tour t, luogo l 
                                        WHERE  b.idEvento = e.idEvento AND b.acquirente IS NULL AND e.nomeTour = t.nome AND t.nome = ?
                                                AND (l.indirizzo = e.indirizzo AND l.città = e.città AND l.regione = e.regione)
                                        GROUP by e.idEvento
                                    
                                    
                                        UNION
                                    
                                        SELECT  e.*, 0, t.pathQuadrata, 0, l.nome AS location  
                                        FROM biglietto b, evento e, tour t, luogo l 
                                        WHERE  b.idEvento = e.idEvento AND b.acquirente IS NOT NULL AND e.nomeTour = t.nome AND t.nome = ?
                                                AND (l.indirizzo = e.indirizzo AND l.città = e.città AND l.regione = e.regione)
                                        GROUP by e.idEvento
                                        
                                    ) e
                                    GROUP BY e.idEvento");

        $stmt ->bind_param("ss", $tourName, $tourName);
        $stmt->execute();
        $result = $stmt->get_result()->fetch_all(MYSQLI_ASSOC);
        if($result == null){
            $result = "error";
            return $result;
        }
        return $this->getArray($result);
    }

        //restituisce i dettagli di un evento
        function getEvent($eventID){
            $eventID = str_replace("+", " ", $eventID);

            $stmt = $this->db->prepare("SELECT  e.*, t.pathVerticale, t.pathQuadrata, t.nome, t.descrizione AS descTour, l.nome AS location
                                        FROM evento e, tour t, luogo l
                                        WHERE e.idEvento = ? AND e.nomeTour = t.nome AND (l.indirizzo = e.indirizzo AND l.città = e.città AND l.regione = e.regione)");

            $stmt ->bind_param("s", $eventID);
            $stmt->execute();
            $result = $stmt->get_result()->fetch_all(MYSQLI_ASSOC);

            return $this->getArray($result);
        }

        function getFeaturing($eventID){
            $stmt = $this->db->prepare("SELECT  f.nickname
                                            FROM featuring f
                                            WHERE f.idEvento = ?");
    
            $stmt ->bind_param("s", $eventID);
            $stmt->execute();
   
            $result = $stmt->get_result();
            $check = $result->num_rows;


            if($check != 0){
                $a = $result->fetch_all(MYSQLI_ASSOC);
            return $this->getArray($a);
            }
            return  "errore";
        }

        //restituisce i biglietti disponibili di un evento
        function getEventTickets($eventID){
            $eventID = str_replace("+", " ", $eventID);

            $stmt = $this->db->prepare("SELECT sum(postiRimanenti) as postiRimanenti, b.posizione, b.prezzo 
                                        FROM(		
                                                SELECT prezzo, posizione,  COUNT(*) as postiRimanenti FROM biglietto 
                                                WHERE biglietto.idEvento = ? AND biglietto.acquirente IS NULL 
                                                
        
                                                UNION
        
                                                SELECT prezzo, posizione, 0 as postiRimanenti FROM biglietto 
                                                WHERE biglietto.idEvento = ? AND biglietto.acquirente IS NOT NULL
                                                GROUP BY biglietto.posizione, biglietto.prezzo
                                            ) b
                                        GROUP BY b.posizione, b.prezzo");

            $stmt ->bind_param("ss", $eventID, $eventID);
            $stmt->execute();
            $result = $stmt->get_result()->fetch_all(MYSQLI_ASSOC);

            return $this->getArray($result);
        }

        //restituisce i primi numberrequested eventi vicini al soldout
        function getNearSoldoutEvents($numberRequested){
            $stmt = $this->db->prepare("SELECT  e.*, COUNT(*)postiRimanenti, t.pathQuadrata  
                                        FROM biglietto b, evento e, tour t 
                                        WHERE  b.idEvento = e.idEvento AND b.acquirente IS NULL AND e.nomeTour = t.nome 
                                        GROUP by e.idEvento
                                        ORDER BY postiRimanenti ASC, e.numeroBiglietti DESC
                                        LIMIT $numberRequested");
            $stmt->execute();
            $result = $stmt->get_result()->fetch_all(MYSQLI_ASSOC);

            return $this->getArray($result);


        }

        //restituisce i dettagli del tour e dell'evento dato un id evento
        function getTourByEvent($eventId){
            $stmt = $this->db->prepare("SELECT  *  
                                        FROM  tour t, evento e
                                        WHERE t.nome = e.nomeTour AND e.idEvento = ?");
            $stmt ->bind_param("s", $eventId);
            $stmt->execute();

            $result = $stmt->get_result()->fetch_all(MYSQLI_ASSOC);
            $array = $this->getArray($result);
            return $array[0];
        }

        //controlla se l'evento è soldout
        function checkSoldout($eventId){
            $stmt = $this->db->prepare("SELECT  b.numero  
                                        FROM  biglietto b
                                        WHERE b.acquirente IS NULL AND b.idEvento = ?");
            $stmt ->bind_param("s", $eventId);
            $stmt->execute();

            $result = $stmt->get_result();
            $check = $result->num_rows;
            if($check == 0){
                $details = $this->getTourByEvent($eventId);
                $text = "L'evento numero {$eventId} del {$details["data"]} a {$details["città"]} del tour {$details["nome"]} è andato soldout!";
               
                $this->notify($details['organizzatore'], $eventId, $text);
            }
            return $check;
        }

        //compra quantity biglietti dello stesso tipo
        function buyTicket( $kind, $price, $quantity, $eventID){

            //trova quantity biglietti liberi della posizione e del prezzo specificato e per ognuno di quegli ID registrane l'acquirente
            $stmt = $this->db->prepare("SELECT  *  
                                        FROM  biglietto b
                                        WHERE b.acquirente IS NULL AND b.posizione = ? AND b.prezzo = ? AND b.idEvento = ?
                                        LIMIT ?");
            $stmt ->bind_param("sssi", $kind, $price, $eventID, $quantity);
            $stmt->execute();
            $tomark = $stmt->get_result()->fetch_all(MYSQLI_ASSOC);

            foreach($tomark as $ticket){
                $stmt = $this->db->prepare("UPDATE  biglietto b
                                            SET     b.acquirente = ?
                                            WHERE   b.numero = ? AND b.idEvento = ?");
                $stmt ->bind_param("sss", $_SESSION['email'], $ticket['numero'], $eventID);
                $stmt->execute();

                $this->checkSoldout($ticket['idEvento']);
            }
           return true;
        }

        //restituisce tutti i biglietti comprati dall'utente loggato
        function getBoughtTicket($numberRequested = 99){

            $stmt = $this->db->prepare("SELECT  *
                                        FROM biglietto b, evento e
                                        WHERE b.acquirente = ? AND b.idEvento = e.idEvento
                                        ORDER BY e.data DESC
                                        LIMIT ?");

            $stmt ->bind_param("si", $_SESSION['email'], $numberRequested);
            $stmt->execute();

            $result = $stmt->get_result();
            $check = $result->num_rows;


            if($check != 0){
                $a = $result->fetch_all(MYSQLI_ASSOC);
            return $this->getArray($a);
            }
            return  "errore";
        }
        
        //gestisce logout, login e registrazione
        function save() {
            if($_POST['type']==1){
                $name=$_POST['name'];
                $surname=$_POST['surname'];
                $date=$_POST['date'];
                $email=$_POST['email'];
                $password=$_POST['password'];
               
                // Crea una chiave casuale
                $random_salt = hash('sha512', uniqid(mt_rand(1, mt_getrandmax()), true));
                // Crea una password usando la chiave appena creata.
                $password = hash('sha512', $password.$random_salt);
                // Inserisci a questo punto il codice SQL per eseguire la INSERT nel tuo database
                $cliente=1;
                $organizzatore=0;
                $amministratore=0;
                // Assicurati di usare statement SQL 'prepared'.
                $select = $this->db->prepare("SELECT eMail FROM utente WHERE eMail = ?");
                $select->bind_param("s", $email);
                $select->execute();
               
              /*  $result = $select->get_result()->fetch_all(MYSQLI_ASSOC);

               $result = $this->getArray($result);*/
               $result = $select->get_result();
               $exist = $result->num_rows;
                if($exist!=0){
                    echo json_encode(array("statusCode"=>201));
                }else{
                    if ($insert_stmt = $this->db->prepare("INSERT INTO utente (eMail, password, nome, cognome, dataDiNascita, cliente, organizzatore, amministratore, salt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)")) {    
                        $insert_stmt->bind_param("sssssiiis", $email, $password, $name, $surname, $date, $cliente, $organizzatore, $amministratore, $random_salt); 
                        // Esegui la query ottenuta.
                        $insert_stmt->execute();
                        echo json_encode(array("statusCode"=>200));
                    } else {
                            echo json_encode(array("statusCode"=>201));
                    }
                } 
            }
            if($_POST['type']==2){
                
                $email=$_POST['email'];
                $password=$_POST['password'];
                $login = login($email, $password, $this->db);
                if ($login)
                {
                    echo json_encode(array("statusCode"=>200));
                }
                else{
                    echo json_encode(array("statusCode"=>201));
                }
            }
            if($_POST['type']==3){
                
                session_destroy();
                    echo json_encode(array("statusCode"=>200));
            }      
        }

        //restituisce l'id evento più grande
        function getMaxEventId() {
            $stmt = $this->db->prepare("SELECT e.idEvento
                                        FROM evento e
                                        ORDER BY e.idEvento DESC
                                        LIMIT 1");

            $stmt->execute();
            $result = $stmt->get_result()->fetch_all(MYSQLI_ASSOC);

            $array = $this->getArray($result);
            return $array[0]['idEvento'];
        }

        //crea un nuovo tour (e eventualmente nuovi artisti in hosting)
        function insertTour($nome, $tipologia, $descrizione, $quadrata, $orizzontale, $verticale, $hosts) {  
            
            $quadrata = str_replace('C:\xampp\htdocs\progetto\\', '', $quadrata);
            $quadrata = str_replace('C:\fakepath\\', 'img\\', $quadrata);
            $quadrata = str_replace("\\", "/", $quadrata);

            $orizzontale = str_replace('C:\xampp\htdocs\progetto\\', '', $orizzontale);
            $orizzontale = str_replace('C:\fakepath\\', 'img\\', $orizzontale);
            $orizzontale = str_replace("\\", "/", $orizzontale);

            $verticale = str_replace('C:\xampp\htdocs\progetto\\', '', $verticale);
            $verticale = str_replace('C:\fakepath\\', 'img\\', $verticale);
            $verticale = str_replace("\\", "/", $verticale);

            $stmt = $this->db->prepare("INSERT INTO tour(nome, descrizione, soldOut, pathVerticale, pathOrizzontale, pathQuadrata, tipologia, numeroVisite, organizzatore)
                                        VALUES (?, ?, '0', ?, ?, ?, ?, '0', ? )");

            $stmt ->bind_param("sssssss", $nome, $descrizione, $verticale, $orizzontale, $quadrata, $tipologia, $_SESSION["email"] );
            $stmt->execute();

            foreach($hosts as $host) {
                //controlla se l'artista esiste
                $stmt = $this->db->prepare("SELECT * FROM artista a WHERE a.nickname = ?");
                $stmt ->bind_param("s", $host);
                $stmt->execute();
                $result = $stmt->get_result();
                $check = $result->num_rows;

                if($check == 0){
                    //se non esiste lo crea
                    $stmt = $this->db->prepare("INSERT INTO artista(nickname) VALUES (?)");
                    $stmt ->bind_param("s", $host);
                    $stmt->execute();
                }

                //aggiorna l'hosting
                $stmt = $this->db->prepare("INSERT INTO hosting(nicknameArtista, nomeTour) VALUES (?, ?)");
                $stmt ->bind_param("ss", $host, $nome);
                $stmt->execute();
            }

            return true;
        }
        
        //crea un nuovo evento (e eventualmente anche un nuovo luogo e nuovi artisti in featuring)
        function insertEvent($tour, $regione, $citta, $indirizzo, $data, $dataPrenotazione, $descrizione, $nomeLuogo, $features) {
                
            //controlla se il luogo esiste già, e se non esiste crealo
            $stmt = $this->db->prepare("SELECT * 
                                        FROM luogo
                                        WHERE indirizzo = ? AND città = ? AND regione = ?");
            $stmt ->bind_param("sss", $indirizzo, $citta, $regione);
            $stmt->execute();
            $result = $stmt->get_result();
            $check = $result->num_rows;


            if($check == 0){
                $stmt = $this->db->prepare("INSERT INTO luogo(indirizzo, città, regione, capienza, nome)
                                            VALUES (?, ?, ?, '300', ?)");
                $stmt ->bind_param("ssss", $indirizzo, $citta, $regione, $nomeLuogo);
                $stmt->execute();
            }

            //trova l'id da dare all'evento
            $maxId = $this->getMaxEventId();
            $maxId++;

            $dataCreazione = date("Y-m-d");


            //inserisci nuovo evento
            $stmt = $this->db->prepare("INSERT INTO evento(idEvento, descrizione, data, numeroBiglietti, prenotabileDal, indirizzo, città, regione, nomeTour, dataCreazione)
                                        VALUES (?, ?, ?, '0', ?, ?, ?, ?, ?, ?)");

            $stmt ->bind_param("sssssssss", $maxId, $descrizione, $data, $dataPrenotazione, $indirizzo, $citta, $regione, $tour, $dataCreazione);
            $stmt->execute();

            //gestisci i featuring
            foreach($features as $feature) {
                //controlla se l'artista esiste
                $stmt = $this->db->prepare("SELECT * FROM artista a WHERE a.nickname = ?");
                $stmt ->bind_param("s", $feature);
                $stmt->execute();
                $result = $stmt->get_result();
                $check = $result->num_rows;

                if($check == 0){
                    //se non esiste lo crea
                    $stmt = $this->db->prepare("INSERT INTO artista(nickname) VALUES (?)");
                    $stmt ->bind_param("s", $feature);
                    $stmt->execute();
                }

                //aggiorna i fearuring
                $stmt = $this->db->prepare("INSERT INTO featuring(nickname, idEvento) VALUES (?, ?)");
                $stmt ->bind_param("ss", $feature, $maxId);
                $stmt->execute();
            }

            return $maxId;
        }
        
        //restituisce tutti gli artisti host dato un tour
        function getHosting($nomeTour) {
            $nomeTour = str_replace("+", " ", $nomeTour);

            $stmt = $this->db->prepare("SELECT nicknameArtista 
                                        FROM hosting
                                        WHERE nomeTour = ?");
            $stmt ->bind_param("s", $nomeTour);
            $stmt->execute();

            $result = $stmt->get_result()->fetch_all(MYSQLI_ASSOC);
            return $this->getArray($result);
        }

        //restituisce tutti gli artisti host dato un evento
        function getHostingByEvent($eventId) {
            $eventId = str_replace("+", " ", $eventId);

            $stmt = $this->db->prepare("SELECT h.nicknameArtista 
                                        FROM hosting h, tour t, evento e 
                                        WHERE e.nomeTour = t.nome AND t.nome = h.nomeTour AND e.idEvento = ?");
            $stmt ->bind_param("s", $eventId);
            $stmt->execute();

            $result = $stmt->get_result()->fetch_all(MYSQLI_ASSOC);
            return $this->getArray($result);
        }

        //restituisce la lista di tour creati dall'utente loggato
        function getMyTour(){
            $stmt = $this->db->prepare("SELECT * FROM tour t 
                                        WHERE t.organizzatore = ? 
                                        ORDER BY nome");

            $stmt ->bind_param("s", $_SESSION["email"]);
            $stmt->execute();
            $result = $stmt->get_result();

            $check = $result->num_rows;


            if($check != 0){
                $a = $result->fetch_all(MYSQLI_ASSOC);
            return $this->getArray($a);
            }
            return  "errore";
        }

        //crea i biglietti (in ingresso vengono passati 3 array da ciclare, in cui ogni voce rappresenta una tipologia di biglietto diversa)
        function insertTicket($posizione, $prezzo, $quantita, $eventId){
            $elementsNumber = count($posizione);
            $maxTicketId = 1;

            for($i = 0; $i < $elementsNumber; $i++){
                for($j = 0; $j < $quantita[$i]; $j++){
                    $stmt = $this->db->prepare("INSERT INTO biglietto(idEvento, prezzo, numero, posizione, acquirente)
                                            VALUES (?, ?, ?, ?, NULL)");

                    $stmt ->bind_param("ssss", $eventId, $prezzo[$i], $maxTicketId, $posizione[$i]);
                    $stmt->execute();

                    $maxTicketId++;
                }     
            }
            return true;
        }

        //abilita l'utente attuale come organizzatore
        function becomeOrg(){
            $stmt = $this->db->prepare("UPDATE  utente
                                        SET     organizzatore = 1
                                        WHERE   eMail = ?");
            $stmt ->bind_param("s", $_SESSION['email']);
            $stmt->execute();
            $_SESSION['organizzatore'] = 1;

            $this->notify($_SESSION['email'], "0", "Congratulazioni! Ora sei un organizzatore.");
        }

        //trova le notifiche non lette dell'utente attuale
        function checkNotif(){
            $stmt = $this->db->prepare("SELECT * FROM notifica n
                                        WHERE n.eMail = ? AND n.isRead = 0
                                        ORDER BY n.timestamp DESC");

            $stmt ->bind_param("s", $_SESSION["email"]);
            $stmt->execute();
         

            $result = $stmt->get_result();
            $check = $result->num_rows;


            if($check != 0){
                $a = $result->fetch_all(MYSQLI_ASSOC);
            return $this->getArray($a);
            }
            return  "errore";
   
        }


        //trova tutte le notifiche dell'utente attuale
        function getAllNotif(){
            $stmt = $this->db->prepare("SELECT * FROM notifica n
                                        WHERE n.eMail = ?
                                        ORDER BY n.timestamp DESC");

            $stmt ->bind_param("s", $_SESSION["email"]);
            $stmt->execute();
           
            $result = $stmt->get_result();
            $check = $result->num_rows;


            if($check != 0){
                $a = $result->fetch_all(MYSQLI_ASSOC);
                return $this->getArray($a);
            }
            return  "errore";
        }

        function notify($userId, $eventId, $text){
            //trova l'id più grande delle notifiche e aumentalo di 1
            $stmt = $this->db->prepare("SELECT idNot
                                        FROM notifica
                                        ORDER BY idNot DESC
                                        LIMIT 1");

            $stmt->execute();
            $result = $stmt->get_result()->fetch_all(MYSQLI_ASSOC);

            $array = $this->getArray($result);
            $newId = $array[0]['idNot'];
            $newId++;
            $timestamp = date("Y-m-d H:i:s");

            //inserisci la nuova notifica
            $stmt = $this->db->prepare("INSERT INTO notifica(idNot, testo, eMail, idEvento, timestamp, isRead) 
                                        VALUES (?, ?, ?, ?, ?, '0')");

            $stmt ->bind_param("sssss", $newId, $text, $userId, $eventId, $timestamp);
            $stmt->execute();

            return true;
        }

        //trova i compratori di un evento
        function getBuyers($eventId){
            $eventID = str_replace("+", " ", $eventId);

            $stmt = $this->db->prepare("SELECT acquirente FROM biglietto 
                                        WHERE biglietto.idEvento = ? AND biglietto.acquirente IS NOT NULL
                                        GROUP BY acquirente");

            $stmt ->bind_param("s", $eventId);
            $stmt->execute();
            $result = $stmt->get_result()->fetch_all(MYSQLI_ASSOC);

            return $this->getArray($result); 
        }

        function editEvent($eventId, $newDate){

            //salvo i dettagli dell'evento e del tour prima di modificarlo per riusarlo nella notifica se serve
            $details = $this->getTourByEvent($eventId);

            //aggiorno l'evento
            $stmt = $this->db->prepare("UPDATE  evento
                                        SET     data = ?
                                        WHERE   idEvento = ?");
            $stmt ->bind_param("ss", $newDate, $eventId);
            $stmt->execute();

            //trova utenti da notificare
           $buyers = $this->getBuyers($eventId);

          
            if(count($buyers) == 0){
                return true;
            }
            else{
                $text = "L'evento del tour {$details["nome"]} che si teneva il {$details["data"]} a {$details["città"]} è stato spostato al {$newDate}";
             
                foreach($buyers as $user){
                    
                   $a= $this->notify($user["acquirente"], $eventId, $text);
                }
                return $a;
            }      
        }

        function readNotif(){
            $stmt = $this->db->prepare("SELECT * FROM notifica n
                                        WHERE n.eMail = ? AND n.isRead = '0'");

            $stmt ->bind_param("s", $_SESSION['email']);
            $stmt->execute();
            $result =  $stmt->get_result()->fetch_all(MYSQLI_ASSOC);

            $notReadNotif = $this->getArray($result);
            
            foreach($notReadNotif as $singleNotif){
                $stmt = $this->db->prepare("UPDATE  notifica
                                            SET     isRead = '1'
                                            WHERE   idNot = ?");
                $stmt ->bind_param("s", $singleNotif['idNot']);
                $stmt->execute();
            }
            return true;
        }
    }
?>