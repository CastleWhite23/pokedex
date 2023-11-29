import Card from '../card/Card';
import LoadMore from '../loadMore/loadMore';
import Loading from '../loading/Loading';
import './pokedex.css'
import { useEffect, useState } from 'react';




const Pokedex = () => {
    const [pokemon, setPokemon] = useState([]);
    const [linksImages, setLinksImages] = useState([]);
    const [pokeType, setPokeType] = useState([]);
    const [pokeImg, setPokeImg] = useState([{}]);
    const [loading, setLoading] = useState(false);
    const [limit, setLimit] = useState(10);
    const [api, setApi] = useState("https://pokeapi.co/api/v2/pokemon/?offset=0&limit=15");
    const [loadMore, setLoadMore] = useState(false)
    //offset responsavel por quais pokemons vão aparecer
    //limit é responsavel pelo quantidade de pokemons


    //fazer com que ao clicar retorne um novo link da api com o limit alterado
    const handleClickLoadMore = (e) => {
        e.preventDefault();
        const newLimit = limit + 5;
        //setLoadMore(true)
        setLimit(newLimit)

    }

    useEffect(() => {
        const newApi = `https://pokeapi.co/api/v2/pokemon/?offset=0&limit=${limit}`;
        setApi(newApi);
    }, [limit])

    useEffect(() => {
        setLoadMore(false);
        setLoadMore(false);

        const getPokemonsData = async (api) => {
            try {
                const res = await fetch(api);
                const pokemonsData = await res.json();
                // console.log(pokemonsData);
                const pokemons = await pokemonsData.results;
                setPokemon(pokemons);

            } catch {
                console.log("erro na solicitação da api");
                return;
            }
        }

        getPokemonsData(api)

    }, [api])

    useEffect(() => {

        const getPokeDetails = async (name, link = null) => {
            try {
                const apiLinkImage = "https://pokeapi.co/api/v2/pokemon/" + name;
                const res = await fetch(apiLinkImage);
                const pokemonLinkImage = await res.json();

                //pegar por aqui o tipo do pokemon
                // console.log(await pokemonLinkImage.sprites.front_default)
                if (link) {
                    return await pokemonLinkImage.sprites.front_default;
                } else {
                    return await pokemonLinkImage.types[0].type.name;
                }

            } catch {
                console.log("erro na solicitação da api dos detalhes do pokemon")
                return null;
            }
        }

        const getArrayLinksImages = async () => {
            if (pokemon && Array.isArray(pokemon)) {
                const link = true;
                const newLinksImages = await Promise.all(
                    pokemon.map(async (item) => {
                        return getPokeDetails(item.name, link);
                    })
                );
                setLinksImages(newLinksImages)
            } else {
                console.log("O array pokemon está indefinido ou não é um array.");
            }
        };

        const getTypesPokemons = async () => {
            if (pokemon && Array.isArray(pokemon)) {

                const newPokemonTypes = await Promise.all(
                    pokemon.map(async (item) => {
                        return getPokeDetails(item.name);
                    })
                );

                setPokeType(newPokemonTypes)
            } else {
                console.log("O array pokemon está indefinido ou não é um array.");
            }
        }

        getArrayLinksImages();
        getTypesPokemons();

    }, [pokemon])

    useEffect(() => {

        const newPokeImg = pokemon.map((poke, i) => ({
            key: Math.floor(10000 * Math.random()),
            nome: poke.name,
            link: linksImages[i],
            type: pokeType[i]
        }));

        setPokeImg(newPokeImg);

    }, [pokeType])

    useEffect(() => {
        setTimeout(() => {
            setLoading(true);
        }, 1300)

        setLoadMore(true);
    }, [pokeImg])




    //pegar todos os nomes dos pokemons e realizar uma chamada a api com cada nome e retornar o sprite.front_default
    return (
        <div>
            <div className='pokedex'>
                <div className="pokedex-content">
                    {
                        !loading ?
                            <Loading />
                            :
                            pokeImg.map((pokeImgs) => (
                                <Card key={pokeImgs.key} name={pokeImgs.nome} link={pokeImgs.link} type={pokeImgs.type} />
                            ))
                    }

                </div>
                <div className="footer-pokedex">
                    {
                        !loadMore ?
                            <Loading />
                            : null
                    }
                </div>
            </div>
            {
                loading?
                    <LoadMore onClick={handleClickLoadMore} />
                    : null
            }
        </div>
    )
}

export default Pokedex;