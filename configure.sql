CREATE TABLE public.favorites
(
    email character varying,
    beerid character varying,
    PRIMARY KEY (email, beerid)
)
WITH (
    OIDS = FALSE
);

CREATE TABLE public.users
(
    email character varying,
    firstname character varying,
    lastname character varying,
    password character varying,
    PRIMARY KEY (email)
)
WITH (
    OIDS = FALSE
);
