<style type="text/css">
    a{
        font-size: 30px;
    }
    </style>

<?php
 
function __autoload($class_name) {
    include $class_name . '.php' ;
}
 
$user = new Register_new;

if ( ! $user->_is_logged() ){
  $str = "<br> <br> <a href='register.html'>Rejestracja w serwisie</a> <br> <br> <a href='logowanie.html'>Logowanie do serwisu</a>";
}
else
{
  $str = "<input type = 'button' class = 'przycisk' id = 'addButton' value = 'Dodaj wpis do bazy' onclick='_ins_form()'> <br> <input type = 'button' class = 'przycisk' id = 'viewButton' value = 'Przeglądanie bazy' onclick='_list()'>  <br> <input type = 'button' class = 'przycisk' id = 'viewButton' value = 'Analiza danych' onclick='_list50()'>  <br> <input type = 'button' class = 'przycisk' id = 'lokalImportButton' value = 'Zaimportuj dane lokalne' onclick='lokalImport()'> <br> <input type = 'button' class = 'przycisk' id = 'viewButton' value = 'Wyloguj się' onclick='logout()'>  <br>";
}

 
echo <<<EOL
    <!DOCTYPE html>
    <html lang='pl'>
      <head>
        <meta charset='UTF-8'>
        <title>Projekt1 TI Jakub Kra�niak</title>
        <link rel='stylesheet' href='style.css'>
      </head>
      <body>
            <header>
                <h1 style = 'font-size: 50px;'>Fotoradarowy pomiar predkosci</h1>
            </header>
        
            <nav>
              <input type = 'button' class = 'przycisk' id = 'backButton' value = 'Powrot do strony glownej' onclick="location.href='./index.html'">
            </nav>
        
            <article>
                <form id = 'menuForm' class = 'content' style = 'display : inline-block;'>
                  $str
                </form>
    
                <div id = 'loginRej' class = 'content' style = 'min-height: 650px; '>
                    
                </div>
    
                <div id = 'przeglad' class = 'content' style = 'min-width: 1000px; width: 1000px;'>
          
                </div>
    
            </article>
        
            <footer>
                Techniki Internetowe - Projekt 'System rejestracji danych
                z wykorzystaniem trybu off-line przegladarki' Jakub Krasniak 2022
            </footer>
          <script src = 'menu.js'></script>
      </body>
    </html>
    EOL;
?>