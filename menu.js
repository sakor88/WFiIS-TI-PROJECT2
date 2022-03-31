var request;
var objJSON;
var id_mongo;
const xhr = new XMLHttpRequest();
 
var all = 0;
var an = 0;
 
// Lista rekordow w bazie
function _list() {    
   xhr.open("GET", "http://pascal.fis.agh.edu.pl/~9krasniak/projekt2/rest/list", true);   
   xhr.responseType = 'json';
   xhr.addEventListener("load", e => {
      if (xhr.status == 200)    {
         objJSON = xhr.response ;
         var txt = "";
         for ( var id in objJSON )  {
             txt +=  id+": {" ;
             for ( var prop in objJSON[id] ) {             
                 if ( prop !== '_id')
                   { txt += prop+":"+objJSON[id][prop]+",";  }
                 else
                   { txt += "id:" + objJSON[id][prop]['$oid']+"," ; } 
             }
             txt +="}<br/>";
         }
         document.getElementById('menuForm').innerHTML = '';
         document.getElementById('menuForm').style.display = "none";
         document.getElementById('przeglad').style.display = "inline-block";
         document.getElementById('przeglad').innerHTML = txt;
      }
   })
   xhr.send(null);
}

//lista rekordów których predkosc jest wieksza niz 50km/h oraz ich procent udzialu we wszystkich
function _list50() {    
   xhr.open("GET", "http://pascal.fis.agh.edu.pl/~9krasniak/projekt2/rest/list", true);   
   xhr.responseType = 'json';
   xhr.addEventListener("load", e => {
      if (xhr.status == 200)    {
         //objJSON = JSON.parse(request.response);
         objJSON = xhr.response ;
         var txt = "";
         for ( var id in objJSON )  {
             all = all+1;
             if( objJSON[id]["predkosc"] > 50 ){
                 an = an+1;
                 txt +=  id+": {" ;
                 for ( var prop in objJSON[id] ) {    
                   if ( prop !== '_id')
                     { txt += prop+":"+objJSON[id][prop]+",";  }
                   else
                     { txt += "id:" + objJSON[id][prop]['$oid']+"," ; } 
                 }
             txt +="}<br/>";
             } 
         }
         var percent = (an / all * 100).toFixed();
         txt+= "<br> Procent kierowcow przekraczajacych predkosc:" + percent + "%";
         an50 = 0;
         document.getElementById('menuForm').innerHTML = '';
         document.getElementById('menuForm').style.display = "none";
         document.getElementById('przeglad').style.display = "inline-block";
         document.getElementById('przeglad').innerHTML = txt;
      }
   })
   xhr.send(null);
}
 
// Wstawianie rekordow do bazy
function _ins_form() {
   var form1 = "<form name='addForm'><table>" ;
   form1    += "<tr><td>data</td><td><input type='date' name='dataPole' value='dataPole' ></input></td></tr>";
   form1    += "<tr><td>rejestracja</td><td><input type='text' name='rejestracjaPole' value='rejestracja' ></input></td></tr>";
   form1    += "<tr><td>predkosc (km/h) </td><td><input type='number' name='predkoscPole' id = 'predkoscPole' value='50' ></input></td></tr>";  
   form1    += "<tr><td></td><td><input type='button' value='Dodaj' onclick='_insert(this.form)' ></input></td></tr>";
   form1    += "</table></form>";
   document.getElementById('menuForm').innerHTML = form1;
}
 
function _insert(form)  {
    all = all+1;
    var wpis = {};
    wpis.indeks = form.dataPole.value + form.rejestracjaPole.value;
    wpis.data = form.dataPole.value;
    wpis.rejestracja = form.rejestracjaPole.value;
    wpis.predkosc = form.predkoscPole.value;
    var rejStr = /^[a-zA-Z0-9]{6,10}$/
    if(  !wpis.rejestracja.match(rejStr) || parseInt(wpis.predkosc) < 0 || parseInt(wpis.predkosc) > 340 ){
      alert("Nieprawidlowe dane!");
      return;
    }
    txt = JSON.stringify(wpis);
    xhr.open("POST", "http://pascal.fis.agh.edu.pl/~9krasniak/projekt2/rest/save", true);
    xhr.addEventListener("load", e => {
       if ( xhr.status == 200 )    {
          window.location = 'menu.php';
       }
    })   
    xhr.send(txt);
}
 
//import danych z lokalnej bazy indexeddb do mongodb
function lokalImport()  {

    var db;
    var transaction
    window.indexedDB = window.indexedDB
    var request = window.indexedDB.open("pomiaryB", 2);

    request.onerror = function(event) {
        alert("B³¹d!");
    };
    
    request.onsuccess = function(event) {
        db = event.target.result;
        transaction = db.transaction(["pomiary"], "readwrite");
        var objectStore = transaction.objectStore("pomiary");
        var request = objectStore.openCursor();
        request.onerror = function(event) {
           console.err("error fetching data");
        };
        request.onsuccess = function(event) {
           let cursor = event.target.result;
           if (cursor) {
               let key = cursor.primaryKey;
               let value = cursor.value;
               var wpis = {};
               wpis.data = value["dataZdjecia"];
               wpis.rejestracja = value["rejestracja"];
               wpis.predkosc = value["predkosc"];
               wpis.indeks = wpis.data + wpis.rejestracja;
               console.log(wpis);
               
               txt = JSON.stringify(wpis);
               xhr.open("POST", "http://pascal.fis.agh.edu.pl/~9krasniak/projekt2/rest/save", true);
               xhr.addEventListener("load", e => {
                 if ( xhr.status == 200 )    {
                    alert("Pomyslnie zaimportowano dane lokalne!")
                    window.location = 'menu.php';
                 }
               })   
               xhr.send(txt);
               cursor.continue();
           }
           else {

           }
           objectStore.clear();
        };
    };
    
    
    
}

function logout(){
  window.location = 'logout.php'; 
}
