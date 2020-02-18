<!DOCTYPE html>
<html lang="it">
<head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <link rel="icon" type="image/png" href="iconaSito.png">
    <link rel="shortcut icon" type="image/png" href="iconaSito.png">

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
    <script src="js/home.js" type="text/javascript"></script>
    <script src="js/notification.js" type="text/javascript"></script>

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
    
    

</head>
<body class="mainPage">
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
                                require_once 'security.php';
                                sec_session_start();
                                
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

    

<div class="spacer5"></div>
    <main>
        <div class="container-fluid">
            <div class="row">
                <div class="col-sm-8">
                    <div>
                        <h2 class= "mb-3">Top Tour</h2>
                        <div id="topTourCarousel" class="carousel slide" data-ride="carousel">
                          <div class="carousel-inner row  mx-auto" id="topTourCar">
                          
                          </div>
                          <a class="carousel-control-prev" href="#topTourCarousel" role="button" data-slide="prev">
                          <em class="fa fa-angle-left" style="font-size:100px;color:white;font-weight:2000"></em>
                            <span class="sr-only">Previous</span>
                          </a>

                          <a class="carousel-control-next" href="#topTourCarousel" role="button" data-slide="next">
                          <em class="fa fa-angle-right" style="font-size:100px;color:white;font-weight:2000"></em>
                            <span class="sr-only">Next</span>
                          </a>
                          
                        </div>
                        
                        
                    </div>
                    <div class="spacer5"></div>
                    <div class="spacer5"></div>

                    <div class="accordion" id="accid">
                        <button class="b_accordion btn btn-light border-dark btn-lg btn-block text-left"><h2 class="accordionTitle">Concerti</h2></button>                 
                        <div id="concertiCarousel" class="carousel slide " data-ride="carousel">
                            <div class="carousel-inner row w-100 mx-auto" id="concertiCar">                          
                            </div>
                            <a class="carousel-control-prev" href="#concertiCarousel" role="button" data-slide="prev">
                            <em class="fa fa-angle-left" style="font-size:100px;color:white;font-weight:2000"></em>
                                <span class="sr-only">Previous</span>
                            </a>
                            <a class="carousel-control-next" href="#concertiCarousel" role="button" data-slide="next">
                                <em class="fa fa-angle-right" style="font-size:100px;color:white;font-weight:2000"></em>
                                <span class="sr-only">Next</span>
                            </a>
                        </div>
                    
                        <button class="b_accordion btn btn-light border-dark btn-lg btn-block text-left"><h2 class="accordionTitle">Partite</h2></button>
                        <div id="partiteCarousel" class="carousel slide" data-ride="carousel">
                            <div class="carousel-inner row w-100 mx-auto" id="partiteCar">
                            
                            </div>
                                <a class="carousel-control-prev" href="#partiteCarousel" role="button" data-slide="prev">
                                    <em class="fa fa-angle-left" style="font-size:100px;color:white;font-weight:2000"></em>
                                    <span class="sr-only">Previous</span>
                                </a>
                                <a class="carousel-control-next" href="#partiteCarousel" role="button" data-slide="next">
                                    <em class="fa fa-angle-right" style="font-size:100px;color:white;font-weight:2000"></em>
                                    <span class="sr-only">Next</span>
                                </a>
                        </div>
                        
                        <button class="b_accordion btn btn-light border-dark btn-lg btn-block text-left"><h2 class="accordionTitle">Spettacoli teatrali</h2></button>
                        <div id="spettacoliCarousel" class="carousel slide" data-ride="carousel">
                            <div class="carousel-inner row w-100 mx-auto" id="spettacoliCar">
                            
                            </div>
                                <a class="carousel-control-prev" href="#spettacoliCarousel" role="button" data-slide="prev">
                                    <em class="fa fa-angle-left" style="font-size:100px;color:white;font-weight:2000"></em>
                                    <span class="sr-only">Previous</span>
                                </a>
                                <a class="carousel-control-next" href="#spettacoliCarousel" role="button" data-slide="next">
                                    <em class="fa fa-angle-right" style="font-size:100px;color:white;font-weight:2000"></em>
                                    <span class="sr-only">Next</span>
                                </a>
                            </div>
                        
                        <button class="b_accordion btn btn-light border-dark btn-lg btn-block text-left"><h2 class="accordionTitle">Cinema</h2></button>
                        <div id="cinemaCarousel" class="carousel slide" data-ride="carousel">
                            <div class="carousel-inner row w-100 mx-auto" id="cinemaCar">
                            
                            </div>
                                <a class="carousel-control-prev" href="#cinemaCarousel" role="button" data-slide="prev">
                                    <em class="fa fa-angle-left" style="font-size:100px;color:white;font-weight:2000"></em>
                                    <span class="sr-only">Previous</span>
                                </a>
                                <a class="carousel-control-next" href="#cinemaCarousel" role="button" data-slide="next">
                                    <em class="fa fa-angle-right" style="font-size:100px;color:white;font-weight:2000"></em>
                                    <span class="sr-only">Next</span>
                                </a>
                            </div>
                                             
                    </div>
                    <div class="spacer5"></div>
                    <div class="spacer5"></div>

                   <div>
                        <h2 class= "mb-3">Nuovi Eventi</h2>
                        <div id="nuoviEventiCarousel" class="carousel slide" data-ride="carousel">
                            <div class="carousel-inner row w-100 mx-auto" id="nuoviEventiCar">
                            
                            </div>
                            <a class="carousel-control-prev" href="#nuoviEventiCarousel" role="button" data-slide="prev">
                                <em class="fa fa-angle-left" style="font-size:100px;color:white;font-weight:2000"></em>
                                <span class="sr-only">Previous</span>
                            </a>
                            <a class="carousel-control-next" href="#nuoviEventiCarousel" role="button" data-slide="next">
                                <em class="fa fa-angle-right" style="font-size:100px;color:white;font-weight:2000"></em>
                                <span class="sr-only">Next</span>
                            </a>
                        </div>
                    </div>
                </div>

                <div class="col-sm-4">
                    <aside>
                        <div>
                            <h2>Artisti Popolari</h2>
                            <ul id="popArtistList">
                                <div id="popularArtist">

                                </div>
                            </ul>
                        </div>
                        <div class="spacer5"></div>
                        <div class="spacer5"></div>

                        <div align="center">
                            <h2>Eventi in esaurimento</h2>
                           
                                <div id="inEsaurimento">


                                </div>
                          
                        </div>
                    </aside>
                </div>
            </div>    
        </div>
        <div class="spacer5"></div>
        <div class="spacer5"></div>

    </main> 
    <div class="cookie-banner" style="display: none">
    <p>
        By using our website, you agree to our cookie policy
      </p>
    <button class="close">&times;</button>
    </div>

    <div  id="idFooter"  class="container-fluid">
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