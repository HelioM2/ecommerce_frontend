import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditProduto = () => {
    const { id } = useParams(); // id do produto na URL
    const navigate = useNavigate();
    const [selectedImages, setSelectedImages] = useState([]);

    const [produto, setProduto] = useState({
        name: '',
        description: '',
        price: '',
        categoria: '',
        image: '',
        status: 0,
    });

    const [loading, setLoading] = useState(true);
    const [erro, setErro] = useState(null);

    // Carregar os dados do produto
    useEffect(() => {
        axios.get(`http://localhost:5000/api/product/${id}`)
            .then(response => {
                setProduto(response.data);
                setLoading(false);
            })
            .catch(error => {
                setErro('Erro ao carregar os dados do produto.');
                setLoading(false);
            });
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduto({ ...produto, [name]: value });
    };

    const handleImageChange = (e) => {
        setSelectedImages(e.target.files);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', produto.name);
        formData.append('description', produto.description);
        formData.append('price', produto.price);
        formData.append('categoria', produto.categoria);
        formData.append('status', produto.status);

        // Adicionar imagens selecionadas
        for (let i = 0; i < selectedImages.length; i++) {
            formData.append('images', selectedImages[i]);
        }

        axios
            .put(`http://localhost:5000/api/product/updateproductstock/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            .then((res) => {
                console.log('Resposta do backend:', res.data);
                alert(res.data.message || 'Produto atualizado com sucesso!');
                setTimeout(() => navigate('/produtos'), 300);
            })
            .catch((err) => {
                console.error('Erro ao atualizar:', err);
                alert('Erro ao atualizar o produto.');
            });
    };




    if (loading) return <p>Carregando...</p>;
    if (erro) return <p>{erro}</p>;

    return (
        <div className="max-w-xl mx-auto p-6 bg-white shadow-md rounded-lg mt-6">
            <h2 className="text-2xl font-bold mb-4">Editar Produto</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium">Nome</label>
                    <input
                        type="text"
                        name="name"
                        value={produto.name}
                        onChange={handleChange}
                        className="w-full border p-2 rounded"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium">Descrição</label>
                    <textarea
                        name="description"
                        value={produto.description}
                        onChange={handleChange}
                        className="w-full border p-2 rounded"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium">Preço (€)</label>
                    <input
                        type="number"
                        step="0.01"
                        name="price"
                        value={produto.price}
                        onChange={handleChange}
                        className="w-full border p-2 rounded"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium">Categoria</label>
                    <input
                        type="text"
                        name="categoria"
                        value={produto.categoria}
                        onChange={handleChange}
                        className="w-full border p-2 rounded"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Imagens (pode selecionar várias)</label>
                    <input
                        type="file"
                        name="images"
                        multiple
                        onChange={handleImageChange}
                        className="w-full border p-2 rounded"
                        accept="image/*"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium">Status</label>
                    <select
                        name="status"
                        value={produto.status}
                        onChange={handleChange}
                        className="w-full border p-2 rounded"
                    >
                        <option value={0}>Fora da Loja</option>
                        <option value={1}>Na Loja</option>
                    </select>
                </div>

                <div className="flex justify-between mt-6">
                    <button
                        onClick={() => navigate(-1)}
                        type="button"
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                    >
                        Voltar
                    </button>

                    <button
                        type="submit"
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                        Guardar Alterações
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditProduto;
