import React, { useEffect } from 'react'
import useFetch from '../hooks/useFetch'
import { useParams } from 'react-router-dom'
import './styles/PokemonPage.css'

const PokemonPage = () => {

  const { id } = useParams()

  const url = `https://pokeapi.co/api/v2/pokemon/${id}`

  const [pokemon, getPokemon] = useFetch(url)

  useEffect(() => {
    getPokemon()
  }, [])

  return (
    <div className={`pokemonPage__container__start ${pokemon?.types[0].type.name}`}>
      <div className='pokemonPage__container'>
        <div className='pokemonPage__info__container'>
          <section className={`pokemonPage__container__img ${pokemon?.types[0].type.name}`}>
          <img className='pokemonPage__img' src={pokemon?.sprites.other["official-artwork"].front_default} alt="" />
        </section>
        <section className='pokemonPage__start'>
          <h2 className={`pokemonPage__container__info ${pokemon?.types[0].type.name}`}>{pokemon?.name}</h2>
          <ul className='pokemonPage__data'>
            <li className='pokemonPage__container__height'><span className='pokemonPage__height'>Height</span><span className='pokemonPage__span__height'>{pokemon?.height}</span></li>
            <li className='pokemonPage__container__weight'><span className='pokemonPage__weight'>Weight</span><span className='pokemonPage__span__weight'>{pokemon?.weight}</span></li>
          </ul>
          <hr className='pokemonPage__hr'/>
          <ul className='pokemonPage__info'>
            <li className='pokemonPage__container__type'>
              <span className={`pokemonPage__type ${pokemon?.types[0].type.name}`}>Type</span>
              {
                pokemon?.types.map(typeInfo => (
                  <span className='pokemonPage__span__type' key={typeInfo.type.url}>{typeInfo.type.name}</span>
                ))
              }
            </li>
            <li className='pokemonPage__container__ability'>
              <span className={`pokemonPage__ability ${pokemon?.types[0].type.name}`}>Ability</span>
              {
                pokemon?.abilities.map(abilityInfo => (
                  <span className='pokemonPage__span__ability' key={abilityInfo.ability.url}>{abilityInfo.ability.name}</span>
                ))
              }
            </li>
          </ul>
        </section>
        </div>
        <section className='pokemonPage__statistics'>
          <h2 className={`pokemonPage__title__stats ${pokemon?.types[0].type.name}`}>Stats</h2>
          <ul className='pokemonPage__container__stats'>
            <li className='pokemonPage__list'>
              {
                pokemon?.stats.map(statsName => (
                  <div className='pokemonPage__stats' key={statsName.stat.url}>
                    <div className='pokemonPage__stats__info'>
                    <span className='pokemonPage__stats__name'>{statsName.stat.name}</span>
                    <span className='pokemonPage__stats__stat'>{statsName.base_stat}/180</span>
                  </div>
                  <div className='pokemonPage__statistics__container'>
                  <progress className={`progress__bar__stats ${pokemon?.types[0].type.name}`} max='180' value={`${statsName.base_stat}`}></progress>
                  </div>
                  </div>
                ))
              }
            </li>
          </ul>
        </section>
      
        <section className='pokemonPage__start__movie'>
          <h2 className={`pokemonPage__title__movie ${pokemon?.types[0].type.name}`}>Movements</h2>
          <ul className='pokemon__container__movie'>
            {
            pokemon?.moves.map(movesInfo => (
              <li className='pokemon__list__movie' key={movesInfo.move.url}>
                <span className='pokemon__movie__span'> {movesInfo.move.name} </span></li>
            ))
          }
          </ul>
          
        </section>
        </div>
    </div>
  )
}

export default PokemonPage