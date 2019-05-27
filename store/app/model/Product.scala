package model

import play.api.libs.json.Json

final case class Product(name: String, price: Double, pictureUrl: String)

object Product {
  implicit val format = Json.format[Product]
}
