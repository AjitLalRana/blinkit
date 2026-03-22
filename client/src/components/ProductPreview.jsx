import { useLocation, useNavigate } from 'react-router-dom';
import { FiX } from 'react-icons/fi';

const ProductPreview = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Retrieve the data from state
  const product = location.state?.product;

  if (!product) return null;

  return (
    <div className="fixed inset-0 z-[100] ...">
       {/* Use navigate(-1) to go back */}
       <button onClick={() => navigate(-1)}> <FiX /> </button>
       {/* ... rest of your UI */}
       hello
    </div>
  );
};

export default ProductPreview