import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../components/Sidebar';

const CriarProduto = () => {
 

    const [formData, setFormData] = useState({
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
            const response = await axios.post('http://localhost:5000/api/product/create_color', {
                cor: formData.cor,
            });

            setMensagem(response.data.message || 'Produto criado com sucesso!');
            setFormData({
                cor: '',
            });
        } catch (error) {
            console.error('Erro ao criar a cor produto:', error);
            setMensagem('Erro ao criar a cor produto');
        }
    };


    return (
        <div className="flex min-h-screen">
            <Sidebar />
            <main className="flex-1 p-8 bg-gray-100">
                <div className="max-w-3xl mx-auto mt-10 bg-white p-6 rounded shadow">
                    <h2 className="text-2xl font-bold mb-6">Criar Cor do Produto</h2>
                    {mensagem && <div className="mb-4 text-green-600">{mensagem}</div>}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <input
                            type="text"
                            name="cor"
                            placeholder="Cor do Produto"
                            value={formData.cor}
                            onChange={handleChange}
                            required
                            className="w-full p-2 border border-gray-300 rounded"
                        />

                    

                        <button
                            type="submit"
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                        >
                            Enviar
                        </button>
                    </form>
                </div>
            </main>
        </div>
    );
};

export default CriarProduto;
