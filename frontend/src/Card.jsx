import './Card.css';
function Card({title, description, imgUrl, author, id, onDelete}){
    return(
        <>
        <div id={id}>
            <img src={imgUrl}/>
            <h3>{title}</h3>
            <p>{description}</p>
            <p>{author}</p>
            <button>UpVote</button>
            <button onClick={onDelete}>Delete</button>
        </div>
        </>
    )
}
export default Card;
