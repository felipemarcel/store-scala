package model

import play.api.libs.json.Json

final case class Customer(firstName: String, lastName: String, orders: List[OrderStore])

object Customer {
  implicit val orderFormat = Json.format[OrderStore]
  implicit val customerFormat = Json.format[Customer]
}
