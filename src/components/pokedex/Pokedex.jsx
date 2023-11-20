import Card from '../card/Card';
import Loading from '../loading/Loading';


import './pokedex.css'
import { useEffect, useState } from 'react';




const Pokedex = () => {
    const [pokemon, setPokemon] = useState([]);
    const [linksImages, setLinksImages] = useState([]);
    const [pokeImg, setPokeImg] = useState([{}]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(false);
        const api = "https://pokeapi.co/api/v2/pokemon/?offset=20&limit=20";

        ///

        const getPokemonsData = async (api) => {
            try {
                const res = await fetch(api);
                const pokemonsData = await res.json()

                const pokemons = await pokemonsData.results;
                setPokemon(pokemons);

            } catch {
                console.log("erro na solicitação da api")
                return;
            }
        }

        getPokemonsData(api)


    }, [])

    useEffect(() => {

        const getLinkImage = async (name) => {
            try {
                const apiLinkImage = "https://pokeapi.co/api/v2/pokemon/" + name;
                const res = await fetch(apiLinkImage);
                const pokemonLinkImage = await res.json();

                // console.log(await pokemonLinkImage.sprites.front_default)
                return await pokemonLinkImage.sprites.front_default;

            } catch {
                console.log("erro na solicitação da api das img")
                return null;
            }
        }


        const getArrayLinksImages = async () => {
            if (pokemon && Array.isArray(pokemon)) {
                const newLinksImages = await Promise.all(
                    pokemon.map(async (item) => {
                        return getLinkImage(item.name);
                    })
                );

                setLinksImages(newLinksImages)

            } else {
                console.log("O array pokemon está indefinido ou não é um array.");
            }
        };

        getArrayLinksImages()


    }, [pokemon])


    useEffect(() => {

        const newPokeImg = pokemon.map((poke, i) => ({
            key: Math.floor(10000 * Math.random()),
            nome: poke.name,
            link: linksImages[i]
        }));

        setPokeImg(newPokeImg);
    }, [linksImages])


    useEffect(()=>{
        setTimeout(() => {
            setLoading(true);
        }, 1500)
         
    }, [pokeImg])




    //pegar todos os nomes dos pokemons e realizar uma chamada a api com cada nome e retornar o sprite.front_default
    return (
        <div className='pokedex'>
            {
                !loading ?
                    <Loading />
                    :
                    pokeImg.map((pokeImgs) => (
                        <Card key={pokeImgs.key} name={pokeImgs.nome} link={pokeImgs.link} />
                    ))
            }
        </div>
    )
}

export default Pokedex;