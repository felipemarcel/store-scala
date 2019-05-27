name := """store"""
organization := "com.felipemarcel"

version := "1.0-SNAPSHOT"

lazy val root = (project in file(".")).enablePlugins(PlayScala)

scalaVersion := "2.12.8"

libraryDependencies += guice
libraryDependencies ++= Seq(
  jdbc,
  "org.scalatestplus.play" %% "scalatestplus-play" % "4.0.2" % Test,
  "org.reactivemongo" %% "play2-reactivemongo" % "0.16.6-play27"
)

routesGenerator := InjectedRoutesGenerator
// Adds additional packages into Twirl
//TwirlKeys.templateImports += "com.felipemarcel.controllers._"

// Adds additional packages into conf/routes
// play.sbt.routes.RoutesKeys.routesImport += "com.felipemarcel.binders._"
