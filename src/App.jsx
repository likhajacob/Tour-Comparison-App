import { useState } from 'react'
import TourList from './components/Gallery'
import './styles/styles.css'

function App() {
  const [tours, setTours] = useState([])

  // Function to remove a tour from the list
  const onRemove = (id) => {
    setTours((prevTours) => prevTours.filter((tour) => tour.id !== id))
  }

  return (
    <>
      <h1>Tour Explorer</h1>
      <TourList tours={tours} setTours={setTours} onRemove={onRemove} />
    </>
  )
}

export default App
