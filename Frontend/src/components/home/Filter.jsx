import React,{useState} from 'react'
import FilterModal from './FilterModal'

const Filter = () => {
    const[isModelOpen, setIsModelOpen] = useState(false);
    const handleShowAllPhotos =() =>{
        setIsModelOpen(true)
    }
    const handleCloseModel =()=>{
        setIsModelOpen(false)
    }
  return (
    <>
      <span className='material-symbols-outlined filter'
      onClick={handleShowAllPhotos}>
        tune
      </span>
      {isModelOpen && <FilterModal onClose={handleCloseModel}/>}
    </>
  )
}

export default Filter
