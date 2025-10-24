import { Container, Spinner, Form, Row, Col, Card, FormControl, ListGroup } from "react-bootstrap";
import axios from 'axios';
import { Link } from 'react-router-dom';
import './css/Pokedex.css'
import { useEffect, useState } from "react";

const typeColors = {
    normal: '#A8A77A', fire: '#EE8130', water: '#6390F0', electric: '#F7D02C',
    grass: '#7AC74C', ice: '#96D9D6', fighting: '#C22E28', poison: '#A33EA1',
    ground: '#E2BF65', flying: '#A98FF3', psychic: '#F95587', bug: '#A6B91A',
    rock: '#B6A136', ghost: '#735797', dragon: '#6F35FC', dark: '#705746',
    steel: '#B7B7CE', fairy: '#D685AD',
};

const typeImages = {
    normal: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-viii/legends-arceus/1.png',
    fire: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-viii/legends-arceus/10.png',
    water: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-viii/legends-arceus/11.png',
    electric: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-viii/legends-arceus/13.png',
    grass: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-viii/legends-arceus/12.png',
    ice: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-viii/legends-arceus/15.png',
    fighting: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-viii/legends-arceus/2.png',
    poison: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-viii/legends-arceus/4.png',
    ground: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-viii/legends-arceus/5.png',
    flying: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-viii/legends-arceus/3.png',
    psychic: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-viii/legends-arceus/14.png',
    bug: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-viii/legends-arceus/7.png',
    rock: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-viii/legends-arceus/6.png',
    ghost: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-viii/legends-arceus/8.png',
    dragon: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-viii/legends-arceus/16.png',
    dark: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-viii/legends-arceus/17.png',
    steel: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-viii/legends-arceus/9.png',
    fairy: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-viii/legends-arceus/18.png'
}

/*const typeIcons = {
    normal: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/e8ddc4da-23dd-4502-b65b-378c9cfe5efa/dfigqte-a5f57471-3ed6-47bd-8fec-f7e56a610bec.png/v1/fill/w_894,h_894/tera_type_normal_symbol_by_jormxdos_dfigqte-pre.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTI4MCIsInBhdGgiOiIvZi9lOGRkYzRkYS0yM2RkLTQ1MDItYjY1Yi0zNzhjOWNmZTVlZmEvZGZpZ3F0ZS1hNWY1NzQ3MS0zZWQ2LTQ3YmQtOGZlYy1mN2U1NmE2MTBiZWMucG5nIiwid2lkdGgiOiI8PTEyODAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.oZKA4otsvpQTeQKdd-f0wkAoa6Pihi3tFXPnB43KAs4',
    fire: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/e8ddc4da-23dd-4502-b65b-378c9cfe5efa/dfigqtm-be060260-a4a0-48fa-ab92-43acaa88838f.png/v1/fill/w_894,h_894/tera_type_fire_symbol_by_jormxdos_dfigqtm-pre.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTI4MCIsInBhdGgiOiIvZi9lOGRkYzRkYS0yM2RkLTQ1MDItYjY1Yi0zNzhjOWNmZTVlZmEvZGZpZ3F0bS1iZTA2MDI2MC1hNGEwLTQ4ZmEtYWI5Mi00M2FjYWE4ODgzOGYucG5nIiwid2lkdGgiOiI8PTEyODAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.OXO4J2y7hdiFET_DSs8HCnHzncUe9cCfDBHNXXb2fwo',
    water: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/e8ddc4da-23dd-4502-b65b-378c9cfe5efa/dfigqts-071f01eb-8257-4742-afcc-5fade6f81608.png/v1/fill/w_894,h_894/tera_type_water_symbol_by_jormxdos_dfigqts-pre.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTI4MCIsInBhdGgiOiIvZi9lOGRkYzRkYS0yM2RkLTQ1MDItYjY1Yi0zNzhjOWNmZTVlZmEvZGZpZ3F0cy0wNzFmMDFlYi04MjU3LTQ3NDItYWZjYy01ZmFkZTZmODE2MDgucG5nIiwid2lkdGgiOiI8PTEyODAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.GcOv0f0um8sufnSYR_niK5IkOc4g2zccmSUWhH6wIFw',
    electric: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/e8ddc4da-23dd-4502-b65b-378c9cfe5efa/dfigqu0-5fadbf1a-7315-4db8-a68c-0e0336641a7e.png/v1/fill/w_894,h_894/tera_type_electric_symbol_by_jormxdos_dfigqu0-pre.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTI4MCIsInBhdGgiOiIvZi9lOGRkYzRkYS0yM2RkLTQ1MDItYjY1Yi0zNzhjOWNmZTVlZmEvZGZpZ3F1MC01ZmFkYmYxYS03MzE1LTRkYjgtYTY4Yy0wZTAzMzY2NDFhN2UucG5nIiwid2lkdGgiOiI8PTEyODAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.iHsCnjDt8Vqwrs2oIqX0sOBvcP2rkDpnahtTKxVxqAQ',
    grass: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/e8ddc4da-23dd-4502-b65b-378c9cfe5efa/dfigqu9-775d6576-461f-48ae-8f15-3bacb83d5219.png/v1/fill/w_894,h_894/tera_type_grass_symbol_by_jormxdos_dfigqu9-pre.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTI4MCIsInBhdGgiOiIvZi9lOGRkYzRkYS0yM2RkLTQ1MDItYjY1Yi0zNzhjOWNmZTVlZmEvZGZpZ3F1OS03NzVkNjU3Ni00NjFmLTQ4YWUtOGYxNS0zYmFjYjgzZDUyMTkucG5nIiwid2lkdGgiOiI8PTEyODAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.M9X8bUvrHFL3aOW99vHEK6PQbh3flPz5tytkJVl9qCg',
    ice: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/e8ddc4da-23dd-4502-b65b-378c9cfe5efa/dfigquf-cc9d9fa0-f62f-42a4-b6bc-bdbec87dd150.png/v1/fill/w_894,h_894/tera_type_ice_symbol_by_jormxdos_dfigquf-pre.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTI4MCIsInBhdGgiOiIvZi9lOGRkYzRkYS0yM2RkLTQ1MDItYjY1Yi0zNzhjOWNmZTVlZmEvZGZpZ3F1Zi1jYzlkOWZhMC1mNjJmLTQyYTQtYjZiYy1iZGJlYzg3ZGQxNTAucG5nIiwid2lkdGgiOiI8PTEyODAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.e2VPL-Cz5ygKysLv7GB0ZptYJOzLj5RCCJ9Eb1dwK-0',
    fighting: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/e8ddc4da-23dd-4502-b65b-378c9cfe5efa/dfigqun-b7717cbc-0ad2-4f78-93ef-6d7def888105.png/v1/fill/w_894,h_894/tera_type_fighting_symbol_by_jormxdos_dfigqun-pre.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTI4MCIsInBhdGgiOiIvZi9lOGRkYzRkYS0yM2RkLTQ1MDItYjY1Yi0zNzhjOWNmZTVlZmEvZGZpZ3F1bi1iNzcxN2NiYy0wYWQyLTRmNzgtOTNlZi02ZDdkZWY4ODgxMDUucG5nIiwid2lkdGgiOiI8PTEyODAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.AXWrQ6jgczqMVoxMr_CGqQ_jlRh2PEK0IcAD1ffyg9E',
    poison: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/e8ddc4da-23dd-4502-b65b-378c9cfe5efa/dfigqut-e98b06f3-3159-4af0-a16d-90f62bfa58af.png/v1/fill/w_894,h_894/tera_type_poison_symbol_by_jormxdos_dfigqut-pre.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTI4MCIsInBhdGgiOiIvZi9lOGRkYzRkYS0yM2RkLTQ1MDItYjY1Yi0zNzhjOWNmZTVlZmEvZGZpZ3F1dC1lOThiMDZmMy0zMTU5LTRhZjAtYTE2ZC05MGY2MmJmYTU4YWYucG5nIiwid2lkdGgiOiI8PTEyODAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.hMHvWoRQlL5zdnD8biY3UJZNP7Nwe5wIdSOGWemyUzo',
    ground: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/e8ddc4da-23dd-4502-b65b-378c9cfe5efa/dfigquz-b3a9213f-f3b5-4cee-9567-2623206a7953.png/v1/fill/w_894,h_894/tera_type_ground_symbol_by_jormxdos_dfigquz-pre.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTI4MCIsInBhdGgiOiIvZi9lOGRkYzRkYS0yM2RkLTQ1MDItYjY1Yi0zNzhjOWNmZTVlZmEvZGZpZ3F1ei1iM2E5MjEzZi1mM2I1LTRjZWUtOTU2Ny0yNjIzMjA2YTc5NTMucG5nIiwid2lkdGgiOiI8PTEyODAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.isnBydxNrzIcu7nqOdDiUmbU7eN_j3qJSBkctyrF9Lk',
    flying: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/e8ddc4da-23dd-4502-b65b-378c9cfe5efa/dfigqv9-e532f155-c127-4664-8255-3f0d500a60c4.png/v1/fill/w_894,h_894/tera_type_flying_symbol_by_jormxdos_dfigqv9-pre.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTI4MCIsInBhdGgiOiIvZi9lOGRkYzRkYS0yM2RkLTQ1MDItYjY1Yi0zNzhjOWNmZTVlZmEvZGZpZ3F2OS1lNTMyZjE1NS1jMTI3LTQ2NjQtODI1NS0zZjBkNTAwYTYwYzQucG5nIiwid2lkdGgiOiI8PTEyODAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.4CkKd8y0Q-Qfyhu7IJDr7VZcxgKZxAfi_eoqdW305yo',
    psychic: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/e8ddc4da-23dd-4502-b65b-378c9cfe5efa/dfigqvg-652f822e-5d8e-4880-b365-0f1ef784e04e.png/v1/fill/w_894,h_894/tera_type_psychic_symbol_by_jormxdos_dfigqvg-pre.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTI4MCIsInBhdGgiOiIvZi9lOGRkYzRkYS0yM2RkLTQ1MDItYjY1Yi0zNzhjOWNmZTVlZmEvZGZpZ3F2Zy02NTJmODIyZS01ZDhlLTQ4ODAtYjM2NS0wZjFlZjc4NGUwNGUucG5nIiwid2lkdGgiOiI8PTEyODAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.FHtYTcCtU1WN9Y7iumoobV5KOSRe39j9iyk79Yq5eno',
    bug: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/e8ddc4da-23dd-4502-b65b-378c9cfe5efa/dfigqvo-d58058b0-f6f7-4865-bc68-e933f81bdf1a.png/v1/fill/w_894,h_894/tera_type_bug_symbol_by_jormxdos_dfigqvo-pre.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTI4MCIsInBhdGgiOiIvZi9lOGRkYzRkYS0yM2RkLTQ1MDItYjY1Yi0zNzhjOWNmZTVlZmEvZGZpZ3F2by1kNTgwNThiMC1mNmY3LTQ4NjUtYmM2OC1lOTMzZjgxYmRmMWEucG5nIiwid2lkdGgiOiI8PTEyODAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.TqcqYdb7CNEhAvCPbiFqRFwlP45N-_9KdaCKFrl4cDc',
    rock: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/e8ddc4da-23dd-4502-b65b-378c9cfe5efa/dfigqvz-981177f1-3b7e-46e0-9850-cb35718aae2a.png/v1/fill/w_894,h_894/tera_type_rock_symbol_by_jormxdos_dfigqvz-pre.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTI4MCIsInBhdGgiOiIvZi9lOGRkYzRkYS0yM2RkLTQ1MDItYjY1Yi0zNzhjOWNmZTVlZmEvZGZpZ3F2ei05ODExNzdmMS0zYjdlLTQ2ZTAtOTg1MC1jYjM1NzE4YWFlMmEucG5nIiwid2lkdGgiOiI8PTEyODAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.fgwHu0mMVFWckVLSI-P2t3nE9sSoGMSbx-p0fZf2HtU',
    ghost: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/e8ddc4da-23dd-4502-b65b-378c9cfe5efa/dfigqw7-5ae6b6ce-ecad-4d3b-9ea9-ebce5699e893.png/v1/fill/w_894,h_894/tera_type_ghost_symbol_by_jormxdos_dfigqw7-pre.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTI4MCIsInBhdGgiOiIvZi9lOGRkYzRkYS0yM2RkLTQ1MDItYjY1Yi0zNzhjOWNmZTVlZmEvZGZpZ3F3Ny01YWU2YjZjZS1lY2FkLTRkM2ItOWVhOS1lYmNlNTY5OWU4OTMucG5nIiwid2lkdGgiOiI8PTEyODAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.bybS99GQ7JF42plNQtmlIP4vWrkU_nZsCNIp71ymZJ8',
    dragon: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/e8ddc4da-23dd-4502-b65b-378c9cfe5efa/dfigqwk-68edb522-14bd-47fa-a300-5dabbfcd305f.png/v1/fill/w_894,h_894/tera_type_dragon_symbol_by_jormxdos_dfigqwk-pre.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTI4MCIsInBhdGgiOiIvZi9lOGRkYzRkYS0yM2RkLTQ1MDItYjY1Yi0zNzhjOWNmZTVlZmEvZGZpZ3F3ay02OGVkYjUyMi0xNGJkLTQ3ZmEtYTMwMC01ZGFiYmZjZDMwNWYucG5nIiwid2lkdGgiOiI8PTEyODAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.lF79lT5pR0pcfwZWfLH1olE_kmGCARbKG_fZutoBrkU',
    dark: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/e8ddc4da-23dd-4502-b65b-378c9cfe5efa/dfigqwu-6609a742-dff9-42e9-8cb6-29c8a52a585b.png/v1/fill/w_894,h_894/tera_type_dark_symbol_by_jormxdos_dfigqwu-pre.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTI4MCIsInBhdGgiOiIvZi9lOGRkYzRkYS0yM2RkLTQ1MDItYjY1Yi0zNzhjOWNmZTVlZmEvZGZpZ3F3dS02NjA5YTc0Mi1kZmY5LTQyZTktOGNiNi0yOWM4YTUyYTU4NWIucG5nIiwid2lkdGgiOiI8PTEyODAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.mIEpGAjRjbgU0_c9NinkpiUNXtFYchKx7Pc5CcbACGs',
    steel: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/e8ddc4da-23dd-4502-b65b-378c9cfe5efa/dfigqxa-4be79198-9938-4598-b142-5865dcc9fc86.png/v1/fill/w_894,h_894/tera_type_steel_symbol_by_jormxdos_dfigqxa-pre.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTI4MCIsInBhdGgiOiIvZi9lOGRkYzRkYS0yM2RkLTQ1MDItYjY1Yi0zNzhjOWNmZTVlZmEvZGZpZ3F4YS00YmU3OTE5OC05OTM4LTQ1OTgtYjE0Mi01ODY1ZGNjOWZjODYucG5nIiwid2lkdGgiOiI8PTEyODAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.gxO3lw_tCHU3q4jn1gZvMhWKZqdxXbdjp85yybCVPKg',
    fairy: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/e8ddc4da-23dd-4502-b65b-378c9cfe5efa/dfigqxi-5f0d8fbc-93cf-4aa1-a2c3-19068afe8e29.png/v1/fill/w_894,h_894/tera_type_fairy_symbol_by_jormxdos_dfigqxi-pre.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTI4MCIsInBhdGgiOiIvZi9lOGRkYzRkYS0yM2RkLTQ1MDItYjY1Yi0zNzhjOWNmZTVlZmEvZGZpZ3F4aS01ZjBkOGZiYy05M2NmLTRhYTEtYTJjMy0xOTA2OGFmZThlMjkucG5nIiwid2lkdGgiOiI8PTEyODAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.BK54pDrLfsk-IMLok2EKU6wvlV-cRYrPmUna7qjV3SQ'
}*/

const typeIcons = {
    normal: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/e8ddc4da-23dd-4502-b65b-378c9cfe5efa/dffqwxu-4f2e91e3-184e-4b55-90e1-9a24d3a77ddb.png/v1/fit/w_300,h_900,q_70,strp/normal_type_symbol_sinnoh_by_jormxdos_dffqwxu-300w.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTI4MCIsInBhdGgiOiIvZi9lOGRkYzRkYS0yM2RkLTQ1MDItYjY1Yi0zNzhjOWNmZTVlZmEvZGZmcXd4dS00ZjJlOTFlMy0xODRlLTRiNTUtOTBlMS05YTI0ZDNhNzdkZGIucG5nIiwid2lkdGgiOiI8PTEyODAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.A_Y3CsEs230966gn6NuIDCxypwLJBYHjzV46TdUJQoE',
    fire: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/e8ddc4da-23dd-4502-b65b-378c9cfe5efa/dffqwy2-a24cae67-cfab-4753-ac92-74d30c736bc8.png/v1/fit/w_300,h_900,q_70,strp/fire_type_symbol_sinnoh_by_jormxdos_dffqwy2-300w.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTI4MCIsInBhdGgiOiIvZi9lOGRkYzRkYS0yM2RkLTQ1MDItYjY1Yi0zNzhjOWNmZTVlZmEvZGZmcXd5Mi1hMjRjYWU2Ny1jZmFiLTQ3NTMtYWM5Mi03NGQzMGM3MzZiYzgucG5nIiwid2lkdGgiOiI8PTEyODAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.w6tyF6JdD2m_IjCD-RzgWvdH8D_psqaKCLNtsR1DF4k',
    water: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/e8ddc4da-23dd-4502-b65b-378c9cfe5efa/dffqwyd-f2c7daf9-a780-400e-aa48-dd28e31f0ea8.png/v1/fit/w_300,h_900,q_70,strp/water_type_symbol_sinnoh_by_jormxdos_dffqwyd-300w.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTI4MCIsInBhdGgiOiIvZi9lOGRkYzRkYS0yM2RkLTQ1MDItYjY1Yi0zNzhjOWNmZTVlZmEvZGZmcXd5ZC1mMmM3ZGFmOS1hNzgwLTQwMGUtYWE0OC1kZDI4ZTMxZjBlYTgucG5nIiwid2lkdGgiOiI8PTEyODAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.veuu7Fb8cDq-qQr-cfvOcVAhDHiBYd_1ZDxPEDK9rNE',
    electric: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/e8ddc4da-23dd-4502-b65b-378c9cfe5efa/dffqwyh-61329514-fd15-4c9c-a34d-5082df139ea4.png/v1/fit/w_300,h_900,q_70,strp/electric_type_symbol_sinnoh_by_jormxdos_dffqwyh-300w.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTI4MCIsInBhdGgiOiIvZi9lOGRkYzRkYS0yM2RkLTQ1MDItYjY1Yi0zNzhjOWNmZTVlZmEvZGZmcXd5aC02MTMyOTUxNC1mZDE1LTRjOWMtYTM0ZC01MDgyZGYxMzllYTQucG5nIiwid2lkdGgiOiI8PTEyODAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.W6HsgmtXRITf2NXDiCsSnvvjSKJLocbUPtfiCxqk3No',
    grass: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/e8ddc4da-23dd-4502-b65b-378c9cfe5efa/dffqwys-bea7bc3f-f088-42aa-940b-9b430f4d8c39.png/v1/fit/w_300,h_900/grass_type_symbol_sinnoh_by_jormxdos_dffqwys-300w.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTI4MCIsInBhdGgiOiIvZi9lOGRkYzRkYS0yM2RkLTQ1MDItYjY1Yi0zNzhjOWNmZTVlZmEvZGZmcXd5cy1iZWE3YmMzZi1mMDg4LTQyYWEtOTQwYi05YjQzMGY0ZDhjMzkucG5nIiwid2lkdGgiOiI8PTEyODAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.tdDE2FwAlVZCMNXSWZFpRofv_GicMlofqzBTahB1NA8',
    ice: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/e8ddc4da-23dd-4502-b65b-378c9cfe5efa/dffqwz4-3d3ce1d6-e1c4-43f8-bade-d81ec63810e6.png/v1/fit/w_300,h_900/ice_type_symbol_sinnoh_by_jormxdos_dffqwz4-300w.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTI4MCIsInBhdGgiOiIvZi9lOGRkYzRkYS0yM2RkLTQ1MDItYjY1Yi0zNzhjOWNmZTVlZmEvZGZmcXd6NC0zZDNjZTFkNi1lMWM0LTQzZjgtYmFkZS1kODFlYzYzODEwZTYucG5nIiwid2lkdGgiOiI8PTEyODAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.zfJME-NMbY204E_zih46neCth6EktzVv81cHE0_Q__4',
    fighting: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/e8ddc4da-23dd-4502-b65b-378c9cfe5efa/dffqwzc-0f53a076-1616-4e73-a563-b8087408c821.png/v1/fit/w_300,h_900/fighting_type_symbol_sinnoh_by_jormxdos_dffqwzc-300w.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTI4MCIsInBhdGgiOiIvZi9lOGRkYzRkYS0yM2RkLTQ1MDItYjY1Yi0zNzhjOWNmZTVlZmEvZGZmcXd6Yy0wZjUzYTA3Ni0xNjE2LTRlNzMtYTU2My1iODA4NzQwOGM4MjEucG5nIiwid2lkdGgiOiI8PTEyODAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.k-1aoFGi_k-0UTprieOvIRBGoPXatAYuU-Z34WauA4g',
    poison: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/e8ddc4da-23dd-4502-b65b-378c9cfe5efa/dffqwzj-ae5158e3-e556-47a3-a2cb-1616d878f2ba.png/v1/fit/w_300,h_900/poison_type_symbol_sinnoh_by_jormxdos_dffqwzj-300w.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTI4MCIsInBhdGgiOiIvZi9lOGRkYzRkYS0yM2RkLTQ1MDItYjY1Yi0zNzhjOWNmZTVlZmEvZGZmcXd6ai1hZTUxNThlMy1lNTU2LTQ3YTMtYTJjYi0xNjE2ZDg3OGYyYmEucG5nIiwid2lkdGgiOiI8PTEyODAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.RSWBPr5h4KaTYL_rHl10gxmtwnOZeWSzszgMNcShkvM',
    ground: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/e8ddc4da-23dd-4502-b65b-378c9cfe5efa/dffqwzs-ad4d6ade-b780-4294-b87f-0de8aac6c625.png/v1/fit/w_300,h_900/ground_type_symbol_sinnoh_by_jormxdos_dffqwzs-300w.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTI4MCIsInBhdGgiOiIvZi9lOGRkYzRkYS0yM2RkLTQ1MDItYjY1Yi0zNzhjOWNmZTVlZmEvZGZmcXd6cy1hZDRkNmFkZS1iNzgwLTQyOTQtYjg3Zi0wZGU4YWFjNmM2MjUucG5nIiwid2lkdGgiOiI8PTEyODAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.7I13ckVYwNSbJ59j3sCvLLITZOnTrg08qUXICkDJX_8',
    flying: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/e8ddc4da-23dd-4502-b65b-378c9cfe5efa/dffqx00-28f6a3fd-cbbb-47c2-bddf-ea39cb8afe46.png/v1/fit/w_300,h_900/flying_type_symbol_sinnoh_by_jormxdos_dffqx00-300w.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTI4MCIsInBhdGgiOiIvZi9lOGRkYzRkYS0yM2RkLTQ1MDItYjY1Yi0zNzhjOWNmZTVlZmEvZGZmcXgwMC0yOGY2YTNmZC1jYmJiLTQ3YzItYmRkZi1lYTM5Y2I4YWZlNDYucG5nIiwid2lkdGgiOiI8PTEyODAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.-L0FE33uJbYM3T9xbOCic069JHt5uORUUVnlwAGdKJ0',
    psychic: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/e8ddc4da-23dd-4502-b65b-378c9cfe5efa/dffqx0d-1625502c-7f90-4ead-9535-34475d36d6e8.png/v1/fit/w_300,h_900/psychic_type_symbol_sinnoh_by_jormxdos_dffqx0d-300w.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTI4MCIsInBhdGgiOiIvZi9lOGRkYzRkYS0yM2RkLTQ1MDItYjY1Yi0zNzhjOWNmZTVlZmEvZGZmcXgwZC0xNjI1NTAyYy03ZjkwLTRlYWQtOTUzNS0zNDQ3NWQzNmQ2ZTgucG5nIiwid2lkdGgiOiI8PTEyODAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.MoUU6ZGnm_-SM6-UZaamQ_NbAIauBNwrux5EJOG4lL0',
    bug: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/e8ddc4da-23dd-4502-b65b-378c9cfe5efa/dffqx0t-3e7a76c3-3809-47a7-896f-81b314124aac.png/v1/fit/w_300,h_900/bug_type_symbol_sinnoh_by_jormxdos_dffqx0t-300w.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTI4MCIsInBhdGgiOiIvZi9lOGRkYzRkYS0yM2RkLTQ1MDItYjY1Yi0zNzhjOWNmZTVlZmEvZGZmcXgwdC0zZTdhNzZjMy0zODA5LTQ3YTctODk2Zi04MWIzMTQxMjRhYWMucG5nIiwid2lkdGgiOiI8PTEyODAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.XLuyD-iRY2yP1BKmQ16VCoWx_xc_bEPd-tUSy7q7K_c',
    rock: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/e8ddc4da-23dd-4502-b65b-378c9cfe5efa/dffqx12-f47a3644-381f-4309-b843-bfce4cf9af7a.png/v1/fit/w_300,h_900/rock_type_symbol_sinnoh_by_jormxdos_dffqx12-300w.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTI4MCIsInBhdGgiOiIvZi9lOGRkYzRkYS0yM2RkLTQ1MDItYjY1Yi0zNzhjOWNmZTVlZmEvZGZmcXgxMi1mNDdhMzY0NC0zODFmLTQzMDktYjg0My1iZmNlNGNmOWFmN2EucG5nIiwid2lkdGgiOiI8PTEyODAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.hQDmSy978Nr59R8wFyBoPviUGyHdSKGpbyrjMgPi2S4',
    ghost: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/e8ddc4da-23dd-4502-b65b-378c9cfe5efa/dffqx1b-fe8d9f13-73ff-4df9-9ac1-ab60d8692796.png/v1/fit/w_300,h_900/ghost_type_symbol_sinnoh_by_jormxdos_dffqx1b-300w.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTI4MCIsInBhdGgiOiIvZi9lOGRkYzRkYS0yM2RkLTQ1MDItYjY1Yi0zNzhjOWNmZTVlZmEvZGZmcXgxYi1mZThkOWYxMy03M2ZmLTRkZjktOWFjMS1hYjYwZDg2OTI3OTYucG5nIiwid2lkdGgiOiI8PTEyODAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.oAjWMmSlbE30gp9KdTCvUs7Pi6SAc5C2B3WfotYAzQs',
    dragon: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/e8ddc4da-23dd-4502-b65b-378c9cfe5efa/dffqx1k-50f1f0c0-06a0-4f13-a843-b1af269f0a67.png/v1/fit/w_300,h_900/dragon_type_symbol_sinnoh_by_jormxdos_dffqx1k-300w.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTI4MCIsInBhdGgiOiIvZi9lOGRkYzRkYS0yM2RkLTQ1MDItYjY1Yi0zNzhjOWNmZTVlZmEvZGZmcXgxay01MGYxZjBjMC0wNmEwLTRmMTMtYTg0My1iMWFmMjY5ZjBhNjcucG5nIiwid2lkdGgiOiI8PTEyODAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.pPjOpZg4WdDxb7uCz2fJ5OLEX7G317sqXRmt9BRAKK0',
    dark: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/e8ddc4da-23dd-4502-b65b-378c9cfe5efa/dffqx1v-f3764e90-b1f6-432a-897e-a41e6c68628a.png/v1/fit/w_300,h_900/dark_type_symbol_sinnoh_by_jormxdos_dffqx1v-300w.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTI4MCIsInBhdGgiOiIvZi9lOGRkYzRkYS0yM2RkLTQ1MDItYjY1Yi0zNzhjOWNmZTVlZmEvZGZmcXgxdi1mMzc2NGU5MC1iMWY2LTQzMmEtODk3ZS1hNDFlNmM2ODYyOGEucG5nIiwid2lkdGgiOiI8PTEyODAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.JXsErZjkQpU1GrOw2AgenqWUTCVWw50UForNQvXX13M',
    steel: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/e8ddc4da-23dd-4502-b65b-378c9cfe5efa/dffqx26-3f3df840-e25d-4ea5-a69c-b285d65e80eb.png/v1/fit/w_300,h_900/steel_type_symbol_sinnoh_by_jormxdos_dffqx26-300w.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTI4MCIsInBhdGgiOiIvZi9lOGRkYzRkYS0yM2RkLTQ1MDItYjY1Yi0zNzhjOWNmZTVlZmEvZGZmcXgyNi0zZjNkZjg0MC1lMjVkLTRlYTUtYTY5Yy1iMjg1ZDY1ZTgwZWIucG5nIiwid2lkdGgiOiI8PTEyODAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.csMKjmZwfUOP5AovshIrkG7kkqmDHeVkwOtzbCHzC4Y',
    fairy: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/e8ddc4da-23dd-4502-b65b-378c9cfe5efa/dffqx2d-a0dfea1e-7899-45fa-9769-64eef178a09b.png/v1/fit/w_300,h_900/fairy_type_symbol_sinnoh_by_jormxdos_dffqx2d-300w.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTI4MCIsInBhdGgiOiIvZi9lOGRkYzRkYS0yM2RkLTQ1MDItYjY1Yi0zNzhjOWNmZTVlZmEvZGZmcXgyZC1hMGRmZWExZS03ODk5LTQ1ZmEtOTc2OS02NGVlZjE3OGEwOWIucG5nIiwid2lkdGgiOiI8PTEyODAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.5SQLw5gGsup9wUqM8eb30yTp1LXlC7RAY1oBzaepTh8'
}

const moveCategoryIcons = {
    physical: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/e8ddc4da-23dd-4502-b65b-378c9cfe5efa/dfgb60u-0487066d-d95f-4b5e-9501-73fe14ecf981.png/v1/fill/w_894,h_894/physical_move_icon_by_jormxdos_dfgb60u-pre.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTI4MCIsInBhdGgiOiIvZi9lOGRkYzRkYS0yM2RkLTQ1MDItYjY1Yi0zNzhjOWNmZTVlZmEvZGZnYjYwdS0wNDg3MDY2ZC1kOTVmLTRiNWUtOTUwMS03M2ZlMTRlY2Y5ODEucG5nIiwid2lkdGgiOiI8PTEyODAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.ZGXGWiCzBd4wPlWffzQytuUrDAnxl_RWF7lAaxLiYDE',
    special: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/e8ddc4da-23dd-4502-b65b-378c9cfe5efa/dfgb60n-b67f8e0e-fdb5-439f-92da-107c846ce339.png/v1/fill/w_894,h_894/special_move_icon_by_jormxdos_dfgb60n-pre.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTI4MCIsInBhdGgiOiIvZi9lOGRkYzRkYS0yM2RkLTQ1MDItYjY1Yi0zNzhjOWNmZTVlZmEvZGZnYjYwbi1iNjdmOGUwZS1mZGI1LTQzOWYtOTJkYS0xMDdjODQ2Y2UzMzkucG5nIiwid2lkdGgiOiI8PTEyODAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.n2OQC0kNjJM6S9MQr6a6Lj68yCvyKDYV-1F23FbPzMg',
    status: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/e8ddc4da-23dd-4502-b65b-378c9cfe5efa/dfgb616-756e9623-02db-436d-b587-2e0f386b5fc0.png/v1/fill/w_894,h_894/status_move_icon_by_jormxdos_dfgb616-pre.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTI4MCIsInBhdGgiOiIvZi9lOGRkYzRkYS0yM2RkLTQ1MDItYjY1Yi0zNzhjOWNmZTVlZmEvZGZnYjYxNi03NTZlOTYyMy0wMmRiLTQzNmQtYjU4Ny0yZTBmMzg2YjVmYzAucG5nIiwid2lkdGgiOiI8PTEyODAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.hL6NAOQXAyFRJmS5aX7P6u4Dv7LN_ejmkZbI-ykI4G0',
}

const geracoes = [
    { id: 1, nome: 'Geração 1 - Kanto' },
    { id: 2, nome: 'Geração 2 - Johto' },
    { id: 3, nome: 'Geração 3 - Hoenn' },
    { id: 4, nome: 'Geração 4 - Sinnoh' },
    { id: 5, nome: 'Geração 5 - Unova' },
    { id: 6, nome: 'Geração 6 - Kalos' },
    { id: 7, nome: 'Geração 7 - Alola' },
    { id: 8, nome: 'Geração 8 - Galar' },
    { id: 9, nome: 'Geração 9 - Paldea' },
    { id: 10, nome: 'Todas as Gerações' },
];

const pageSize = 24

const Pokedex = (() => {
    const [pokemons, setPokemons] = useState([])
    const [visibleCount, setVisibleCount] = useState(pageSize)

    const [loading, setLoading] = useState(false)

    const [geracaoSelecionada, setGeracaoSelecionada] = useState(1)
    const [tipoSelecionado, setTipoSelecionado] = useState('')

    const [ability, setAbility] = useState([])
    const [abilitySearch, setAbilitySearch] = useState('')
    const [abilitySuggestion, setAbilitySuggestion] = useState([])
    const [loadingAbility, setLoadingAbility] = useState(true)

    const [moves, setMoves] = useState([])
    const [moveSearch, setMoveSearch] = useState('')
    const [moveSuggestion, setMoveSuggestion] = useState([])
    const [loadingMove, setLoadingMove] = useState(true)

    const [moveDetailsCache, setMoveDetailsCache] = useState([])

    const tipos = ['', ...Object.keys(typeColors)]

    const fetchPorGeracao = async (idGeracao) => {
        setLoading(true)
        setPokemons([])
        setVisibleCount(pageSize)

        try {
            const cacheKey = `geracao_${idGeracao}`
            const cache = localStorage.getItem(cacheKey)

            if (cache) {
                try {
                    const parsed = JSON.parse(cache)

                    const cacheValido = Array.isArray(parsed) && parsed.every(p =>
                        p &&
                        typeof p.id === 'number' &&
                        typeof p.name === 'string' &&
                        typeof p.image === 'string' &&
                        Array.isArray(p.types) &&
                        p.types.length > 0 &&
                        Array.isArray(p.abilities) &&
                        p.abilities.length > 0 &&
                        Array.isArray(p.moves) &&
                        p.moves.length > 0
                    )

                    if (cacheValido) {
                        console.log(`Usando cache válido para ${cacheKey}`)
                        setPokemons(parsed)
                        setLoading(false)
                        return
                    } else {
                        console.warn(`Cache inválido para ${cacheKey}, recarregando da API...`)
                        localStorage.removeItem(cacheKey)
                    }
                } catch (e) {
                    console.error(`Erro ao ler cache para ${cacheKey}:`, e)
                    localStorage.removeItem(cacheKey)
                }
            }

            let species = []

            if (idGeracao === 10) {
                const geracoesPromises = Array.from({ length: 9 }, (_, i) =>
                    axios.get(`https://pokeapi.co/api/v2/generation/${i + 1}`)
                );
                const resultados = await Promise.all(geracoesPromises)

                species = resultados.flatMap((res) => res.data.pokemon_species)
            } else {
                const res = await axios.get(`https://pokeapi.co/api/v2/generation/${idGeracao}`)
                species = res.data.pokemon_species
            }

            const ordenadas = species.sort((a, b) => a.name.localeCompare(b.name))
            const detalhes = await Promise.all(
                ordenadas.map(async (s) => {
                    try {
                        const resDetalhe = await axios.get(`https://pokeapi.co/api/v2/pokemon/${s.name}`)
                        return {
                            id: resDetalhe.data.id,
                            name: resDetalhe.data.name,
                            image: resDetalhe.data.sprites.other['official-artwork'].front_default,
                            types: resDetalhe.data.types.map(t => t.type.name),
                            abilities: resDetalhe.data.abilities.map(a => a.ability.name),
                            moves: resDetalhe.data.moves.map(m => m.move.name)
                        }
                    } catch {
                        return null;
                    }
                })
            )

            const ordenadosPorId = detalhes
                .filter((p) => p !== null)
                .sort((a, b) => a.id - b.id)

            const resultadoFinal = ordenadosPorId.filter((p) => p && p.image)

            localStorage.setItem(cacheKey, JSON.stringify(resultadoFinal))
            console.log(JSON.stringify(resultadoFinal))
            console.log(`Cache salvo para ${cacheKey}`)

            setPokemons(resultadoFinal)
        } catch (error) {
            console.error("Erro ao buscar geração", error)
        } finally {
            setLoading(false)
        }
    };

    const handleScroll = () => {
        const scrollTop = document.documentElement.scrollTop
        const windowHeight = window.innerHeight
        const fullHeight = document.documentElement.scrollHeight

        if (scrollTop + windowHeight + 12 >= fullHeight) {
            setVisibleCount((prev) => Math.min(prev + pageSize, pokemons.length))
        }
    }

    const handleInputChange = (e) => {
        const input = e.target.value.toLowerCase().trim()
        setAbilitySearch(input)

        if (input.trim().length === 0) {
            setAbilitySuggestion(ability.slice(0, 1000))
            return
        }

        const filtered = ability.filter(hab =>
            hab.toLowerCase().includes(input)
        )

        setAbilitySuggestion(filtered.slice(0, 1000))
    }

    const handleFocus = () => {
        if (abilitySearch.trim().length === 0) {
            setAbilitySuggestion(ability.slice(0, 1000))
        }
    }

    const handleBlur = () => {
        setTimeout(() => setAbilitySuggestion([]), 200)
    }

    useEffect(() => {
        const fetchAbility = async () => {
            try {
                const res = await axios.get(`https://pokeapi.co/api/v2/ability?limit=1000`)
                const lista = res.data.results
                    .map(a => a.name)
                    .sort((a, b) => a.localeCompare(b))

                setAbility(lista)
            } catch (err) {
                console.error('Erro ao buscar habilidades:', err)
            } finally {
                setLoadingAbility(false)
            }
        }

        fetchAbility()
    }, [])

    const fetchMoveDetails = async (moveName) => {
        if (moveDetailsCache[moveName]) return moveDetailsCache[moveName]

        try {
            const res = await axios.get(`https://pokeapi.co/api/v2/move/${moveName}`);
            const details = {
                type: res.data.type.name,
                category: res.data.damage_class.name
            }

            setMoveDetailsCache((prev) => ({ ...prev, [moveName]: details }))
            return details
        } catch {
            return { type: null, category: null }
        }
    }

    useEffect(() => {
        const fetchMoves = async () => {
            try {
                const res = await axios.get(`https://pokeapi.co/api/v2/move?limit=1000`)
                const lista = res.data.results
                    .map(m => m.name)
                    .sort((a, b) => a.localeCompare(b))
                
                setMoves(lista)
            } catch (err) {
                console.error('Erro ao buscar ataques:', err)
            } finally {
                setLoadingMove(false)
            }
        }

        fetchMoves()
    }, [])

    const handleMoveInputChange = (e) => {
        const input = e.target.value.toLowerCase().trim()
        setMoveSearch(input)

        let filtered = []
        if (input.trim().length === 0) {
            filtered = moves.slice(0, 1000)
        } else {
            filtered = moves.filter(mov => 
                mov.toLowerCase().includes(input)
            ).slice(0,1000)
        }

        setMoveSuggestion(filtered)

        for (const mov of filtered) {
            if (!moveDetailsCache[mov]) {
                fetchMoveDetails(mov)
            }
        }
    }

    const handleMoveFocus = () => {
        if (moveSearch.trim().length === 0) {
            const initialSuggestion = moves.slice(0,1000)
            setMoveSuggestion(initialSuggestion)

            for (const mov of initialSuggestion) {
                if (!moveDetailsCache[mov]) {
                    fetchMoveDetails(mov)
                }
            }
        }
    }

    const handleMoveBlur = () => {
        setTimeout(() => setMoveSuggestion([]), 200)
    }

    const formatName = (name) => {
        if (!name) return ''
        return name.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
    }

    useEffect(() => {
        fetchPorGeracao(geracaoSelecionada)

        if (geracaoSelecionada === 10) {
            document.title = `Pokédex - Todas`
        } else {
            document.title = `Pokédex - Geração ${geracaoSelecionada}`;
        }
    }, [geracaoSelecionada]);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll)

        return () => window.removeEventListener('scroll', handleScroll)
    }, [pokemons])

    useEffect(() => {
        setVisibleCount(pageSize)
    }, [tipoSelecionado, geracaoSelecionada, abilitySearch, moveSearch])

    const pokemonsFiltrados = pokemons.filter(p => {
        const temTipo = tipoSelecionado ? p.types.includes(tipoSelecionado) : true

        const buscaHabilidadeLimpa = abilitySearch.toLowerCase().trim()
        const temHabilidade = buscaHabilidadeLimpa
            ? p.abilities?.some(a => a.includes(buscaHabilidadeLimpa))
            : true

        const buscaMoveLimpa = moveSearch.toLowerCase().trim()
        const temMove = buscaMoveLimpa
            ? p.moves?.some(m => m.includes(buscaMoveLimpa))
            : true

        return temTipo && temHabilidade && temMove
    })

    const pokemonsToShow = pokemonsFiltrados.slice(0, visibleCount)

    return (
        <>
            <Container className="container-pokedex my-5 mx-auto d-block">
                <h4 className="text-center my-5 title-pokedex">Pokédex</h4>

                <Form.Group className="mb-4 w-100 gap-3 text-center geracao-group justify-content-center">
                    <div className="autocomplete-container">
                        <FormControl
                            type="search"
                            placeholder="Buscar Habilidade"
                            className="geracao-select"
                            value={abilitySearch}
                            onChange={handleInputChange}
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                            disabled={loadingAbility}
                        />
                        {abilitySuggestion.length > 0 && (
                            <ListGroup className="autocomplete-list">
                                {abilitySuggestion.map((hab, i) => (
                                    <ListGroup.Item
                                        key={i}
                                        action
                                        onClick={() => {
                                            setAbilitySearch(hab)
                                            setAbilitySuggestion([])
                                            setVisibleCount(pageSize)
                                        }}
                                        className="listgroup-item"
                                    >
                                        <span className="text-white">{formatName(hab)}</span>
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                        )}
                    </div>
                    <div className="autocomplete-container">
                        <FormControl
                            type="search"
                            placeholder="Buscar Ataque"
                            className="geracao-select"
                            value={moveSearch}
                            onChange={handleMoveInputChange}
                            onFocus={handleMoveFocus}
                            onBlur={handleMoveBlur}
                            disabled={loadingMove}
                        />
                        {moveSuggestion.length > 0 && (
                            <ListGroup className="autocomplete-list">
                                {moveSuggestion.map((mov, i) => (
                                    <ListGroup.Item
                                        key={i}
                                        action
                                        onClick={() => {
                                            setMoveSearch(mov)
                                            setMoveSuggestion([])
                                            setVisibleCount(pageSize)
                                        }}
                                        className="listgroup-item d-flex align-items-center justify-content-between"
                                    >
                                        {moveDetailsCache[mov] && (
                                            <div className="d-flex align-items-center gap-2">
                                                {moveDetailsCache[mov].type && (
                                                    <img
                                                        src={typeIcons[moveDetailsCache[mov].type]}
                                                        alt={moveDetailsCache[mov].type}
                                                        title={moveDetailsCache[mov].type}
                                                        style={{ width: 'auto', height: '35px', borderRadius: '12.5px' }}
                                                    />
                                                )}
                                                <span className="text-white">{formatName(mov)}</span>
                                                {moveDetailsCache[mov].category && (
                                                    <img
                                                        src={moveCategoryIcons[moveDetailsCache[mov].category]}
                                                        alt={moveDetailsCache[mov].category}
                                                        title={moveDetailsCache[mov].category}
                                                        style={{ width: 'auto', height: '40px' }}
                                                    />
                                                )}
                                            </div>
                                        )}
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                        )}
                    </div>
                    <Form.Select
                        className="geracao-select"
                        value={geracaoSelecionada}
                        onChange={(e) => setGeracaoSelecionada(Number(e.target.value))}
                    >
                        {geracoes.map(g => (
                            <option key={g.id} value={g.id}>{g.nome}</option>
                        ))}
                    </Form.Select>
                    <Form.Select
                        className="geracao-select"
                        value={tipoSelecionado}
                        onChange={(e) => setTipoSelecionado(e.target.value)}
                    >
                        {tipos.map((tipo) => (
                            <option key={tipo} value={tipo}>
                                {tipo === '' ? 'Todos os tipos' : tipo.charAt(0).toUpperCase() + tipo.slice(1)}
                            </option>
                        ))}
                    </Form.Select>
                </Form.Group>

                {loading && (
                    <div className="text-center my-5">
                        <Spinner animation="border" variant="primary" />
                        <p className="text-white">Carregando Pokémons...</p>
                    </div>
                )}

                {!loading && pokemonsFiltrados.length === 0 && (
                    <div className="text-center my-5">
                        <p className="text-white h5">Nenhum Pokémon encontrado.</p>
                        <p className="text-white-50">
                            Tente ajustar os filtros de geração, tipo ou habilidade.
                        </p>
                    </div>
                )}

                <Row className="gx-3 gy-0 justify-content-center">
                    {pokemonsToShow.map((pokemon, idx) => {
                        const mainType = pokemon.types[0]
                        const secondType = pokemon.types[1]
                        const bgColor = typeColors[mainType] || '#616161';
                        const secondColor = secondType ? typeColors[secondType] : null

                        const normalBackground = '#616161'
                        const hoverBackground = secondColor
                            ? `linear-gradient(to bottom right, ${bgColor} 0%, ${bgColor} 49.5%, ${secondColor} 50.5%, ${secondColor} 100%)`
                            : bgColor

                        return (
                            <Col key={idx} md={4} lg={3} className="mb-3">
                                <Link
                                    to={`/busca/${pokemon.name.toLowerCase()}`}
                                    style={{ textDecoration: 'none' }}
                                >
                                    <Card
                                        style={{
                                            zIndex: '2'
                                        }}
                                        className="text-white pokedex"
                                    >
                                        <Card.Body
                                            style={{
                                                '--bg-normal': normalBackground,
                                                '--bg-hover': hoverBackground,
                                            }}
                                            className="pokedex-hold"
                                        >
                                            <Card.Img
                                                variant="top"
                                                className="pokemon-img"
                                                src={pokemon.image}
                                            />
                                            <Card.Title className="pokedex-id text-center">
                                                {String(pokemon.id).padStart(3, '0')}
                                            </Card.Title>
                                            <Card.Img
                                                className="typing-img"
                                                src={'https://i.imgur.com/t4EtWZA.png'}
                                            />
                                            <Card.Img
                                                className="typing-img2"
                                                src={'https://i.imgur.com/cBGHxdm.png'}
                                            />
                                        </Card.Body>
                                        <Card.Body>
                                            <Card.Title>
                                                {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
                                            </Card.Title>
                                            <Card.Text className="icon-holder">
                                                {pokemon.types.map(type => (
                                                    <img
                                                        key={type}
                                                        src={typeImages[type]}
                                                        alt={type}
                                                        className="type-icon-pokedex me-1"
                                                        title={type.charAt(0).toUpperCase() + type.slice(1)}
                                                    />
                                                ))}
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                </Link>
                            </Col>
                        )
                    })}
                </Row>

                {visibleCount < pokemonsFiltrados.length && !loading && (
                    <div className="text-center my-3">
                        <Spinner animation="border" />
                    </div>
                )}
            </Container>
        </>
    )
})

export default Pokedex