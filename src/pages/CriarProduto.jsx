import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CriarProduto = () => {

    const [categorias, setCategorias] = useState([]);
    const [cores, setCores] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/api/product/categorias')
            .then(res => setCategorias(res.data))
            .catch(() => setCategorias([]));

        axios.get('http://localhost:5000/api/product/cores')
            .then(res => setCores(res.data))
            .catch(() => setCores([]));
    }, []);

    const [formData, setFormData] = useState({
        nome: '',
        descricao: '',
        preco: '',
        categoria: '',
        //imagem: null,
        imagem: [],   
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
             //imagem: e.target.files[0],
            imagem: Array.from(e.target.files), // converte FileList em array
           
        }));
    };

    const handleSubmit = async (e) => {
    e.preventDefault();

    // Validação no frontend
    if (!formData.imagem || formData.imagem.length === 0) {
        setMensagem('❌ Você precisa adicionar ao menos uma imagem!');
        return;
    }

    try {
        const envio = new FormData();
        envio.append('name', formData.nome);
        envio.append('description', formData.descricao);
        envio.append('price', formData.preco);
        envio.append('categoria', formData.categoria);

        // Envia as imagens com o nome de campo 'images'
        formData.imagem.forEach((file) => {
            envio.append('images', file);
        });

        const response = await axios.post('http://localhost:5000/api/product/create', envio, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        setMensagem(response.data.message || 'Produto criado com sucesso!');
        setFormData({
            nome: '',
            descricao: '',
            preco: '',
            categoria: '',
            imagem: [],
        });
    } catch (error) {
        console.error('Erro ao criar produto:', error);
        setMensagem('❌ Erro ao criar produto');
    }
};



    return (
        <div className="flex min-h-screen mt-10">
            <main className="flex-1 p-8 bg-gray-100">
                <div className="max-w-3xl mx-auto mt-10 bg-white p-6 rounded shadow">
                    <h2 className="text-2xl font-bold mb-6">Criar Novo Produto</h2>
                    {mensagem && <div className="mb-4 text-green-600">{mensagem}</div>}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <input
                            type="text"
                            name="nome"
                            placeholder="Nome do Produto"
                            value={formData.nome}
                            onChange={handleChange}
                            required
                            className="w-full p-2 border border-gray-300 rounded"
                        />

                        <textarea
                            name="descricao"
                            placeholder="Descrição"
                            value={formData.descricao}
                            onChange={handleChange}
                            required
                            className="w-full p-2 border border-gray-300 rounded"
                        ></textarea>

                        <input
                            type="number"
                            name="preco"
                            placeholder="Preço"
                            value={formData.preco}
                            onChange={handleChange}
                            required
                            className="w-full p-2 border border-gray-300 rounded"
                        />

                        <input
                            type="text"
                            name="categoria"
                            placeholder="Categoria"
                            value={formData.categoria}
                            onChange={handleChange}
                            required
                            className="w-full p-2 border border-gray-300 rounded"
                        />

                        <input
                            type="file"
                            name="images"
                            accept="image/*"
                            onChange={handleFileChange}
                            multiple // <- esta é a chave para múltiplos ficheiros
                            required
                            className="w-full"
                        />

                        <button
                            type="submit"
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                        >
                            Criar Produto
                        </button>
                    </form>
                </div>
            </main>
        </div>
    );
};

export default CriarProduto;
