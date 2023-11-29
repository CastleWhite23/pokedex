import "./loadMore.css"

const LoadMore = ({ onClick }) =>{
    return(
        <div className="loadMore">
            <button onClick={onClick}>Carregar Mais</button>
        </div>
    )
};

export default LoadMore;