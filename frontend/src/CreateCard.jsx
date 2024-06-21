import './CreateCard.css'
import {useState} from 'react'
function CreateCard({boardId, closeCard, onCreate}){
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [author, setAuthor] = useState('')
    const [searchText, setSearchText] = useState('')
    const [gifs, setGIFS] = useState([])
    const [selectedGIF, setSelectedGIF] = useState('')
    const handleGifSearch = (searchText) => {
    fetch (`https://api.giphy.com/v1/gifs/search?api_key=${import.meta.env.VITE_GIPHY_API}&q=${searchText}&limit=8`)
        .then(response => response.json())
        .then(data => setGIFS(data.data))
        .catch(error => console.error(`Failed to fetch GIFS: `, error))
};
    const handleSelectedGif = (gifUrl) => {
        setSelectedGIF(gifUrl);
        setGIFS([]);
    };
    const handleSubmitButton = (e) =>{
        e.preventDefault();
        const newCard = {
            title: title,
            description: description,
            imgUrl: selectedGIF,
            author: author,
            upVote : 0,
            boardId: parseInt(boardId)
        }
        onCreate(newCard);
    };
    return(
        <div className="modal-overlay">
            <div className="modal-container">
            <button className="closeButton" onClick={closeCard}>&times;</button>
            <h1>Create a New Card</h1>
                <form className='model-contents' onSubmit={handleSubmitButton}>
                    <div>
                        <label htmlFor='title'>Title: </label>
                        <input type="text"
                        name='title'
                        id='title'
                        value={title}
                        placeholder='Enter a title...'
                        onChange={(e) => setTitle(e.target.value)}/>
                    </div>
                    <div className='description'>
                        <label htmlFor='description'>Description: </label>
                        <input
                        id='description'
                        name='description'
                        value={description}
                        placeholder="Enter a card description..."
                        onChange={(e) => setDescription(e.target.value)}/>
                    </div>
                    <div>
                        <input placeholder='Search for GIFS...'
                        type='text'
                        className='search-gif'
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}/>
                    </div>
                    <button onClick={() => handleGifSearch(searchText)} type='button'>Search For GIF</button>
                    <div>
                    {gifs.map(gif => (
                        <img
                        key = {gif.id}
                        src={gif.images.fixed_height_small.url}
                        onClick={() => handleSelectedGif(gif.images.downsized.url)}/>
                    ))}
                    </div>
                    <input
                    type='text'
                    placeholder='GIF URL'
                    value={selectedGIF}
                    onChange={(e) => setSelectedGIF(e.target.value)}/>
                    <div>
                        <label htmlFor='author'>Author: </label>
                        <input
                        type="text"
                        value={author}
                        name='author'
                        id='author'
                        placeholder='Enter author...'
                        onChange={(e) => setAuthor(e.target.value)}/>
                    </div>
                    <button className="submitButton">Submit</button>
                </form>
            </div>
        </div>
    )
}
export default CreateCard;
