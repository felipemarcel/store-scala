package model

import play.api.libs.json.Json

final case class OrderStore(quantity: String, products: List[Product])

object OrderStore {
  implicit val orderFormat = Json.format[OrderStore]
  implicit val productFormat = Json.format[Product]
}
