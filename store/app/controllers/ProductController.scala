package controllers


import javax.inject.Inject

import javax.inject.Inject

import scala.concurrent.{ExecutionContext, Future}

import play.api.Logger
import play.api.mvc.{AbstractController, ControllerComponents}
import play.api.libs.json._

import reactivemongo.bson.{BSONObjectID, BSONDocument}
import reactivemongo.api.Cursor
import reactivemongo.api.ReadPreference
import reactivemongo.play.json._

import play.modules.reactivemongo.{
  MongoController,
  ReactiveMongoApi,
  ReactiveMongoComponents
}


import reactivemongo.play.json._, collection._
import model.Product

class ProductController @Inject()(components: ControllerComponents, val reactiveMongoApi: ReactiveMongoApi)
  extends AbstractController(components) with MongoController with ReactiveMongoComponents {

  implicit def ec: ExecutionContext = components.executionContext

  def collection: Future[JSONCollection] = database.map(_.collection[JSONCollection]("products"))

  def index() = Action.async {
    val cursor: Future[Cursor[JsObject]] = collection.map {
      _.find(Json.obj()).
        sort(Json.obj("created" -> -1)).
        cursor[JsObject](ReadPreference.primary)
    }

    val futureProductsList: Future[List[JsObject]] =
      cursor.flatMap(_.collect[List](-1, Cursor.FailOnError[List[JsObject]]()))

    val futureProductsJsonArray: Future[JsArray] =
      futureProductsList.map { products => JsArray(products) }

    futureProductsJsonArray.map { products =>
      Ok(products)
    }
  }

  def create = Action.async(parse.json) { request =>
    request.body.validate[Product].map { product =>
      collection.flatMap(_.insert.one(product)).map { lastError =>
        Logger.debug("Successfully inserted with LastError: $lastError")
        Created
      }
    }.getOrElse(Future.successful(BadRequest("invalid json")))
  }

  def findById(id: String) = Action.async {
    val objId = BSONObjectID.parse(id).get

    def futureProduct: Future[Option[Product]] = collection.flatMap(
      _.find(Json.obj("_id" -> objId)).one[Product])

    futureProduct.map { product =>
      product match {
        case Some(product) => Ok(Json.toJson(product))
        case None => NotFound(Json.obj("message" -> "Não existe produto com este id!"))
      }
    }

  }
}