import './Modal.css'
import { useState } from 'react';
function Modal({closeModal, onCreate}) {
    const [title, setTitle] = useState('')
    const [category, setCategory] = useState('')
    const [author, setAuthor] = useState('')

    const handleSubmitButton = (e) => {
        e.preventDefault();
        const newKudosBoard = {
            title,
            category,
            author,
        }
        onCreate(newKudosBoard)
        closeModal()
    }
    return(
        <>
        <div className="modal-overlay">
            <div className="modal-container">
                <div className='modal-content'>
                    <button className="closeButton" onClick={closeModal}>&times;</button>
                    <h1 className='create-a-new-board'>Create a New Board</h1>
                        <form className='model-contents' onSubmit={handleSubmitButton}>
                            <div>
                                <label htmlFor='title'>Title: </label>
                                <input type="text" name='title' id='title' value={title}
                                onChange={(e) => setTitle(e.target.value)}/>
                            </div>
                            <div className='category'>
                                <label htmlFor='category'>Category: </label>
                                <select id='category' name='category' value={category}
                                onChange={(e) => setCategory(e.target.value)}>
                                    <option value="">Select a category</option>
                                    <option value="Celebration">Celebration</option>
                                    <option value="Thank You">Thank You</option>
                                    <option value="Inspiration">Inspiration</option>
                                </select>
                            </div>
                            <div>
                                <label htmlFor='author'>Author: </label>
                                <input type="text" name='author' id='author' value={author}
                                onChange={(e) => setAuthor(e.target.value)}/>
                            </div>
                            <button className="submitButton" >Submit</button>
                        </form>
                </div>
            </div>
        </div>
        </>
    )
}
export default Modal;
