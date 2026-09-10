import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { ShopContext } from '../context/ShopContextObject';
import { assets } from '../assets/assets'
import RelatedProducts from '../components/RelatedProducts';
import { toast } from 'react-toastify';

const StarRating = ({ rating }) => {
  return (
    <div className='flex gap-0.5'>
      {[1, 2, 3, 4, 5].map((star) => (
        <img
          key={star}
          src={star <= rating ? assets.star_icon : assets.star_dull_icon}
          alt=""
          className="w-3.5"
        />
      ))}
    </div>
  );
};

const Product = () => {

  const { productId } = useParams();
  const { products, currency, addToCart, token, navigate } = useContext(ShopContext);
  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState('');
  const [size, setSize] = useState('');
  const [activeTab, setActiveTab] = useState('description');

  const fetchProductData = async () => {
    const product = products.find((item) => item._id === productId);
    if (product) {
      setProductData(product);
      setImage(product.image[0]);
    }
  }

  useEffect(() => {
    if (!token) {
      navigate('/login');
      toast.error('Please login to view product details');
    }
    fetchProductData();
    window.scrollTo(0, 0);
    setActiveTab('description');
  }, [productId, products, token])

  // Calculate average rating from reviews
  const avgRating = productData && productData.reviews && productData.reviews.length > 0
    ? (productData.reviews.reduce((sum, r) => sum + r.rating, 0) / productData.reviews.length).toFixed(1)
    : '4.0';

  const reviewCount = productData && productData.reviews ? productData.reviews.length : 0;

  return productData ? (
    <div className='border-t-2 border-gray-200 pt-10 transition-opacity ease-in duration-500 opacity-100'>
      {/* ----------- Product data ----------- */}
      <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row'>

        {/* ------- Product Images ------- */}
        <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
          <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full'>
            {
              productData.image.map((item, index) => (
                <img onClick={() => setImage(item)} src={item} key={index} className='w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer' />
              ))
            }
          </div>
          <div className='w-full sm:w-[80%]'>
            <img className='w-full h-auto' src={image} alt="" />
          </div>
        </div>

        {/* ------ Product Info --------- */}
        <div className='flex-1'>
          <h1 className='font-medium text-2xl mt-2'>{productData.name}</h1>
          <div className='flex items-center gap-2 mt-2'>
            <StarRating rating={Math.round(parseFloat(avgRating))} />
            <p className='text-gray-500 text-sm'>({avgRating}) · {reviewCount} reviews</p>
          </div>
          <p className='mt-5 text-3xl font-medium'>{currency}{productData.price}</p>
          <p className='mt-5 text-gray-500 md:w-4/5'>{productData.description}</p>
          <div className='flex flex-col gap-4 my-8'>
            <p>Select Size</p>
            <div className="flex gap-2">
              {productData.sizes.map((item, index) => (
                <button onClick={() => setSize(item)} key={index} className={`border py-2 px-4 bg-gray-100 ${item === size ? 'border-orange-500' : ''}`}>{item}</button>
              ))}
            </div>
          </div>
          <button onClick={()=>addToCart(productData._id, size)} className='bg-black text-white px-8 py-3 text-sm active:bg-gray-700' >ADD TO CART</button>
          <hr className='mt-8 sm:w-[4/5]' />
          <div className='text-sm text-gray-500 mt-5 flex flex-col gap-1'>
            <p>100% Original Product.</p>
            <p>Cash on Delivery is available on this product.</p>
            <p>Easy return and exchange policy within 7 days.</p>
          </div>
        </div>
      </div>

      {/* ---------- Description & Review Section ----------- */}
      <div className='mt-20'>
        {/* Tabs */}
        <div className='flex border-b border-gray-200'>
          <button
            onClick={() => setActiveTab('description')}
            className={`px-6 py-3 text-sm font-medium transition-all duration-200 border-b-2 -mb-px ${
              activeTab === 'description'
                ? 'border-black text-black'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Description
          </button>
          <button
            onClick={() => setActiveTab('reviews')}
            className={`px-6 py-3 text-sm font-medium transition-all duration-200 border-b-2 -mb-px ${
              activeTab === 'reviews'
                ? 'border-black text-black'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Reviews ({reviewCount})
          </button>
        </div>

        {/* Description Tab */}
        {activeTab === 'description' && (
          <div className="flex flex-col gap-4 border border-t-0 px-6 py-6 text-sm text-gray-700">
            <p>{productData.description}</p>
            <p>This premium {productData.category} {productData.subCategory} is crafted with high-quality materials to ensure long-lasting comfort and style. Perfect for various occasions, it features a modern design that captures the essence of the Anmol Studio brand. Each piece is meticulously checked for quality to provide you with the best experience possible.</p>
          </div>
        )}

        {/* Reviews Tab */}
        {activeTab === 'reviews' && (
          <div className="border border-t-0 px-6 py-6 bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
            {productData.reviews && productData.reviews.length > 0 ? (
              <div className='flex flex-col gap-6'>
                {productData.reviews.map((review, index) => (
                  <div key={index} className='border border-gray-100 rounded-xl p-5 bg-white/60 shadow-md hover:shadow-lg transition-shadow duration-300'>
                    <div className='flex items-center justify-between mb-2'>
                      <div className='flex items-center gap-3'>
                        <div className='w-9 h-9 rounded-full bg-gray-800 flex items-center justify-center text-white text-sm font-bold flex-shrink-0'>
                          {review.username.charAt(0)}
                        </div>
                        <div>
                          <p className='font-medium text-sm text-gray-800'>{review.username}</p>
                          <p className='text-xs text-gray-400'>{review.location} · {review.date}</p>
                        </div>
                      </div>
                      <div className='flex items-center gap-2'>
                        <StarRating rating={review.rating} />
                        <span className='text-xs text-gray-500 font-medium'>{review.rating}/5</span>
                      </div>
                    </div>
                    <p className='text-sm text-gray-600 leading-relaxed mt-2'>{review.comment}</p>
                    <div className='mt-3'>
                      <span className='text-xs bg-green-50 text-green-700 border border-green-200 px-2 py-0.5 rounded-full'>✓ Verified Purchase</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className='text-gray-500 text-sm py-4'>No reviews yet. Be the first to review this product!</p>
            )}
          </div>
        )}
      </div>

      {/* ---------- display related products ---------- */}
      <RelatedProducts category={productData.category} subCategory={productData.subCategory} />

    </div>
  ) : <div className='opacity-0'></div>
}

export default Product
