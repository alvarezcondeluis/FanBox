-- MySQL dump 10.13  Distrib 8.0.19, for Win64 (x86_64)
--
-- Host: localhost    Database: fanbox
-- ------------------------------------------------------
-- Server version	8.0.38

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `address`
--

DROP TABLE IF EXISTS `address`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `address` (
  `addressID` int NOT NULL AUTO_INCREMENT,
  `street` varchar(100) NOT NULL,
  `city` varchar(50) NOT NULL,
  `province` varchar(50) DEFAULT NULL,
  `postalCode` varchar(10) NOT NULL,
  `country` varchar(50) NOT NULL,
  `number` varchar(5) NOT NULL,
  `instructions` text,
  `userID` char(36) NOT NULL,
  PRIMARY KEY (`addressID`),
  KEY `FK_Address_User` (`userID`) USING BTREE,
  CONSTRAINT `FK_Address_User` FOREIGN KEY (`userID`) REFERENCES `user` (`userID`),
  CONSTRAINT `CHK_Number` CHECK (regexp_like(`number`,_utf8mb4'^[0-9]{1,5}$')),
  CONSTRAINT `CHK_PostalCode` CHECK (regexp_like(`postalCode`,_utf8mb4'^[0-9]{5}$'))
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `address`
--

LOCK TABLES `address` WRITE;
/*!40000 ALTER TABLE `address` DISABLE KEYS */;
INSERT INTO `address` VALUES (1,'Street 1','City A','Province A','11111','Country A','1','Instructions A','33333333-3333-3333-3333-333333333333'),(2,'Street 2','City B','Province B','22222','Country B','2','Instructions B','44444444-4444-4444-4444-444444444444'),(10,'Don Daniel 7','Santander','Cantabria','39004','Spain','8','','55555555-5555-5555-5555-555555555555');
/*!40000 ALTER TABLE `address` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cartitem`
--

DROP TABLE IF EXISTS `cartitem`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cartitem` (
  `cartItemID` int NOT NULL AUTO_INCREMENT,
  `quantity` smallint NOT NULL,
  `productID` char(36) NOT NULL,
  `productNumber` int NOT NULL,
  `userID` char(36) NOT NULL,
  PRIMARY KEY (`cartItemID`),
  KEY `FK_CartItem_ProductUnit` (`productID`,`productNumber`),
  KEY `FK_CartItem_User` (`userID`),
  CONSTRAINT `FK_CartItem_ProductUnit` FOREIGN KEY (`productID`, `productNumber`) REFERENCES `productunit` (`productID`, `productNumber`),
  CONSTRAINT `FK_CartItem_User` FOREIGN KEY (`userID`) REFERENCES `user` (`userID`),
  CONSTRAINT `CHK_Quantity_Cart` CHECK ((`quantity` > 0))
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cartitem`
--

LOCK TABLES `cartitem` WRITE;
/*!40000 ALTER TABLE `cartitem` DISABLE KEYS */;
INSERT INTO `cartitem` VALUES (1,1,'55555555-5555-5555-5555-555555555555',1,'33333333-3333-3333-3333-333333333333'),(4,1,'55555555-5555-5555-5555-555555555555',1,'55555555-5555-5555-5555-555555555555'),(6,1,'55555555-5555-5555-5555-555555555555',1,'55555555-5555-5555-5555-555555555555'),(12,10,'7047028d-62f2-4159-b151-12ca435d6bb0',1,'55555555-5555-5555-5555-555555555555');
/*!40000 ALTER TABLE `cartitem` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `TR_CheckStockBeforeInsertCart` BEFORE INSERT ON `cartitem` FOR EACH ROW BEGIN
    IF (SELECT stock FROM ProductUnit WHERE productID = NEW.productID AND productNumber = NEW.productNumber) < NEW.quantity THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'No hay suficiente stock';
    END IF;
end */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `TR_CheckStockBeforeUpdateCart` BEFORE UPDATE ON `cartitem` FOR EACH ROW BEGIN
    IF (SELECT stock FROM ProductUnit WHERE productID = NEW.productID AND productNumber = NEW.productNumber) < NEW.quantity THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'No hay suficiente stock';
    END IF;
end */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category` (
  `categoryID` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  PRIMARY KEY (`categoryID`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES (1,'Camisetas'),(2,'Category B');
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `discount`
--

DROP TABLE IF EXISTS `discount`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `discount` (
  `discountID` char(36) NOT NULL,
  `code` varchar(50) NOT NULL,
  `discount` decimal(5,2) NOT NULL,
  `startDate` date NOT NULL,
  `endDate` date DEFAULT NULL,
  PRIMARY KEY (`discountID`),
  UNIQUE KEY `code` (`code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `discount`
--

LOCK TABLES `discount` WRITE;
/*!40000 ALTER TABLE `discount` DISABLE KEYS */;
INSERT INTO `discount` VALUES ('11111111-1111-1111-1111-111111111111','DISC10',10.00,'2024-01-01','2024-12-31'),('22222222-2222-2222-2222-222222222222','DISC20',20.00,'2024-01-01','2024-12-31'),('b06bb994-7d89-48e4-9e6c-f9a1ad57ef71','SUMMER2024',20.00,'2024-06-01','2024-08-31');
/*!40000 ALTER TABLE `discount` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `invoice`
--

DROP TABLE IF EXISTS `invoice`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `invoice` (
  `invoiceID` int NOT NULL AUTO_INCREMENT,
  `date` date NOT NULL,
  `vat` decimal(5,2) NOT NULL DEFAULT '21.00',
  `isPayed` bit(1) NOT NULL DEFAULT b'0',
  `amount` decimal(10,2) NOT NULL,
  `orderID` char(36) NOT NULL,
  PRIMARY KEY (`invoiceID`),
  UNIQUE KEY `orderID` (`orderID`),
  CONSTRAINT `FK_Invoice_Order` FOREIGN KEY (`orderID`) REFERENCES `order` (`orderID`),
  CONSTRAINT `CHK_VatPercentage` CHECK ((`vat` between 0 and 100))
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `invoice`
--

LOCK TABLES `invoice` WRITE;
/*!40000 ALTER TABLE `invoice` DISABLE KEYS */;
INSERT INTO `invoice` VALUES (1,'2024-03-03',21.00,_binary '',121.00,'77777777-7777-7777-7777-777777777777'),(2,'2024-05-05',21.00,_binary '\0',242.00,'88888888-8888-8888-8888-888888888888');
/*!40000 ALTER TABLE `invoice` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order`
--

DROP TABLE IF EXISTS `order`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order` (
  `orderID` char(36) NOT NULL,
  `date` date NOT NULL DEFAULT (curdate()),
  `deliveryDate` date DEFAULT NULL,
  `amount` decimal(10,2) NOT NULL,
  `userID` char(36) NOT NULL,
  `discountID` char(36) DEFAULT NULL,
  `addressID` int NOT NULL,
  PRIMARY KEY (`orderID`),
  KEY `idx_Order_userID` (`userID`),
  KEY `FK_Order_Discount` (`discountID`) USING BTREE,
  KEY `FK_Order_Address` (`addressID`) USING BTREE,
  CONSTRAINT `order_address_FK` FOREIGN KEY (`addressID`) REFERENCES `address` (`addressID`),
  CONSTRAINT `order_discount_FK` FOREIGN KEY (`discountID`) REFERENCES `discount` (`discountID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order`
--

LOCK TABLES `order` WRITE;
/*!40000 ALTER TABLE `order` DISABLE KEYS */;
INSERT INTO `order` VALUES ('77777777-7777-7777-7777-777777777777','2024-03-03','2024-04-04',100.00,'33333333-3333-3333-3333-333333333333','11111111-1111-1111-1111-111111111111',1),('88888888-8888-8888-8888-888888888888','2024-05-05','2024-06-06',200.00,'44444444-4444-4444-4444-444444444444','22222222-2222-2222-2222-222222222222',1);
/*!40000 ALTER TABLE `order` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `TR_ValidateDiscount` BEFORE INSERT ON `order` FOR EACH ROW BEGIN
    DECLARE discountValid BOOLEAN;
    IF NEW.discountID IS NOT NULL THEN
        SET discountValid = (SELECT COUNT(*) FROM Discount WHERE discountID = NEW.discountID AND CURRENT_DATE BETWEEN startDate AND endDate);
        IF discountValid = 0 THEN
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Descuento no válido o expirado';
        END IF;
    END IF;
end */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `orderhistory`
--

DROP TABLE IF EXISTS `orderhistory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orderhistory` (
  `orderHistoryID` int NOT NULL AUTO_INCREMENT,
  `initialDate` date NOT NULL,
  `status` char(20) NOT NULL,
  `endDate` date DEFAULT NULL,
  `orderID` char(36) NOT NULL,
  PRIMARY KEY (`orderHistoryID`),
  UNIQUE KEY `UQ_Status` (`status`,`orderID`),
  KEY `FK_OrderHistory_Order` (`orderID`),
  CONSTRAINT `FK_OrderHistory_Order` FOREIGN KEY (`orderID`) REFERENCES `order` (`orderID`),
  CONSTRAINT `CHK_STATUS` CHECK ((`status` in (_utf8mb4'Pendiente',_utf8mb4'Procesado',_utf8mb4'Enviado',_utf8mb4'Entregado',_utf8mb4'Cancelado',_utf8mb4'Devuelto')))
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orderhistory`
--

LOCK TABLES `orderhistory` WRITE;
/*!40000 ALTER TABLE `orderhistory` DISABLE KEYS */;
INSERT INTO `orderhistory` VALUES (1,'2024-03-03','Pendiente',NULL,'77777777-7777-7777-7777-777777777777'),(2,'2024-05-05','Pendiente',NULL,'88888888-8888-8888-8888-888888888888');
/*!40000 ALTER TABLE `orderhistory` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orderproductunit`
--

DROP TABLE IF EXISTS `orderproductunit`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orderproductunit` (
  `quantity` int NOT NULL,
  `cost` decimal(6,2) NOT NULL,
  `orderID` char(36) NOT NULL,
  `productID` char(36) NOT NULL,
  `productNumber` int NOT NULL,
  PRIMARY KEY (`orderID`,`productID`,`productNumber`),
  KEY `FK_Order_ProductUnit` (`productID`,`productNumber`),
  CONSTRAINT `orderproductunit_ibfk_1` FOREIGN KEY (`orderID`) REFERENCES `order` (`orderID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `orderproductunit_ibfk_2` FOREIGN KEY (`productID`, `productNumber`) REFERENCES `productunit` (`productID`, `productNumber`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orderproductunit`
--

LOCK TABLES `orderproductunit` WRITE;
/*!40000 ALTER TABLE `orderproductunit` DISABLE KEYS */;
/*!40000 ALTER TABLE `orderproductunit` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product`
--

DROP TABLE IF EXISTS `product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product` (
  `productID` char(36) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `sport` varchar(50) NOT NULL,
  `brand` varchar(50) NOT NULL,
  `releaseDate` datetime NOT NULL,
  `isActive` tinyint(1) NOT NULL DEFAULT '1',
  `categoryID` int NOT NULL,
  `teamID` int DEFAULT NULL,
  PRIMARY KEY (`productID`),
  UNIQUE KEY `name` (`name`,`categoryID`),
  KEY `categoryID` (`categoryID`),
  KEY `teamID` (`teamID`),
  CONSTRAINT `FK_Product_Category` FOREIGN KEY (`categoryID`) REFERENCES `category` (`categoryID`),
  CONSTRAINT `FK_Product_Team` FOREIGN KEY (`teamID`) REFERENCES `team` (`teamID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product`
--

LOCK TABLES `product` WRITE;
/*!40000 ALTER TABLE `product` DISABLE KEYS */;
INSERT INTO `product` VALUES ('42d08522-3eca-4965-9138-9717ff95ccd6','Camiseta Selección española  ','Camiseta Selección española Temporada 2024','Football','Adidas','2024-08-25 15:23:38',1,1,3),('55555555-5555-5555-5555-555555555555','Product A','Description A','Football','Brand A','2024-01-01 00:00:00',1,1,1),('7047028d-62f2-4159-b151-12ca435d6bb0','Camiseta Selección española','Camiseta Selección española Temporada 2024','Football','Adidas','2024-08-25 15:09:38',1,1,3),('a1134eda-39d2-4604-881e-682c61644955','Camiseta Selección española ','Camiseta Selección española Temporada 2024','Football','Adidas','2024-08-25 15:23:07',1,1,3),('b5ee6387-9391-4183-8ba7-e91d80a51860','Product F','Description B','Basketball','Brand B','2024-08-10 00:00:00',1,2,NULL),('da0a825d-1337-4cd2-b7e1-61c4675289d7','Camiseta Selección española Morata','Camiseta Selección española Temporada 2024','Football','Adidas','2024-08-25 15:21:02',1,1,3);
/*!40000 ALTER TABLE `product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `productimage`
--

DROP TABLE IF EXISTS `productimage`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `productimage` (
  `imageID` int NOT NULL AUTO_INCREMENT,
  `url` varchar(255) NOT NULL,
  `description` text,
  `isMain` tinyint(1) NOT NULL DEFAULT '0',
  `productID` char(36) NOT NULL,
  PRIMARY KEY (`imageID`),
  KEY `productID` (`productID`),
  CONSTRAINT `FK_Image_Product` FOREIGN KEY (`productID`) REFERENCES `product` (`productID`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `productimage`
--

LOCK TABLES `productimage` WRITE;
/*!40000 ALTER TABLE `productimage` DISABLE KEYS */;
INSERT INTO `productimage` VALUES (4,'https://res.cloudinary.com/dhcrtcco9/image/upload/v1723285686/toklyuhqnx55rcwdkenq.png','Image of the product from the front view.',1,'55555555-5555-5555-5555-555555555555'),(5,'https://res.cloudinary.com/dhcrtcco9/image/upload/v1723285686/toklyuhqnx55rcwdkenq.png','Image of the product from the front view.',1,'b5ee6387-9391-4183-8ba7-e91d80a51860'),(6,'https://res.cloudinary.com/dhcrtcco9/image/upload/v1724597265/e8vwo3stazcukuhetftc.png','Image of the product from the front view.',1,'7047028d-62f2-4159-b151-12ca435d6bb0'),(7,'https://res.cloudinary.com/dhcrtcco9/image/upload/v1724597266/zwcc75bxqj3mdybmejjb.png','Image of the product from the back view.',0,'7047028d-62f2-4159-b151-12ca435d6bb0'),(8,'https://res.cloudinary.com/dhcrtcco9/image/upload/v1724597266/zwcc75bxqj3mdybmejjb.png','Image of the product from the back view.',0,'da0a825d-1337-4cd2-b7e1-61c4675289d7'),(9,'https://res.cloudinary.com/dhcrtcco9/image/upload/v1724597265/e8vwo3stazcukuhetftc.png','Image of the product from the back view.',1,'da0a825d-1337-4cd2-b7e1-61c4675289d7'),(10,'https://res.cloudinary.com/dhcrtcco9/image/upload/v1724597265/e8vwo3stazcukuhetftc.png','Image of the product from the back view.',1,'a1134eda-39d2-4604-881e-682c61644955'),(11,'https://res.cloudinary.com/dhcrtcco9/image/upload/v1724597265/e8vwo3stazcukuhetftc.png','Image of the product from the back view.',1,'42d08522-3eca-4965-9138-9717ff95ccd6');
/*!40000 ALTER TABLE `productimage` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `TR_SingleMainImage` BEFORE INSERT ON `productimage` FOR EACH ROW BEGIN
    IF NEW.isMain = 1 THEN
        -- Verificar si ya existe una imagen principal para este producto
        IF EXISTS (SELECT 1 FROM ProductImage WHERE productID = NEW.productID AND isMain = 1) THEN
            SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = 'Only one main image allowed per product';
        END IF;
    END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `productunit`
--

DROP TABLE IF EXISTS `productunit`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `productunit` (
  `productID` char(36) NOT NULL,
  `productNumber` int NOT NULL,
  `stock` smallint NOT NULL,
  `price` decimal(6,2) NOT NULL,
  `weight` decimal(5,2) NOT NULL,
  `size` char(1) DEFAULT NULL,
  PRIMARY KEY (`productID`,`productNumber`),
  KEY `idx_ProductUnit_productID_productNumber` (`productID`,`productNumber`),
  CONSTRAINT `FK_ProductUnit_Product` FOREIGN KEY (`productID`) REFERENCES `product` (`productID`),
  CONSTRAINT `CHK_Price` CHECK ((`price` > 0)),
  CONSTRAINT `CHK_Size` CHECK ((`size` in (_utf8mb4'XS',_utf8mb4'S',_utf8mb4'M',_utf8mb4'L',_utf8mb4'XL'))),
  CONSTRAINT `CHK_Stock` CHECK ((`stock` > 0))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `productunit`
--

LOCK TABLES `productunit` WRITE;
/*!40000 ALTER TABLE `productunit` DISABLE KEYS */;
INSERT INTO `productunit` VALUES ('42d08522-3eca-4965-9138-9717ff95ccd6',1,50,24.99,0.50,'S'),('55555555-5555-5555-5555-555555555555',1,100,50.00,1.00,'M'),('55555555-5555-5555-5555-555555555555',2,50,19.99,0.50,'M'),('55555555-5555-5555-5555-555555555555',3,50,19.99,0.50,'M'),('7047028d-62f2-4159-b151-12ca435d6bb0',1,50,19.99,0.50,'M'),('7047028d-62f2-4159-b151-12ca435d6bb0',2,50,19.99,0.50,'L'),('7047028d-62f2-4159-b151-12ca435d6bb0',3,50,19.99,0.50,'S'),('a1134eda-39d2-4604-881e-682c61644955',1,50,24.99,0.50,'S'),('da0a825d-1337-4cd2-b7e1-61c4675289d7',1,50,24.99,0.50,'S');
/*!40000 ALTER TABLE `productunit` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `team`
--

DROP TABLE IF EXISTS `team`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `team` (
  `teamID` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  PRIMARY KEY (`teamID`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `team`
--

LOCK TABLES `team` WRITE;
/*!40000 ALTER TABLE `team` DISABLE KEYS */;
INSERT INTO `team` VALUES (4,'Real Madrid'),(3,'Selección Española'),(1,'Team A'),(2,'Team B');
/*!40000 ALTER TABLE `team` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `userID` char(36) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `firstName` varchar(50) NOT NULL,
  `lastName` varchar(50) DEFAULT NULL,
  `email` varchar(100) NOT NULL,
  `phone` varchar(9) NOT NULL,
  `passwd` varchar(255) NOT NULL,
  `userRole` char(8) NOT NULL,
  `dateOfBirth` date NOT NULL,
  PRIMARY KEY (`userID`),
  UNIQUE KEY `email` (`email`),
  CONSTRAINT `CHK_Email` CHECK ((`email` like _utf8mb4'%@%.%')),
  CONSTRAINT `CHK_Phone` CHECK (regexp_like(`phone`,_utf8mb4'^[0-9]{9}$')),
  CONSTRAINT `CHK_UserRole` CHECK ((`userRole` in (_utf8mb4'admin',_utf8mb4'user')))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES ('33333333-3333-3333-3333-333333333333',NULL,'John','Doe','john.doe@example.com','123456789','password','admin','1990-01-01'),('44444444-4444-4444-4444-444444444444',NULL,'Jane','Doe','jane.doe@example.com','987654321','password','user','1992-02-02'),('54b1fb84-0f65-4dba-bdd8-d89ceaaf747d',NULL,'luiasd','aaassd asfsf','alasd@gmail.com','673367480','$2b$10$MeTvA4V0LGWVsRcaPgYZJuSPkuk9PEAC4PTi.6oBhzPDXD0Tg6wQi','user','2001-08-08'),('55555555-5555-5555-5555-555555555555',NULL,'Luis','Alvarez','alvarezcondeluis@gmail.com','987654321','$2b$10$5MWqoAeBw9UnIteCU9miJemW.qgYszpi.glY4HNO5pyq5ayzLbMnS','admin','1992-02-02'),('685d376c-778e-4760-a515-f6953daa4d4c',NULL,'John','Doe','joh44n.doe@example.com','123456789','$2b$10$YA7NrYEBl6E5jJnMYJ7/U.hFGIgqDtS8bfh8RZJueAgq6OHCspSmK','user','1990-01-01'),('745e8dfc-093f-40fc-9eba-469c7f0327f5',NULL,'asdf','asdfa asdf','asdf@gmail.com','556578590','$2b$10$i2dzt4o9DMseA/nouyT2r.ejDezMFwsKwbaHpIedoXjbkAcB1mOJS','user','2002-08-13'),('c09f78ed-6309-4d93-8021-cfc2ef57393a',NULL,'asdfasdf','asdfadf adf','asdfasdf@gmail.com','555444445','$2b$10$diLFnESK06m0MWirrp6FderPtE7Y8NtumhJF1Cbdt/K2Qy36d75gu','user','2024-08-05'),('cbf7824e-d00a-4ce6-bb33-8949d02404a5',NULL,'John','Doe','john2.doe@example.com','123456789','$2b$10$MfyeRuxw27xL0FQ38p.3ROGlJ9WTg6G5hnUz2Pf1o1bhQ0Mv.7hSe','user','1990-01-01');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'fanbox'
--
/*!50003 DROP PROCEDURE IF EXISTS `AddProduct` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `AddProduct`(
    IN productID CHAR(36),
    IN name VARCHAR(100),
    IN description TEXT,
    IN sport VARCHAR(50),
    IN brand VARCHAR(50),
    IN releaseDate DATE,
    IN isActive BIT,
    IN categoryID INT,
    IN images JSON,
    IN units JSON
)
BEGIN
    DECLARE img_index INT DEFAULT 0;
    DECLARE img_count INT;
    DECLARE img_url VARCHAR(255);
    DECLARE img_description TEXT;
    DECLARE img_isMain BIT;

    DECLARE unit_index INT DEFAULT 0;
    DECLARE unit_count INT;
    DECLARE unit_size CHAR(1);
    DECLARE unit_stock SMALLINT;
    DECLARE unit_price DECIMAL(6,2);
    DECLARE unit_weight DECIMAL(5,2);

    -- Handler para errores
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        -- En caso de error, deshacer la transacción
        ROLLBACK;
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Error al añadir el producto';
    END;

    -- Contar el número de elementos en los arrays JSON
    SET img_count = JSON_LENGTH(images);
    SET unit_count = JSON_LENGTH(units);

    START TRANSACTION;

    -- Insertar el producto en la tabla Product
    INSERT INTO Product (productID, name, description, sport, brand, releaseDate, isActive, categoryID)
    VALUES (productID, name, description, sport, brand, releaseDate, isActive, categoryID);

    -- Insertar las imágenes en la tabla ProductImage
    WHILE img_index < img_count DO
        SET img_url = JSON_UNQUOTE(JSON_EXTRACT(images, CONCAT('$[', img_index, '].url')));
        SET img_description = JSON_UNQUOTE(JSON_EXTRACT(images, CONCAT('$[', img_index, '].description')));
        SET img_isMain = JSON_UNQUOTE(JSON_EXTRACT(images, CONCAT('$[', img_index, '].isMain')));

        INSERT INTO ProductImage (productID, url, description, isMain)
        VALUES (productID, img_url, img_description, img_isMain);

        SET img_index = img_index + 1;
    END WHILE;

    -- Insertar los detalles de stock en la tabla ProductUnit
    WHILE unit_index < unit_count DO
        SET unit_size = JSON_UNQUOTE(JSON_EXTRACT(units, CONCAT('$[', unit_index, '].size')));
        SET unit_stock = JSON_UNQUOTE(JSON_EXTRACT(units, CONCAT('$[', unit_index, '].stock')));
        SET unit_price = JSON_UNQUOTE(JSON_EXTRACT(units, CONCAT('$[', unit_index, '].price')));
        SET unit_weight = JSON_UNQUOTE(JSON_EXTRACT(units, CONCAT('$[', unit_index, '].weight')));

        INSERT INTO ProductUnit (productID, size, stock, price, weight)
        VALUES (productID, unit_size, unit_stock, unit_price, unit_weight);

        SET unit_index = unit_index + 1;
    END WHILE;

    -- Confirmar la transacción
    COMMIT;
end ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `CreateOrder` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `CreateOrder`(
    IN orderID CHAR(36),
    IN userID CHAR(36),
    IN deliveryDate DATE,
    IN discountID CHAR(36),
    IN items JSON
)
BEGIN
    DECLARE orderAmount DECIMAL(10, 2) DEFAULT 0;
    DECLARE productID CHAR(36);
    DECLARE productNumber INT;
    DECLARE quantity INT;
    DECLARE price DECIMAL(10, 2);
    DECLARE stockAvailable INT;

    DECLARE item_index INT DEFAULT 0;
    DECLARE item_count INT;

    -- Handler para errores
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        -- En caso de error, deshacer la transacción
        ROLLBACK;
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Error al crear el pedido';
    END;

    -- Contar el número de elementos en el array JSON
    SET item_count = JSON_LENGTH(items);

    -- Iniciar una transacción
    START TRANSACTION;

    -- Insertar la orden en la tabla Orders
    INSERT INTO `Order` (orderID, date, deliveryDate, amount, userID, discountID)
    VALUES (orderID, CURRENT_DATE, deliveryDate, orderAmount, userID, discountID);

    -- Iterar sobre los ítems del pedido
    WHILE item_index < item_count DO
        SET productID = JSON_UNQUOTE(JSON_EXTRACT(items, CONCAT('$[', item_index, '].productID')));
        SET productNumber = JSON_UNQUOTE(JSON_EXTRACT(items, CONCAT('$[', item_index, '].productNumber')));
        SET quantity = JSON_UNQUOTE(JSON_EXTRACT(items, CONCAT('$[', item_index, '].quantity')));

        -- Obtener el precio del producto
        SELECT price INTO price
        FROM ProductUnit
        WHERE productID = productID AND productNumber = productNumber;

        -- Verificar y actualizar el stock
        SELECT stock INTO stockAvailable
        FROM ProductUnit
        WHERE productID = productID AND productNumber = productNumber;

        IF stockAvailable >= quantity THEN
            UPDATE ProductUnit
            SET stock = stock - quantity
            WHERE productID = productID AND productNumber = productNumber;

            -- Insertar el ítem de la orden
            INSERT INTO OrderProductUnit (orderID, productID, productNumber, quantity, price)
            VALUES (orderID, productID, productNumber, quantity, price);
        ELSE
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'No hay suficiente stock para este producto';
        END IF;

        SET item_index = item_index + 1;
    END WHILE;

    -- Confirmar la transacción
    COMMIT;
end ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-09-02 13:47:48
