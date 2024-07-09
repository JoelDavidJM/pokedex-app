import React, { useEffect, useRef } from 'react'
import useFetch from '../../hooks/useFetch'
import './styles/SelectType.css'

const SelectType = ({setTypeSelect}) => {

    const url = `https://pokeapi.co/api/v2/type`

    const [types, getTypes] = useFetch(url)

    useEffect(() => {
        getTypes()
    },[])

    const typeRef = useRef()

    const handleChange = e => {
        setTypeSelect(typeRef.current.value)
    }

  return (
    <select className='selectType__container' ref={typeRef} onChange={handleChange} >
        <option className='selectType__all' value='allPokemons'>All pokemon</option>
            {
                types?.results.map(type => (
                    <option className='selectType__all' key={type.url} value={type.url}>
                        {type.name}
                    </option>
                ))
            }
    </select>
  )
}

export default SelectType