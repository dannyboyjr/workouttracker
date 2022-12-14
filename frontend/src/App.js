import { BrowserRouter, Routes, Route} from 'react-router-dom'
//pages & components
import Home from './pages/Home'
import Navbar from './components/Navbar';
import Login from './pages/Login'
import Signup from './pages/Signup';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
    <Routes>
      <Route path="/" element={<Home/>} />
    </Routes>
    <Routes>
      <Route path="/login" element={<Login/>} />
    </Routes>
    <Routes>
      <Route path="/signup" element={<Signup/>} />
    </Routes>
        </div>
      
      </BrowserRouter>
    </div>
  );
}

export default App;
