
function stampaTicket( ticket){
    let prezzo =0;
    let result = "";
    let articolo = `   <form method="get" action="storicoBiglietti.php" id="storicoBiglietti">
    <button class= "buttonCart" type="submit">Visualizza tutti i biglietti</button>  
</form> <br/> `;
    result += articolo;
    j=1;
    articolo =`
       
 
    <div class="allTicketAcc">
  `;
    result += articolo;
    
    for(let i=0; i < ticket.length; i++){ 
        articolo =  `
<div class="col-sm-3 provaAllinea spacer5 ticketAcc">
            <h5>${ticket[i]['nomeTour']}: </h5>
            <p>
                Città: ${ticket[i]['città']} <br/>
                Data: ${ticket[i]['data']}<br/>
                Posizione: ${ticket[i]['posizione']}<br/>
                Codice: ${ticket[i]['numero']}<br/>
                Prezzo: ${ticket[i]['prezzo']}€
            </p>
        </div>
    
    `;
    result += articolo;
   
    if(j==4){
    
        articolo = ` </div><div class="allTicketAcc"> `;
        result += articolo;
        j=0;
    }
    j++;
  }
  articolo =  `
  </div>
   
  `;
  result += articolo;    
        return result;
  }

  function stampaTour(tour){

    let result="";
    let articolo =  `
    
        <div class="spacer5"></div>
        <div class="input-group">
        <div id="radioBtn" class="btn-group-vertical di-flex flex-column vertTour">

        
  `;
  result += articolo;
  let classe="";
  for( let i=0; i < tour.length; i++ ){
      if(i==0){
          classe = "active";
      }else {
        classe = "notActive";
      }
      nomeTour = tour[i]['nome'];
      nomeTour = nomeTour.replace(/ /g, "");
        articolo =  `

        <a onclick="changeButton('${nomeTour}', '${tour[i]['nome']}' )" class="btn btn-primary btn-sm ${classe}" data-toggle="fun" id='aa${nomeTour}'>${tour[i]['nome']}</a>
      

        `;
    result += articolo;
    
    }
     articolo =  `

  
     <a  onclick="VaiNuovoTour()" class="btn btn-primary btn-sm notActive" data-toggle="fun" id='+'>+</a>
      

    
     </div>
     <input type="hidden" name="fun" id="fun">
     </div> `;

        
    result += articolo;
    return result;
  }

  function stampaNoTour(){
    let result="";
    let articolo =  `
    
    <div class="spacer5"></div>
    <div class="input-group">
    <div id="radioBtn" class="btn-group-vertical di-flex flex-column vertTour">
    <a  onclick="VaiNuovoTour()" class="btn btn-primary btn-sm notActive" data-toggle="fun" id='+'>+</a>
      

    
    </div>
    <input type="hidden" name="fun" id="fun">
    </div> `;

    result += articolo;
    return result;
  }

  function VaiNuovoTour(){
      location.href = "nuovoTour.php";
    
      
  }
  
  function stampaEventi(evento, tour){
    let tourConPiu = tour.replace(/ /g, "+");
    let result="";
    let  articolo =  `
    
            
    <div class="col-sm-3 provaAllinea">

        <form method="get" action="nuovoEvento.php" id="aggiungiEventoA${tour}">
            <input type="hidden" id="nomeTour" name="tourNome" value="${tourConPiu}">
           
            <button align="center" class= "buttonCart piu" type="submit">+
            </button>
        </form>
    </div>


    `;

result += articolo;

    if( evento != "error"){
        for(let i=0; i < evento.length; i++){ 
            
            articolo =  `
            
                <div class="col-sm-3 provaAllinea">
                    <h4>[${evento[i]["idEvento"]}] ${evento[i]['città']}</h4>
                    <p> ${evento[i]['data']}, ${evento[i]['indirizzo']}</p>
                    <form method="get" action="modificaEvento.php" id="${i}">
                        <input type="hidden" id="id${i}" name="idEvento" value="${evento[i]['idEvento']}">
                        <input type="hidden" id="citta${i}" name="citta" value="${evento[i]['città']}">
                        <input type="hidden" id="data${i}" name="data" value="${evento[i]['data']}">
                        <input type="hidden" id="indirizzo${i}" name="indirizzo" value="${evento[i]['indirizzo']}">
                        <button class= "buttonCart" type="submit"> Modifica evento
                        </button>
                    </form>
                </div>
        
            
            `;
            result += articolo;
        }
    } else{
        articolo =  `
     
        <div ><p class="noEvents">Non ci sono ancora eventi</p></div>
        <div class="spacer5"></div>
      
        `;
            result += articolo;
        
    }//dopo articolo
        articolo =  `
        
        

  `;
  result += articolo;
      return result;
  }


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



function getTicket(){

    $.getJSON( "function.php",
            
      {
                 getBoughtTiketAccount : "ticket"
      },
      
      
      function(dataResult){
        if(dataResult != "errore"){
         
          const main = $("#biglietti");

       articoli =  stampaTicket(dataResult);
       
     
       main.append(articoli);
        } else {
            const main = $("#biglietti");

            main.append("</br><div><br/><p>Non hai ancora acquistato biglietti<p></div>");   
        }
      });
  }

  function getMyTour(){

    let tour;
    let eventi;

    let main = $("#tour");

    $.getJSON( "function.php",
            
      {
                 getMyTour : "tour"
      },
      
      
      function(dataResult){
        console.log("aaa");
        if(dataResult!="errore"){
        let articoli = stampaTour(dataResult);
        nomeTour= dataResult[0]['nome'];
  
           changeButton(nomeTour, dataResult[0]['nome'] );
          
            main.append(articoli);
        }else{
            let articoli = stampaNoTour();
            main.append(articoli);
        }
    
      });

       
  }
 


  function organizzatore(){
    $.getJSON("function.php", {organizzatore: "organizzatore"}, function(data){
        location.href = "account.php";	
    });
       
}

function hideElement(element){
    element
        .removeClass("active")
        .addClass("notActive");
     
}

function showElement(element){
    element
        .removeClass("notActive")
        .addClass("active");
      
     
}
function changeButton(tourSenzaSp, tourConSp){
  
    if(!($('#aa'+tourSenzaSp).is("#radioBtn a.active"))){
       
       hideElement($("#radioBtn a.active"));
       showElement( $("#aa"+tourSenzaSp));
    }
       $.getJSON( "function.php",
            
       {
                  tour : tourConSp
       },
       
       
       function(dataResult){
      
        let eventi = dataResult.eventi;
         let articoli = stampaEventi(eventi, tourConSp);
         
            let main=$("#event");
           main.empty();
             main.append(articoli);
     
       });
    


}
  $(document).ready(function(){
     
    getTicket();
    getMyTour();




});
    
       


    