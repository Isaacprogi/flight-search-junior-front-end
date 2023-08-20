import Flight from './pages/Flight'
import {Routes,Route} from 'react-router-dom'


const App = () => {
  return (
    <div className='w-full h-[100vh] bg-gray-900 overflow-auto'>
      <div className="w-full max-w-[1000px]  mx-auto   h-full">
        <Routes>
           <Route path="/" element={<Flight/>}/>
        </Routes>
      </div>
    </div>
  )
}

export default App