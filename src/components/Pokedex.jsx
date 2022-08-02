import axios from 'axios';
import React, { useEffect, useState } from 'react';
// importamos el uselector del slice a utilizar
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import PokemonItem from './PokemonItem';
import pokeball from '../assets/img/pokebola.png'
import pokedex from '../assets/img/Pokedex.png'

const Pokedex = () => {
    // de la siguiente manera se pondria dentro del componente en una variable y debe de ir l nombre del slice que esta en el index de la carpeta store

    const user = useSelector(state => state.user)

    const [pokeSearch, setPokeSearch] = useState('')

    const [pokemons, setPokemons] = useState([])
    const navigate = useNavigate()

    const [type, setType] = useState([])

    useEffect(() => {
        axios.get('https://pokeapi.co/api/v2/pokemon/?offset=0&limit=1154')
            .then(res => setPokemons(res.data.results))
    }, [])



    useEffect(() => {
        axios.get(' https://pokeapi.co/api/v2/type/')
            .then(res => setType(res.data.results))
    }, [])


    const search = (e) => {
        e.preventDefault
        navigate(`/pokedex/${pokeSearch}`)
    }

    const filterType = (e) => {
        // alert('hiciste click a ' + e.target.value)
        axios.get(e.target.value)
            .then(res => setPokemons(res.data.pokemon))

    }

    const [page, setPage] = useState(1)
    const lastIndex = page * 50
    const firstIndex = lastIndex - 50
    const pokemonPaginated = pokemons.slice(firstIndex, lastIndex)

    const lastPage = Math.ceil(pokemons.length / 50)

    const numbers = []

    for (let i = 1; i <= lastPage; i++) {
        numbers.push(i)
    }



    // console.log(pokemons)

    return (
        <section className='pokedex-container' >
            <div className='pokedex-image' >
                <img className='title-image' src={pokedex} alt="" />
            </div>
            <h2 className='pokedex-title'>Welcome {user} to your pokedex</h2>
            <div className='forms-container'>
                <form className='pokedex-form-container' onSubmit={search}>
                    <input placeholder='write a pokemon name' className='pokedex-form' type="text" value={pokeSearch} onChange={(e) => setPokeSearch(e.target.value)} />
                    <button className='pokedex-button'><img className='pokedex-button-img' src={pokeball} alt="" /></button>
                </form>
                <select className='pokedex-select' onChange={filterType}>
                    <option className='select-option'>select a type</option>
                    {type.map(typeInfo => (
                        <option value={typeInfo.url} key={typeInfo.url}> {typeInfo.name}</option>
                    ))}
                </select>
            </div>
            <article className='button-container'>
                <button className='button-page' onClick={() => setPage(page - 1)} disabled={page === 1}>prev page</button>
                {numbers.map((number) => (
                    <button className='button-page' key={number} onClick={() => setPage(number)}>{number}</button>
                ))
                }
                <button className='button-page' onClick={() => setPage(page + 1)} disabled={page === lastPage}>next page</button>
            </article>
            <ul className='pokemonItem-container'>
                {pokemonPaginated.map((pokemon) => (
                    <PokemonItem pokemonUrl={pokemon.url ? pokemon.url : pokemon.pokemon.url}
                        key={pokemon.url ? pokemon.url : pokemon.pokemon.url} />
                ))}
            </ul>
        </section>
    );
};

export default Pokedex;