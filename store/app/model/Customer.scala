package model

import play.api.libs.json.Json

final case class Customer(firstName: String, lastName: String)

object Customer {
  implicit val format = Json.format[Customer]
}
