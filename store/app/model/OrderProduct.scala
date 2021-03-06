package model

import play.api.libs.json.Json

final case class OrderProduct(quantity: Int, product: Product)

object OrderProduct {
  implicit val orderFormat = Json.format[OrderProduct]
  implicit val productFormat = Json.format[Product]
}
