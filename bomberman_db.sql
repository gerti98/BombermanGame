-- Progettazione Web 
DROP DATABASE if exists bomberman_db; 
CREATE DATABASE bomberman_db; 
USE bomberman_db; 
-- MySQL dump 10.13  Distrib 5.6.20, for Win32 (x86)
--
-- Host: localhost    Database: bomberman_db
-- ------------------------------------------------------
-- Server version	5.6.20

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `multiplaye_data`
--

DROP TABLE IF EXISTS `multiplaye_data`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `multiplaye_data` (
  `idmultiplaye_data` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(45) NOT NULL,
  `total_matches` int(11) DEFAULT NULL,
  `wins_player1` int(11) DEFAULT NULL,
  `user_iduser` int(11) NOT NULL,
  PRIMARY KEY (`idmultiplaye_data`),
  KEY `fk_multiplaye_data_user1` (`user_iduser`),
  CONSTRAINT `fk_multiplaye_data_user1` FOREIGN KEY (`user_iduser`) REFERENCES `user` (`iduser`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `multiplaye_data`
--

LOCK TABLES `multiplaye_data` WRITE;
/*!40000 ALTER TABLE `multiplaye_data` DISABLE KEYS */;
INSERT INTO `multiplaye_data` VALUES (3,'pippo',4,2,25),(4,'pweb',0,0,26),(5,'jack',0,0,27),(6,'bombermanUser',1,0,28),(7,'firefox',0,0,29),(8,'jack1',2,0,30),(9,'jack2',0,0,31),(10,'jack3',0,0,32),(11,'jack4',1,0,33),(12,'jack5',0,0,34),(13,'jack6',1,0,35);
/*!40000 ALTER TABLE `multiplaye_data` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `scores`
--

DROP TABLE IF EXISTS `scores`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `scores` (
  `idscores` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(45) NOT NULL,
  `score` int(11) DEFAULT NULL,
  `user_iduser` int(11) NOT NULL,
  PRIMARY KEY (`idscores`),
  KEY `fk_scores_user` (`user_iduser`),
  CONSTRAINT `fk_scores_user` FOREIGN KEY (`user_iduser`) REFERENCES `user` (`iduser`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=124 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `scores`
--

LOCK TABLES `scores` WRITE;
/*!40000 ALTER TABLE `scores` DISABLE KEYS */;
INSERT INTO `scores` VALUES (92,'pippo',0,25),(93,'bombermanUser',0,28),(94,'bombermanUser',0,28),(95,'bombermanUser',0,28),(96,'firefox',2,29),(97,'pippo',4,25),(98,'pippo',0,25),(99,'pippo',2,25),(100,'pippo',0,25),(101,'pippo',0,25),(102,'pippo',0,25),(103,'pippo',2,25),(104,'pippo',2,25),(105,'pippo',6,25),(106,'pippo',5,25),(107,'pippo',0,25),(108,'pippo',2,25),(109,'pippo',12,25),(110,'pippo',6,25),(111,'pippo',4,25),(112,'pippo',8,25),(113,'pippo',0,25),(114,'pippo',7,25),(115,'pippo',1,25),(116,'pippo',12,25),(117,'pippo',0,25),(118,'jack1',1,30),(119,'jack2',12,31),(120,'jack3',48,32),(121,'jack4',0,33),(122,'jack5',0,34),(123,'jack6',0,35);
/*!40000 ALTER TABLE `scores` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `iduser` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(45) NOT NULL,
  `password` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  PRIMARY KEY (`iduser`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (25,'pippo','pippopippo2','pippo@gmail.com'),(26,'pweb','pwebpweb2','pweb@gmail.com'),(27,'jack','jackjack2','jack@gmail.com'),(28,'bombermanUser','useruser2','user@gmail.com'),(29,'firefox','firefox2','firefox@gmail.com'),(30,'jack1','jackjack2','jack1@gmail.com'),(31,'jack2','jackjack2','jack2@gmail.com'),(32,'jack3','jackjack2','jack3@gmail.com'),(33,'jack4','jackjack2','jack4@gmail.com'),(34,'jack5','jackjack2','jack5@gmail.com'),(35,'jack6','jackjack2','jack6@gmail.com');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-01-29 16:25:33
