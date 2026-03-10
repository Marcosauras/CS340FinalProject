-- Citation for the following Procedures:
-- 3/02/2022
-- Adapted from:
-- Source URL: https://canvas.oregonstate.edu/courses/2031764/pages/exploration-implementing-cud-operations-in-your-app?module_item_id=26243436



/* ANIMALS */
-- Gets all animals
DROP PROCEDURE IF EXISTS sp_GetAnimals;
DELIMITER //

CREATE PROCEDURE sp_GetAnimals()
BEGIN
    SELECT
        animalID,
        name,
        species,
        breed,
        sex,
        age
    FROM Animals
    ORDER BY animalID;
END //

DELIMITER ;


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


/* FOSTERS */

-- Gets all fosters 
DROP PROCEDURE IF EXISTS sp_GetFosters;
DELIMITER //

CREATE PROCEDURE sp_GetFosters()
BEGIN
    SELECT
        fosterID,
        name,
        phone,
        email,
        capacity
    FROM Fosters
    ORDER BY fosterID;
END //

DELIMITER ;


-- Creates a foster (a foster parent)
DROP PROCEDURE IF EXISTS sp_CreateFoster;
DELIMITER //

CREATE PROCEDURE sp_CreateFoster(
    IN p_name       VARCHAR(255),
    IN p_phone      VARCHAR(20),
    IN p_email      VARCHAR(255),
    IN p_capacity   INT(11),
    OUT p_id        INT(11)
)
BEGIN
    INSERT INTO Fosters (name, phone, email, capacity)
    VALUES (p_name, p_phone, p_email, p_capacity);

    SELECT LAST_INSERT_ID() INTO p_id;
    SELECT LAST_INSERT_ID() AS new_id;
END //

DELIMITER ;


DROP PROCEDURE IF EXISTS sp_UpdateFoster;
DELIMITER //

CREATE PROCEDURE sp_UpdateFoster(
    IN p_fosterID   INT(11),
    IN p_name       VARCHAR(255),
    IN p_phone      VARCHAR(20),
    IN p_email      VARCHAR(255),
    IN p_capacity   INT(11)
)
BEGIN
    UPDATE Fosters
    SET
        name = p_name,
        phone = p_phone,
        email = p_email,
        capacity = p_capacity
    WHERE fosterID = p_fosterID;
END //
DELIMITER ;

DROP PROCEDURE IF EXISTS sp_DeleteFoster;
DELIMITER //

CREATE PROCEDURE sp_DeleteFoster(
    IN p_fosterID INT
)
BEGIN
    DECLARE error_message VARCHAR(255);

    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        RESIGNAL;
    END;

    START TRANSACTION;

        DELETE FROM Fosters
        WHERE fosterID = p_fosterID;

        IF ROW_COUNT() = 0 THEN
            SET error_message = CONCAT('No matching record found in Fosters for id: ', p_fosterID);
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = error_message;
        END IF;

    COMMIT;
END //

DELIMITER ;

/* ADOPTERS */
-- Grabs all the Adopters

/* ADOPTERS */

DROP PROCEDURE IF EXISTS sp_GetAdopters;
DELIMITER //

CREATE PROCEDURE sp_GetAdopters()
BEGIN
    SELECT
        adopterID,
        name,
        phone,
        email,
        note
    FROM Adopters
    ORDER BY adopterID;
END //

DELIMITER ;

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
    SELECT LAST_INSERT_ID() AS new_id;
END //

DELIMITER ;

DROP PROCEDURE IF EXISTS sp_UpdateAdopter;
DELIMITER //

CREATE PROCEDURE sp_UpdateAdopter(
    IN p_adopterID  INT(11),
    IN p_name       VARCHAR(255),
    IN p_phone      VARCHAR(20),
    IN p_email      VARCHAR(255),
    IN p_note       TEXT
)
BEGIN
    UPDATE Adopters
    SET
        name = p_name,
        phone = p_phone,
        email = p_email,
        note = p_note
    WHERE adopterID = p_adopterID;
END //

DELIMITER ;

DROP PROCEDURE IF EXISTS sp_DeleteAdopter;
DELIMITER //

CREATE PROCEDURE sp_DeleteAdopter(
    IN p_adopterID INT
)
BEGIN
    DECLARE error_message VARCHAR(255);

    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        RESIGNAL;
    END;

    START TRANSACTION;

        DELETE FROM Adopters
        WHERE adopterID = p_adopterID;

        IF ROW_COUNT() = 0 THEN
            SET error_message = CONCAT('No matching record found in Adopters for id: ', p_adopterID);
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = error_message;
        END IF;

    COMMIT;
END //

DELIMITER ;


/* MEDICAL RECORDS */

DROP PROCEDURE IF EXISTS sp_GetMedicalRecords;
DELIMITER //

CREATE PROCEDURE sp_GetMedicalRecords()
BEGIN
    SELECT
        MedicalRecords.medicalRecordID,
        MedicalRecords.animalID,
        Animals.name AS animalName,
        MedicalRecords.appointmentDate,
        MedicalRecords.note
    FROM MedicalRecords
    JOIN Animals ON Animals.animalID = MedicalRecords.animalID
    ORDER BY MedicalRecords.medicalRecordID;
END //

DELIMITER ;

DROP PROCEDURE IF EXISTS sp_CreateMedicalRecord;
DELIMITER //

CREATE PROCEDURE sp_CreateMedicalRecord(
    IN p_animalID           INT(11),
    IN p_appointmentDate    DATETIME,
    IN p_note               TEXT,
    OUT p_id                INT(11)
)
BEGIN
    INSERT INTO MedicalRecords (animalID, appointmentDate, note)
    VALUES (p_animalID, p_appointmentDate, p_note);

    SELECT LAST_INSERT_ID() INTO p_id;
    SELECT LAST_INSERT_ID() AS new_id;
END //

DELIMITER ;

DROP PROCEDURE IF EXISTS sp_UpdateMedicalRecord;
DELIMITER //

CREATE PROCEDURE sp_UpdateMedicalRecord(
    IN p_medicalRecordID    INT(11),
    IN p_animalID           INT(11),
    IN p_appointmentDate    DATETIME,
    IN p_note               TEXT,
    OUT p_id                INT(11)
)
BEGIN
    UPDATE MedicalRecords
    SET
        animalID = p_animalID,
        appointmentDate = p_appointmentDate,
        note = p_note
    WHERE medicalRecordID = p_medicalRecordID;

    SET p_id = p_medicalRecordID;
END //

DELIMITER ;

DROP PROCEDURE IF EXISTS sp_DeleteMedicalRecord;
DELIMITER //

CREATE PROCEDURE sp_DeleteMedicalRecord(
    IN p_recordID INT
)
BEGIN
    DECLARE error_message VARCHAR(255);

    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        RESIGNAL;
    END;

    START TRANSACTION;

        DELETE FROM MedicalRecords
        WHERE medicalRecordID = p_recordID;

        IF ROW_COUNT() = 0 THEN
            SET error_message = CONCAT('No matching record found in MedicalRecords for id: ', p_recordID);
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = error_message;
        END IF;

    COMMIT;
END //

DELIMITER ;


/* APPLICATIONS */

DROP PROCEDURE IF EXISTS sp_GetApplications;
DELIMITER //

CREATE PROCEDURE sp_GetApplications()
BEGIN
    SELECT
    Applications.applicationID,
    Applications.adopterID,
    -- grabbing names to make it easier to understand who the ID matches to
    Adopters.name AS adopterName,
    Applications.animalID,
    Animals.name AS animalName,
    Applications.applicationDate AS applicationDate,
    Applications.status,
    Applications.adoptedDate AS adoptedDate
    FROM Applications 
    JOIN Animals ON Animals.animalID = Applications.animalID
    JOIN Adopters ON Adopters.adopterID = Applications.adopterID
    ORDER BY applicationDate DESC;
END //

DELIMITER ;

DROP PROCEDURE IF EXISTS sp_CreateApplication;

DELIMITER //
CREATE PROCEDURE sp_CreateApplication(
    IN p_animalID       INT(11),
    IN p_adopterID      INT(11),
    IN p_status         VARCHAR(50),
    IN p_applicationDate  DATETIME,
    OUT p_id            INT
)
BEGIN
    INSERT INTO Applications (animalID, adopterID, status, applicationDate)
    VALUES (p_animalID, p_adopterID, p_status, p_applicationDate);

    SELECT LAST_INSERT_ID() INTO p_id;
    SELECT LAST_INSERT_ID() AS new_id;
END //
DELIMITER ;

DROP PROCEDURE IF EXISTS sp_UpdateApplication;
DELIMITER //

CREATE PROCEDURE sp_UpdateApplication(
    IN p_applicationID     INT(11),
    IN p_animalID          INT(11),
    IN p_adopterID         INT(11),
    IN p_status            VARCHAR(50),
    IN p_applicationDate   DATETIME,
    IN p_adoptedDate       DATETIME
)
BEGIN
    UPDATE Applications
    SET
        animalID = p_animalID,
        adopterID = p_adopterID,
        status = p_status,
        applicationDate = p_applicationDate,
        adoptedDate = p_adoptedDate
    WHERE applicationID = p_applicationID;
END //

DELIMITER ;

DROP PROCEDURE IF EXISTS sp_DeleteApplication;
DELIMITER //

CREATE PROCEDURE sp_DeleteApplication(
    IN p_applicationID INT
)
BEGIN
    DECLARE error_message VARCHAR(255);

    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        RESIGNAL;
    END;

    START TRANSACTION;

        DELETE FROM Applications
        WHERE applicationID = p_applicationID;

        IF ROW_COUNT() = 0 THEN
            SET error_message = CONCAT('No matching record found in Applications for id: ', p_applicationID);
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = error_message;
        END IF;

    COMMIT;
END //

DELIMITER ;


/* ANIMAL FOSTER DETAILS */

DROP PROCEDURE IF EXISTS sp_GetAnimalFosterDetails;
DELIMITER //

CREATE PROCEDURE sp_GetAnimalFosterDetails()
BEGIN
    SELECT
        AnimalFosterDetails.animalFosterDetailID,
        AnimalFosterDetails.animalID,
        Animals.name AS animalName,
        AnimalFosterDetails.fosterID,
        Fosters.name AS fosterName,
        AnimalFosterDetails.startDate,
        AnimalFosterDetails.endDate
    FROM AnimalFosterDetails
    JOIN Animals 
        ON Animals.animalID = AnimalFosterDetails.animalID
    JOIN Fosters 
        ON Fosters.fosterID = AnimalFosterDetails.fosterID
    ORDER BY AnimalFosterDetails.startDate DESC;
END //

DELIMITER ;

DROP PROCEDURE IF EXISTS sp_CreateAnimalFosterDetail;
DELIMITER //

CREATE PROCEDURE sp_CreateAnimalFosterDetail(
    IN p_animalID      INT(11),
    IN p_fosterID      INT(11),
    IN p_startDate     DATETIME,
    IN p_endDate       DATETIME,
    OUT p_id           INT(11)
)
BEGIN
    INSERT INTO AnimalFosterDetails (animalID, fosterID, startDate, endDate)
    VALUES (p_animalID, p_fosterID, p_startDate, p_endDate);

    SELECT LAST_INSERT_ID() INTO p_id;
    SELECT LAST_INSERT_ID() AS new_id;
END //

DELIMITER ;

DROP PROCEDURE IF EXISTS sp_UpdateAnimalFosterDetail;
DELIMITER //

CREATE PROCEDURE sp_UpdateAnimalFosterDetail(
    IN p_animalFosterDetailID   INT(11),
    IN p_animalID               INT(11),
    IN p_fosterID               INT(11),
    IN p_startDate              DATETIME,
    IN p_endDate                DATETIME
)
BEGIN
    UPDATE AnimalFosterDetails
    SET
        animalID = p_animalID,
        fosterID = p_fosterID,
        startDate = p_startDate,
        endDate = p_endDate
    WHERE animalFosterDetailID = p_animalFosterDetailID;
END //

DELIMITER ;

DROP PROCEDURE IF EXISTS sp_DeleteAnimalFosterDetail;
DELIMITER //

CREATE PROCEDURE sp_DeleteAnimalFosterDetail(
    IN p_animalFosterDetailID INT
)
BEGIN
    DECLARE error_message VARCHAR(255);

    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        RESIGNAL;
    END;

    START TRANSACTION;

        DELETE FROM AnimalFosterDetails
        WHERE animalFosterDetailID = p_animalFosterDetailID;

        IF ROW_COUNT() = 0 THEN
            SET error_message = CONCAT('No matching record found in AnimalFosterDetails for id: ', p_animalFosterDetailID);
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = error_message;
        END IF;

    COMMIT;
END //

DELIMITER ;