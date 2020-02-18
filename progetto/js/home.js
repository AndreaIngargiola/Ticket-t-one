
function logOut(){
    $.ajax({
                       
        url: "function.php",
        type: "POST",
        data: {
            action: "save",
            type:3						
        },
        
        cache: false,
        success: function(dataResult){
            
            var dataResult = JSON.parse(dataResult);
            console.log("%d", dataResult.statusCode);

            if(dataResult.statusCode==200){
                
                location.href = "home.php";						
            }
           
        }
    });
}


//STAMPE 


function stampaTopTour(articoli){
    let result = "";
    let idPrefix = "ITT";
    let active = " active ";
    
    for(let i=0; i < articoli.length; i++){
        if(i>0) {
            active = "";
        }
        let articolo = `
        <div class="buttonV carousel-item col-md-4 ${active} itemTopTour" id ="topTour${i}"  role="button">
                    <a aria-hidden="true" href="tour.php?tour=${articoli[i]["nome"]}" id="${idPrefix}${i}">
                
                        <img class="card-img-top img-fluid" src="${articoli[i]["pathVerticale"]}" alt="Locandina di ${articoli[i]["nome"]}">
                        <div class="card-body">
                            <h3 class="card-title">${articoli[i]["nome"]}</h3>
                        </div>     
 
            </a>
        </div>  
        
        `;
        result += articolo;
    }
    return result;
}

function stampaEventiRecenti(articoli){
    let result = "";
    let idPrefix = "NEW";
    let active = " active ";
    
    for(let i=0; i < articoli.length; i++){
        if(i>0) {
            active = "";
        }
        let articolo = `
        
        <div class="buttonV carousel-item col-md-4 ${active} itemNuoviEventi" id ="eventiRecenti${i}"  role="button">
            <a href="evento.php?event=${articoli[i]["idEvento"]}" id="${idPrefix}${i}" >
                   
                        <img class="card-img-top img-fluid" src="${articoli[i]["pathVerticale"]}" alt="Locandina di ${articoli[i]["nomeTour"]}">
                        <div class="card-body">
                            <h3 class="card-title">${articoli[i]["nomeTour"]}</h3>
                        </div>
                </a>
        </div>
        `;
        result += articolo;
    }
    return result;
}

function stampaEventiAccordion(articoli, classe){

    const idPrefix = "ACC"
    let result = "";
    let active = " active ";
    
    for(let i=0; i < articoli.length; i++){
        if(i>0) {
            active = "";
        }
        let articolo = `
        
        <div class="carousel-item  col-md-4 ${active} item${classe}">
            <div class="card flex-column" style="border-style:none">
                <div class="buttonO firstAcc"   role="button" >
                    <a href="evento.php?event=${articoli[i]["idEvento"]}" id="${idPrefix}${classe}${i}">
                        <img class="card-img-top img-fluid" src="${articoli[i]["pathOrizzontale"]}" alt="Locandina di ${articoli[i]["nomeTour"]}">
                        <h3 class="card-title">${articoli[i]["nomeTour"]} </h3>
                        
                    </a>
                </div>

                <div class="buttonO secondAcc" role="button">
                    <a href="evento.php?event=${articoli[++i]["idEvento"]}" id="${idPrefix}${classe}${i}">
                            <img class="card-img-top img-fluid" src="${articoli[i]["pathOrizzontale"]}" alt="Locandina di ${articoli[i]["nomeTour"]}">        
                            <h3 class="card-title">${articoli[i]["nomeTour"]} </h3>
                            
                      </a>
                </div>
            </div>
        </div>
        `;
        result += articolo;
    }
    return result;
   
}

function stampaPopArtist(articoli){
    let result = "";
   
    for(let i=0; i < articoli.length; i++){
        let articolo = `
        <li class = "artist">
            <a href="search.php?stringa=${articoli[i]["nickname"]}&optradio=artista" id="popArtist${i}">
                ${articoli[i]["nickname"]}
            </a> 
        </li>
        `;
        result += articolo;
    }
    return result;
}



function stampaInEsaurimento(articoli){
    let result = "";
    let idPrefix = "NSO";
   
    for(let i=0; i < articoli.length; i++){
        let articolo = `
                <form method="get" action="evento.php" id="${idPrefix}${i}">
                    <input type="hidden" id="input${idPrefix}${i}" name="event" value="${articoli[i]["idEvento"]}">
                    <button class= "buttonOAside border border-dark" type="submit"> 
                     <div>
                            <div>
                                <img align="left" class="evSold card-img-top img-fluid" src="${articoli[i]["pathQuadrata"]}" alt="Locandina di ${articoli[i]["nomeTour"]}">
                            </div>
                            <div class="card-body">
                                <p>
                                    ${articoli[i]["nomeTour"]} <br/>
                                    ${articoli[i]["data"]}, ${articoli[i]["città"]} <br/>
                                    Numero posti rimasti: ${articoli[i]["postiRimanenti"]}         
                                </p>
                            </div>
                        </div>
                    </button>
                </form>
                `

        result += articolo;
    }
    return result;
}

//GET

function getTopTour(){

        $.getJSON("function.php", {topTour: "topTour"}, function(data){
            console.log("%s", data);
            let articoli = stampaTopTour(data);
            const main = $("#topTourCar");
            main.append(articoli);
        });
        
}

function getPopularArtist(){

    $.getJSON("function.php", {artist : "artist"}, function(data){
        console.log("%s", data);
        let articoli = stampaPopArtist(data);
        const main = $("#popularArtist");
        main.append(articoli);
    });
    
}

function getNuoviEventi(){

    $.getJSON("function.php", {recentEvent : "event"}, function(data){
        console.log("%s", data);
        let articoli = stampaEventiRecenti(data);
        const main = $("#nuoviEventiCar");
        main.append(articoli);
    });
    
}

function getConcerti(){
  
    $.getJSON("function.php", {concerti : "concerti"}, function(data){
        console.log("%s", data);
        let articoli = stampaEventiAccordion(data, "Concerti");
        const main = $("#concertiCar");
        main.append(articoli);
    });
    
}

function getPartite(){
    
    $.getJSON("function.php", {partite : "partite"}, function(data){
        console.log("%s", data);
        let articoli = stampaEventiAccordion(data, "Partite");
        const main = $("#partiteCar");
        main.append(articoli);
    });
    
}

function getSpettacoli(){
   
    $.getJSON("function.php", {spettacoli : "spettacoli"}, function(data){
        console.log("%s", data);
        let articoli = stampaEventiAccordion(data, "Spettacoli");
        const main = $("#spettacoliCar");
        main.append(articoli);
    });
    
}

function getCinema(){
    
    $.getJSON("function.php", {cinema : "cinema"}, function(data){
        console.log("%s", data);
        let articoli = stampaEventiAccordion(data, "Cinema");
        const main = $("#cinemaCar");
        main.append(articoli);
    });
    
}

function getEventiInEsaurimento(){
    
    $.getJSON("function.php", {esaurimento : "esaurimento"}, function(data){
        console.log("%s", data);
        let articoli = stampaInEsaurimento(data);
     
        const main = $("#inEsaurimento");
        main.append(articoli);
    });
}

//ACCORDION
function hideElement(element){
    element
        .removeClass("selected")
        .next().slideUp(); 
}


$(document).ready(function(){
   
    if (localStorage.getItem("cookieSeen") != "shown") {
        $(".cookie-banner").delay(1000).fadeIn();
        localStorage.setItem("cookieSeen", "shown")
      };
      $(".close").click(function() {
        $(".cookie-banner").fadeOut();
      })

    $("div.accordion > button.b_accordion").each(function(i){
        if(!($(this).is(':first-child'))){
            $(this).next().hide()
            console.log("non primo");
        }
        else{
            console.log("primo");
            $(this)
            .addClass("selected");
        }
    });
    $("div.accordion > button.b_accordion").click(function(){
        
        if(!($(this).is("div.accordion > button.selected"))){

            hideElement($("div.accordion > button.selected"));
            $(this)
                .addClass("selected")
                .next().slideDown();
        }
    });
    
    getPopularArtist();
    getTopTour();
    getNuoviEventi();
    getConcerti();
    getPartite();
    getSpettacoli();
    getCinema();
    getEventiInEsaurimento();



//SLIDER
    $("#topTourCarousel").on("slide.bs.carousel", function(e) {
        var $e = $(e.relatedTarget);
        var idx = $e.index();
        var itemsPerSlide = 3;
        var totalItems = $(".itemTopTour").length;
    
        if (idx >= totalItems - (itemsPerSlide - 1)) {
        var it = itemsPerSlide - (totalItems - idx);
        for (var i = 0; i < it; i++) {
            // append slides to end
            if (e.direction == "left") {
            $(".itemTopTour")
                .eq(i)
                .appendTo("#topTourCar");
            } else {
            $(".itemTopTour")
                .eq(0)
                .appendTo($(this).find("#topTourCar"));
            }
        }
        }
    });
      
    $("#nuoviEventiCarousel").on("slide.bs.carousel", function(e) {
        var $e = $(e.relatedTarget);
        var idx = $e.index();
        var itemsPerSlide = 3;
        var totalItems = $(".itemNuoviEventi").length;
    
        if (idx >= totalItems - (itemsPerSlide - 1)) {
        var it = itemsPerSlide - (totalItems - idx);
        for (var i = 0; i < it; i++) {
            // append slides to end
            if (e.direction == "left") {
            $(".itemNuoviEventi")
                .eq(i)
                .appendTo("#nuoviEventiCar");
            } else {
            $(".itemNuoviEventi")
                .eq(0)
                .appendTo($(this).find("#nuoviEventiCar"));
            }
        }
        }
    });
      
    $("#concertiCarousel").on("slide.bs.carousel", function(e) {
        var $e = $(e.relatedTarget);
        var idx = $e.index();
        var itemsPerSlide = 3;
        var totalItems = $(".itemConcerti").length;
    
        if (idx >= totalItems - (itemsPerSlide - 1)) {
        var it = itemsPerSlide - (totalItems - idx);
        for (var i = 0; i < it; i++) {
            // append slides to end
            if (e.direction == "left") {
            $(".itemConcerti")
                .eq(i)
                .appendTo("#concertiCar");
            } else {
            $(".itemConcerti")
                .eq(0)
                .appendTo($(this).find("#concertiCar"));
            }
        }
        }
    });
      
    $("#partiteCarousel").on("slide.bs.carousel", function(e) {
        var $e = $(e.relatedTarget);
        var idx = $e.index();
        var itemsPerSlide = 3;
        var totalItems = $(".itemPartite").length;
    
        if (idx >= totalItems - (itemsPerSlide - 1)) {
        var it = itemsPerSlide - (totalItems - idx);
        for (var i = 0; i < it; i++) {
            // append slides to end
            if (e.direction == "left") {
            $(".itemPartite")
                .eq(i)
                .appendTo("#partiteCar");
            } else {
            $(".itemPartite")
                .eq(0)
                .appendTo($(this).find("#partiteCar"));
            }
        }
        }
    });
      


    $("#spettacoliCarousel").on("slide.bs.carousel", function(e) {
        var $e = $(e.relatedTarget);
        var idx = $e.index();
        var itemsPerSlide = 3;
        var totalItems = $(".itemSpettacoli").length;
    
        if (idx >= totalItems - (itemsPerSlide - 1)) {
        var it = itemsPerSlide - (totalItems - idx);
        for (var i = 0; i < it; i++) {
            // append slides to end
            if (e.direction == "left") {
            $(".itemSpettacoli")
                .eq(i)
                .appendTo("#spettacoliCar");
            } else {
            $(".itemSpettacoli")
                .eq(0)
                .appendTo($(this).find("#spettacoliCar"));
            }
        }
        }
    });
    
    $("#cinemaCarousel").on("slide.bs.carousel", function(e) {
        var $e = $(e.relatedTarget);
        var idx = $e.index();
        var itemsPerSlide = 3;
        var totalItems = $(".itemCinema").length;
    
        if (idx >= totalItems - (itemsPerSlide - 1)) {
        var it = itemsPerSlide - (totalItems - idx);
        for (var i = 0; i < it; i++) {
            // append slides to end
            if (e.direction == "left") {
            $(".itemCinema")
                .eq(i)
                .appendTo("#cinemaCar");
            } else {
            $(".itemCinema")
                .eq(0)
                .appendTo($(this).find("#cinemaCar"));
            }
        }
        }
    });    
});


