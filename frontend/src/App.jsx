import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './HomePage'
import KudosCardsPage from './KudosCardsPage'

function App(){
    return(
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />}/>
                <Route path='/kudosboards/:id' element={<KudosCardsPage />}/>
            </Routes>
        </Router>
        )
}
export default App
