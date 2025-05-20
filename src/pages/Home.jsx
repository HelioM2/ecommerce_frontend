import React, { useEffect, useState } from 'react';
import api from '../services/api';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import { Link } from 'react-router-dom';

const Home = () => {
    const [products, setProducts] = useState([]);
    const [banner, setBanner] = useState([]);
    //const [indiceAtual, setIndiceAtual] = useState(0);

    useEffect(() => {

        api.get('http://localhost:5000/api/product')
            .then(response => {
                console.log('Produtos recebidos:', response.data);
                // Filtra apenas produtos válidos com ou sem imagem
                const validProducts = response.data.filter(p => p && typeof p === 'object');
                setProducts(validProducts);
            })
            .catch(error => console.error('Erro ao buscar produtos:', error));


        api.get('http://localhost:5000/api/product/getbanner')
            .then(response => {
                console.log('Banner recebidos:', response.data);
                // Filtra apenas produtos válidos com ou sem imagem
                const validProducts = response.data.filter(p => p && typeof p === 'object');
                setBanner(validProducts);
            })
            .catch(error => console.error('Erro ao buscar Banner:', error));
    }, []);

    const imagensBanner = banner
        .map(produto => produto.imagem)
        .filter(img => !!img) //remove undefined vazias

    const imagemAtual = imagensBanner[0] || '';
    const tituloAtual = banner[0]?.titulo || '';
    const slogamAtual = banner[0]?.slogam || '';

    return (
        <>
        {/* Banner principal */}
            <section className="w-full min-h-[300px] md:min-h-[400px] flex flex-col md:flex-row items-center justify-center bg-gradient-to-r from-[#59414F] to-[#FED4EF] px-6 py-8 md:py-12">
                <div className="flex-1 flex flex-col items-center justify-center text-center mb-6 md:mb-0">
                    <h1 className="text-2xl md:text-4xl font-bold text-white mb-2 mt-12 md:mt-0 ">{tituloAtual}</h1>
                    <p className="text-sm md:text-lg text-white mb-4">{slogamAtual}</p>
                    <button className="bg-black text-white px-6 py-2 rounded-lg text-sm md:text-base font-bold w-full max-w-[200px]">Contacte-nos</button>
                </div>
                <div className="flex-1 flex justify-center items-center">
                <img
                    //src={`http://localhost:5000/uploads/${imagemAtual}`}
                    src={`http://localhost:5000/uploads/${imagemAtual}`}
                    alt="Banner produto"
                    loading="lazy"
                    className="rounded-xl w-full h-auto max-h-64 md:max-h-80 object-contain transition-all duration-700 ease-in-out mt-4 max-w-xs md:max-w-full"
                />
                </div>
            </section>
        <div className="space-y-10 w-full max-w-screen-xl px-4 md:px-12 py-8 mx-auto">

            

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
                {/* <h2 className="text-2xl font-bold mb-6 text-center">T-shirt Destaques</h2> */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 ">
                     {products.map((product, index) => {
                            if (!product || typeof product !== 'object') return null;

                            const imagens = product.image?.split(',') || [];
                            const imagemDestaque = imagens[0] || '';
                            const productComDestaque = { ...product, imagemDestaque };

                            return (
                                <ProductCard key={`${product.id}-${index}`} product={productComDestaque} />
                            );
                        })}
                </div>
            </section>
        </div>
        </>
    );
};

export default Home;
