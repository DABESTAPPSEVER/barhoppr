/* PostgreSQL */
CREATE TABLE googleplaces (
  Row int NOT NULL,
  ID varchar(255) UNIQUE NOT NULL,
  Name varchar(255) NOT NULL,
  Latitude float NOT NULL,
  Longitude float NOT NULL,
  Street varchar(255) NOT NULL,
  City varchar(255) NOT NULL,
  State varchar(255) NOT NULL,
  Zip varchar(255) NOT NULL,
  PRIMARY KEY (Row)
)

-- Convert table to PostGIS-enabled table
-- http://stackoverflow.com/questions/15049455/convert-a-normal-postgres-database-to-postgis-database
-- http://www.bostongis.com/PrinterFriendly.aspx?content_name=postgis_tut01