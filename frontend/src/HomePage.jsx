import { useState, useEffect } from 'react'
import Header from './Header'
import Banner from './Banner'
import Footer from './Footer'
import Modal from './Modal'
import KudoCards from './KudoCards'
import './HomePage.css'

function HomePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
      setIsModalOpen(true);
  }
  const handleCloseModal = () => {
      setIsModalOpen(false);
  }

  const [kudosboards, setKudosBoards] = useState([])

  const [category, setCategory] = useState('');
  const [searchText, setSearchText] = useState('');

  const handleCategorySelect = (category) => {
    setCategory(category)
    fetchKudosBoard(category, searchText)
  };

  const handleSearchChange = (search) => {
    setSearchText(search)
    fetchKudosBoard(category, search)
  }
  useEffect(()=>{
    fetch(`${import.meta.env.VITE_BACKEND_ADDRESS}/kudosboards`)
      .then(response => response.json())
      .then(data => setKudosBoards(data))
      .catch(error => console.error('Error fetching boards: ', error))
  }, [])
  const sortBoardsbyRecent = () => {
    const sortedBoards = [...kudosboards].sort((a, b) => b.id - a.id)
    setKudosBoards(sortedBoards);
  };

  const fetchKudosBoard = (category, searchText) => {
    const query = new URLSearchParams({
    ...(category && {category: category}),
    ...(searchText && {search: searchText})
    }).toString();
   fetch(`${import.meta.env.VITE_BACKEND_ADDRESS}/kudosboards?${query}`)
    .then(response => response.json())
    .then(data => setKudosBoards(data))
    .catch(error => console.error('Error fetching data: ', error))
  };
  useEffect(() => {
    fetchKudosBoard(category, searchText);
  }, [])

  const handleCreateKudosBoard = (newKudosBoard) => {
    fetch(`${import.meta.env.VITE_BACKEND_ADDRESS}/kudosboards`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newKudosBoard),
      }
    )
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      fetchKudosBoard();
    })
    .catch(error => {
      console.error('Error fetching photo:', error);
    });
  }


  const handleDeleteKudosBoard = (id) => {
    fetch(`${import.meta.env.VITE_BACKEND_ADDRESS}/kudosboards/${id}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
  .then(response => {
    if (response.ok) {
      setKudosBoards(kudosboards.filter(kudosboard => kudosboard.id !==id))
    }else{
      console.error("Error deleting board")
    }
  })
  .then(data => {
    fetchKudosBoard();
  })
  .catch(error => {
    console.error('Error fetching photo:', error);
  });
  }

  const boards = kudosboards.map(kudosboard => {
    return(
      <KudoCards
        key = {kudosboard.id}
        id = {kudosboard.id}
        imageUrl = {kudosboard.imageUrl}
        title = {kudosboard.title}
        category = {kudosboard.category}
        author = {kudosboard.author}
        onDelete={() => handleDeleteKudosBoard(kudosboard.id)}
        />
    )
  })

  return (
    <div className='homepage-body'>
      <Header/>
      <Banner openModal={handleOpenModal} onCategorySelect={handleCategorySelect} onSearchChange={handleSearchChange} searchText={searchText} sortBoards = {sortBoardsbyRecent}/>
      <div className='kudos-boards'>
        {boards}
      </div>

      {isModalOpen && <Modal closeModal={handleCloseModal} onCreate={handleCreateKudosBoard}/>}
      <Footer/>
    </div>
  )

}

export default HomePage
