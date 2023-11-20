import "./card.css"

const Card = ( { name }) =>{
    return(
        <div className="card">
            <img src="" alt="img do pokemon" />
            <h1>{ name }</h1>       
        </div>
    )
};

export default Card;