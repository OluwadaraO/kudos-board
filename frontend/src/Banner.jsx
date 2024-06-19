import './Banner.css'
import React from 'react';
function Banner({openModal, onCategorySelect}) {
    return(
        <div className='banner'>
        <input type="text" placeholder='Search for a kudos board...' className='search-bar'/>
        <div className='buttons'>
            <button className='redirect-button' onClick={() => onCategorySelect('')}>All</button>
            <button className='redirect-button'>Recent</button>
            <button className='redirect-button' onClick={() => onCategorySelect('Celebration')}>Celebration</button>
            <button className='redirect-button' onClick={() => onCategorySelect('Thank You')}>Thank You</button>
            <button className='redirect-button' onClick={() => onCategorySelect('Inspiration')}>Inspiration</button>
        </div>
        <div>
            <button className='create-new-button' onClick={openModal}>Create a New Board</button>
        </div>
    </div>
    )
}
export default Banner;
