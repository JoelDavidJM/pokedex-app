import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import useFetch from '../hooks/useFetch';
import PokeCard from '../components/PokedexPage/PokeCard';
import SelectType from '../components/PokedexPage/SelectType';
import pokemonImg from '../../public/homePokemon.jpg';
import './styles/PokedexPage.css';
import Pagination from '../components/PokedexPage/Pagination';

const PokedexPage = () => {
  const [inputValue, setInputValue] = useState('');
  const [typeSelect, setTypeSelect] = useState('allPokemons');
  const trainerName = useSelector(states => states.trainer);
  const [currentSuperPageIndex, setCurrentSuperPageIndex] = useState(0);

  const url = 'https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0';
  const [pokemons, getPokemons, getTypePokemon] = useFetch(url);

  const [pokemonForPage, setPokemonForPage] = useState(12);
  const [currentPage, setCurrentPage] = useState(1);

  const lastIndex = currentPage * pokemonForPage;
  const firstIndex = lastIndex - pokemonForPage;

  useEffect(() => {
    if (typeSelect === 'allPokemons') {
      getPokemons();
    } else {
      getTypePokemon(typeSelect);
    }
    setCurrentPage(1)
    setCurrentSuperPageIndex(0)
  }, [typeSelect]);

  const inputName = useRef();

  const handleSearch = e => {
    e.preventDefault();
    setInputValue(inputName.current.value.trim().toLowerCase());
    setCurrentPage(1)
    setCurrentSuperPageIndex(0)
  };
  // FILTER 
  const cbFilter = (pokeInfo) => (
    pokeInfo.name.toLowerCase().includes(inputValue)
  );
  //FILTER FOR THE MAP
  const filteredPokemons = pokemons?.results.filter(cbFilter);

  return (
    <div className='pokedexPage__start'>
      <img className='pokedexPage__img' src={pokemonImg} alt="" />
      <h2 className='pokedexPage__title'>Hi <span>{trainerName}</span>, here you can find your favorite pokemon</h2>
      <div className='pokedexPage__container__form'>
        <form className='pokedexPage__form' onSubmit={handleSearch}>
          <input className='pokedexPage__input' ref={inputName} type="text" list="pokemon-names" />
          <datalist id='pokemon-names'>
            {
              filteredPokemons?.map(pokeInfo => (
                <option key={pokeInfo.name} value={pokeInfo.name}>{pokeInfo.name}</option>
              ))
            }
          </datalist>
          <button className='pokedexPage__btn'>Search</button>
        </form>
        <SelectType
          setTypeSelect={setTypeSelect}
        />
      </div>
      
      <div className='pokeCard__container'>
        {
          filteredPokemons?.slice(firstIndex, lastIndex).map(pokeInfo => (
            <PokeCard
              key={pokeInfo.url}
              url={pokeInfo.url}
            />
          ))
        }
      </div>
      {
        filteredPokemons && filteredPokemons.length > 12 && (
          <div className="pagination">
            <Pagination
              pokemonForPage={pokemonForPage}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              pokemons={filteredPokemons}
              currentSuperPageIndex={currentSuperPageIndex}
              setCurrentSuperPageIndex={setCurrentSuperPageIndex}
            />
          </div>
        )
      }
    </div>
  );
};

export default PokedexPage;
