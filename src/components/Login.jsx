import React, { useState } from 'react';
import { changeUser } from '../store/slices/user.slice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import pokemonImg from '../assets/img/pokemon.png'
import pokebola from '../assets/img/pokebola.png'

const Login = () => {

    const navigate = useNavigate()

    const dispatch = useDispatch()
    const [userName, setUserName] = useState('')

    const valueName = (e) => {
        e.preventDefault
        // alert(userName)
        dispatch(changeUser(userName))
        navigate('/pokedex')
    }

    return (
        <div className='container'>
            {/* <figure className='pokemon-img-figure'> */}
            <img className='pokemon-background' src={pokemonImg} alt="pokemonImage" />
            <section className='container-form'>
                <form className='form' onSubmit={valueName}>
                    <h1 className='h1-form'><span>Hi trainer let's start, </span> Write your name below</h1>
                    <div className='input-container'>
                        <input required=' ' className='input-form' type="text" placeholder='write your name here' value={userName} onChange={(e) => setUserName(e.target.value.trim())} />
                        <button className='button-form'><img src={pokebola} alt="" /></button>
                    </div>
                </form>
            </section>
        </div>
    );
};

export default Login;