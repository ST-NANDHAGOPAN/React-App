import  React from 'react'
import {useGetPokemonByNameQuery,useGetAllPokemonByNameQuery,useGetPokemonImageByNameQuery } from '../Reducers/PokemonQuery'

 function Pokemon() {
  // Using a query hook automatically fetches data and returns query values
  const { data: speciesData, } = useGetAllPokemonByNameQuery();
  const { data, error, isLoading } = useGetPokemonByNameQuery('pikachu')

  return (

    <div className='body2'>
      <div className=" container">
    {error ? (
      <>Oh no, there was an error</>
    ) : isLoading ? (
      <div className='mt-5 spinner'></div>
    ) : data ? (
      <>
        <div className='text-center'><br />
          <h3 className=" text-uppercase ">{data.species.name}</h3>
          <img src={data.sprites.front_shiny} alt={data.species.name} />
        </div>
        <div className="row mb-5">
          {speciesData?.results.map((species) => (
            <div key={species.name} className="col-3                                                                                                                                                                                                 border border-3 text-center">
              <PokemonSpecies name={species.name} />
            </div>
          ))}
        </div>
      </>
    ) : null}
  </div>
    </div>
  )
}
function PokemonSpecies({ name }) {
  const { data: imageData, error: imageError, isLoading: imageLoading } = useGetPokemonImageByNameQuery(name);

  return (
    <div className="pokemon-species">
      {imageError ? (
        <p>Error loading image</p>
      ) : imageLoading ? (
        <p>Loading image...</p>
      ) : imageData ? (
        <>
          <span className='text-uppercase fw-bold'>{name}</span>
          <img src={imageData.sprites.front_default} alt={name} />
        </>
      ) : null}
    </div>
  );
}
export default Pokemon;