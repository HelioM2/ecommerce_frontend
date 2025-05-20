import React, { useState, useEffect } from 'react';
import axios from 'axios';
const Criar_Tamanho = () => {

    const [formData, setFormData] = useState({
        tamanho: '',
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
            const response = await axios.post('http://localhost:5000/api/product/create_size',{
                tamanho: formData.tamanho,
            });

            setMensagem(response.data.message || 'Tamanho criado com sucesso!');
            setFormData({
                tamanho: '',
            });
        } catch (error) {
            console.error('Erro ao criar Tamanho:', error);
            setMensagem('Erro ao criar Tamanho');
        }
    };


    return (
        <div className="flex min-h-screen">
            <main className="flex-1 p-8 bg-gray-100">
                <div className="max-w-3xl mx-auto mt-10 bg-white p-6 rounded shadow">
                    <h2 className="text-2xl font-bold mb-6">Criar Tamanho do Produto</h2>
                    {mensagem && <div className="mb-4 text-green-600">{mensagem}</div>}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <input
                            type="text"
                            name="tamanho"
                            placeholder="Tamanho do Produto"
                            value={formData.tamanho}
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

export default Criar_Tamanho;
