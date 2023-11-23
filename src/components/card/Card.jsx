import "./card.css"

const Card = ( { name, link, type }) =>{
    return(
        <div className="card"
            style={{
                backgroundColor:
                    type == "normal" ? "gray" 
                    : type == "poison" ? "purple"
                    : type == "fire" ? "orange" 
                    : type == "electric" ? "yellow" 
                    : type == "ground" ? "brown" 
                    : type == "fairy" ? "pink" 
                    : type == "water" ? "blue" : ""
            }}
        >
            <img src={ link } alt="img do pokemon" />
            <h1>{ name }</h1>       
        </div>
    )
};

export default Card;