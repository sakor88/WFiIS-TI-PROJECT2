<?php
 
require '/home/stud2019/9krasniak/public_html/projekt2/vendor/autoload.php' ;
 
class db {
    private $user = "9krasniak" ;
    private $pass = "pass9krasniak";
    private $host = "172.20.44.25";
    private $base = "9krasniak";
    private $coll = "predkosc";
    private $conn;
    private $dbase;
    private $collection;
 
 
 
    function __construct() {
      $this->conn = new MongoDB\Client("mongodb://{$this->user}:{$this->pass}@{$this->host}/{$this->base}");    
      $this->collection = $this->conn->{$this->base}->{$this->coll};
    }
 
    function select() {
      $cursor = $this->collection->find();
      $table = iterator_to_array($cursor);
      return $table ;
    }
 
    function insert($user) {
      $ret = $this->collection->insertOne($user) ;
      return $ret;
    }
 
    
}
