package model

import play.api.libs.json._

final case class OrderStore(status: Boolean, products: List[OrderProduct])

object OrderStore {
  implicit val orderStoreFormat = Json.format[OrderStore]
  implicit val orderProductFormat = Json.format[OrderProduct]
}
