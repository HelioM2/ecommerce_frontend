import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../components/Sidebar';

const CriarCategoriaCor = () => {

    const [formData, setFormData] = useState({
        tamanho: '',
        cor: '',
    });

    const [mensagem, setMensagem] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };



    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:5000/api/product/categoria', {
                tamanho: formData.tamanho,
                cor: formData.cor
            });

            setMensagem(response.data.message || 'Categoria criado com sucesso!');
            setFormData({
                tamanho: '',
                cor: '',
            });
        } catch (error) {
            console.error('Erro ao criar Categoria:', error);
            setMensagem('Erro ao criar Categoria');
        }
    };


    return (
        <div className="flex min-h-screen">
            <Sidebar />
            <main className="flex-1 p-8 bg-gray-100">
                <div className="max-w-3xl mx-auto mt-10 bg-white p-6 rounded shadow">
                    <h2 className="text-2xl font-bold mb-6">Criar Categoria do Produto</h2>
                    {mensagem && <div className="mb-4 text-green-600">{mensagem}</div>}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <input
                            type="text"
                            name="tamanho"
                            placeholder="Tamanho"
                            value={formData.tamanho}
                            onChange={handleChange}
                            required
                            className="w-full p-2 border border-gray-300 rounded"
                        />

                        <input
                            name="cor"
                            placeholder="Cor"
                            value={formData.cor}
                            onChange={handleChange}
                            required
                            className="w-full p-2 border border-gray-300 rounded"
                        ></input>

                        <button
                            type="submit"
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                        >
                            Criar Categotia
                        </button>
                    </form>
                </div>
            </main>
        </div>
    );
};

export default CriarCategoriaCor;
