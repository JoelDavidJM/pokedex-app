import React, { useRef } from 'react'
import { setTrainerG } from '../store/states/trainer.state'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import './styles/HomePage.css'
import logoPokemon from '../../public/logo.png'
import pokeYellow from '../../public/pokemonYellow.png'
import pokemonBlue from '../../public/pokemonBlue.png'
import char from '../../public/charr.png'
import pokeWater from '../../public/pokeWater.png'
import pokeTop from '../../public/pokemon.png'

const HomePage = () => {

    const inputTrainer = useRef()

    const dispatch = useDispatch()

    const navigate = useNavigate()

    const handleSubmit = e => {
        e.preventDefault()
        dispatch(setTrainerG(inputTrainer.current.value.trim()))
        navigate('/pokedex')
    }

  return (
    <div className='homePage'>
      <div className='homePage__start'>
        <div className='homePage__container__container'>
        <div className='homePage__container__img'>
        <img className='homePage__img' src={logoPokemon} alt="" />
      </div>
        <div className='homePage__container__title'>
          <h2 className='homePage__title'>Hi trainer!</h2>
        <p className='homePage__p'>To start this app, give me your trainer name</p>
        <div>
          <form className='homePage__form' onSubmit={handleSubmit}>
            <input className='homePage__input' ref={inputTrainer} type="text" placeholder='Name of the trainer' />
            <button className='homePage__btn'>Cath them all</button>
        </form>
        </div>
          
        </div>
      </div>
      
        <section className='homePage__container__img'>
          <img className='homePage__img1' src={pokeYellow} alt="" />
          <img className='homePage__img2' src={pokemonBlue} alt="" />
          <img className='homePage__img3' src={char} alt="" />
          <img className='homePage__img4' src={pokeWater} alt="" />
          <img className='homePage__img5' src={pokeTop} alt="" />
        </section>
      </div>
    </div>
  )
}

export default HomePage