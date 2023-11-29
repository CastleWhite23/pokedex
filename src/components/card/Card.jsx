import "./card.css"

const Card = ( { name, link, type }) =>{
    return(
        <div className="card"
            style={{
                backgroundColor:
                type == "water" ? "#0793ac" 
                    : type == "poison" ? "#af3cfc"
                    : type == "fire" ? "orange" 
                    : type == "electric" ? "#afd30f" 
                    : type == "ground" ? "#5e3434" 
                    : type == "fairy" ? "#dc84e7" 
                    : type == "psychic" ? "#ac9307" 
                    : type == "dragon" ? "#ac0707" 
                    : type == "steel" ? "#414141" 
                    : type == "ghost" ? "#476d53" 
                    : type == "fighting" ? "#4e476d" 
                    : type == "flying" ? "#6d475d" 
                    : type == "grass" ? "#015a06" 
                    : type == "bug" ? "#29c75e" 
                    : type == "normal" ? "#808080" 
                    : "#fff" 
                   
            }}
        >
            <img src={ link } alt="img do pokemon" />
            <h1>{ name }</h1>       
        </div>
    )
};

export default Card;