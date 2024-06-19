const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const cors = require('cors')
const express = require('express')


const app = express()
app.use(express.json())
app.use(cors())

app.get('/kudosboards/:id', async(req, res) => {
    const { id  } = req.params
    const kudocards = await prisma.KudosBoard.findUnique(
        {
            where: {id: parseInt(id) },
        });
    res.status(200).json(kudocards)
})

app.get('/kudosboards', async(req, res) => {
    const filters = {}
    if(req.query.category){
        filters.category = req.query.category;}
    try{
        const kudocards = await prisma.KudosBoard.findMany({
        where: filters
    });
    res.status(200).json(kudocards)
     }
    catch(error){
        console.error(error)
        res.status(500).send('Failed to fetch events');
    }
})

app.post('/kudosboards' , async(req, res) => {
    const {imageUrl, title, category, author} = req.body;
    try{
        const response = await fetch(`https://api.giphy.com/v1/gifs/random?api_key=${process.env.GIPHY_API}`)
        const gifData = await response.json();
        const imageURL = gifData.data.images.downsized.url;

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

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})
