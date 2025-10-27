import { Link, useParams } from "react-router-dom"
import "./css/Busca.css"
import axios from 'axios';
import React, { useEffect, useState } from "react"
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { Container, ProgressBar } from "react-bootstrap";


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

const maxId = 1025

const Busca = (() => {
    const { nome } = useParams()
    const [pokemon, setPokemon] = useState(null)
    const [erro, setErro] = useState('')

    const tipos = Object.keys(typeColors)
    const firstRowTypes = tipos.slice(0, 9)
    const secondRowTypes = tipos.slice(9, 18)

    const [evolutionData, setEvolutionData] = useState(null)

    const [prevPokemon, setPrevPokemon] = useState(null)
    const [nextPokemon, setNextPokemon] = useState(null)
    const [damageMultipliers, setDamageMultipliers] = useState({})

    const [formas, setFormas] = useState([])
    const [formaAtiva, setFormaAtiva] = useState('')
    const [defaultImage, setDefaultImage] = useState('')

    const [breedingInfo, setBreedingInfo] = useState({})
    const [trainingInfo, setTrainingInfo] = useState({})

    const [movesByMethod, setMovesByMethod] = useState({
        levelUp: [],
        egg: [],
        tutor: [],
        evolution: [],
        machine: []
    })

    const [sortConfig, setSortConfig] = useState({
        method: null,
        key: null,
        direction: 'asc'
    })

    const getPreviousPokemonId = (currentId) => {
        return currentId === 1 ? maxId : currentId - 1
    }

    const getNextPokemonId = (currentId) => {
        return currentId === maxId ? 1 : currentId + 1
    }

    const fetchPokemonNameById = async (id) => {
        try {
            const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
            return {
                id: res.data.id,
                name: res.data.name
            }
        } catch {
            return null
        }
    }

    function formatAbilityName(name) {
        return name
            .split('-')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ')
    }

    const EvolutionStage = ({ evo }) => {
        if (!evo || !evo.name) return null

        return (
            <div className="evolution-stage-wrapper">

                <Link to={`/busca/${evo.name.toLowerCase()}`} className="evolution-card">
                    <img src={evo.image} alt={evo.name} />
                    <p>#{String(evo.id).padStart(3, '0')} - {formatName(evo.name.toUpperCase())}</p>
                </Link>

                {evo.evolves_to && evo.evolves_to.length > 0 && (
                    <div className="next-stages-container">

                        {evo.evolves_to.map((nextEvo, index) => (
                            <div key={index} className="next-stage-branch">

                                <div className="evolution-transition">
                                    <span className="evolution-condition">
                                        {formatEvolutionDetails(nextEvo.details)}
                                    </span>
                                    <FaArrowRight size="2rem" className="evolution-arrow" />
                                </div>

                                <EvolutionStage evo={nextEvo} />
                            </div>
                        ))}
                    </div>
                )}
            </div>
        )
    }

    const formatEvolutionDetails = (details) => {
        if (!details) return ''

        const trigger = formatName(details.trigger.name)
        let condition = trigger

        if (trigger === 'Level Up') {
            condition = details.min_level ? `Level ${details.min_level}` : 'Level Up'
        } else if (trigger === 'Use Item') {
            condition = details.item ? `Use ${formatName(details.item.name)}` : 'Use item'
        } else if (trigger === 'Trade') {
            condition = details.trade_species ? `Trade for ${formatName(details.trade_species.name)}` : 'Trade'
        }

        if (details.min_happiness) condition += ` (min ${details.min_happiness} happiness)`;
        if (details.held_item) condition += ` (holding ${formatName(details.held_item.name)})`;
        if (details.time_of_day) condition += ` (at ${details.time_of_day})`;
        if (details.location) condition += ` (at ${formatName(details.location.name)})`;
        if (details.gender === 2) condition += ' (Male)';
        if (details.gender === 1) condition += ' (Female)';

        return condition
    }

    const fetchTypeDamageRelations = async (type) => {
        try {
            const res = await axios.get(`https://pokeapi.co/api/v2/type/${type}`)
            return res.data.damage_relations
        } catch (error) {
            console.error('Erro ao buscar damage_relations:', error)
        }
    }

    const handleSort = (method, key) => {
        setMovesByMethod(prev => {
            const sorted = { ...prev }

            let direction = 'asc'
            if (sortConfig.method == method && sortConfig.key === key && sortConfig.direction == 'asc') {
                direction = 'desc'
            }

            const sortedMoves = [...sorted[method]].sort((a, b) => {
                const aVal = a[key] === '-' ? 0 : a[key]
                const bVal = b[key] === '-' ? 0 : b[key]

                if (!isNaN(aVal) && !isNaN(bVal)) {
                    return direction === 'asc' ? aVal - bVal : bVal - aVal
                } else {
                    return direction === 'asc'
                        ? String(aVal).localeCompare(String(bVal))
                        : String(bVal).localeCompare(String(aVal))
                }
            })

            sorted[method] = sortedMoves
            setSortConfig({ method, key, direction })
            return sorted
        })
    }

    const calculateDamageMultipliers = async (types) => {
        const typeList = Object.keys(typeColors)
        const multipliers = {}

        typeList.forEach(t => multipliers[t] = 1)

        for (const type of types) {
            const damageRelations = await fetchTypeDamageRelations(type)
            if (!damageRelations) continue

            damageRelations.double_damage_from.forEach(({ name }) => multipliers[name] *= 2)
            damageRelations.half_damage_from.forEach(({ name }) => multipliers[name] *= 0.5)
            damageRelations.no_damage_from.forEach(({ name }) => multipliers[name] *= 0)
        }

        return multipliers
    }

    function getStatColor(value) {
        if (value < 60) return 'danger'
        if (value < 80) return 'warning'
        if (value < 100) return 'yellow'
        if (value < 150) return 'success'
        return 'info'
    }

    useEffect(() => {
        const fetchPokemonData = async () => {
            try {
                setPokemon(null)
                setDamageMultipliers({})
                setEvolutionData(null)
                setErro('')

                const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${nome}`)
                const currentPokemon = res.data
                setPokemon({
                    id: currentPokemon.id,
                    name: currentPokemon.name,
                    image: currentPokemon.sprites.other['official-artwork'].front_default,
                    types: currentPokemon.types.map(t => t.type.name),
                    height: currentPokemon.height,
                    weight: currentPokemon.weight,
                    abilities: currentPokemon.abilities.map(a => a.ability.name),
                    stats: currentPokemon.stats.map(s => ({
                        name: s.stat.name,
                        value: s.base_stat,
                        effort: s.effort
                    }))
                })

                const allMoves = currentPokemon.moves.map(m => {
                    const details = m.version_group_details[m.version_group_details.length - 1]
                    return {
                        name: m.move.name,
                        url: m.move.url,
                        method: details.move_learn_method.name,
                        level: details.level_learned_at
                    }
                })

                const movesDetailed = await Promise.all(
                    allMoves.map(async (move) => {
                        try {
                            const res = await axios.get(move.url)
                            const data = res.data
                            let tmNumber = null

                            if (move.method === 'machine' && data.machines.length > 0) {
                                const machineUrl = data.machines[data.machines.length - 1].machine.url
                                const machineRes = await axios.get(machineUrl)
                                const machineName = machineRes.data.item.name

                                tmNumber = machineName.toUpperCase()
                            }

                            return {
                                ...move,
                                power: data.power ?? '-',
                                accuracy: data.accuracy ?? '-',
                                damage_class: data.damage_class.name,
                                type: data.type.name,
                                tmNumber
                            }
                        } catch (err) {
                            console.error("Erro ao buscar detalhes do golde:", move.name, err)
                            return { ...move, power: '-', accuracy: '-', damage_class: '-', type: '-', tmNumber: null }
                        }
                    })
                )

                const groupedMoves = {
                    levelUp: [],
                    egg: [],
                    tutor: [],
                    evolution: [],
                    machine: []
                }

                movesDetailed.forEach(move => {
                    switch (move.method) {
                        case 'level-up':
                            groupedMoves.levelUp.push(move)
                            break
                        case 'egg':
                            groupedMoves.egg.push(move)
                            break
                        case 'tutor':
                            groupedMoves.tutor.push(move)
                            break
                        case 'evolution':
                            groupedMoves.evolution.push(move)
                            break
                        case 'machine':
                            groupedMoves.machine.push(move)
                            break
                        default:
                            break
                    }
                })

                groupedMoves.levelUp.sort((a, b) => a.level - b.level)
                setMovesByMethod(groupedMoves)

                setDefaultImage(currentPokemon.sprites.other['official-artwork'].front_default)

                const prevId = getPreviousPokemonId(currentPokemon.id)
                const nextId = getNextPokemonId(currentPokemon.id)
                const [prevData, nextData] = await Promise.all([
                    fetchPokemonNameById(prevId),
                    fetchPokemonNameById(nextId)
                ])
                setPrevPokemon(prevData)
                setNextPokemon(nextData)

                const multipliers = await calculateDamageMultipliers(currentPokemon.types.map(t => t.type.name))
                setDamageMultipliers(multipliers)

                const speciesRes = await axios.get(currentPokemon.species.url)

                const speciesData = speciesRes.data
                const eggGroups = formatName((speciesData.egg_groups || []).map(g => g.name).join(', '))
                let genderRate = speciesData.gender_rate
                let genderText = ''
                if (genderRate === -1) genderText = 'Genderless'
                else {
                    const female = (genderRate / 8) * 100
                    const male = 100 - female
                    genderText = `${male}% ♂ / ${female}% ♀`
                }

                const captureRate = speciesData.capture_rate ?? '-'
                const baseFriendship = speciesData.base_happiness ?? '-'

                const evYield = (currentPokemon.stats || [])
                    .filter(s => s.effort > 0)
                    .map(s => `${s.effort} ${formatName(s.stat.name)}`)
                    .join(', ') || 'None'

                setBreedingInfo({
                    eggGroups,
                    genderText
                })

                setTrainingInfo({
                    evYield,
                    captureRate,
                    baseFriendship
                })

                const evolutionChainUrl = speciesRes.data.evolution_chain.url

                const formsWithImages = await Promise.all(
                    speciesRes.data.varieties.map(async (v) => {
                        let imageUrl = defaultImage
                        try {
                            const varietyRes = await axios.get(`https://pokeapi.co/api/v2/pokemon/${v.pokemon.name}`);
                            const artwork = varietyRes.data.sprites.other['official-artwork'].front_default;

                            if (artwork) {
                                imageUrl = artwork
                            } else {
                                imageUrl = varietyRes.data.sprites.front_default
                            }
                        } catch (err) {
                            console.error(`Falha ao buscar imagem da variedade: ${v.pokemon.name}`, err)
                        }

                        return {
                            name: v.pokemon.name,
                            isDefault: v.is_default,
                            image: imageUrl || defaultImage
                        }
                    })
                )

                setFormas(formsWithImages)

                const defaultForm = formsWithImages.find(f => f.isDefault)?.name || formsWithImages[0].name
                setFormaAtiva(defaultForm)

                const fetchEvolutionDetailsRecursive = async (stage) => {
                    let currentPokemonData
                    try {
                        const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${stage.species.name}`)
                        currentPokemonData = {
                            id: res.data.id,
                            name: res.data.name,
                            image: res.data.sprites.other['official-artwork'].front_default,
                        }
                    } catch (e) {
                        console.error("Erro ao buscar Pokémon da evolução:", stage.species.name, e)
                        return null
                    }

                    const details = stage.evolution_details.length > 0 ? stage.evolution_details[0] : null

                    const nextEvolutions = await Promise.all(
                        stage.evolves_to.map(nextStage => fetchEvolutionDetailsRecursive(nextStage))
                    )

                    const validNextEvolutions = nextEvolutions.filter(evo => evo !== null)

                    return {
                        ...currentPokemonData,
                        details: details,
                        evolves_to: validNextEvolutions
                    }
                }

                const evolutionRes = await axios.get(evolutionChainUrl)
                const chain = evolutionRes.data.chain

                const fullEvolutionTree = await fetchEvolutionDetailsRecursive(chain)

                setEvolutionData(fullEvolutionTree)


            } catch (error) {
                console.error('Error fetching Pokémon data: ', error)
                setPokemon(null)
                setErro('Pokémon não encontrado!')
            }
        }

        fetchPokemonData()
        const formatado = nome.charAt(0).toUpperCase() + nome.slice(1)
        document.title = `Busca - ${formatado}`
    }, [nome])

    const mudarForma = async (nomeForma) => {
        setFormaAtiva(nomeForma)

        try {
            const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${nomeForma}`)
            const data = res.data

            setPokemon({
                id: data.id,
                name: data.name,
                image: data.sprites.other['official-artwork'].front_default,
                types: data.types.map(t => t.type.name),
                height: data.height,
                weight: data.weight,
                abilities: data.abilities.map(a => a.ability.name),
                stats: data.stats.map(s => ({
                    name: s.stat.name,
                    value: s.base_stat,
                    effort: s.effort
                }))
            })

            const multipliers = await calculateDamageMultipliers(data.types.map(t => t.type.name))
            setDamageMultipliers(multipliers)
        } catch (error) {
            console.error('Erro ao mudar forma:', error)
        }
    }

    const formatName = (name) => {
        if (!name) return ''
        return name.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
    }

    const renderDamageTable = (typesToRender) => (
        <table className="damage-table">
            <thead>
                <tr>
                    {typesToRender.map(type => (
                        <th key={type} style={{ backgroundImage: `url(${typeIcons[type]})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
                    ))}
                </tr>
            </thead>
            <tbody>
                <tr>
                    {typesToRender.map(type => {
                        const multiplier = damageMultipliers[type]
                        let multiplierClass = ''

                        if (multiplier === 0) multiplierClass = 'multiplier-0'
                        else if (multiplier === 0.25) multiplierClass = 'multiplier-0-25'
                        else if (multiplier === 0.5) multiplierClass = 'multiplier-0-5'
                        else if (multiplier === 1) multiplierClass = 'multiplier-1'
                        else if (multiplier === 2) multiplierClass = 'multiplier-2'
                        else if (multiplier === 4) multiplierClass = 'multiplier-4'

                        return (
                            <td key={type} className={multiplierClass}>
                                {multiplier}x
                            </td>
                        )
                    })}
                </tr>
            </tbody>
        </table>
    )

    return (
        <>
            <Container className="container-busca my-5 mx-auto d-block">
                {erro && <p className="text-danger mt-3">{erro}</p>}
                {pokemon && prevPokemon && nextPokemon && (
                    <div className="mx-auto">
                        <div className="pokemon-navigation-bar d-flex justify-content-between align-items-center mb-4">
                            <Link to={`/busca/${prevPokemon.name.toLowerCase()}`} className="nav-button l-detail d-flex align-items-center gap-2">
                                <FaArrowLeft />
                                <span>#{String(prevPokemon.id).padStart(3, '0')} - {formatName(prevPokemon.name.toUpperCase())}</span>
                            </Link>

                            <h2 className="pokemon-header-title mb-0">
                                #{String(pokemon.id).padStart(3, '0')} - {formatName(pokemon.name.toUpperCase())}
                            </h2>

                            <Link to={`/busca/${nextPokemon.name.toLowerCase()}`} className="nav-button r-detail d-flex align-items-center gap-2">
                                <span>#{String(nextPokemon.id).padStart(3, '0')} - {formatName(nextPokemon.name.toUpperCase())}</span>
                                <FaArrowRight />
                            </Link>
                        </div>

                        <div className="pokemon-top-section mt-5">
                            <div className="pokemon-left">
                                <img src={pokemon.image} alt={pokemon.name} className="pokemon-image" />

                                {formas.length > 1 && (
                                    <div className="formas-buttons mt-2">
                                        {formas.map(f => {
                                            const isMega = f.name.toLowerCase().includes('mega')
                                            const isGMax = f.name.toLowerCase().includes('gmax')
                                            const isActive = f.name === formaAtiva

                                            return (
                                                <button
                                                    key={f.name}
                                                    onClick={() => mudarForma(f.name)}
                                                    disabled={f.isDefault && f.name === pokemon.name}
                                                    className={`forma-button ${isActive ? 'active' : ''}`}
                                                >
                                                    {isMega ? (
                                                        <img src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/e8ddc4da-23dd-4502-b65b-378c9cfe5efa/dfftdg1-584ddaa0-d73d-4635-b736-9467f175afbe.png/v1/fill/w_894,h_894/key_stone_by_jormxdos_dfftdg1-pre.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTI4MCIsInBhdGgiOiIvZi9lOGRkYzRkYS0yM2RkLTQ1MDItYjY1Yi0zNzhjOWNmZTVlZmEvZGZmdGRnMS01ODRkZGFhMC1kNzNkLTQ2MzUtYjczNi05NDY3ZjE3NWFmYmUucG5nIiwid2lkdGgiOiI8PTEyODAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.8XeYAN8ki6EVFxKsNQ1F37fVp_yhYpyQfLxo_CIGUqw" alt="Mega" style={{ width: '24px', height: 'auto' }} />
                                                    ) : isGMax ? (
                                                        <img src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/e8ddc4da-23dd-4502-b65b-378c9cfe5efa/dffv4gc-26ecc0c6-34dd-49ec-a93a-7360dd5a95fc.png/v1/fit/w_300,h_900/gigantamax_icon_by_jormxdos_dffv4gc-300w.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTI4MCIsInBhdGgiOiIvZi9lOGRkYzRkYS0yM2RkLTQ1MDItYjY1Yi0zNzhjOWNmZTVlZmEvZGZmdjRnYy0yNmVjYzBjNi0zNGRkLTQ5ZWMtYTkzYS03MzYwZGQ1YTk1ZmMucG5nIiwid2lkdGgiOiI8PTEyODAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.upz_uLqCRF7S-DJzDuL5PH6jled4GkiHebFWE0-fMSM" alt="GMax" style={{ width: '24px', height: 'auto' }} />
                                                    ) : (
                                                        <img src={f.image} alt={f.name} style={{ width: '24px', height: 'auto' }} />
                                                    )}
                                                </button>
                                            )
                                        })}
                                    </div>
                                )}
                            </div>
                            <div className="pokemon-right">
                                <h2 className="pokedex-data-title">Pokédex Data</h2>
                                <p><strong>N° Pokédex:</strong> #{pokemon.id}</p>
                                <div className="pokemon-types d-flex align-items-center">
                                    <strong className="me-2">Tipo(s):</strong>
                                    <div className="types-container d-flex w-100">
                                        {pokemon.types.map(type => (
                                            <img
                                                key={type}
                                                src={typeImages[type]}
                                                alt={type}
                                                className="type-icon me-1"
                                                title={type.charAt(0).toUpperCase() + type.slice(1)}
                                            />
                                        ))}
                                    </div>
                                </div>
                                <p><strong>Altura:</strong> {pokemon.height / 10} m</p>
                                <p><strong>Peso:</strong> {pokemon.weight / 10} kg</p>
                                <div className="pokemon-abilities d-flex">
                                    <strong className="me-2">Habilidades:</strong>
                                    <ol className="mb-0">
                                        {pokemon.abilities.map((ability, index) => (
                                            <li key={index}>{formatAbilityName(ability)}</li>
                                        ))}
                                    </ol>
                                </div>
                                <div className="pokemon-competitive mt-3">
                                    <strong>Competitivo:</strong>{' '}
                                    <a
                                        href={`https://www.smogon.com/dex/ss/pokemon/${pokemon.name.toLowerCase()}/`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="linked-text"
                                    >
                                        Estratégias
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div className="pokemon-bottom-section d-flex">
                            <div className="pokemon-stats-bottom me-4">
                                <h4 className="pokedex-data-title">Stats Base</h4>
                                {pokemon.stats.map(stat => (
                                    <div key={stat.name} className="stat-line p-1">
                                        <span className="stat-name">{stat.name.toUpperCase()}</span>
                                        <span className="stat-value">{stat.value}</span>
                                        <div className="stat-progress">
                                            <ProgressBar
                                                striped
                                                now={stat.value}
                                                max={200}
                                                variant={getStatColor(stat.value)}
                                                className={getStatColor(stat.value) === 'yellow' ? 'progress-yellow' : ''}
                                                style={{ border: '1px solid rgba(0,0,0,.3)' }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="pokemon-damage-relations">
                                <h4 className="pokedex-data-title">Fraquezas / Resistências</h4>
                                {renderDamageTable(firstRowTypes)}
                                {renderDamageTable(secondRowTypes)}
                            </div>
                        </div>
                        {evolutionData && (
                            <div className="pokemon-evolution-section">
                                <h4 className="pokedex-data-title">Evoluções</h4>

                                <div className="evolutions-container-recursive">
                                    <EvolutionStage evo={evolutionData} />
                                </div>
                            </div>
                        )}

                        <div className="pokemon-bottom-info-section gap-5">
                            <div className="pokemon-breeding-section">
                                <h4 className="pokedex-data-title">Breeding</h4>
                                <p><strong>Egg Groups:</strong> {breedingInfo.eggGroups || '-'}</p>
                                <p><strong>Gender:</strong> {breedingInfo.genderText || '-'}</p>
                            </div>
                            <div className="pokemon-training-section">
                                <h4 className="pokedex-data-title">Training</h4>
                                <p><strong>EV Yield</strong> {trainingInfo.evYield || '-'}</p>
                                <p><strong>Catch Rate:</strong> {trainingInfo.captureRate || '-'}</p>
                                <p><strong>Base Friendship:</strong> {trainingInfo.baseFriendship || '-'}</p>
                            </div>
                        </div>

                        <div className="pokemon-moves-section mt-4">
                            <h4 className="pokedex-data-title">Moves</h4>

                            <div className="move-categories-wrapper">
                                <div className="move-categories-left">
                                    {Object.entries(movesByMethod)
                                        .filter(([method]) => method !== 'machine')
                                        .map(([method, moves]) => (
                                            moves.length > 0 && (
                                                <div key={method} className="move-category mb-3">
                                                    <h5 className="move-category-title">
                                                        {method === 'levelUp' ? 'Aprende por Level Up' :
                                                            method === 'egg' ? 'Aprende no Ovo' :
                                                                method === 'tutor' ? 'Aprende com Tutor' :
                                                                    method === 'evolution' ? 'Aprende por Evolução' :
                                                                        method}
                                                    </h5>

                                                    <table className="table table-striped table-bordered">
                                                        <thead className="table-dark text-center">
                                                            <tr>
                                                                {method === 'levelUp' && (
                                                                    <th
                                                                        className="sortable-header"
                                                                        onClick={() => handleSort(method, 'level')}
                                                                        style={{ width: '8%' }}
                                                                    >
                                                                        Lv.
                                                                        <span
                                                                            className={`sort-arrow ${sortConfig.method === method && sortConfig.key === 'level' ? 'active' : ''}`}
                                                                        >
                                                                            {sortConfig.method === method && sortConfig.key === 'level'
                                                                                ? sortConfig.direction === 'asc'
                                                                                    ? '▲'
                                                                                    : '▼'
                                                                                : '△'}
                                                                        </span>
                                                                    </th>
                                                                )}

                                                                <th
                                                                    className="sortable-header"
                                                                    onClick={() => handleSort(method, 'name')}
                                                                    style={{ width: '25%' }}
                                                                >
                                                                    Move
                                                                    <span
                                                                        className={`sort-arrow ${sortConfig.method === method && sortConfig.key === 'name' ? 'active' : ''}`}
                                                                    >
                                                                        {sortConfig.method === method && sortConfig.key === 'name'
                                                                            ? sortConfig.direction === 'asc'
                                                                                ? '▲'
                                                                                : '▼'
                                                                            : '△'}
                                                                    </span>
                                                                </th>

                                                                <th
                                                                    className="sortable-header"
                                                                    onClick={() => handleSort(method, 'type')}
                                                                    style={{ width: '14%' }}
                                                                >
                                                                    Type
                                                                    <span
                                                                        className={`sort-arrow ${sortConfig.method === method && sortConfig.key === 'type' ? 'active' : ''}`}
                                                                    >
                                                                        {sortConfig.method === method && sortConfig.key === 'type'
                                                                            ? sortConfig.direction === 'asc'
                                                                                ? '▲'
                                                                                : '▼'
                                                                            : '△'}
                                                                    </span>
                                                                </th>

                                                                <th
                                                                    className="sortable-header"
                                                                    onClick={() => handleSort(method, 'damage_class')}
                                                                    style={{ width: '10%' }}
                                                                >
                                                                    Cat.
                                                                    <span
                                                                        className={`sort-arrow ${sortConfig.method === method && sortConfig.key === 'damage_class' ? 'active' : ''}`}
                                                                    >
                                                                        {sortConfig.method === method && sortConfig.key === 'damage_class'
                                                                            ? sortConfig.direction === 'asc'
                                                                                ? '▲'
                                                                                : '▼'
                                                                            : '△'}
                                                                    </span>
                                                                </th>

                                                                <th
                                                                    className="sortable-header"
                                                                    onClick={() => handleSort(method, 'power')}
                                                                    style={{ width: '10%' }}
                                                                >
                                                                    Power
                                                                    <span
                                                                        className={`sort-arrow ${sortConfig.method === method && sortConfig.key === 'power' ? 'active' : ''}`}
                                                                    >
                                                                        {sortConfig.method === method && sortConfig.key === 'power'
                                                                            ? sortConfig.direction === 'asc'
                                                                                ? '▲'
                                                                                : '▼'
                                                                            : '△'}
                                                                    </span>
                                                                </th>

                                                                <th
                                                                    className="sortable-header"
                                                                    onClick={() => handleSort(method, 'accuracy')}
                                                                    style={{ width: '10%' }}
                                                                >
                                                                    Acc.
                                                                    <span
                                                                        className={`sort-arrow ${sortConfig.method === method && sortConfig.key === 'accuracy' ? 'active' : ''}`}
                                                                    >
                                                                        {sortConfig.method === method && sortConfig.key === 'accuracy'
                                                                            ? sortConfig.direction === 'asc'
                                                                                ? '▲'
                                                                                : '▼'
                                                                            : '△'}
                                                                    </span>
                                                                </th>
                                                            </tr>
                                                        </thead>

                                                        <tbody>
                                                            {moves.map((move, index) => (
                                                                <tr key={index}>
                                                                    {method === 'levelUp' && <td>{move.level > 0 ? move.level : '-'}</td>}
                                                                    <td className="text-start">{formatName(move.name)}</td>
                                                                    <td className="type-cell">
                                                                        {move.type && typeImages[move.type] ? (
                                                                            <img
                                                                                src={typeImages[move.type]}
                                                                                alt={move.type}
                                                                                className="type-icon-img"
                                                                                title={move.type.charAt(0).toUpperCase() + move.type.slice(1)}
                                                                            />
                                                                        ) : (
                                                                            '-'
                                                                        )}
                                                                    </td>
                                                                    <td style={{ textAlign: 'center', padding: '4px' }}>
                                                                        <div style={{
                                                                            display: 'flex',
                                                                            justifyContent: 'center',
                                                                            alignItems: 'center',
                                                                            height: '40px',
                                                                            width: '40px',
                                                                            margin: '0 auto'
                                                                        }}>
                                                                            <img
                                                                                src={moveCategoryIcons[move.damage_class]}
                                                                                alt={move.damage_class}
                                                                                title={move.damage_class}
                                                                                style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain', display: 'block' }}
                                                                            />
                                                                        </div>
                                                                    </td>
                                                                    <td>{move.power}</td>
                                                                    <td>{move.accuracy}</td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </table>
                                                </div>
                                            )
                                        ))}
                                </div>

                                <div className="move-categories-right">
                                    {movesByMethod.machine?.length > 0 && (
                                        <div className="move-category move-category-tm mb-3">
                                            <h5 className="move-category-title">Aprende por TM</h5>

                                            <table className="table table-striped table-bordered">
                                                <thead className="table-dark text-center">
                                                    <tr>
                                                        <th
                                                            className="sortable-header"
                                                            onClick={() => handleSort('machine', 'tmNumber')}
                                                            style={{ width: '10%' }}
                                                        >
                                                            TM
                                                            <span
                                                                className={`sort-arrow ${sortConfig.method === 'machine' && sortConfig.key === 'tmNumber' ? 'active' : ''}`}
                                                            >
                                                                {sortConfig.method === 'machine' && sortConfig.key === 'tmNumber'
                                                                    ? sortConfig.direction === 'asc'
                                                                        ? '▲'
                                                                        : '▼'
                                                                    : '△'}
                                                            </span>
                                                        </th>

                                                        <th className="sortable-header" onClick={() => handleSort('machine', 'name')} style={{ width: '25%' }}>
                                                            Move
                                                            <span
                                                                className={`sort-arrow ${sortConfig.method === 'machine' && sortConfig.key === 'name' ? 'active' : ''}`}
                                                            >
                                                                {sortConfig.method === 'machine' && sortConfig.key === 'name'
                                                                    ? sortConfig.direction === 'asc'
                                                                        ? '▲'
                                                                        : '▼'
                                                                    : '△'}
                                                            </span>
                                                        </th>
                                                        <th className="sortable-header" onClick={() => handleSort('machine', 'type')} style={{ width: '14%' }}>
                                                            Type
                                                            <span
                                                                className={`sort-arrow ${sortConfig.method === 'machine' && sortConfig.key === 'type' ? 'active' : ''}`}
                                                            >
                                                                {sortConfig.method === 'machine' && sortConfig.key === 'type'
                                                                    ? sortConfig.direction === 'asc'
                                                                        ? '▲'
                                                                        : '▼'
                                                                    : '△'}
                                                            </span>
                                                        </th>
                                                        <th className="sortable-header" onClick={() => handleSort('machine', 'damage_class')} style={{ width: '10%' }}>
                                                            Cat.
                                                            <span
                                                                className={`sort-arrow ${sortConfig.method === 'machine' && sortConfig.key === 'damage_class' ? 'active' : ''}`}
                                                            >
                                                                {sortConfig.method === 'machine' && sortConfig.key === 'damage_class'
                                                                    ? sortConfig.direction === 'asc'
                                                                        ? '▲'
                                                                        : '▼'
                                                                    : '△'}
                                                            </span>
                                                        </th>
                                                        <th className="sortable-header" onClick={() => handleSort('machine', 'power')} style={{ width: '10%' }}>
                                                            Power
                                                            <span
                                                                className={`sort-arrow ${sortConfig.method === 'machine' && sortConfig.key === 'power' ? 'active' : ''}`}
                                                            >
                                                                {sortConfig.method === 'machine' && sortConfig.key === 'power'
                                                                    ? sortConfig.direction === 'asc'
                                                                        ? '▲'
                                                                        : '▼'
                                                                    : '△'}
                                                            </span>
                                                        </th>
                                                        <th className="sortable-header" onClick={() => handleSort('machine', 'accuracy')} style={{ width: '10%' }}>
                                                            Acc.
                                                            <span
                                                                className={`sort-arrow ${sortConfig.method === 'machine' && sortConfig.key === 'accuracy' ? 'active' : ''}`}
                                                            >
                                                                {sortConfig.method === 'machine' && sortConfig.key === 'accuracy'
                                                                    ? sortConfig.direction === 'asc'
                                                                        ? '▲'
                                                                        : '▼'
                                                                    : '△'}
                                                            </span>
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {movesByMethod.machine.map((move, index) => (
                                                        <tr key={index}>
                                                            <td>{move.tmNumber || '-'}</td>
                                                            <td className="text-start">{formatName(move.name)}</td>
                                                            <td className="type-cell">
                                                                {move.type && typeImages[move.type] ? (
                                                                    <img
                                                                        src={typeImages[move.type]}
                                                                        alt={move.type}
                                                                        className="type-icon-img"
                                                                        title={move.type.charAt(0).toUpperCase() + move.type.slice(1)}
                                                                    />
                                                                ) : (
                                                                    '-'
                                                                )}
                                                            </td>
                                                            <td style={{ textAlign: 'center', padding: '4px' }}>
                                                                <div style={{
                                                                    display: 'flex',
                                                                    justifyContent: 'center',
                                                                    alignItems: 'center',
                                                                    height: '40px',
                                                                    width: '40px',
                                                                    margin: '0 auto'
                                                                }}>
                                                                    <img
                                                                        src={moveCategoryIcons[move.damage_class]}
                                                                        alt={move.damage_class}
                                                                        title={move.damage_class}
                                                                        style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain', display: 'block' }}
                                                                    />
                                                                </div>
                                                            </td>
                                                            <td>{move.power}</td>
                                                            <td>{move.accuracy}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                    </div>
                )}
            </Container>

        </>
    )

})

export default Busca