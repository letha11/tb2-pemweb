<?php

define(constant_name:"DB_USERNAME", value: "letha");
define(constant_name:"DB_PASSWORD", value: "");
define(constant_name:"DB_NAME", value: "uas");
define(constant_name:"DB_HOSTNAME", value: "localhost");

$conn = mysqli_connect(DB_HOSTNAME, DB_USERNAME, DB_PASSWORD, DB_NAME) or die("Koneksi Error");
