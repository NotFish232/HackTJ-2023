DROP PROCEDURE IF EXISTS addUser;
DROP PROCEDURE IF EXISTS updateUser;

DELIMITER $$

CREATE PROCEDURE addUser(IN cur_username VARCHAR(100), IN cur_email TEXT, IN cur_password TEXT) 
BEGIN

DECLARE nextId INT;

SELECT COUNT(1) INTO nextId FROM users;
INSERT INTO users
VALUE (nextId, cur_username, cur_email, cur_password, 3000, 100, 0, 1, 0, -1);

INSERT INTO avatars
VALUE (nextId, "#ffffff", "#ffffff", "#ffffff", "#ffffff", "none");

SELECT * FROM users WHERE userId=nextId;

END $$


CREATE PROCEDURE updateUser(IN cur_userId INT, IN new_username VARCHAR(100), IN new_email TEXT, IN new_password TEXT)
BEGIN

UPDATE users SET username=new_username WHERE userId=cur_userId;
UPDATE users SET email=new_email WHERE userId=cur_userId;
UPDATE users SET password=new_password WHERE userId=cur_userId;

SELECT * FROM users WHERE userId=cur_userId;

END $$


DELIMITER ;