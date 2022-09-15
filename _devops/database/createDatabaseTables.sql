CREATE SCHEMA IF NOT EXISTS fizzbuzz;

------------------------
--- TABLE PRINCIPALE ---
------------------------

CREATE TABLE IF NOT EXISTS fizzbuzz.requests
(
    id         		SERIAL PRIMARY KEY,
    int1       		integer   NOT NULL,
    int2       		integer   NOT NULL,
    array_limit     integer   NOT NULL,
    str1       		text   NOT NULL,
    str2       		text   NOT NULL,
    date       		timestamp NOT NULL
);

------------------------------------------------------
--- VUE POUR CALCULER LE NOMBRE DE HIT PAR REQUÊTE ---
------------------------------------------------------

CREATE OR REPLACE VIEW fizzbuzz.requests_hits
AS
    SELECT int1, int2, array_limit, str1, str2, count(*) hits
    FROM fizzbuzz.requests
    group by int1, int2, array_limit, str1, str2
   	order by hits desc;