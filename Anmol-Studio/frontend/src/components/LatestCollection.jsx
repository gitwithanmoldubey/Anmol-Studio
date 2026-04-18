import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContextObject'
import Title from './Title'
import ProductItem from './ProductItem'
import { motion } from 'framer-motion'

const LatestCollection = () => {

    const { products } = useContext(ShopContext)
    const [latestProducts, setLatestProducts] = useState([]);

    useEffect(() => {
        setLatestProducts(products.slice(0, 10));
    }, [products])


    return (
        <div className='my-10'>
            <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center py-8 text-3xl"
            >
                <Title text1={'LATEST'} text2={'COLLECTIONS'} />
                <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
                    Explore our newest arrivals, curated with style and quality to transform your wardrobe with the latest fashion trends from Anmol Studio.
                </p>
            </motion.div>

            {/* Rendering Products */}
            <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6"
            >
                {latestProducts.map((item, index) => (
                    <ProductItem key={index} id={item._id} image={item.image} name={item.name} price={item.price} />
                ))}
            </motion.div>
        </div>
    )
}

export default LatestCollection
