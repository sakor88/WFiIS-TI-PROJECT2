<?php
 
function __autoload($class_name) {
    include $class_name . '.php' ;
}
 
$user = new Register_new;
 
echo $user->_login() ;

echo "<meta http-equiv='refresh' content='0;url=menu.php'>";
             
?>
