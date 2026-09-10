import React, { useState, useEffect } from 'react'
import { backendUrl, currency } from '../App'
import axios from 'axios'
import { toast } from 'react-toastify'

const List = ({ token }) => {

  const [list, setList] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);

  const fetchList = async () => {
    try {
      const response = await axios.get(backendUrl + '/api/product/list')
      if (response.data.success) {
        setList(Array.isArray(response.data.products) ? response.data.products : [])
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  const removeProduct = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    try {
      const response = await axios.post(backendUrl + '/api/product/remove', { id }, { headers: { token } })
      if (response.data.success) {
        toast.success(response.data.message)
        await fetchList();
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  const handleUpdateProduct = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(backendUrl + '/api/product/update', {
        id: editingProduct._id,
        name: editingProduct.name,
        price: editingProduct.price,
        category: editingProduct.category,
        subCategory: editingProduct.subCategory,
        bestseller: editingProduct.bestSeller
      }, { headers: { token } });

      if (response.data.success) {
        toast.success(response.data.message);
        setEditingProduct(null);
        await fetchList();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchList()
  }, [])

  return (
    <>
      <p className='mb-4 font-semibold text-lg text-gray-700'>All Products Catalog</p>
      <div className='flex flex-col gap-2'>

        {/* -------------- List Table Header ------------------- */}
        <div className='hidden md:grid grid-cols-[1fr_3fr_1.5fr_1fr_1.5fr] items-center py-2 px-3 border border-gray-300 bg-gray-100 text-sm font-semibold text-gray-700 rounded-t'>
          <span>Image</span>
          <span>Name</span>
          <span>Category</span>
          <span>Price</span>
          <span className='text-center'>Actions</span>
        </div>

        {/* ------------- Product List Rows -------------- */}
        {list.map((item, index) => (
          <div className='grid grid-cols-[1fr_2fr_1fr] md:grid-cols-[1fr_3fr_1.5fr_1fr_1.5fr] items-center gap-2 py-2 px-3 border border-gray-200 text-sm bg-white rounded shadow-sm hover:bg-gray-50 transition' key={index}>
            <img className='w-12 h-12 object-cover rounded border border-gray-200' src={item.image[0]} alt={item.name} />
            <p className='font-medium text-gray-800 truncate'>{item.name}</p>
            <p className='text-gray-600'>{item.category} / {item.subCategory}</p>
            <p className='font-semibold text-gray-900'>{currency}{item.price}</p>
            <div className='flex items-center justify-center gap-3'>
              <button 
                onClick={() => setEditingProduct({ ...item })} 
                className='px-3 py-1 bg-black text-white text-xs rounded hover:bg-gray-800 transition'
              >
                Edit
              </button>
              <button 
                onClick={() => removeProduct(item._id)} 
                className='px-3 py-1 bg-red-600 text-white text-xs rounded hover:bg-red-700 transition'
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* -------------- Edit Product Modal -------------- */}
      {editingProduct && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50'>
          <div className='bg-white rounded-lg p-6 max-w-md w-full shadow-xl relative'>
            <h2 className='text-xl font-bold mb-4 text-gray-800'>Edit Product Details</h2>
            <form onSubmit={handleUpdateProduct} className='flex flex-col gap-4'>
              <div>
                <label className='block text-xs font-semibold text-gray-600 mb-1'>Product Name</label>
                <input 
                  type='text' 
                  className='w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-black'
                  value={editingProduct.name}
                  onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                  required
                />
              </div>

              <div className='grid grid-cols-2 gap-3'>
                <div>
                  <label className='block text-xs font-semibold text-gray-600 mb-1'>Category</label>
                  <select 
                    className='w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-black'
                    value={editingProduct.category}
                    onChange={(e) => setEditingProduct({ ...editingProduct, category: e.target.value })}
                  >
                    <option value='Men'>Men</option>
                    <option value='Women'>Women</option>
                    <option value='Kids'>Kids</option>
                  </select>
                </div>

                <div>
                  <label className='block text-xs font-semibold text-gray-600 mb-1'>Sub Category</label>
                  <select 
                    className='w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-black'
                    value={editingProduct.subCategory}
                    onChange={(e) => setEditingProduct({ ...editingProduct, subCategory: e.target.value })}
                  >
                    <option value='Topwear'>Topwear</option>
                    <option value='Bottomwear'>Bottomwear</option>
                    <option value='Winterwear'>Winterwear</option>
                  </select>
                </div>
              </div>

              <div>
                <label className='block text-xs font-semibold text-gray-600 mb-1'>Price ({currency})</label>
                <input 
                  type='number' 
                  className='w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-black'
                  value={editingProduct.price}
                  onChange={(e) => setEditingProduct({ ...editingProduct, price: e.target.value })}
                  required
                />
              </div>

              <div className='flex items-center gap-2 mt-1'>
                <input 
                  type='checkbox' 
                  id='bestseller'
                  checked={editingProduct.bestSeller}
                  onChange={(e) => setEditingProduct({ ...editingProduct, bestSeller: e.target.checked })}
                  className='rounded cursor-pointer'
                />
                <label htmlFor='bestseller' className='text-sm text-gray-700 cursor-pointer'>Add to Bestseller</label>
              </div>

              <div className='flex justify-end gap-3 mt-4'>
                <button 
                  type='button' 
                  onClick={() => setEditingProduct(null)} 
                  className='px-4 py-2 border border-gray-300 rounded text-sm text-gray-600 hover:bg-gray-100'
                >
                  Cancel
                </button>
                <button 
                  type='submit' 
                  className='px-4 py-2 bg-black text-white rounded text-sm font-medium hover:bg-gray-800'
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}

export default List