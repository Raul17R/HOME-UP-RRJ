
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL
);


--[TABLE AND DATA FOR MAINTENANCE]--
CREATE TABLE "maintenance" (
	"id" SERIAL PRIMARY KEY,
	"task" VARCHAR (80),
	"frecuency" VARCHAR (80),
	"description" VARCHAR (255),
	"user_id" INT REFERENCES "user" 
	-- "completed" BOOLEAN
	--USER ID
);

--[DATA FOR MAINTENANCE]--
INSERT INTO "maintenance" ("task","frecuency", "description","user_id")
VALUES ('Clean HVAC','Every 6 months','HVAC was full of leaves',1);


--USER_MAINTENANCE. TABLE AND DATA--
CREATE TABLE "user_maintenance" (
	"id" SERIAL PRIMARY KEY,
	"date_completed" VARCHAR (80),
	"comments" VARCHAR (500),
	--USER ID
	"user_id" INT REFERENCES "user" NOT NULL,
	--MAINTENANCE ID
	"maintenance_id" INT REFERENCES "maintenance" NOT NULL
);
--[DATA FOR USER_MAINTENANCE]--
INSERT INTO "user_maintenance"("date_completed", "comments", "user_id", "maintenance_id")
VALUES ('10/18/2022', 'maintenance was done, but will need to change to new part soon', 1, 3);

SELECT "task" FROM "maintenance" 
JOIN "user_maintenance" ON "maintenance"."id" = "user_maintenance"."maintenance_id"
JOIN "user" ON "user"."id" = "user_maintenance"."user_id"
WHERE "user"."id" = 1;
