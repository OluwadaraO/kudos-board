import './Card.css';
function Card({title, description, imgUrl, author, id, onDelete, upVote, onUpVote, onComment}){
    return(
        <div className='kudos-card'>
            <div id={id}>
                <img src={imgUrl} className='image'/>
                <h3>{title}</h3>
                <p>{description}</p>
                <p>{author}</p>
                <button onClick={() => onUpVote(id)}>UpVote: {upVote}</button>
                <button onClick={onDelete}>Delete</button>
                <button onClick={onComment}>Add Comment</button>
            </div>
        </div>
    )
}
export default Card;
