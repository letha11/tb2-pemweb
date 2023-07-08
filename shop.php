<?php
include_once("library/config.php");
include_once("get_products.php");

// $query = "SELECT * FROM products LEFT JOIN categories ON products.id_category=categories.id";
// $result = mysqli_query($conn, $query);

// $products = mysqli_fetch_all($result, MYSQLI_ASSOC);


?>
<section id="page-header">
  <h2>#stay at home</h2>
  <p>Shopping easier from home.</p>
  <a href="#" class="to-top">
    <i class="fas fa-chevron-up"></i>
  </a>
</section>

<section id="product1" class="section-p1">
  <form class="search-form">
    <input type="text" name="query" id="query" placeholder="Search..." />
    <button type="submit" class="search-btn">
      <i class="fas fa-search"></i>
    </button>
  </form>

  <div class="no-result">
    <h3>Sorry, no results found.</h3>
    <p>Try searching again.</p>
  </div>

  <div class="pro-container">
    <?php
    if(count($products) <= 0) {
        echo "<h1>No product available</h1>";
    } else {
        foreach($products as $product) {
            echo generateProductElement($product);
        }
    }
?>
  </div>
</section>
