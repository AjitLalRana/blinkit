import {useEffect} from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import {useSelector} from 'react-redux'
import api from '../config/axios.config'
import Products from './Products'

const Home = () => {
  const user = useSelector((state)=> state?.userReducer?.user)
  const product = useSelector((state) => state?.productReducer?.allProducts)
  console.log(product)
  return (
    <div className='w-screen  text-3xl pt-4 mt-30'>
      <Header />
      <div className='px-4 pb-4 text-[16px] sm:text-xl tracking-[0.15em] font-semibold text-[rgb(var(--text-secondary))] bg-[rgb(var(--background))]'>
        home
        {user?.name}
        <br />
        <Products />
      </div>
      <Footer />
    </div>

    
  )
}

export default Home
