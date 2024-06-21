const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const cors = require('cors')
const express = require('express')


const app = express()
app.use(express.json())
app.use(cors())

app.get('/kudosboards/:id', async(req, res) => {
    const { id  } = req.params
    console.log("getting id")
    const boardDetails = await prisma.KudosBoard.findUnique(
        {
            where: {id: parseInt(id) },
        });
        res.json(boardDetails)
})
 app.put('/card/:id/upvote', async (req, res) => {
    const { id } = req.params;
    try {
      const updatedCard = await prisma.KudoCard.update({
        where: { id: parseInt(id) },
        data: {
          upVote: {
            increment: 1
          }
        }
      });
      res.status(200).json(updatedCard);
    } catch (error) {
      console.error('Error upvoting card:', error);
      res.status(500).json({ error: 'Failed to upvote card' });
    }
  });
app.get('/kudosboards/:id/card', async(req, res) => {
    const {id} = req.params
    console.log("getting id/card")
    const card = await prisma.KudoCard.findMany(
        {
            where: {boardId: parseInt(id)}
        });
    res.json(card)
})

app.get('/card/:id', async(req, res) => {
    const {id} = req.params
    const card = await prisma.KudoCard.findUnique({
        where: {
            id: parseInt(id)
        }
    });
    res.json(card)
})

app.post('/kudosboards/:id/card', async(req, res) => {
    const {id} = req.params;
    const {title, description, imgUrl, author} = req.body;

    try{
        const newCard = await prisma.KudoCard.create({
            data: {
                title,
                description,
                imgUrl,
                author,
                board: {connect: {id: parseInt(id)}}
            },
        });
        res.status(201).json(newCard)
    }
    catch(error){
        console.error("Error fetching data:", error);
        res.status(500).json({error: 'Failed to create board with giphy image'})
    }
})

app.delete('/card/:id', async(req, res) => {
    try{
        const {id} = req.params
        const deleteCard = await prisma.KudoCard.delete({
            where: {id : parseInt(id)}}
        )
        res.status(200).json(deleteCard)
    }catch(error) {
        console.error('Error deleting board: ', error);
        res.status(500).json({error: 'Failed to delete board'})
    }
})

app.get('/kudosboards', async(req, res) => {
    const {category, search} = req.query;
    let queryOptions = {}
    if(category && search){
        queryOptions.where = {
            category: category,
            OR: [
                {title: {contains: search, mode: 'insensitive'}},
                {author: {contains: search, mode: 'insensitive'}},
                {imageUrl : {contains: search, mode: 'insensitive'}}
            ]
        }
    }
    else if(category){
        queryOptions.where = {category: category};
    }
    else if (search){
        queryOptions.where = {
            OR: [
                {title: {contains: search, mode: 'insensitive'}},
                {author: {contains: search, mode: 'insensitive'}},
                {imageUrl : {contains: search, mode: 'insensitive'}}
            ]
        };
    }
    try{
        const kudocards = await prisma.KudosBoard.findMany(queryOptions);
    res.status(200).json(kudocards)
     }
    catch(error){
        console.error(error)
        res.status(500).send('Failed to fetch kudos boards');
    }
})



app.post('/kudosboards' , async(req, res) => {
    const {imageUrl, title, category, author} = req.body;
    try{
        const response = await fetch(`https://api.giphy.com/v1/gifs/random?api_key=${process.env.GIPHY_API}`)
        const gifData = await response.json();
        const imageURL = gifData.data.images.original.url;

        const newKudosBoard = await prisma.KudosBoard.create({
            data: {
                imageUrl: imageURL,
                title,
                category,
                author
            }
    })
    res.status(201).json(newKudosBoard)
    }
catch(error) {
    console.error("Error fetching data:", error);
    res.status(500).json({error: 'Failed to create board with giphy image'})
}
});

app.delete('/kudosboards/:id', async(req, res) => {
    try{
    const {id} = req.params
    const deleteKudosBoard = await prisma.KudosBoard.delete({
        where: {id: parseInt(id)}}
    )
    res.status(200).json(deleteKudosBoard)
} catch (error) {
    console.error('Error deletig board: ', error);
    res.status(500).json({error: 'Failed to delete board'})
}
})

app.post('/card/:id/comment', async(req, res) => {
    const {id} = req.params;
    const {author, content} = req.body;
    try{
        const newComment = await prisma.Comment.create({
            data: {
                content,
                author,
                card : {connect: {id: parseInt(id)}}
            }
        });
        res.status(201).json(newComment)
    }
    catch(error) {
        console.log('Error creating comment: ', error);
        res.status.apply(500).json({error: 'Failed to create comment'})
    }
})

app.get('/card/:id/comment', async(req, res) => {
    const {id} = req.params;
    try{
        const comment = await prisma.Comment.findMany({
            where: {cardId : parseInt(id)},
            orderBy: {
                createdAt: 'desc'
            }
        })
    } catch(error) {
        console.log('Error getting comment: ', error);
        res.status.apply(500).json({error: 'Failed to fetch comment'})
    }
})

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})
