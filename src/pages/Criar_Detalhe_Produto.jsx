import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../components/Sidebar';

const CriarProduto = () => {

    const [artigo, setArtigo] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const [cores, setCores] = useState([]);
    const [formData, setFormData] = useState({
        product_id: '',
        color_id: '',
        size_id: '',
        stock: '',
    });

    useEffect(() => {
        axios.get('http://localhost:5000/api/product/categorias')
            .then(res => setCategorias(res.data))
            .catch(() => setCategorias([]));

        axios.get('http://localhost:5000/api/product/artigo')
            .then(res => setArtigo(res.data))
            .catch(() => setArtigo([]));

        axios.get('http://localhost:5000/api/product/cores')
            .then(res => setCores(res.data))
            .catch(() => setCores([]));
    }, []);



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
            const response = await axios.post('http://localhost:5000/api/product/createVariants', {
                product_id: formData.product_id,
                color_id: formData.color_id,
                size_id: formData.size_id,
                stock: formData.stock,
            });

            setMensagem(response.data.message || 'Produto criado com sucesso!');
            setFormData({
                product_id: '',
                color_id: '',
                size_id: '',
                stock: '',
            });
        } catch (error) {
            console.error('Erro ao criar produto:', error);
            setMensagem('Erro ao criar produto');
        }
    };


    return (
        <div className="flex min-h-screen">
            <Sidebar />
            <main className="flex-1 p-8 bg-gray-100">
                <div className="max-w-3xl mx-auto mt-10 bg-white p-6 rounded shadow">
                    <h2 className="text-2xl font-bold mb-6">Definir Produto</h2>
                    {mensagem && <div className="mb-4 text-green-600">{mensagem}</div>}
                    <form onSubmit={handleSubmit} className="space-y-4">

                        <select
                            name="product_id"
                            value={formData.product_id}
                            onChange={handleChange}
                            required
                            className="w-full p-2 border border-gray-300 rounded"
                        >
                            <option value="">Selecione um produto</option>
                            {artigo.length > 0 ? (
                                artigo.map((item) => (
                                    <option key={item.id} value={item.id}>{item.name}</option>
                                ))
                            ) : (
                                <option value="">Nenhum Produto disponível</option>
                            )}
                        </select>

                        <select
                            name="color_id"
                            value={formData.color_id}
                            onChange={handleChange}
                            required
                            className="w-full p-2 border border-gray-300 rounded"
                        >
                            <option value="">Selecione uma cor</option>
                            {cores.length > 0 ? (
                                cores.map((item) => (
                                    <option key={item.id} value={item.id}>{item.name}</option>
                                ))
                            ) : (
                                <option value="">Nenhuma cor disponível</option>
                            )}
                        </select>

                        <select
                            name="size_id"
                            value={formData.size_id}
                            onChange={handleChange}
                            required
                            className="w-full p-2 border border-gray-300 rounded"
                        >
                            <option value="">Selecione o tamanho</option>
                            {categorias.length > 0 ? (
                                categorias.map((item) => (
                                    <option key={item.id} value={item.id}>{item.name}</option>
                                ))
                            ) : (
                                <option value="">Nenhuma cor disponível</option>
                            )}
                        </select>

                        <input
                            type="number"
                            name="stock"
                            placeholder="Quantidade"
                            value={formData.stock}
                            onChange={handleChange}
                            required
                            className="w-full p-2 border border-gray-300 rounded"
                        />

                        <button
                            type="submit"
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                        >
                            Criar Detalhe Produto
                        </button>
                    </form>
                </div>
            </main>
        </div>
    );
};

export default CriarProduto;
