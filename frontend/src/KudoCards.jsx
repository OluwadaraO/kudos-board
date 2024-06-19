import {BrowserRouter, Link} from 'react-router-dom'
import './KudoCards.css';
function KudoCards({imageUrl, title, category, author, onDelete, id}) {
  return (
    <>
    <div className='kudos-card'>
        <img src={imageUrl}/>
        <h3>{title}</h3>
        <p>{category}</p>
        <p>{author}</p>
        <Link to={`/kudosboards/${id}`}>View Board</Link>
        <button onClick={onDelete}>Delete Board</button>
    </div>
    </>
  )}
export default KudoCards;
