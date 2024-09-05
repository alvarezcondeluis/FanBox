CREATE TRIGGER `TR_SingleMainImage` BEFORE
INSERT ON `productimage` FOR EACH ROW BEGIN IF NEW.isMain = 1 THEN -- Verificar si ya existe una imagen principal para este producto
    IF EXISTS (
        SELECT 1
        FROM ProductImage
        WHERE productID = NEW.productID
            AND isMain = 1
    ) THEN SIGNAL SQLSTATE '45000'
SET MESSAGE_TEXT = 'Solo una imagen principal por producto';
END IF;
END IF;
END;
CREATE TRIGGER `TR_ValidateDiscount` BEFORE
INSERT ON `order` FOR EACH ROW BEGIN
DECLARE discountValid BOOLEAN;
IF NEW.discountID IS NOT NULL THEN
SET discountValid = (
        SELECT COUNT(*)
        FROM Discount
        WHERE discountID = NEW.discountID
            AND CURRENT_DATE BETWEEN startDate AND endDate
    );
IF discountValid = 0 THEN SIGNAL SQLSTATE '45000'
SET MESSAGE_TEXT = 'Descuento no válido o expirado';
END IF;
END IF;
END;
CREATE TRIGGER `TR_CheckStockBeforeInsertCart` BEFORE
INSERT ON `cartitem` FOR EACH ROW BEGIN IF (
        SELECT stock
        FROM ProductUnit
        WHERE productID = NEW.productID
            AND productNumber = NEW.productNumber
    ) < NEW.quantity THEN SIGNAL SQLSTATE '45000'
SET MESSAGE_TEXT = 'No hay suficiente stock';
END IF;
END;
CREATE TRIGGER `TR_CheckStockBeforeUpdateCart` BEFORE
UPDATE ON `cartitem` FOR EACH ROW BEGIN IF (
        SELECT stock
        FROM ProductUnit
        WHERE productID = NEW.productID
            AND productNumber = NEW.productNumber
    ) < NEW.quantity THEN SIGNAL SQLSTATE '45000'
SET MESSAGE_TEXT = 'No hay suficiente stock';
END IF;
END;