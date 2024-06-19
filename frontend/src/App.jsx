import { useState, useEffect } from 'react'
import Header from './Header'
import Banner from './Banner'
import Footer from './Footer'
import Modal from './Modal'
import KudoCards from './KudoCards'
import './App.css'

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
      setIsModalOpen(true);
      console.log
  }
  const handleCloseModal = () => {
      setIsModalOpen(false);
  }

  const [kudosboards, setKudosBoards] = useState([])

  useEffect(() => {
    fetchKudosBoard('');
  }, []);

  const fetchKudosBoard = (category) => {
    fetch(`${import.meta.env.VITE_BACKEND_ADDRESS}/kudosboards${category ? `?category=${encodeURIComponent(category)}` : ''}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      setKudosBoards(data);
      console.log(data)
    })
    .catch(error => {
      console.error('Error fetching photo:', error)
    })
  };

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
        imageUrl = {kudosboard.imageUrl}
        title = {kudosboard.title}
        category = {kudosboard.category}
        author = {kudosboard.author}
        onDelete={() => handleDeleteKudosBoard(kudosboard.id)}
        />
    )
  })

  return (
    <div>
      <Header/>
      <Banner openModal={handleOpenModal} onCategorySelect={fetchKudosBoard}/>
      {boards}
      {isModalOpen && <Modal closeModal={handleCloseModal} onCreate={handleCreateKudosBoard}/>}
      <Footer/>
    </div>
  )

}

export default App
