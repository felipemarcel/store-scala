package controllers


import javax.inject.Inject

import javax.inject.Inject

import scala.concurrent.{ExecutionContext, Future}

import play.api.Logger
import play.api.mvc.{AbstractController, ControllerComponents}
import play.api.libs.json._

import reactivemongo.api.Cursor
import reactivemongo.api.ReadPreference
import reactivemongo.play.json._
import reactivemongo.bson.{BSONObjectID, BSONDocument}

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

  // GET /customers
  def index() = Action.async {
    val cursor: Future[Cursor[JsObject]] = collection.map {
      _.find(Json.obj()).
        sort(Json.obj("created" -> -1)).
        cursor[JsObject](ReadPreference.primary)
    }

    val futureCustomersList: Future[List[JsObject]] =
      cursor.flatMap(_.collect[List](-1, Cursor.FailOnError[List[JsObject]]()))

    val futureCustomersJsonArray: Future[JsArray] =
      futureCustomersList.map { customers => JsArray(customers) }

    futureCustomersJsonArray.map { customers =>
      Ok(customers)
    }
  }

  // POST /customers
  def create = Action.async(parse.json) { request =>
    request.body.validate[Customer].map { customer =>
      collection.flatMap(_.insert.one(customer)).map { lastError =>
        Logger.debug("Successfully inserted with LastError: $lastError")
        Created
      }
    }.getOrElse(Future.successful(BadRequest("Foram informados dados inválidos para criação de um novo cliente.")))
  }

  // GET /customers/:id
  def findById(id: String) = Action.async {
    findBy(id).map { customer =>
      customer match {
        case Some(customer) => Ok(Json.toJson(customer))
        case None => NotFound(Json.obj("message" -> "Não existe cliente com este id!"))
      }
    }
  }

  // PUT /customers
  def update(id: String) = Action.async(parse.json) { request =>
    request.body.validate[Customer].map { body =>
      findBy(id).map { customer =>
        customer match {
          case Some(customer) => {
            val objectToUpdate = Json.obj("$set" -> body)
            collection.flatMap(_.update(customer, objectToUpdate)).map { lastError =>
              Logger.debug("Successfully inserted with LastError: $lastError")
            }
            Ok(Json.obj("message" -> "Cliente alterado com sucesso"))
          }
          case None => NotFound(Json.obj("message" -> "Não existe cliente com este id!"))
        }
      }
    }.getOrElse(Future.successful(BadRequest("Foram informados dados inválidos para criação de um novo cliente.")))
  }

  // Auxiliar
  def findBy(id: String) = {
    val objId = BSONObjectID.parse(id).get

    def futureCustomer: Future[Option[JsObject]] = collection.flatMap(
      _.find(Json.obj("_id" -> objId)).one[JsObject])

    futureCustomer
  }

}