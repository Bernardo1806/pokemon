import { Container, Spinner, Form, Row, Col, Card } from "react-bootstrap";
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

const pageSize = 96

const Pokedex = (() => {
    const [pokemons, setPokemons] = useState([])
    const [visibleCount, setVisibleCount] = useState(pageSize)
    const [loading, setLoading] = useState(false)
    const [geracaoSelecionada, setGeracaoSelecionada] = useState(1)
    const [tipoSelecionado, setTipoSelecionado] = useState('')
    const [hoveredPokemon, setHoveredPokemon] = useState(null);

    const tipos = ['', ...Object.keys(typeColors)]

    const fetchPorGeracao = async (idGeracao) => {
        setLoading(true)
        setPokemons([])
        setVisibleCount(pageSize)

        try {
            const cacheKey = `geracao_${idGeracao}`
            const cache = localStorage.getItem(cacheKey)

            if (cache) {
                console.log(`Usando cache para ${cacheKey}`)
                setPokemons(JSON.parse(cache))
                setLoading(false)
                return
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

        if (scrollTop + windowHeight + 48 >= fullHeight) {
            setVisibleCount((prev) => Math.min(prev + pageSize, pokemons.length))
        }
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
    }, [tipoSelecionado, geracaoSelecionada])

    const pokemonsFiltrados = tipoSelecionado
        ? pokemons.filter(p => p.types.includes(tipoSelecionado))
        : pokemons

    const pokemonsToShow = pokemonsFiltrados.slice(0, visibleCount)

    return (
        <>
            <Container className="container-pokedex my-5 mx-auto d-block">
                <h4 className="text-center my-5 title-pokedex">Pokédex</h4>

                <Form.Group className="mb-4 w-100 text-center geracao-group">
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

                <Row className="gx-3 gy-0 justify-content-center">
                    {pokemonsToShow.map((pokemon, idx) => {
                        const mainType = pokemon.types[0]
                        const secondType = pokemon.types[1]
                        const bgColor = typeColors[mainType] || '#616161';
                        const secondColor = secondType ? typeColors[secondType] : null

                        const isHovered = hoveredPokemon === pokemon.name

                        const backgroundStyle = isHovered
                            ? secondColor
                                ? `linear-gradient(to bottom right, ${bgColor} 0%, ${bgColor} 49.5%, ${secondColor} 50.5%, ${secondColor} 100%)`
                                : bgColor
                            : '#616161'

                        return (
                            <Col key={idx} md={4} lg={3} className="mb-3">
                                <Link
                                    to={`/busca/${pokemon.name.toLowerCase()}`}
                                    style={{ textDecoration: 'none' }}
                                >
                                    <Card
                                        style={{
                                            //backgroundColor: isHovered ? bgColor : '#313131',
                                            zIndex: '2'
                                        }}
                                        className="text-white pokedex"
                                        onMouseEnter={() => setHoveredPokemon(pokemon.name)}
                                        onMouseLeave={() => setHoveredPokemon(null)}
                                    >
                                        <Card.Body
                                            style={{
                                                background: backgroundStyle,
                                                transition: 'background 0.3s ease-in-out'
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
                                                        className="type-icon me-1"
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

                {visibleCount < pokemons.length && !loading && (
                    <div className="text-center my-3">
                        <Spinner animation="border" />
                    </div>
                )}
            </Container>
        </>
    )
})

export default Pokedex