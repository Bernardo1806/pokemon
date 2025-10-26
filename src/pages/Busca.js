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

const maxId = 1025

const Busca = (() => {
    const { nome } = useParams()
    const [pokemon, setPokemon] = useState(null)
    const [erro, setErro] = useState('')

    const tipos = Object.keys(typeColors)
    const firstRowTypes = tipos.slice(0, 9)
    const secondRowTypes = tipos.slice(9, 18)

    const [evolutionData, setEvolutionData] = useState([])

    const [prevPokemon, setPrevPokemon] = useState(null)
    const [nextPokemon, setNextPokemon] = useState(null)
    const [damageMultipliers, setDamageMultipliers] = useState({})

    const [formas, setFormas] = useState([])
    const [formaAtiva, setFormaAtiva] = useState('')
    const [defaultImage, setDefaultImage] = useState('')

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

    const parseEvolutionChain = (chain) => {
        const evolutions = []
        let currentStage = chain

        do {
            evolutions.push({
                name: currentStage.species.name,
            })

            currentStage = currentStage.evolves_to[0]
        } while (!!currentStage && currentStage.hasOwnProperty('evolves_to'))

        return evolutions
    }

    function formatAbilityName(name) {
        return name
            .split('-')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ')
    }

    const fetchTypeDamageRelations = async (type) => {
        try {
            const res = await axios.get(`https://pokeapi.co/api/v2/type/${type}`)
            return res.data.damage_relations
        } catch (error) {
            console.error('Erro ao buscar damage_relations:', error)
        }
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
                setEvolutionData([])
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
                        value: s.base_stat
                    }))
                })

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
                const evolutionChainUrl = speciesRes.data.evolution_chain.url

                const pokemonVarieties = speciesRes.data.varieties.map(v => ({
                    name: v.pokemon.name,
                    isDefault: v.is_default
                }))

                setFormas(pokemonVarieties)
                
                const defaultForm = pokemonVarieties.find(f => f.isDefault)?.name || pokemonVarieties[0].name
                setFormaAtiva(defaultForm)

                const evolutionRes = await axios.get(evolutionChainUrl)
                const chain = evolutionRes.data.chain
                const parsedEvolutions = parseEvolutionChain(chain)

                const evolutionDetails = await Promise.all(
                    parsedEvolutions.map(async (evo) => {
                        const evoRes = await axios.get(`https://pokeapi.co/api/v2/pokemon/${evo.name}`)
                        return {
                            id: evoRes.data.id,
                            name: evoRes.data.name,
                            image: evoRes.data.sprites.other['official-artwork'].front_default
                        }
                    })
                )
                setEvolutionData(evolutionDetails)

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
                    value: s.base_stat
                }))
            })

            const multipliers = await calculateDamageMultipliers(data.types.map(t => t.type.name))
            setDamageMultipliers(multipliers)
        } catch (error) {
            console.error('Erro ao mudar forma:', error)
        }
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
                                <span>#{String(prevPokemon.id).padStart(3, '0')} - {prevPokemon.name.toUpperCase()}</span>
                            </Link>

                            <h2 className="pokemon-header-title mb-0">
                                #{String(pokemon.id).padStart(3, '0')} - {pokemon.name.toUpperCase()}
                            </h2>

                            <Link to={`/busca/${nextPokemon.name.toLowerCase()}`} className="nav-button r-detail d-flex align-items-center gap-2">
                                <span>#{String(nextPokemon.id).padStart(3, '0')} - {nextPokemon.name.toUpperCase()}</span>
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
                                                        <img src={defaultImage} alt="Normal" style={{ width: '24px', height: 'auto' }} />
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
                        {evolutionData && evolutionData.length > 1 && (
                            <div className="pokemon-evolution-section">
                                <h4 className="pokedex-data-title">Evoluções</h4>
                                <div className="evolutions-container">
                                    {evolutionData.map((evo, index) => (
                                        <React.Fragment key={evo.id}>
                                            <Link to={`/busca/${evo.name.toLowerCase()}`} className="evolution-card">
                                                <img src={evo.image} alt={evo.name} />
                                                <p>#{String(evo.id).padStart(3, '0')} - {evo.name.toUpperCase()}</p>
                                            </Link>
                                            {index < evolutionData.length - 1 && (
                                                <div className="evolution-arrow">
                                                    <FaArrowRight size="2rem" />
                                                </div>
                                            )}
                                        </React.Fragment>
                                    ))}
                                </div>
                            </div>
                        )}

                    </div>
                )}
            </Container>

        </>
    )

})

export default Busca