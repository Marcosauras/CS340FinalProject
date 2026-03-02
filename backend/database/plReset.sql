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