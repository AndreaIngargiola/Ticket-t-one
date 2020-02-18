<?php 
require_once 'security.php';
sec_session_start();
if(!isset( $_SESSION['email'])) { 
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
    <script src="js/notification.js" type="text/javascript"></script>

    <title>TICKETtONE</title>
    <!--<link rel="stylesheet" type="text/css" href="./css/style.css" />-->
    <script
    src="https://code.jquery.com/jquery-3.4.1.min.js"
    integrity="sha256-CSXorXvZcTkaix6Yvo6HppcZGetbYMGWSFlBw8HfCJo="
    crossorigin="anonymous"></script>

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
                                <a class="ex4" href="account.php"><span class="p1 fa-stack fa-2x has-badge"><sm class="p3 fa fa-user fa-stack-1x " aria-hidden="true"></sm></span></a>
                                
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

    <div id="contenitore" class="container-fluid">
        <main>
            <div class="alert alert-success alert-dismissible" id="success" style="display:none;">
                <a href="#" class="close" data-dismiss="alert" aria-label="close">×</a>
            </div>
            <div class="alert alert-danger alert-dismissible" id="error" style="display:none;">
                <a href="#" class="close" data-dismiss="alert" aria-label="close">×</a>
            </div>


            <form class="form-horizontal"  method="POST" id="formody"  onsubmit="return false">
                <div class="form-group row">
                    <label class="control-label col-sm-2" for="email_log">Email:</label>
                    <div class="col-sm-4">
                        <input type="email" class="form-control" id="email_log" placeholder="Inserire email" name="email">
                    </div>
                </div>
                <div class="form-group row">
                    <label class="control-label col-sm-2" for="password_log">Password:</label>
                    <div class="col-sm-4">
                        <input type="password" class="form-control" id="password_log" placeholder="Inserire password" name="password">
                    </div>
                </div>
                <div class="form-group">
                    <div class="col-sm-offset-2 col-sm-4">
                        <input type="submit" name="save" class="btn btn-default buttonCart" value="Login" id="butlogin">
                    </div>
                </div>
            </form>
            
            <div class="col-sm-offset-2 col-sm-4">
                <p>Non sei ancora registrato? <a href="registrazione.php">Registati ora</a></p>
            </div>
        </main>
    </div>

    <div id="idFooter" class="container-fluid">
        
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

    <script>
        $(document).ready(function() {
            console.log("ciao!");
            $('#login').on('click', function() {
                $("#login_form").show();
                $("#register_form").hide();
            });
            
            $('#butlogin').on('click', function() {
                
                var email = $('#email_log').val();
                email=email.split(".").join("_");
                var password = $('#password_log').val();
                if(email!="" && password!=""){
                 $.ajax({
                       
                        url: "function.php",
                        type: "POST",
                        data: {
                            action: "save",
                            type:2,
                            email: email,
                            password: password						
                        },
                        
                        cache: false,
                        success: function(dataResult){
                            
                            var dataResult = JSON.parse(dataResult);
                            console.log("%d", dataResult.statusCode);

                            if(dataResult.statusCode==200){
                                
                                location.href = "home.php";						
                            }
                            else if(dataResult.statusCode==201){
                               
                                $("#error").show();
                                $('#error').html('Invalid EmailId or Password !');
                            }
                            
                        }
                    });
                }
                else{
                    
                    alert('Please fill all the field !');
                }
            });
        });
    </script>
</body>
</html>


<?php
}else {
    echo "Hai già effettuato l'accesso!";
}
?>