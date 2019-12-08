--
-- PostgreSQL database dump
--

-- Dumped from database version 9.5.19
-- Dumped by pg_dump version 12.0 (Ubuntu 12.0-2.pgdg18.04+1)

-- Started on 2019-12-08 20:46:12 CET

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 2153 (class 1262 OID 34679)
-- Name: memory; Type: DATABASE; Schema: -; Owner: -
--

CREATE DATABASE memory WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'fr_FR.UTF-8' LC_CTYPE = 'fr_FR.UTF-8';


\connect memory

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

--
-- TOC entry 182 (class 1259 OID 34682)
-- Name: score; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.score (
    idscore integer NOT NULL,
    timems integer NOT NULL
);


--
-- TOC entry 181 (class 1259 OID 34680)
-- Name: score_id_score_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.score_id_score_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 2154 (class 0 OID 0)
-- Dependencies: 181
-- Name: score_id_score_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.score_id_score_seq OWNED BY public.score.idscore;


--
-- TOC entry 2029 (class 2604 OID 34685)
-- Name: score idscore; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.score ALTER COLUMN idscore SET DEFAULT nextval('public.score_id_score_seq'::regclass);


--
-- TOC entry 2147 (class 0 OID 34682)
-- Dependencies: 182
-- Data for Name: score; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.score (idscore, timems) VALUES (1, 120000);
INSERT INTO public.score (idscore, timems) VALUES (2, 145000);
INSERT INTO public.score (idscore, timems) VALUES (3, 92000);
INSERT INTO public.score (idscore, timems) VALUES (4, 139000);
INSERT INTO public.score (idscore, timems) VALUES (5, 123000);
INSERT INTO public.score (idscore, timems) VALUES (6, 134500);
INSERT INTO public.score (idscore, timems) VALUES (7, 135000);
INSERT INTO public.score (idscore, timems) VALUES (8, 120001);
INSERT INTO public.score (idscore, timems) VALUES (13, 99898);
INSERT INTO public.score (idscore, timems) VALUES (15, 77896);
INSERT INTO public.score (idscore, timems) VALUES (16, 86221);
INSERT INTO public.score (idscore, timems) VALUES (17, 112410);
INSERT INTO public.score (idscore, timems) VALUES (18, 119857);
INSERT INTO public.score (idscore, timems) VALUES (19, 75771);
INSERT INTO public.score (idscore, timems) VALUES (20, 76876);
INSERT INTO public.score (idscore, timems) VALUES (21, 75171);


--
-- TOC entry 2155 (class 0 OID 0)
-- Dependencies: 181
-- Name: score_id_score_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.score_id_score_seq', 21, true);


--
-- TOC entry 2031 (class 2606 OID 34687)
-- Name: score pk_score; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.score
    ADD CONSTRAINT pk_score PRIMARY KEY (idscore);


-- Completed on 2019-12-08 20:46:13 CET

--
-- PostgreSQL database dump complete
--

