import React, { useState, useEffect } from 'react';

import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import colorTypes from '../utilis/colorType';

import colorBackground from '../utilis/colorBackground';

const PokemonItem = ({ pokemonUrl }) => {
    const navigate = useNavigate()
    const [pokemon, setPokemon] = useState([])

    useEffect(() => {
        axios.get(pokemonUrl)
            .then(res => setPokemon(res.data))
    }, [])

    const goToPokemonDetail = () => {
        navigate(`/pokedex/${pokemon.id}`)
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }


    const type = pokemon.types?.[0]?.type.name

    const type2 = pokemon.types?.[1]?.type.name

    // console.log(type)
    return (

        <li
            className={`pokemon-info-container  ${colorBackground(type)}`}
            onClick={goToPokemonDetail}>
            <img className='pokemon-image'

                src={pokemon.sprites?.other['official-artwork'].front_default !== null ? pokemon.sprites?.other.home.front_default : pokemon.sprites?.other.dream_world.front_default}
                alt="pokemon-image" />
            <h2 className='pokemon-name'>{pokemon.name}</h2>
            <div className='pokemon-info'>
                <h3>Type:</h3>
                <div className='span-container'>
                    <span className={`span-info ${colorTypes(type)}`}>{pokemon.types?.[0]?.type?.name}</span>
                    <span className={`span-info ${colorTypes(type2)}`}>{pokemon.types?.[1]?.type?.name}</span>
                </div>
                <div className='pokemon-stats'>
                    <h3>Hp: <span>{pokemon.stats?.[0].base_stat}</span></h3>
                    <h3>Atack: <span>{pokemon.stats?.[1].base_stat}</span></h3>
                </div>
                <div className='pokemon-stats pokemon-stats2'>
                    <h3>Defense: <span>{pokemon.stats?.[2].base_stat}</span>
                    </h3>
                    <h3>Speed: <span>{pokemon.stats?.[5].base_stat}</span>
                    </h3>
                </div>
            </div>
        </li >
    );
};

export default PokemonItem;