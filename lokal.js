
//tworzenie nowej bazy lokalnej
function localDB(){

    var form = document.getElementById("offlineDBform");
    form.innerHTML = "<label for=\"rejestracja\"> <h2>Tablica rejestracyjna: </h2> </label> \
    <input type=\"text\" id=\"rejestracja\" name=\"rejestracja\" required><br> \
    <label for=\"predkosc\">   <h2>Predkosc: </h2>   </label> \
    <input type=\"number\" id=\"predkosc\" name=\"predkosc\" value = 50 required><br></br> \
    <input type=\"button\" class = \"przycisk\" id=\"submitButton\" name=\"submitButton\" value = \"Dodaj wpis\" onclick =\"addLocal()\"required><br>"
              



    window.indexedDB = window.indexedDB
    if(!window.indexedDB){
        alert("Twoja przegladarka nie obsluguje indexedDB :(");
        return;
    }
    else{
        var db;
        var request = window.indexedDB.open("pomiaryB", 2);

        request.onerror = function(event) {
            alert("B³¹d!");
        };
        request.onsuccess = function(event) {
            db = event.target.result;
            console.log("dziala");

        };

    const pomiaryData = [
            {dataZdjecia: "04-23-2000", rejestracja: "RJA08150", predkosc: 61}
        ];

        request.onupgradeneeded = function(event) {
            var db = event.target.result;
            var objectStore = db.createObjectStore("pomiary", { keyPath: "rejestracja" });
            objectStore.createIndex("dataZdjecia", "dataZdjecia", { unique: false });

            objectStore.transaction.oncomplete = function(event){
                var pomiaryObjectStore = db.transaction("pomiary", "readwrite").objectStore("pomiary");
                pomiaryData.forEach(function(pomiar){
                    pomiaryObjectStore.add(pomiar);
                });
                console.log("Udalo sie stworzyc baze");
            }

        };


    }
}

//dodanie danych do bazy lokalnej
function addLocal(){
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
        
        var rej = document.getElementById("rejestracja");
        var pre = document.getElementById("predkosc");
        
        var rejStr = /^[a-zA-Z0-9]{6,10}$/;
        if(  !rej.value.match(rejStr) || parseInt(pre.value) < 0 || parseInt(pre.value) > 340 ){
          alert("Nieprawidlowe dane!");
          return;
        }
        
        var today = new Date();
        var dd = String(today.getDate()).padStart(2,'0');
        var mm = String(today.getMonth() + 1).padStart(2,'0');
        var yyyy = String(2022);
        today = mm + '-' + dd + '-' + yyyy;
        
        const pomiaryData = [
            {dataZdjecia: today, rejestracja: rej.value, predkosc: predkosc.value}
        ];
        
        transaction.oncomplete = function(event) {
            console.log("dziala");
        };
        transaction.onerror = function(event) {
            console.log("nie dziala");
        };
    
        var objectStore = transaction.objectStore("pomiary");
        pomiaryData.forEach(function(pomiar) {
            var request = objectStore.add(pomiar);
            request.onsuccess = function(event) {
              alert("Przeslano dane!");
            };
        });

    };
}

//rejestracja u¿ytkownika do bazy
function register(){

    var loginRej = document.getElementById("loginRej");
    loginRej.innerHTML = "<form name=\"test\" method=\"post\" action=\"zad04reg.php\">\
        Podaj imiê:<input type=\"text\" name=\"fname\"><br/>\
        Podaj nazwisko:<input type=\"text\" name=\"lname\"><br/>\
        Podaj e-mail:<input type=\"text\" name=\"email\"><br/>\
        Podaj has³o:<input type=\"text\" name=\"pass\">\
        <input type=\"submit\"></form>" ;
}

//logowanie u¿ytkownika
function login(){

    var loginRej = document.getElementById("loginRej");
    loginRej.innerHTML = "<form name=\"test\" method=\"post\" action=\"zad04log.php\">\
    Podaj e-mail:<input type=\"text\" name=\"email\"><br/>\
    Podaj has³o:<input type=\"text\" name=\"pass\"><br/>\
    <input type=\"submit\"></form> "
}



