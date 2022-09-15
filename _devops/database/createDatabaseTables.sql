CREATE SCHEMA IF NOT EXISTS fizzbuzz;

----------------------
--- REQUESTS TABLE ---
----------------------

CREATE TABLE IF NOT EXISTS fizzbuzz.requests
(
    id              SERIAL PRIMARY KEY,
    int1            integer   NOT NULL,
    int2            integer   NOT NULL,
    array_limit     integer   NOT NULL,
    str1            text      NOT NULL,
    str2            text      NOT NULL,
    date            timestamp NOT NULL
);

------------------------------------------------------
--- VIEW TO COMPUTE THE NUMBER OF HITS PER REQUEST ---
------------------------------------------------------

CREATE OR REPLACE VIEW fizzbuzz.requests_hits
AS
    SELECT int1, int2, array_limit, str1, str2, count(*) hits
    FROM fizzbuzz.requests
    GROUP BY int1, int2, array_limit, str1, str2
    ORDER BY hits DESC;