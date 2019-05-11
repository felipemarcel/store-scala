package controllers


import javax.inject.Inject

import javax.inject.Inject

import scala.concurrent.{ExecutionContext, Future}

import play.api.Logger
import play.api.mvc.{AbstractController, ControllerComponents}
import play.api.libs.json._

import reactivemongo.api.Cursor
import reactivemongo.api.ReadPreference

import play.modules.reactivemongo.{
  MongoController,
  ReactiveMongoApi,
  ReactiveMongoComponents
}


import reactivemongo.play.json._, collection._
import model.Customer

class CustomerController @Inject()(components: ControllerComponents, val reactiveMongoApi: ReactiveMongoApi)
  extends AbstractController(components) with MongoController with ReactiveMongoComponents {

  implicit def ec: ExecutionContext = components.executionContext

  def collection: Future[JSONCollection] = database.map(_.collection[JSONCollection]("customers"))

  def index() = Action.async {
    val cursor: Future[Cursor[JsObject]] = collection.map {
      _.find(Json.obj()).
        sort(Json.obj("created" -> -1)).
        cursor[JsObject](ReadPreference.primary)
    }

    val futureCustomersList: Future[List[JsObject]] =
      cursor.flatMap(_.collect[List](-1, Cursor.FailOnError[List[JsObject]]()))

    val futureCustomersJsonArray: Future[JsArray] =
      futureCustomersList.map { customers => Json.arr(customers) }

    futureCustomersJsonArray.map { customers =>
      Ok(customers)
    }
  }

  def create = Action.async(parse.json) { request =>
    request.body.validate[Customer].map { customer =>
      collection.flatMap(_.insert.one(customer)).map { lastError =>
        Logger.debug("Successfully inserted with LastError: $lastError")
        Created
      }
    }.getOrElse(Future.successful(BadRequest("invalid json")))
  }

}