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

function stampaTour(tour, evento, hosts){
    let idPrefix ="EV";
    let result = "";
     let articolo = `

<div class="row">
<div class="col-sm-3 offset-sm-1">
<aside>
 <img class="imgTourS" src="${tour[0]["pathVerticale"]}" alt="Locandina di ${tour[0]["nome"]}"
</aside>
</div>

`;
result += articolo;
     
articolo = `
<div class="col-sm-7">
<h2>${tour[0]["nome"]}</h2>
<section>
   <p> ${hosts[0]["nicknameArtista"]}
   `;
    result += articolo;

for(let i=1; i < hosts.length; i++){
    articolo =  `
   
    , ${hosts[i]["nicknameArtista"]}
    `;
    result += articolo;
}

articolo =  `
</br>
<p>${tour[0]["descrizione"]}</p>
</section>
<section>
           
    `;
    result += articolo;
     
    for(let i=0; i < evento.length; i++){
        articolo = `
        <div>
            <form method="get" action="evento.php" id="${idPrefix}${i}">
                <input type="hidden" id="input${idPrefix}${i}" name="event" value="${evento[i]["idEvento"]}">
                <button class= "buttonO2 border border-dark" type="submit">
                <p title="luogo e data"><b><h5>${evento[i]["città"]} - ${evento[i]["data"]}</b></h5></p></h2>
                    <div class="d-flex flex-row" id="buttonO2Id">
                        
                        
                            <div class="divBtO2 text-left"><p title="indirizzo">${evento[i]["location"]} ${evento[i]["indirizzo"]}, ${evento[i]["città"]}, ${evento[i]["regione"]}</p>
                            `;
                            result += articolo;
                            if(evento[i]["postiRimanenti"] != 0){
                                articolo = `
                                <p title="prezzoMinimo"> A partire da ${evento[i]["prezzoMinimo"]}€ </p></div>`;
                                result += articolo;
                            }else{
                                articolo = `
                                <p title="soldOut" style="color: red">EVENTO SOLD OUT </p></div>`;
                                result += articolo;
                            }
                            articolo = `
                             <div class="divBtO2 text-left"><p title="postiRimanenti"> ${evento[i]["postiRimanenti"]} biglietti rimanenti su ${evento[i]["numeroBiglietti"]} </p>
                            <p title="data inizio prenotazioni"> Biglietti prenotabili dal ${evento[i]["prenotabileDal"]} </p></div>
                        
                    </div>
                </button>
            </form>
        </div>
        `;
        result += articolo;
    }
    articolo = `
    
    </section>
   </div>
   </div>

   `;
   result += articolo;
    return result;
  }
  

  
  function getUrlParameter(sParam) {
    var sPageURL = window.location.search.substring(1),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;
  
    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');
  
        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
        }
    }
  };

  function stampaNoEventi(tour, evento){
    let result = "";
     let articolo =  `

     <div class="row">
        <div class="col-sm-3 offset-sm-1">
            <aside>
            <img class="imgTourS" src="${tour[0]["pathVerticale"]}" alt="Locandina di ${tour[0]["nome"]}"
            </aside>
        </div>
        <div class="col-sm-6">
            <h2>${tour[0]["nome"]}</h2>
            <section>
                <p>${tour[0]["descrizione"]}</p>
            </section>
            <section> 
                <p>Non ci sono ancora eventi disponibili
                </p>   
            </section>
        </div>
    </div>
        `;
        result += articolo;
    return result;
  }

  


  
/*
  
  function getUrlParameter(sParam) {
    var sPageURL = window.location.search.substring(1),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;
  
    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');
  
        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
        }
    }
  };
  */
  function getTour(){
  
  
   var tour = getUrlParameter('tour');
   
   console.log("CERCAA %s", tour);
  
  
  $.getJSON("function.php", 
  {tour: tour}, 
  function(data){
    console.log("CERCooo %s", data.tour);
    console.log("CERCooo %s", data.eventi);
    if(data.eventi != "error"){
        let articoli = stampaTour(data.tour, data.eventi, data.hosts);
        const main = $("main");
    main.append(articoli);           
    } else{
        let articoli = stampaNoEventi(data.tour, data.eventi);
        const main = $("main");
    main.append(articoli);
    }
    
  });
  
  
  
  }
  
  $(document).ready(function(){
   
   
  getTour();
  
  });