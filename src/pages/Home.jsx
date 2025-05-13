import React, { useEffect, useState } from 'react';
import api from '../services/api';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import { Link } from 'react-router-dom';

const Home = () => {
    const [products, setProducts] = useState([]);
    const [indiceAtual, setIndiceAtual] = useState(0);

    useEffect(() => {
        api.get('https://ecommercebackend-backend-afropoderosa.up.railway.app/api/product')
            .then(response => {
                console.log('Produtos recebidos:', response.data);
                // Filtra apenas produtos válidos com ou sem imagem
                const validProducts = response.data.filter(p => p && typeof p === 'object');
                setProducts(validProducts);
            })
            .catch(error => console.error('Erro ao buscar produtos:', error));
    }, []);

    const imagensBanner = products
        .map(produto => produto.image?.split(',')[0])
        .filter(img => !!img) //remove undefined vazias

    useEffect(() => {
        const intervalo = setInterval(() => {
            setIndiceAtual((prev) => (prev + 1) % imagensBanner.length);
        }, 5000);

        return () => clearInterval(intervalo);
    }, [imagensBanner.length]);

    const imagemAtual = imagensBanner[indiceAtual] || '';

    return (
        <>
        {/* Banner principal */}
            <section className="w-full min-h-[300px] md:min-h-[400px] flex flex-col md:flex-row items-center justify-center bg-gradient-to-r from-purple-400 to-green-200 px-6 py-8 md:py-12">
                <div className="flex-1 flex flex-col items-center justify-center text-center mb-6 md:mb-0">
                    <h1 className="text-2xl md:text-4xl font-bold text-white mb-2 mt-12 md:mt-0">T-shirt Afropoderosa</h1>
                    <p className="text-sm md:text-lg text-white mb-4">A tua loja favorita</p>
                    <button className="bg-gray-800 text-white px-6 py-2 rounded-lg text-sm md:text-base font-bold">Contacte-nos</button>
                </div>
                <div className="flex-1 flex justify-center items-center">
                <img
                    //src={`http://localhost:5000/uploads/${imagemAtual}`}
                    src={`https://ecommercebackend-backend-afropoderosa.up.railway.app/uploads/${imagemAtual}`}
                    alt="Banner produto"
                    className="rounded-xl w-full h-auto max-h-64 md:max-h-80 object-contain transition-all duration-700 ease-in-out mt-4"
                />
                </div>
            </section>
        <div className="space-y-10 px-4 md:px-12 py-8 max-w-screen-xl mx-auto">

            

            {/* Categorias em destaque 
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
            </section> */}

            {/* Produtos em destaque */}
            <section><br />
                <h2 className="text-2xl font-bold mb-6 text-center">T-shirt Destaques</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 ">
                    {products?.map((product, index) => {
                        if (!product || typeof product !== 'object') return null;
                        // Extrair primeira imagem de destaque
                        const imagens = product.imagens?.split(',') || [];
                        const imagemDestaque = imagens[0] || '';
                        // Criar novo objeto com imagemDestaque
                        const productComDestaque = { ...product, imagemDestaque };
                        return (
                            <Link key={`${product.id}-${index}`} to={`/produto/${product.id}`}>
                                <ProductCard product={productComDestaque} />
                            </Link>
                        );
                    })}
                </div>
            </section>
        </div>
        </>
    );
};

export default Home;
