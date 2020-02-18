function stampaCerca(articoli){
  let result = "";
  let idPrefix = "SRC";

  for(let i=0; i < articoli.length; i++){
      let articolo = `
      <div align="center">
    
      <form method="get" action="evento.php" class="searchML" id="${idPrefix}${i}">
      <input type="hidden" id="input${idPrefix}${i}" name="event" value="${articoli[i]["idEvento"]}">
      <button class= "buttonOAside border border-dark" type="submit" id="buttonS">
          <div class="searchEvent">
              <div>
                  <img align="left" class="card-img-top-search img-fluid" src="${articoli[i]["pathQuadrata"]}" alt="Locandina di ${articoli[i]["nomeTour"]}">
              </div>
              <div class="card-body">
                  <p><h3>
                      ${articoli[i]["nomeTour"]} <br/>
                      ${articoli[i]["data"]}, ${articoli[i]["città"]} <br/>
                    </h3>
                  </p>
              </div>
          </div>
      </button>
  </form>

  </div>
  `;
      result += articolo;
  }
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

function getCerca(){


 var stringa = getUrlParameter('stringa');
 var mode = getUrlParameter('optradio');
 console.log("CERCAA %s %s", stringa, mode);


$.getJSON("function.php", { cerca: "cerca", 
stringa : stringa, 
mode: mode}, function(data){
  console.log("CERCooo %s", data);
if (data != "error") {
    console.log("CERCo %s", data);
   let articoli = stampaCerca(data);
              const main = $(".cerca");
              main.append(articoli);
   } else {
    console.log("NO %s", data);
            let articoli =  `<p class="text-center" >Risultati non trovati </p> `;
            const main = $(".cerca");
            main.append(articoli);
   }
  
});



}

$(document).ready(function(){
getCerca();

});