import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';

const ProductDetail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [previewIndex, setPreviewIndex] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        api.get(`http://localhost:5000/api/product/stockdetalhe/${id}`)
            .then(res => {
                setProduct(res.data);
            })
            .catch(err => console.error(err));
    }, [id]);

    if (!product) return <p className="p-4">Carregando...</p>;

    const images = product.image ? product.image.split(',') : [];

    const openModal = (index) => {
        setPreviewIndex(index);
        document.body.style.overflow = 'hidden';
    };

    const closeModal = () => {
        setPreviewIndex(null);
        document.body.style.overflow = 'auto';
    };

    return (
        <div className="max-w-2xl mx-auto p-4 sm:p-6 bg-white shadow rounded mt-6 sm:mt-10">
            <h1 className="text-2xl font-bold mb-4">{product.name}</h1>

            {/* Carrossel de imagens */}
            {images.length > 0 && (
                <div className="mb-4 w-full">
                    <Swiper
                        modules={[Navigation]}
                        navigation
                        spaceBetween={10}
                        slidesPerView={1}
                        className="w-full"
                    >
                        {images.map((img, index) => (
                            <SwiperSlide key={index} className="w-full">
                                <img
                                    src={`http://localhost:5000/uploads/${img}`}
                                    alt={`Imagem ${index + 1}`}
                                    onClick={() => openModal(index)}
                                    className="w-full h-60 sm:h-80 object-contain cursor-pointer rounded shadow"
                                />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            )}


            {/* Dados do produto */}
            <p className="text-lg mb-2"><strong>Preço:</strong> {product.price}€</p>
            <p className="text-gray-700"><strong>Descrição:</strong> {product.description}</p>
            <p className="text-gray-700"><strong>Categoria:</strong> {product.categoria}</p>
            <p className="text-gray-700"><strong>Data:</strong> {new Date(product.created_at).toLocaleString('pt-PT', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
            })}</p>

            {/* Stock por variantes */}
            {product?.variants?.length > 0 ? (
                <div className="mt-6 overflow-x-auto">
                    <h2 className="text-lg font-semibold mb-2">Stock por Cor e Tamanho:</h2>
                    <table className="w-full text-left border-collapse min-w-[400px]">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="p-2 border">Cor</th>
                                <th className="p-2 border">Tamanho</th>
                                <th className="p-2 border">Stock</th>
                            </tr>
                        </thead>
                        <tbody>
                            {product.variants.map((variant) => (
                                <tr key={variant.id}>
                                    <td className="p-2 border">{variant.color}</td>
                                    <td className="p-2 border">{variant.size}</td>
                                    <td className={`p-2 border font-semibold text-white ${variant.stock <= 10 ? 'bg-red-600' : 'bg-green-600'
                                        }`}>{variant.stock}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div className="mt-4 text-red-600">
                    Sem stock
                </div>
            )}

            <button
                onClick={() => navigate(-1)}
                className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
            >
                Voltar
            </button>

            {/* Modal fullscreen com Swiper para preview com setas */}
            {previewIndex !== null && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-2 overflow-y-auto"
                    onClick={closeModal}
                >
                    <div
                        className="relative w-full max-w-6xl h-[90vh]"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={closeModal}
                            className="absolute top-5 right-5 text-white text-4xl font-bold z-50 cursor-pointer"
                            aria-label="Fechar visualização"
                        >
                            &times;
                        </button>

                        <Swiper
                            initialSlide={typeof previewIndex === 'number' ? previewIndex : 0}
                            modules={[Navigation]}
                            navigation
                            className="w-full max-w-6xl h-[90vh]"
                        >
                            {images.map((img, idx) => (
                                <SwiperSlide key={idx} className="flex items-center justify-center">
                                    <img
                                        src={`http://localhost:5000/uploads/${img}`}
                                        alt={`Preview ${idx + 1}`}
                                        className="max-h-[90vh] max-w-full object-contain"
                                    />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductDetail;
