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

const typeIcons = {
    normal: 'https://i.imgur.com/iLwnB7U.png',
    fire: 'https://i.imgur.com/t4gPCl0.png',
    water: 'https://i.imgur.com/XcIS4VB.png',
    electric: 'https://i.imgur.com/ECJ5QPW.png',
    grass: 'https://i.imgur.com/m2qUFEP.png',
    ice: 'https://i.imgur.com/Q0e19Eu.png',
    fighting: 'https://i.imgur.com/VAv3Ik1.png',
    poison: 'https://i.imgur.com/yXDbPPe.png',
    ground: 'https://i.imgur.com/rbsbIgb.png',
    flying: 'https://i.imgur.com/9N9BFby.png',
    psychic: 'https://i.imgur.com/uEfcEaP.png',
    bug: 'https://i.imgur.com/mnHaGRb.png',
    rock: 'https://i.imgur.com/I6PWrRO.png',
    ghost: 'https://i.imgur.com/PPGA2jB.png',
    dragon: 'https://i.imgur.com/svFzNRi.png',
    dark: 'https://i.imgur.com/NOEzPLm.png',
    steel: 'https://i.imgur.com/XF8ANjS.png',
    fairy: 'https://i.imgur.com/aTXpuSa.png',
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
                        p.abilities.length > 0
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
            setAbilitySuggestion([])
            return
        }

        const filtered = ability.filter(hab =>
            hab.toLowerCase().includes(input)
        )

        setAbilitySuggestion(filtered.slice(0, 1000))
    }

    useEffect(() => {
        const fetchAbility = async () => {
            try {
                const res = await axios.get(`https://pokeapi.co/api/v2/ability?limit=1000`)
                const lista = res.data.results.map(a => a.name)
                setAbility(lista)
            } catch (err) {
                console.error('Erro ao buscar habilidades:', err)
            } finally {
                setLoadingAbility(false)
            }
        }

        fetchAbility()
    }, [])

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
    }, [tipoSelecionado, geracaoSelecionada, abilitySearch])

    const pokemonsFiltrados = pokemons.filter(p => {
        const temTipo = tipoSelecionado ? p.types.includes(tipoSelecionado) : true;
        const buscaHabilidadeLimpa = abilitySearch.toLowerCase().trim()
        const temHabilidade = buscaHabilidadeLimpa
            ? p.abilities?.some(a => a.includes(buscaHabilidadeLimpa))
            : true;
        return temTipo && temHabilidade;
    })

    const pokemonsToShow = pokemonsFiltrados.slice(0, visibleCount)

    return (
        <>
            <Container className="container-pokedex my-5 mx-auto d-block">
                <h4 className="text-center my-5 title-pokedex">Pokédex</h4>

                <Form.Group className="mb-4 w-100 text-center geracao-group">
                    <div className="autocomplete-container">
                        <FormControl
                            type="search"
                            placeholder="Buscar Habilidade"
                            className="geracao-select"
                            value={abilitySearch}
                            onChange={handleInputChange}
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
                                        <span className="text-white">{hab.charAt(0).toUpperCase() + hab.slice(1)}</span>
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
                        const secondTypeCopy = secondType
                            ? pokemon.types[1]
                            : pokemon.types[0]
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
                                            <div className="type-icon-wrapper">
                                                <Card.Img
                                                    className="typing-img"
                                                    src={typeIcons[mainType]}
                                                />
                                                <Card.Img
                                                    className="typing-img2"
                                                    src={typeIcons[secondTypeCopy]}
                                                />
                                            </div>
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