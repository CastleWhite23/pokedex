import Card from '../card/Card';
import './pokedex.css'
import { useEffect, useState } from 'react';




const Pokedex = () => {
    const [pokemon, setPokemon] = useState([]);
    const [linksImages, setLinksImages] = useState([]);
    const [pokeImg, setPokeImg] = useState([{}]);

    useEffect(() => {
        const api = "https://pokeapi.co/api/v2/pokemon/?offset=20&limit=20";

        ///

        const getPokemonsData = async (api) => {
            try {
                const res = await fetch(api);
                const pokemonsData = await res.json()

                const pokemons = pokemonsData.results;
                //const pokemonImgLink = pokemons.Sprites.;

                setPokemon(pokemons);
            } catch {
                console.log("erro na solicitação da api")
                return;
            }

        }
        getPokemonsData(api);


    }, [])

    useEffect(() => {
        const getLinksImages = async () => {
            const newLinksImages = await Promise.all(
                pokemon.map(async (poke) => {
                    const apiLinkImage = "https://pokeapi.co/api/v2/pokemon/" + poke.name;
                    const res = await fetch(apiLinkImage);
                    const pokemonLinkImage = await res.json();
                    return pokemonLinkImage.sprites.front_default;
                })
            );

            setLinksImages(newLinksImages);

            if (pokemon && Array.isArray(pokemon)) {

                const newPokeImg = pokemon.map((poke, i) => ({
                    key: Math.floor(10000 * Math.random()),
                    nome: poke.name,
                    link: linksImages[i]
                }));

                setPokeImg(newPokeImg);

            } else {
                console.error("O array pokemon está indefinido ou não é um array.");
            }


        };

        getLinksImages();

    }, [pokemon]);




    //pegar todos os nomes dos pokemons e realizar uma chamada a api com cada nome e retornar o sprite.front_default
    return (
        <div className='pokedex'>

            {
               
                pokeImg.map((pokeImgs) => (
                    <Card key={pokeImgs.key} name={pokeImgs.nome} link={pokeImgs.link} />
                ))
            }
        </div>
    )
}

export default Pokedex;