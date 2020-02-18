<?php 
require_once 'security.php';
sec_session_start();
if(isset( $_SESSION['email'])) { 
?>
<!DOCTYPE html>
<html lang="it">
<head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">


    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
    <link rel="stylesheet" href="css/style.css" >
    <link href="//netdna.bootstrapcdn.com/font-awesome/4.6.3/css/font-awesome.css" rel="stylesheet" />


    <title>TICKETtONE</title>
    <!--<link rel="stylesheet" type="text/css" href="./css/style.css" />-->
    <script
    src="https://code.jquery.com/jquery-3.4.1.min.js"
    integrity="sha256-CSXorXvZcTkaix6Yvo6HppcZGetbYMGWSFlBw8HfCJo="
    crossorigin="anonymous"></script>
    <script src="js/account.js" type="text/javascript"></script>
    <script src="js/notification.js" type="text/javascript"></script>

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>

</head>
<body>
<div id= "idHeader" class="container-fluid">
        <header>
            <nav class="navbar navbar-expand-md navbar-dark ">
                <div class="container-fluid">
                   
                    <a class="navbar-brand logoHeader" href="home.php"><h1 class="text-monospace text-white" id="h1my">TICKETtONE</h1></a>
                    <button class="navbar-toggler logoHeader" type="button" data-toggle="collapse" data-target="#navbarCollapse">
                            <span class="navbar-toggler-icon"></span>
                    </button>
                    
                
                    <div class="collapse navbar-collapse flex-column align-items-end ml-lg-2 ml-0 " id="navbarCollapse">
                        <div class="navbar-nav flex-row  align-items-center">
                            <?php 
                                
                                if(isset( $_SESSION['email'])) {
                                    $nome = $_SESSION['name'];
                                    echo    "<button class=\" align-self-stretch fakeBtn\">Ciao ", $nome, "</button>"
                            ?>
                                <a class="ex4" href="account.php"><span class="p1 fa-stack fa-2x has-badge"><em class="p3 fa fa-user fa-stack-1x " aria-hidden="true"></em></span></a>
                                
                                <div class="ex4" id="cartNav">
                                </div>       

                                <div class="ex4" id="notif">
                                </div>     
                        
                                <button class=" align-self-stretch logoutBtn" href=# onclick="logOut()">Log out <span class="sr-only">(current)</span></button> 
                                <input type="hidden" id="session" value="true"></input>

                            <?php

                                } else{ 
                            ?>
                                <a class="nav-link align-self-stretch text-white" href="login.php">Entra/Registrati <span class="sr-only">(current)</span></a> 
                                <input type="hidden" id="session" value="false"></input>
                            <?php
                                } 
                            ?>
                        </div>
                    
                        <div class="barraRicerca">
                            <form class="form-inline my-2 my-lg-0 barraRicerca2" method="get" action= "search.php">
                                <fieldset class="my-2 my-lg-0 barraRicerca2">
                                <legend>Ricerca eventi secondo criteri</legend>
                                <ul class="navbar-nav flex-row align-items-center mb-md-1 mt-md-0 mb-3 mt-2 barraRicerca2">
                                    <li class="barraRicerca2">
                                        <label for="stringa">Parola chiave per la ricerca</label>
                                        <input class="form-control mr-sm-2 barraRicerca3" type="text" id="stringa" name="stringa" placeholder="Ricerca artista o evento" aria-label="Search" name= "stringa" >
                                        
                                    </li>
                                    <li>
                                        <button class="btn btn-outline mr-sm-2" type="submit" id="cerca">Cerca</button>
                                    </li>
                                    <li>
                                    <div class="radio text-white chooseSearch">
                                            <div><label for="optradio">Titolo <input type="radio" name="optradio" value = "nome" checked></label></div>
                                            <div><label for="optradio">Luogo <input  type="radio" name="optradio" value="luogo" ></label></div>
                                            <div><label for="optradio">Artista <input type="radio" name="optradio" value="artista"></label></div>
                                        </div> 
    
                                    </li>
                                </ul>
                            </fieldset>
                            </form>
                        <div> 
                    </div>   
                </div>       
            </nav>  
        </header>
    </div>

    <div class="container-fluid">
    <div class="spacer5"></div>
   
    <main>
        
        <div class="row">
            <div class="col-sm-3">
                <div id="infoUtente">
                    <h3>Informazioni utente</h3>
                    <?php 
                    $email = $_SESSION['email'];
                    $email = str_replace("_",".",$email);
                    echo '<p id="info"> Nome: ', $_SESSION['name'], "<br/>
                    Cognome: ", $_SESSION['cognome'], "<br/>
                    Data di nascita: ", $_SESSION['data'], "<br/>
                    Email: ", $email, "<br/>";

                    if($_SESSION['organizzatore'] == 0){
                        echo 'Ruolo: cliente
                            </p>
                            
                            <button class= "buttonCart border border-dark" type="submit" onclick="organizzatore()"> Richiedi privilegi organizzatore
                            </button>
                           <div class="spacer5"></div>
                            <p>
                            I privilegi organizzatore ti permettono di creare nuovi Tour ed Eventi
                            </p>
                           
                        ';
                    }else{
                        echo "Ruolo: organizzatore</p>";
                    }

                    ?> 
                </div>
            </div>
            <div class="col-sm-7 offset-sm-1 divAsideAcq">
                 
                <aside class="line" id="biglietti">
                    <div class="spacer2"></div>
                    <h3 class="provaAllinea">Biglietti acquistati &nbsp</h3> 

                </aside>
                
            </div>
        </div>
        <?php if($_SESSION['organizzatore'] == 1){

        ?>
        <div class="spacer5"></div>
        <div class="row">
        <div class="col-sm-12">
                <h3 class="provaAllinea">Tour da te organizzati  &nbsp</h3>
                
                <div class="spacer5"></div>
        </div>
        </div>
        <div class="row">
                <div class="col-sm-4">
                    <div id="tour">

                    </div>
                </div>
                <div class="col-sm-8">
                    <div  id="event" class="evAcc">
                    </div>
                </div>
            
        </div>
        <?php
            
        }
        ?>
    </main>
    <div class="spacer5"></div>
    </div>


    <div  id="idFooter" class="container-fluid">
        <footer class="text-white text-center">
            <p>    
                email: placeholder@fake.com</br>
                tel:7849274983</br>
                sede legale: via Casamia 30L, Cesena </br>
            </p>
            <p>
                tutti i diritti riservati
            </p>
        </footer>
    </div>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>

    
</body>
</html>

<?php
}else {
    echo "Non hai eseguito l'accesso";
}
?>