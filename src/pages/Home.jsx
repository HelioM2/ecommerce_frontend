import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import Sweaters from '../assets/tshirt_manga_comprida.jpg';
import T_shirts from '../assets/T-shirts.jpg';
// import Sweaters from '../assets/tshirt_manga_comprida.jpg';
import { Link } from 'react-router-dom';

const Home = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/api/product')
            .then(response => {
                console.log('Produtos recebidos:', response.data);
                // Filtra apenas produtos válidos com ou sem imagem
                const validProducts = response.data.filter(p => p && typeof p === 'object');
                setProducts(validProducts);
            })
            .catch(error => console.error('Erro ao buscar produtos:', error));
    }, []);

    return (
        <div className="space-y-10 px-4 md:px-12 py-8 max-w-[80%] mx-auto ">

            {/* Banner principal */}
            <section className="space-y-10 grid grid-cols-1 md:grid-cols-2 gap-4 bg-gradient-to-r from-purple-100 to-green-100 rounded-b-2xl p-6 md:p-6 max-w-[180%] mx-auto mt-0">
                <div className="flex flex-col justify-center items-start pace-y-2">
                    <h1 className="text-2xl md:text-3xl font-bold">T-shirt Afropoderosa</h1>
                    <p className="text-sm md:text-base">A tua loja favorita</p>
                    <button className="bg-black text-white px-4 py-2 rounded-lg text-sm">Contacte-nos</button>
                </div>
                <img src={Sweaters} alt="T-shirt Mockup" className="rounded-xl w-full h-auto max-h-64 object-contain" />
            </section>
 
            {/* Categorias em destaque */}
            <section className="grid grid-cols-2 xl:grid-cols-3 gap-3">
                <div className="text-center">
                    <img src={Sweaters} className="rounded-lg w-40 mx-auto" alt="Hoodie" />
                    <p className="mt-2 font-medium">Shop Hoodies</p>
                </div>
                <div className="text-center">
                    <img src={T_shirts} className="rounded-lg w-40 mx-auto" alt="T-shirt" />
                    <p className="mt-2 font-medium">Shop T-shirts</p>
                </div>
                <div className="text-center">
                    <img src={Sweaters} className="rounded-lg w-40 mx-auto" alt="Sweater" />
                    <p className="mt-2 font-medium">Shop Sweaters</p>
                </div>
                {/* <div className="text-center">
                    <img src={banner1} className="rounded-lg" alt="Designer" />
                    <p className="mt-2 font-medium">Shop Designers</p>
                </div> */}
            </section>

            {/* Produtos em destaque */}
            <section><br />
                <h2 className="text-2xl font-bold mb-6 text-center">T-shirt Destaques</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 ">
                    {products.map((product, index) => (
                        product ? <Link key={`${product.id}-${index}`} to={`/produto/${product.id}`}>
                            <ProductCard product={product} />
                        </Link> : null
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Home;
