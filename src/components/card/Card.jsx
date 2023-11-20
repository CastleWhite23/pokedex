import "./card.css"

const Card = ( { name, link }) =>{
    return(
        <div className="card">
            <img src={ link } alt="img do pokemon" />
            <h1>{ name }</h1>       
        </div>
    )
};

export default Card;