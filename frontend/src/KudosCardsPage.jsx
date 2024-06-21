import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import CreateCard from './CreateCard';
import Card from './Card';
import Comment from './Comment';
function KudosCardsPage(){
    const [cardDetails, setCardDetails] = useState([])
    const [boardDetails, setBoardDetails] = useState([])
    const { id } = useParams();
    const navigate = useNavigate();


    useEffect(() => {
        fetch(`${import.meta.env.VITE_BACKEND_ADDRESS}/kudosboards/${id}`)
          .then(response => response.json())
          .then(data => setBoardDetails(data))
          .catch(error => console.error('Failed to fetch board details:', error));
          fetchCardDetails(id)
      }, [id]);
      console.log(boardDetails)

    const fetchCardDetails = () =>{
        fetch(`${import.meta.env.VITE_BACKEND_ADDRESS}/kudosboards/${id}/card`)
        .then(response => {
            return response.json()
        })
        .then(data => {
            setCardDetails(data)
        })
        .catch(error => console.error('Failed to fetch board details: ', error))
    }
    const handleUpVote = (cardId) => {
        fetch(`${import.meta.env.VITE_BACKEND_ADDRESS}/card/${cardId}/upvote`,
        {
            method: "PUT",
            headers:{
                "Content-Type": "application/json",
            },
        })
        .then(response => response.json())
        .then(updatedCard=> {
            setCardDetails(cardDetails.map(cardDetails => cardDetails.id === cardId ? updatedCard : cardDetails));
        })
        .catch(error => console.error('Error upvoting card: ', error));
    }

    const handleCreateCard = (newCard) => {
        fetch(`${import.meta.env.VITE_BACKEND_ADDRESS}/kudosboards/${id}/card`,
        {
            method: "POST",
            headers:{
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newCard)
        }
        )
        .then(response => {
            return response.json();
        })
        .then(data => {
            fetchCardDetails();
        })
        .catch(error => {
            console.error('Error fetching photo: ', error)
        })
        setIsModalOpen(false)
    }

    const handleDeleteCard = (id) => {
        fetch(`${import.meta.env.VITE_BACKEND_ADDRESS}/card/${id}`,
        {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            }
        })
        .then(response => {
            if (response.ok){
                setCardDetails(cardDetails.filter(cardDetail => cardDetail.id !== id))
            }else{
                console.error("Error deleting card")
            }
        })
        .then(data => {
            fetchCardDetails();
        })
        .catch(error => {
            console.error('Error fetching photo:', error);
        })
    }
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isCommentOpen, setIsCommentOpen] = useState(false);
    const [currentCardId, setCurrentCardId] = useState(null)
    const handleOpenCard = () => {
        setIsModalOpen(true);
    }
    const handleCloseCard = () => {
        setIsModalOpen(false);
    }

    const handleOpenComment = (cardId) => {
        setCurrentCardId(cardId)
        setIsCommentOpen(true)
    }

    const handleCloseComment = () => {
        setIsCommentOpen(false)
        setCurrentCardId(null)
    }

    const handleCreateComment = (cardId, newComment) => {
        fetch(`${import.meta.env.VITE_BACKEND_ADDRESS}/card/${cardId}/comment`, {
            method: "POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(newComment)
        })
        .then (response => {
            if(!response.ok) {
                throw new Error (`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            handleCloseComment();
        })
        .catch(error => console.error ('Error creating comment: ', error))
    }


    const cards = cardDetails.map(cardDetail => {
        return(
            <Card
            key = {cardDetail.id}
            id = {cardDetail.id}
            title = {cardDetail.title}
            description={cardDetail.description}
            imgUrl={cardDetail.imgUrl}
            author = {cardDetail.author}
            upVote = {cardDetail.upVote}
            boardId = {cardDetail.boardId}
            onDelete = {() => handleDeleteCard(cardDetail.id)}
            onUpVote = {handleUpVote}
            onComment = {() => handleOpenComment(cardDetail.id)}
            />
        )
    })

    const handleBackToHomePage = () => {
        navigate(-1)
    };


    return(
        <div>
            <Header/>
           <h1 className='title'>{boardDetails.title}</h1>
            <button onClick={handleBackToHomePage}>Go Back</button>
            <button onClick={handleOpenCard}>Create New Card</button>
            <div className='kudos-cards' style={{display: "flex", flexWrap: "wrap", justifyContent: "space-around"}}>
                {cards}
            </div>
            {isModalOpen && <CreateCard boardId = {id} closeCard={handleCloseCard} onCreate={handleCreateCard}/>}
            {isCommentOpen && <Comment cardId={currentCardId} closeCard={handleCloseComment} onCreate={handleCreateComment}/>}
            <Footer/>
        </div>
    )
}
export default KudosCardsPage
