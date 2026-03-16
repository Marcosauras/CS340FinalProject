-- Citation for the following Procedures:
-- 3/02/2022
-- Adapted from:
-- Source URL: https://canvas.oregonstate.edu/courses/2031764/pages/exploration-implementing-cud-operations-in-your-app?module_item_id=26243436

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
    SELECT LAST_INSERT_ID() AS 'new_id';
END //
DELIMITER ;

-- Updates an foster
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

-- Deletes the foster based on ID
DROP PROCEDURE IF EXISTS sp_DeleteFoster;

DELIMITER //
CREATE PROCEDURE sp_DeleteFoster(
    IN p_fosterID INT
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

        DELETE FROM Fosters
        WHERE fosterID = p_fosterID;

        IF ROW_COUNT() = 0 THEN
            set error_message = CONCAT('No matching record found in Fosters for id: ', p_fosterID);
            -- Trigger custom error, invoke EXIT HANDLER
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = error_message;
        END IF;

    COMMIT;

END //

DELIMITER ;


-- Grabs all the Adopters

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

-- Updates an adopter
DROP PROCEDURE IF EXISTS sp_UpdateAdopter;

DELIMITER //
CREATE PROCEDURE sp_UpdateAdopter(
    IN p_adopterID   INT(11),
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

-- Deletes the adopter based on ID
DROP PROCEDURE IF EXISTS sp_DeleteAdopter;

DELIMITER //
CREATE PROCEDURE sp_DeleteAdopter(
    IN p_adopterID INT
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

        DELETE FROM Adopters
        WHERE adopterID = p_adopterID;

        IF ROW_COUNT() = 0 THEN
            set error_message = CONCAT('No matching record found in Adopters for id: ', p_adopterID);
            -- Trigger custom error, invoke EXIT HANDLER
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = error_message;
        END IF;

    COMMIT;

END //

DELIMITER ;



-- Grabs all the medical records
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
    INSERT INTO MedicalRecords (animalID, appointmentDate, note)
    VALUES (p_animalID, p_appointmentDate, p_note);

    SELECT LAST_INSERT_ID() INTO p_id;
    SELECT LAST_INSERT_ID() AS 'new_id';
END //
DELIMITER ;


-- Updates a medical record
DROP PROCEDURE IF EXISTS sp_UpdateMedicalRecord;

DELIMITER //
CREATE PROCEDURE sp_UpdateMedicalRecord(
    IN p_medicalRecordID    INT(11),
    IN p_animalID           INT(11),
    IN p_appointmentDate    DATETIME,
    IN p_note               TEXT
)
BEGIN
    UPDATE MedicalRecords
    SET
        animalID = p_animalID,
        appointmentDate = p_appointmentDate,
        note = p_note
    WHERE medicalRecordID = p_medicalRecordID;
END //

DELIMITER ;

-- Deletes the Medical Record based on ID
DROP PROCEDURE IF EXISTS sp_DeleteMedicalRecord;

DELIMITER //
CREATE PROCEDURE sp_DeleteMedicalRecord(
    IN p_medicalRecordID INT
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

        DELETE FROM MedicalRecords
        WHERE medicalRecordID = p_medicalRecordID;

        IF ROW_COUNT() = 0 THEN
            set error_message = CONCAT('No matching record found in MedicalRecords for id: ', p_medicalRecordID);
            -- Trigger custom error, invoke EXIT HANDLER
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = error_message;
        END IF;

    COMMIT;

END //

DELIMITER ;


-- Gets all applications
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
    ORDER BY Applications.applicationID DESC;
END //

DELIMITER ;


-- Creates an application
DROP PROCEDURE IF EXISTS sp_CreateApplication;

DELIMITER //
CREATE PROCEDURE sp_CreateApplication(
    IN p_animalID           INT(11),
    IN p_adopterID          INT(11),
    IN p_status             VARCHAR(50),
    IN p_applicationDate    DATETIME,
    OUT p_id                INT
)
BEGIN
    INSERT INTO Applications (adopterID, animalID, applicationDate, status)
    VALUES (p_adopterID, p_animalID, p_applicationDate, p_status);

    SELECT LAST_INSERT_ID() INTO p_id;
    SELECT LAST_INSERT_ID() AS new_id;
END //
DELIMITER ;

-- Updates an application
DROP PROCEDURE IF EXISTS sp_UpdateApplication;

DELIMITER //
CREATE PROCEDURE sp_UpdateApplication(
    IN p_applicationID      INT(11),
    IN p_adopterID          INT(11),
    IN p_animalID           INT(11),
    IN p_applicationDate    DATETIME,
    IN p_status             VARCHAR(20),
    IN p_adoptedDate        DATETIME
)
BEGIN
    UPDATE Applications
    SET
        adopterID = p_adopterID,
        animalID = p_animalID,
        applicationDate = p_applicationDate,
        status = p_status,
        adoptedDate = p_adoptedDate
    WHERE applicationID = p_applicationID;
END //

DELIMITER ;

-- Deletes the Application based on ID
DROP PROCEDURE IF EXISTS sp_DeleteApplication;

DELIMITER //
CREATE PROCEDURE sp_DeleteApplication(
    IN p_applicationID INT
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

        DELETE FROM Applications
        WHERE applicationID = p_applicationID;

        IF ROW_COUNT() = 0 THEN
            set error_message = CONCAT('No matching record found in Applications for id: ', p_applicationID);
            -- Trigger custom error, invoke EXIT HANDLER
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = error_message;
        END IF;

    COMMIT;

END //

DELIMITER ;


-- Grab all the animal Foster Details
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


-- Updates an AnimalFosterDetail
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
    WHERE animalFosterDetailID  = p_animalFosterDetailID ;
END //

DELIMITER ;

-- Deletes the AnimalFosterDetails based on ID
DROP PROCEDURE IF EXISTS sp_DeleteAnimalFosterDetail;

DELIMITER //
CREATE PROCEDURE sp_DeleteAnimalFosterDetail(
    IN p_animalFosterDetailID INT
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

        DELETE FROM AnimalFosterDetails
        WHERE animalFosterDetailID = p_animalFosterDetailID;

        IF ROW_COUNT() = 0 THEN
            set error_message = CONCAT('No matching record found in AnimalFosterDetails for id: ', p_animalFosterDetailID);
            -- Trigger custom error, invoke EXIT HANDLER
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = error_message;
        END IF;

    COMMIT;

END //

DELIMITER ;

-- Citation for the following Procedure:
-- 3/02/2022
-- Copied from DDL table:
-- Source URL: https://www.w3schools.com/sql/sql_ref_drop_table.asp

-- Resets the database
DROP PROCEDURE IF EXISTS sp_ResetDatabase;
DELIMITER //

CREATE PROCEDURE sp_ResetDatabase()
BEGIN
  SET FOREIGN_KEY_CHECKS = 0;

  TRUNCATE TABLE AnimalFosterDetails;
  TRUNCATE TABLE Applications;
  TRUNCATE TABLE MedicalRecords;
  TRUNCATE TABLE Animals;
  TRUNCATE TABLE Fosters;
  TRUNCATE TABLE Adopters;

  SET FOREIGN_KEY_CHECKS = 1;

-- Citation for the following Inserts:
-- 3/02/2022
-- Copied from DDL table:
-- Source our DDL.sql file
SET FOREIGN_KEY_CHECKS=1;
COMMIT;


INSERT INTO Animals
(
    name,
    species,
    breed,
    sex,
    age
)
VALUES
(
    "Roman",
    "dog",
    "greyhound",
    "male",
    2
),
-- show cases NULL values for the animals
(
    "Calliope",
    "cat",
    NULL,
    "female",
    NULL
),
(
    "Arthur Pendragon",
    NULL,
    NULL,
    "male",
    3
),
-- All other values are NULL
(
    "Bella",
    NULL,
    NULL,
    NULL,
    NULL
);

-- Insert data on people that want to foster animals
INSERT INTO Fosters
(
    name,
    phone,
    email,
    capacity
)
VALUES
(
    "Joey",
    "804-832-2424",
    "JoeyFosters@example.com",
    1
),
(
    "Lannie",
    "621-321-1256",
    "NotACat@example.come",
    4
),
(
    "Donna",
    "292-291-2033",
    "Donna@example.com",
    2

);

-- The Cat Roman was with Joey but is now with Lannie showcasing the one animal with multiple fosters
-- The Foster Lannie (definitely not a cat) has two animals with them showcasing the one Foster with multiple animals
-- These two combined showcase the M:M relationship between Animals and Fosters
INSERT INTO AnimalFosterDetails
(
    animalID,
    fosterID,
    startDate,
    endDate 
)
VALUES
(
    (SELECT animalID FROM Animals WHERE animalID = 1),
    (SELECT fosterID FROM Fosters WHERE email = "JoeyFosters@example.com"),
    '2026-01-10 10:30:00',
    '2026-01-20 10:30:00'
),
(
    (SELECT animalID FROM Animals WHERE animalID = 1),
    (SELECT fosterID FROM Fosters WHERE email = 'NotACat@example.come'),
    '2026-02-04 10:30:00',
    NULL
),
(
    (SELECT animalID FROM Animals WHERE animalID = 2),
    (SELECT fosterID FROM Fosters WHERE email = "NotACat@example.come"),
    '2026-01-01 10:30:00',
    NULL
);

-- Insert data on people that want to adopt animals
INSERT INTO Adopters
(
    name,
    phone,
    email,
    note
)
VALUES
(
    "Ben",
    "832-123-8429",
    "Ben@example.com",
    "Said he was looking for a small animal because his apartment doesn't have much space"
),
(
    "Lancelot",
    "804-832-2932",
    "Lancelot@example.com",
    NULL
),
(
    "Merlin",
    "804-832-7987",
    "CourtMagician@example.com",
    NULL
);

-- Two Medical records put in for Roman showcasing the M:1 relationship between medicalrecords and animals.
INSERT INTO MedicalRecords
(
    animalID,
    appointmentDate,
    note
)
VALUES
(
    (SELECT animalID FROM Animals WHERE animalID = 1),
    "2026-01-20 10:30:00",
    "Stomach Pains"
),
(
    (SELECT animalID FROM Animals WHERE animalID = 1),
    "2026-01-27 10:30:00",
    NULL
),
(
    (SELECT animalID FROM Animals WHERE animalID = 4),
    NULL,
    "Bella has been limping we need to schedule an appointment with the vet"
);

-- Two Applications in for the same animal showcases the M:1 with between applications and animals
-- Two Applications being placed by the same person showcases the M:1 between applications and adopters
-- These two combined showcase the M:M relationship between Animals and Adopters
INSERT INTO Applications 
(
    adopterID,
    animalID,
    applicationDate,
    status,
    adoptedDate
)
VALUES
(
    (SELECT adopterID FROM Adopters WHERE email = "Ben@example.com"),
    (SELECT animalID FROM Animals WHERE animalID = 4),
    '2026-02-01 10:14:00',
    "pending",
    NULL
),
(
    (SELECT adopterID FROM Adopters WHERE email = "CourtMagician@example.com"),
    (SELECT animalID FROM Animals WHERE animalID = 3),
    '2026-01-05 6:02:00',
    "approved",
    "2026-01-10"
),
(
    (SELECT adopterID FROM Adopters WHERE email = "Lancelot@example.com"),
    (SELECT animalID FROM Animals WHERE animalID = 3),
    '2026-01-10 11:00:00',
    "denied",
    NULL
),
(
    (SELECT adopterID FROM Adopters WHERE email = "Lancelot@example.com"),
    (SELECT animalID FROM Animals WHERE animalID = 4),
    '2026-02-02 11:30:00',
    "pending",
    NULL 
);

END //

DELIMITER ;