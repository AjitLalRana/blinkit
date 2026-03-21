import {useEffect} from 'react'
import Header from '../components/Header'
import {useSelector} from 'react-redux'
import api from '../config/axios.config'

const Home = () => {
  const user = useSelector((state)=> state?.userReducer?.user)
  return (
    <div className='w-screen min-h-screen text-3xl py-4 mt-45'>
      <Header />
      <div className='px-4 text-[16px] sm:text-xl tracking-[0.15em] font-semibold text-[rgb(var(--text-secondary))] bg-[rgb(var(--background))]'>
        home
        {user?.name}
        
      </div>
    </div>

    
  )
}

export default Home
