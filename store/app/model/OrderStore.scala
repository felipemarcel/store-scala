package model

import play.api.libs.json.Json

final case class OrderStore(status: Boolean, products: List[OrderProduct])

object OrderStore {
  implicit val orderFormat = Json.format[OrderStore]
  implicit val productFormat = Json.format[OrderProduct]
}
