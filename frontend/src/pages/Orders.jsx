import React, { useContext, useState, useEffect } from 'react'
import { ShopContext } from '../context/ShopContextObject'
import Title from '../components/Title'
import axios from 'axios'

const orderSteps = ['Order Placed', 'Packing', 'Shipped', 'Out for delivery', 'Delivered'];

const getStepIndex = (status) => {
  const index = orderSteps.findIndex(s => s.toLowerCase() === (status || '').toLowerCase());
  return index !== -1 ? index : 0;
};

const Orders = () => {

  const { backendUrl, token, currency } = useContext(ShopContext)

  const [orderData, setOrderData] = useState([])
  const [expandedIndex, setExpandedIndex] = useState(null)

  const loadOrderData = async () => {
    try {
      if (!token) {
        return null
      }

      const response = await axios.post(backendUrl + '/api/order/userOrders', {}, { headers: { token } })
      if (response.data.success) {
        let allOrdersItem = []
        response.data.orders.map((order) => {
          order.items.map((item) => {
            item['status'] = order.status
            item['payment'] = order.payment
            item['paymentMethod'] = order.paymentMethod
            item['date'] = order.date
            allOrdersItem.push(item)
          })
        })
        setOrderData(allOrdersItem.reverse())
      }

    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    loadOrderData()
  }, [token])

  return (
    <div className='border-t border-gray-200 pt-16 min-h-[60vh]'>

      <div className='text-2xl mb-4'>
        <Title text1={'MY'} text2={'ORDERS'} />
      </div>

      <div>
        {
          orderData.length === 0 ? (
            <p className='text-gray-500 text-center py-12'>You have no orders yet.</p>
          ) : (
            orderData.map((item, index) => {
              const currentStep = getStepIndex(item.status);
              const isExpanded = expandedIndex === index;

              return (
                <div key={index} className='py-5 border-b border-gray-200 text-gray-700 flex flex-col gap-4'>
                  <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
                    <div className='flex items-start gap-6 text-sm'>
                      <img className='w-16 sm:w-20 rounded border border-gray-100 object-cover' src={item.image[0]} alt={item.name} />
                      <div>
                        <p className='sm:text-base font-medium text-gray-800'>{item.name}</p>
                        <div className="flex items-center gap-3 mt-1 text-sm text-gray-600">
                          <p className='font-semibold'>{currency}{item.price}</p>
                          <p>Qty: {item.quantity}</p>
                          <p>Size: <span className='bg-gray-100 px-2 py-0.5 rounded text-xs'>{item.size}</span></p>
                        </div>
                        <p className='mt-1 text-xs text-gray-500'>Date: <span>{new Date(item.date).toDateString()}</span></p>
                        <p className='mt-1 text-xs text-gray-500'>Payment: <span className='font-medium text-gray-700'>{item.paymentMethod} ({item.payment ? 'Paid' : 'Pending'})</span></p>
                      </div>
                    </div>

                    <div className='md:w-1/2 flex justify-between items-center'>
                      <div className='flex items-center gap-2'>
                        <span className={`w-2.5 h-2.5 rounded-full ${currentStep === 4 ? 'bg-emerald-500 animate-pulse' : 'bg-green-500'}`}></span>
                        <p className='text-sm md:text-base font-medium'>{item.status || 'Order Placed'}</p>
                      </div>
                      <button 
                        onClick={() => setExpandedIndex(isExpanded ? null : index)} 
                        className='border border-gray-300 hover:border-black transition px-4 py-2 text-xs md:text-sm font-medium rounded text-gray-700 hover:bg-black hover:text-white'
                      >
                        {isExpanded ? 'Hide Details' : 'Track Order'}
                      </button>
                    </div>
                  </div>

                  {/* Stepper Timeline UI */}
                  {isExpanded && (
                    <div className='mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200'>
                      <p className='text-xs font-semibold text-gray-600 mb-4 tracking-wider uppercase'>Order Progress</p>
                      <div className='flex items-center justify-between relative px-2'>
                        {orderSteps.map((step, stepIdx) => {
                          const isDone = stepIdx <= currentStep;
                          return (
                            <div key={stepIdx} className='flex flex-col items-center flex-1 relative z-10'>
                              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                                isDone ? 'bg-black text-white shadow' : 'bg-gray-200 text-gray-500'
                              }`}>
                                {isDone ? '✓' : stepIdx + 1}
                              </div>
                              <p className={`text-[10px] md:text-xs text-center mt-2 font-medium ${
                                isDone ? 'text-black' : 'text-gray-400'
                              }`}>
                                {step}
                              </p>
                            </div>
                          );
                        })}
                        {/* Connecting bar */}
                        <div className='absolute top-4 left-6 right-6 h-0.5 bg-gray-200 z-0' />
                        <div 
                          className='absolute top-4 left-6 h-0.5 bg-black z-0 transition-all duration-500' 
                          style={{ width: `${(currentStep / (orderSteps.length - 1)) * 90}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          )
        }
      </div>

    </div>
  )
}

export default Orders
