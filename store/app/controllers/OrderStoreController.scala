package controllers


import javax.inject.Inject

import javax.inject.Inject

import scala.concurrent.{ExecutionContext, Future}

import play.api.Logger
import play.api.mvc.{AbstractController, ControllerComponents}
import play.api.libs.json._

import reactivemongo.api.Cursor
import reactivemongo.api.ReadPreference
import reactivemongo.bson.{BSONObjectID, BSONDocument}

import play.modules.reactivemongo.{
  MongoController,
  ReactiveMongoApi,
  ReactiveMongoComponents
}


import reactivemongo.play.json._, collection._
import model.OrderStore

class OrderStoreController @Inject()(components: ControllerComponents, val reactiveMongoApi: ReactiveMongoApi)
  extends AbstractController(components) with MongoController with ReactiveMongoComponents {

  implicit def ec: ExecutionContext = components.executionContext

  def collection: Future[JSONCollection] = database.map(_.collection[JSONCollection]("orders"))

  // GET /orders
  def index() = Action.async {
    val cursor: Future[Cursor[JsObject]] = collection.map {
      _.find(Json.obj()).
        sort(Json.obj("created" -> -1)).
        cursor[JsObject](ReadPreference.primary)
    }

    val futureOrderStoresList: Future[List[JsObject]] =
      cursor.flatMap(_.collect[List](-1, Cursor.FailOnError[List[JsObject]]()))

    val futureOrderStoresJsonArray: Future[JsArray] =
      futureOrderStoresList.map { orderStores => JsArray(orderStores) }

    futureOrderStoresJsonArray.map { orderStores =>
      Ok(orderStores)
    }
  }


  // POST /orders
  def create = Action.async(parse.json) { request =>
    request.body.validate[OrderStore].map { orderStore =>
      collection.flatMap(_.insert.one(orderStore)).map { lastError =>
        Logger.debug("Successfully inserted with LastError: $lastError")
        Created
      }
    }.getOrElse(Future.successful(BadRequest("invalid json")))
  }


  // PUT /orders/:id
  def update(id: String) = Action.async(parse.json) { request =>
    request.body.validate[OrderStore].map { body =>
      findBy(id).map { orderStore =>
        orderStore match {
          case Some(orderStore) => {
            val objectToUpdate = Json.obj("$set" -> body)
            collection.flatMap(_.update(orderStore, objectToUpdate)).map { lastError =>
              Logger.debug("Successfully inserted with LastError: $lastError")
            }
            Ok(Json.obj("message" -> "Compra alterada com sucesso"))
          }
          case None => NotFound(Json.obj("message" -> "Não existe cliente com este id!"))
        }
      }
    }.getOrElse(Future.successful(BadRequest("Foram informados dados inválidos para alteração da compra.")))
  }

  // GET /orders/:id
  def findById(id: String) = Action.async {
    findBy(id).map { orderStore =>
      orderStore match {
        case Some(orderStore) => Ok(Json.toJson(orderStore))
        case None => NotFound(Json.obj("message" -> "Não existe ordem de compra com este id!"))
      }
    }
  }

  def findBy(id: String) = {
    val objId = BSONObjectID.parse(id).get

    def futureOrderStore: Future[Option[JsObject]] = collection.flatMap(
      _.find(Json.obj("_id" -> objId)).one[JsObject])

    futureOrderStore
  }

}