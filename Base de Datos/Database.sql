-- Crear la base de datos si no existe

create database prueba
-- Creación de tablas
-- Tabla: Category
DROP TABLE IF EXISTS Category;
CREATE TABLE Category (
    categoryID INT AUTO_INCREMENT NOT NULL,
    name VARCHAR(100) NOT NULL,
    PRIMARY KEY (categoryID),
    UNIQUE (name)
) ENGINE=InnoDB;

-- Tabla: Product
DROP TABLE IF EXISTS Product;
CREATE TABLE Product (
    productID CHAR(36) NOT NULL,
    name VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    sport VARCHAR(50) NOT NULL,
    brand VARCHAR(50) NOT NULL,
    releaseDate DATE NOT NULL DEFAULT CURDATE(),
    isActive BIT(1) NOT NULL DEFAULT 1,
    categoryID INT NOT NULL,
    PRIMARY KEY (productID),
    UNIQUE (name, categoryID),
    FOREIGN KEY (categoryID) REFERENCES Category(categoryID)
) ENGINE=InnoDB;

-- Tabla: ProductUnit
DROP TABLE IF EXISTS ProductUnit;
CREATE TABLE ProductUnit (
    productID CHAR(36) NOT NULL,
    productNumber INT AUTO_INCREMENT NOT NULL,
    stock SMALLINT NOT NULL,
    price DECIMAL(6,2) NOT NULL,
    weight DECIMAL(5,2) NOT NULL,
    size CHAR(1),
    PRIMARY KEY (productID, productNumber),
    FOREIGN KEY (productID) REFERENCES Product(productID),
    CHECK (size IN ('XS', 'S', 'M', 'L', 'XL')),
    CHECK (stock > 0),
    CHECK (price > 0)
) ENGINE=InnoDB;

-- Tabla: ProductImage
DROP TABLE IF EXISTS ProductImage;
CREATE TABLE ProductImage (
    imageID INT AUTO_INCREMENT NOT NULL,
    url VARCHAR(255) NOT NULL,
    description TEXT,
    isMain BIT(1) NOT NULL DEFAULT 0,
    productID CHAR(36) NOT NULL,
    PRIMARY KEY (imageID),
    FOREIGN KEY (productID) REFERENCES Product(productID)
) ENGINE=InnoDB;

-- Tabla: User
DROP TABLE IF EXISTS User;
CREATE TABLE User (
    userID CHAR(36) NOT NULL,
    firstName VARCHAR(50) NOT NULL,
    lastName VARCHAR(50),
    email VARCHAR(100) NOT NULL,
    phone VARCHAR(9) NOT NULL,
    passwd VARCHAR(255) NOT NULL,
    userRole CHAR(8) NOT NULL,
    dateOfBirth DATE NOT NULL,
    PRIMARY KEY (userID),
    UNIQUE (email),
    CHECK (email LIKE '%@%.%'),
    CHECK (phone REGEXP '^[0-9]{9}$'),
    CHECK (userRole IN ('admin', 'user'))
) ENGINE=InnoDB;

-- Tabla: Address
DROP TABLE IF EXISTS Address;
CREATE TABLE Address (
    addressID INT AUTO_INCREMENT NOT NULL,
    street VARCHAR(100) NOT NULL,
    city VARCHAR(50) NOT NULL,
    province VARCHAR(50) not null,
    postalCode VARCHAR(10) NOT NULL,
    country VARCHAR(50) NOT NULL,
    number VARCHAR(5) NOT NULL,
    instructions TEXT,
    userID CHAR(36) NOT NULL,
    PRIMARY KEY (addressID),
    FOREIGN KEY (userID) REFERENCES User(userID),
    CHECK (postalCode REGEXP '^[0-9]{5}$'),
    CHECK (number REGEXP '^[0-9]{1,5}$')
) ENGINE=InnoDB;

-- Tabla: Discount
DROP TABLE IF EXISTS Discount;
CREATE TABLE Discount (
    discountID CHAR(36) NOT NULL,
    code VARCHAR(50) NOT NULL,
    discount DECIMAL(5,2) NOT NULL,
    startDate DATE NOT NULL,
    endDate DATE,
    PRIMARY KEY (discountID),
    UNIQUE (code)
) ENGINE=InnoDB;

-- Tabla: Order
DROP TABLE IF EXISTS `Order`;
CREATE TABLE `Order` (
    orderID CHAR(36) NOT NULL,
    date DATE DEFAULT CURDATE() NOT NULL,
    deliveryDate DATE,
    amount DECIMAL(10,2) NOT NULL,
    userID CHAR(36) NOT NULL,
    discountID CHAR(36),
    addressID INT NOT NULL,
    PRIMARY KEY (orderID),
    FOREIGN KEY (userID) REFERENCES User(userID),
    FOREIGN KEY (discountID) REFERENCES Discount(discountID),
    FOREIGN KEY (addressID) REFERENCES Address(addressID)
) ENGINE=InnoDB;

-- Tabla: OrderHistory
DROP TABLE IF EXISTS OrderHistory;
CREATE TABLE OrderHistory (
    orderHistoryID INT AUTO_INCREMENT NOT NULL,
    initialDate DATE NOT NULL,
    status CHAR(20) NOT NULL,
    endDate DATE,
    orderID CHAR(36) NOT NULL,
    PRIMARY KEY (orderHistoryID),
    UNIQUE (status, orderID),
    FOREIGN KEY (orderID) REFERENCES `Order`(orderID),
    CHECK (status IN ('Pendiente', 'Procesado', 'Enviado', 'Entregado', 'Cancelado', 'Devuelto'))
) ENGINE=InnoDB;

-- Tabla: OrderProductUnit
DROP TABLE IF EXISTS OrderProductUnit;
CREATE TABLE OrderProductUnit (
    quantity INT NOT NULL,
    price DECIMAL(6,2) NOT NULL,
    orderID CHAR(36) NOT NULL,
    productID CHAR(36) NOT NULL,
    productNumber INT NOT NULL,
    PRIMARY KEY (orderID, productID, productNumber),
    FOREIGN KEY (orderID) REFERENCES `Order`(orderID) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (productID, productNumber) REFERENCES ProductUnit(productID, productNumber) ON DELETE CASCADE ON UPDATE CASCADE,
    CHECK (quantity > 0)
) ENGINE=InnoDB;

-- Tabla: CartItem
DROP TABLE IF EXISTS CartItem;
CREATE TABLE CartItem (
    cartItemID INT AUTO_INCREMENT NOT NULL,
    quantity SMALLINT NOT NULL,
    productID CHAR(36) NOT NULL,
    productNumber INT NOT NULL,
    userID CHAR(36) NOT NULL,
    PRIMARY KEY (cartItemID),
    FOREIGN KEY (productID, productNumber) REFERENCES ProductUnit(productID, productNumber),
    FOREIGN KEY (userID) REFERENCES User(userID),
    CHECK (quantity > 0)
) ENGINE=InnoDB;

-- Tabla: Invoice
DROP TABLE IF EXISTS Invoice;
CREATE TABLE Invoice (
    invoiceID INT AUTO_INCREMENT NOT NULL,
    date DATE NOT NULL,
    vat DECIMAL(5,2) NOT NULL DEFAULT 21.00,
    isPayed BIT(1) DEFAULT 0 NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    orderID CHAR(36) NOT NULL,
    PRIMARY KEY (invoiceID),
    FOREIGN KEY (orderID) REFERENCES `Order`(orderID),
    UNIQUE (orderID),
    CHECK (vat BETWEEN 0 AND 100)
) ENGINE=InnoDB;

-- Índices adicionales

-- Índices Nonclustered en columnas de uso frecuente en consultas
CREATE INDEX idx_Order_userID ON `Order`(userID);
CREATE INDEX idx_OrderProductUnit_productID ON OrderProductUnit(productID);
CREATE INDEX idx_ProductUnit_productID_productNumber ON ProductUnit(productID, productNumber);
