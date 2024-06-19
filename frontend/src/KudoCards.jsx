import './KudoCards.css';
function KudoCards({imageUrl, title, category, author, onDelete}) {
  return (
    <>
    <div className='kudos-card'>
        <img src={imageUrl}/>
        <h3>{title}</h3>
        <p>{category}</p>
        <p>{author}</p>
        <button>View Board</button>
        <button onClick={onDelete}>Delete Board</button>
    </div>
    </>
  )
}
export default KudoCards;
