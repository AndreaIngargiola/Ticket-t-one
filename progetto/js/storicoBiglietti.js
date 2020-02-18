
function stampaTicket( ticket){
    let prezzo =0;
    let result = "";
    let articolo = `<div class="allTicket"> `;
    result += articolo;
    j=1;
    for(let i=0; i < ticket.length; i++){ 
       
        
        articolo =  `
        <div class="col-sm-4 provaAllinea storicoBiglietti">
            <div class="col-ms-11 offset-1 transbox">
            <br/>
               <a href="evento.php?event=${ticket[i]['idEvento']}" class="linBiglAcq"> <h3>${ticket[i]['nomeTour']}: </h3></a>
                <p>
                    Città: ${ticket[i]['città']} <br/>
                    Data: ${ticket[i]['data']}<br/>
                    Posizione: ${ticket[i]['posizione']}<br/>
                    Codice: ${ticket[i]['numero']}<br/>
                    Prezzo: ${ticket[i]['prezzo']}€
                </p>
            <br/>
            </div>
        </div> 
    
        
    `;
   
    result += articolo;
    if(j==3){
        console.log("ssss")
        articolo = ` </div><div class="allTicket"> `;
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


  function getTicket(){

    $.getJSON( "function.php",
            
      {
                 getAllBoughtTiket : "ticket"
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

  $(document).ready(function(){
     
    getTicket();

  
});


