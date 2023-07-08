<?php

$query = "SELECT * FROM products LEFT JOIN categories ON products.id_category=categories.id ORDER BY products.id DESC";
$result = mysqli_query($conn, $query);

$products = mysqli_fetch_all($result, MYSQLI_ASSOC);

function generateProductElement($product)
{
    $formatted_price = number_format($product['price'], 0, ",", ".");
    $html = "
        <div class='pro'>
          <img src='assets/img/products/{$product["img"]}' alt=''>
          <div class='des'>
            <span>{$product["category"]}</span>
            <h5>{$product["name"]}</h5>
            <div class='star'>
  ";

    // Star
    for ($i=0; $i < 5; $i++) {
        if($i < $product['rating']) {
            $html .= "<i class='fa-sharp fa-solid fa-star'></i>";
        } else {
            $html .= "<i class='fa-sharp fa-regular fa-star'></i>";
        }
    }

    $html .= "
            </div>
            <h4>Rp {$formatted_price} </h4>
          </div>
          <a href='#'>
            <i class='fa-sharp fa-solid fa-cart-shopping'></i>
          </a>
        </div>
  ";


  return $html;
}
