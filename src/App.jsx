import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/effect-fade'
import './App.scss'

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from './components/header/Header'
import Home from './pages/Home'
import Meet from './components/pages/Meet';
import Floor from './components/pages/Floor';

function App() {
  return (
    <div className="App">
      <Header/> 
      <BrowserRouter>
      <Routes>
      <Route path="/VirtuaAi" index element={<Home/>}>
        </Route>
        <Route path="/VirtuaAi/meet" index element={ <Meet /> }>
        </Route>      
        <Route path="/VirtuaAi/sandbox" index element={ <Floor /> }>
        </Route>
      </Routes>
      </BrowserRouter>
      </div>
  )
}

export default App
