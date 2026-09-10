import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContextObject';
import Title from '../components/Title';
import ProductItem from '../components/ProductItem';
import { Link } from 'react-router-dom';

const Wishlist = () => {
    const { products, wishlist } = useContext(ShopContext);

    const wishlistProducts = products.filter((item) => wishlist.includes(item._id));

    return (
        <div className="border-t pt-10 min-h-[65vh]">
            <div className="text-2xl mb-6">
                <Title text1={'MY'} text2={'WISHLIST'} />
            </div>

            {wishlistProducts.length === 0 ? (
                <div className="text-center py-16">
                    <p className="text-gray-500 text-lg mb-4">Your wishlist is currently empty.</p>
                    <Link to="/collection" className="bg-black text-white text-xs px-8 py-3 rounded uppercase tracking-wider font-medium hover:bg-gray-800 transition">
                        Explore Collection
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
                    {wishlistProducts.map((item) => (
                        <ProductItem
                            key={item._id}
                            id={item._id}
                            image={item.image}
                            name={item.name}
                            price={item.price}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Wishlist;
