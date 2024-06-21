import './Comment.css';
import {useState, useEffect} from 'react';
function Comment({cardId, closeCard, onCreate}){
    const [content, setContent] = useState('')
    const [author, setAuthor] = useState('')
    const [comments, setComments] = useState([])

    useEffect(() => {
        fetchComments()
    }, [])

    const fetchComments = () => {
        fetch (`${import.meta.env.VITE_BACKEND_ADDRESS}/card/${cardId}/comment`)
        .then(response => response.json())
        .then(data => setComments(data))
        .catch(error => console.error("Error fetching comments ", error))
    }

    const handleSubmitButton = (e) => {
        e.preventDefault()
        const newComment = {
            content,
            author
        }
        onCreate(cardId, newComment)
        setContent('')
        setAuthor('')
        fetchComments();
    }

    return(
        <div className='modalOverlay'>
            <div className='modal'>
                <button className='close-button' onClick={closeCard}>&times;</button>
                <h2>Add a Comment</h2>
                <div className='modal-content'>
                    {comments.map(comment =>(
                        <div key={comment.id} className='comment'>
                            <p><strong>{comment.author}</strong>: {comment.content}</p>
                        </div>
                    ))}
                </div>
                <form className='comment-form'>
                    <div className='form-information'>
                        <label htmlFor='author'>Author: </label>
                        <input
                            type='text'
                            id='author'
                            name='author'
                            value={author}
                            onChange={(e) => setAuthor(e.target.value)}
                        />
                    </div>
                    <div className='form-information'>
                        <label htmlFor='content'>Comment: </label>
                        <textarea
                            type='content'
                            id='content'
                            name='content'
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                        ></textarea>
                    </div>
                    <button className='create-form' onClick={handleSubmitButton}>Add Comment</button>
                </form>
            </div>
        </div>
    )
}

export default Comment;
