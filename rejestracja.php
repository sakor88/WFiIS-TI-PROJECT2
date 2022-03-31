<?php
 
function __autoload($class_name) {
    include $class_name . '.php' ;
}
 

$reg = new Register_new ;
$reg->_read();
$reg->_save();
echo "<meta http-equiv='refresh' content='0;url=menu.php'>";
             
?>
