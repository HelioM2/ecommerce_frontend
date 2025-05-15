import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../components/Sidebar';

const CriarProduto = () => {

  

    const [formData, setFormData] = useState({
        titulo: '',
        slogam: '',
        imagem: null,  // só uma imagem
    });

    const [mensagem, setMensagem] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleFileChange = (e) => {
        setFormData((prevData) => ({
            ...prevData,
            imagem: e.target.files[0],  // só o primeiro ficheiro
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.imagem) {
            setMensagem('❌ Você precisa adicionar uma imagem!');
            return;
        }

        try {
            const envio = new FormData();
            envio.append('titulo', formData.titulo);
            envio.append('slogam', formData.slogam);
            envio.append('imagem', formData.imagem); // envia só uma imagem

            const response = await axios.post('https://ecommercebackend-backend-afropoderosa.up.railway.app/api/product/create_banner', envio, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            setMensagem(response.data.message || 'Banner criado com sucesso!');
            setFormData({
                titulo: '',
                slogam: '',
                imagem: null,
            });

            // Limpar input file manualmente
            document.querySelector('input[type="file"]').value = '';
        } catch (error) {
            console.error('Erro ao criar banner:', error);
            setMensagem('❌ Erro ao criar banner');
        }
    };

    return (
        <div className="flex min-h-screen mt-10">
            <Sidebar />
            <main className="flex-1 p-8 bg-gray-100">
                <div className="max-w-3xl mx-auto mt-10 bg-white p-6 rounded shadow">
                    <h2 className="text-2xl font-bold mb-6">Criar Banner</h2>
                    {mensagem && <div className="mb-4 text-green-600">{mensagem}</div>}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <input
                            type="text"
                            name="titulo"
                            placeholder="Título do Banner"
                            value={formData.titulo}
                            onChange={handleChange}
                            required
                            className="w-full p-2 border border-gray-300 rounded"
                        />

                        <input
                            type="text"
                            name="slogam"
                            placeholder="Slogam"
                            value={formData.slogam}
                            onChange={handleChange}
                            required
                            className="w-full p-2 border border-gray-300 rounded"
                        />

                        <input
                            type="file"
                            name="imagem"
                            accept="image/*"
                            onChange={handleFileChange}
                            required
                            className="w-full"
                        />

                        <button
                            type="submit"
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                        >
                            Criar Banner
                        </button>
                    </form>
                </div>
            </main>
        </div>
    );
};

export default CriarProduto;
