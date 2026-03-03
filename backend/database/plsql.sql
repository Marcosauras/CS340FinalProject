-- Citation for the following Procedures:
-- 3/02/2022
-- Adapted from:
-- Source URL: https://canvas.oregonstate.edu/courses/2031764/pages/exploration-implementing-cud-operations-in-your-app?module_item_id=26243436

-- Creates a new animal and adds them to the database
DROP PROCEDURE IF EXISTS sp_CreateAnimal;

DELIMITER //
CREATE PROCEDURE sp_CreateAnimal(
    IN p_name       VARCHAR(255),
    IN p_species    VARCHAR(255),
    IN p_breed      VARCHAR(255),
    IN p_sex        VARCHAR(30),
    IN p_age        INT(11),
    OUT p_id        INT(11)
)
BEGIN
    INSERT INTO Animals (name, species, breed, sex, age)
    VALUES (p_name, p_species, p_breed, p_sex, p_age);

    SELECT LAST_INSERT_ID() INTO p_id;
    SELECT LAST_INSERT_ID() AS 'new_id';
END //
DELIMITER ;

-- Updates an animal
DROP PROCEDURE IF EXISTS sp_UpdateAnimal;

DELIMITER //
CREATE PROCEDURE sp_UpdateAnimal(
    IN p_animalID   INT(11),
    IN p_name       VARCHAR(255),
    IN p_species    VARCHAR(255),
    IN p_breed      VARCHAR(255),
    IN p_sex        VARCHAR(30),
    IN p_age        INT(11)
)
BEGIN
    UPDATE Animals
    SET
        name = p_name,
        species = p_species,
        breed = p_breed,
        sex = p_sex,
        age = p_age
    WHERE animalID = p_animalID;
END //

DELIMITER ;


-- Deletes the animal based on ID
DROP PROCEDURE IF EXISTS sp_DeleteAnimal;

DELIMITER //
CREATE PROCEDURE sp_DeleteAnimal(
    IN p_animalID INT
)
BEGIN
    DECLARE error_message VARCHAR(255); 
        DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        -- Roll back the transaction on any error
        ROLLBACK;
        -- Propogate the custom error message to the caller
        RESIGNAL;
    END;

    START TRANSACTION;

        DELETE FROM Animals
        WHERE animalID = p_animalID;

        IF ROW_COUNT() = 0 THEN
            set error_message = CONCAT('No matching record found in Animals for id: ', p_animalID);
            -- Trigger custom error, invoke EXIT HANDLER
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = error_message;
        END IF;

    COMMIT;

END //

DELIMITER ;

-- Creates a foster (a foster parent)
DROP PROCEDURE IF EXISTS sp_CreateFoster;

DELIMITER //
CREATE PROCEDURE sp_CreateFoster(
    IN f_name       VARCHAR(255),
    IN f_phone      VARCHAR(20),
    IN f_email      VARCHAR(255),
    IN f_capacity   INT(11),
    OUT f_id        INT(11)
)
BEGIN
    INSERT INTO Fosters (name, phone, email, capacity)
    VALUES (f_name, f_phone, f_email, f_capacity);

    SELECT LAST_INSERT_ID() INTO f_id;
    SELECT LAST_INSERT_ID() AS 'new_id';
END //
DELIMITER ;

-- Creates an adopter
DROP PROCEDURE IF EXISTS sp_CreateAdopter;

DELIMITER //
CREATE PROCEDURE sp_CreateAdopter(
    IN p_name       VARCHAR(255),
    IN p_phone      VARCHAR(20),
    IN p_email      VARCHAR(255),
    IN p_note       TEXT,
    OUT p_id        INT(11)
)
BEGIN
    INSERT INTO Adopters (name, phone, email, note)
    VALUES (p_name, p_phone, p_email, p_note);

    SELECT LAST_INSERT_ID() INTO p_id;
    SELECT LAST_INSERT_ID() AS 'new_id';
END //
DELIMITER ;

-- Creates a medical record
DROP PROCEDURE IF EXISTS sp_CreateFoster;

DELIMITER //
CREATE PROCEDURE sp_CreateFoster(
    IN p_name       VARCHAR(255),
    IN p_phone      VARCHAR(20),
    IN p_email      VARCHAR(255),
    IN p_note       TEXT,
    OUT p_id        INT(11)
)
BEGIN
    INSERT INTO Fosters (name, phone, email, note)
    VALUES (p_name, p_phone, p_email, p_note);

    SELECT LAST_INSERT_ID() INTO p_id;
    SELECT LAST_INSERT_ID() AS 'new_id';
END //
DELIMITER ;

-- Creates an application
DROP PROCEDURE IF EXISTS sp_CreateApplication;

DELIMITER //
CREATE PROCEDURE sp_CreateApplication(
    IN p_animalID       INT(11),
    IN p_adopterID      INT(11),
    IN p_status         VARCHAR(50),
    IN p_dateSubmitted  DATETIME,
    OUT p_id            INT
)
BEGIN
    INSERT INTO Applications (animalID, adopterID, status, dateSubmitted)
    VALUES (p_animalID, p_adopterID, p_status, p_dateSubmitted);

    SELECT LAST_INSERT_ID() INTO p_id;
    SELECT LAST_INSERT_ID() AS new_id;
END //
DELIMITER ;

-- Creates a medical Record for an animal
DROP PROCEDURE IF EXISTS sp_CreateMedicalRecord;

DELIMITER //
CREATE PROCEDURE sp_CreateMedicalRecord(
    IN p_animalID           INT(11),
    IN p_appointmentDate    DATETIME,
    IN p_note               TEXT,
    OUT p_id                INT
)
BEGIN
    INSERT INTO MedicalRecordDetails (animalID, appointmentDate, note)
    VALUES (p_animalID, p_appointmentDate, p_note);

    SELECT LAST_INSERT_ID() INTO p_id;
    SELECT LAST_INSERT_ID() AS 'new_id';
END //
DELIMITER ;

-- Creates an animal foster entry with details on who the animal is staying with and for how long
DROP PROCEDURE IF EXISTS sp_CreateAnimalFosterDetail;

DELIMITER //
CREATE PROCEDURE sp_CreateAnimalFosterDetail(
    IN p_animalID   INT,
    IN p_fosterID   INT,
    IN p_startDate  DATETIME,
    IN p_endDate    DATETIME,
    OUT p_id        INT
)
BEGIN
    INSERT INTO AnimalFosterDetails (animalID, fosterID, startDate, endDate)
    VALUES (p_animalID, p_fosterID, p_startDate, p_endDate);

    SELECT LAST_INSERT_ID() INTO p_id;
    SELECT LAST_INSERT_ID() AS new_id;
END //
DELIMITER ;
