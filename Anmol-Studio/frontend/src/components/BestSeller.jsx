import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContextObject'
import Title from './Title';
import ProductItem from './ProductItem';
import { motion } from 'framer-motion'

const BestSeller = () => {

    const { products } = useContext(ShopContext);
    const [bestSeller, SetBestSeller] = React.useState([]);

    React.useEffect(() => {
        const bestProduct = products.filter((item) => (item.bestSeller || item.bestseller));
        SetBestSeller(bestProduct.slice(0, 5))
    }, [products])

    return (
        <div className='my-10'>
            <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center text-3xl py-8"
            >
                <Title text1={'BEST'} text2={'SELLER'} />
                <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
                    Discover the most loved pieces from Anmol Studio. Our bestsellers combine premium quality with timeless designs that our customers can't get enough of.
                </p>
            </motion.div>

            <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6"
            >
                {
                    bestSeller.map((item, index) => (
                        <ProductItem key={index} id={item._id} name={item.name} image={item.image} price={item.price} />
                    ))
                }

            </motion.div>

        </div >
    )
}

export default BestSeller
