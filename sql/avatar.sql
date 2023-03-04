DROP TABLE IF EXISTS avatars;

CREATE TABLE avatars(userId INT, skin VARCHAR(100), shirt VARCHAR(100), pants VARCHAR(100), shoes VARCHAR(100), hair VARCHAR(100), PRIMARY KEY(userId));


DROP PROCEDURE IF EXISTS updateAvatar;

DELIMITER $$

CREATE PROCEDURE updateAvatar(IN cur_userId INT, IN newInfo TEXT)
BEGIN

DECLARE entryEnd INT;
DECLARE pathIdEnd INT;
DECLARE entry VARCHAR(100);
DECLARE cur_pathId VARCHAR(100);
DECLARE cur_color VARCHAR(100);

WHILE newInfo!="" DO
    
    SET entryEnd = LOCATE(";", newInfo);
    SET entry = SUBSTRING(newInfo, 1, entryEnd-1);
    SET newInfo= SUBSTRING(newInfo, entryEnd+1);
    
    SET pathIdEnd = LOCATE(":", entry);
    SET cur_pathId = SUBSTRING(entry, 1, pathIdEnd-1);
    SET cur_color = SUBSTRING(entry, pathIdEnd+1);
    
    PREPARE command FROM CONCAT('UPDATE avatars SET ', cur_pathId, ' = "#', cur_color, '" WHERE userId = ', cur_userId, ";");
    EXECUTE command;
    DEALLOCATE PREPARE command; 

END WHILE;

END $$

DELIMITER ;