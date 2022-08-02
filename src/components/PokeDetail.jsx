import axios from 'axios';
import React, { useState, useEffect } from 'react';
import pokemonlogo from '../assets/img/pokemon.png'
import { useNavigate, useParams } from 'react-router-dom';
import colorBackground from '../utilis/colorBackground';
import colorTypes from '../utilis/colorType';





const PokeDetail = () => {

    const navigate = useNavigate('')
    const [pokeInfo, setPokeInfo] = useState({})


    const { id } = useParams()


    useEffect(() => {
        axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
            .then(res => setPokeInfo(res.data))
    }, [])




    console.log(pokeInfo)

    const type = pokeInfo.types?.[0]?.type.name
    const type2 = pokeInfo.types?.[1]?.type.name





    return (
        <section className='pokeDetail-container' >
            <figure className='pokeDetail-image-background'>
                <img className='pokeDetail-background' src={pokemonlogo} alt="" />
                <button className='button-back' onClick={() => navigate(-1)}><i className="fa-solid fa-circle-arrow-left"></i></button>
            </figure>

            <article
                className={`pokeDetail-info-container ${colorBackground(type)}
                `}>

                <figure className='pokeDetail-img-container'>
                    <img className='pokeDetail-img' src={pokeInfo.sprites?.other['official-artwork'].front_default} alt="" />
                </figure>

                <div className='pokeDetail-info'>
                    <h2 className='pokeDetail-h2'>{pokeInfo.name}</h2>
                    <article className='first-info'>


                        <h3>Weight: {pokeInfo.weight} hectograms</h3>

                        <h3>Height: {pokeInfo.height} decimetres</h3>

                    </article>

                    <article className='second-info'>
                        <div className='type-container'>
                            <h2>Type</h2>
                            <div className='type-span'>
                                <span className={`span-info ${colorTypes(type)}`}>{pokeInfo.types?.[0]?.type?.name}</span>
                                <span className={`span-info ${colorTypes(type2)}`}>{pokeInfo.types?.[1]?.type?.name}</span>
                            </div>
                        </div>

                        <div className='abilities-container'>
                            <h2>Abilities</h2>
                            <div className='abilities-span'>
                                <span className='span-info'>{pokeInfo.abilities?.[0]?.ability?.name}</span>
                                <span className='span-info'>{pokeInfo.abilities?.[1]?.ability?.name}</span>
                            </div>
                        </div>
                    </article>

                    <article className='move-container'>
                        <h2>Moves</h2>
                        <div className='move'>
                            {pokeInfo.moves?.map(move => (
                                <p className='move-p' key={move.move.name}>
                                    {move.move.name + ' '}
                                </p>))}
                        </div>
                    </article>
                </div>
            </article>
        </section >
    );
};

export default PokeDetail;