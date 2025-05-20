import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const RelatorioProdutos = () => {
    const [produtos, setProdutos] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const [cores, setCores] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Buscar produtos completos
    useEffect(() => {
        axios.get('http://localhost:5000/api/product')
            .then(response => {
                setProdutos(response.data);
                setLoading(false);
            })
            .catch(() => {
                setError('Erro ao carregar os produtos');
                setLoading(false);
            });
    }, []);

    // Buscar categorias e cores
    // useEffect(() => {
    //     axios.get('http://localhost:5000/api/product/categoriainfo')
    //         .then(response => {
    //             console.log("Resposta de /categoriainfo:", response.data);
    //             const { categorias, cores } = response.data;

    //             setCategorias(Array.isArray(categorias) ? categorias : []);
    //             setCores(Array.isArray(cores) ? cores : []);
    //             setLoading(false);
    //         })
    //         .catch(error => {
    //             console.error('Erro ao carregar categorias:', error);
    //             setError('Erro ao carregar categorias');
    //             setLoading(false);
    //         });
    // }, []);

    const handleDelete = (id) => {
        axios.delete(`http://localhost:5000/api/product/${id}`)
            .then(() => {
                setProdutos(produtos.filter(produto => produto.id !== id));
            })
            .catch(() => {
                setError('Erro ao excluir o produto');
            });
    };

    if (loading) return <div>Carregando produtos...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="flex min-h-screen">
            <main className="flex-1 p-8 bg-white grid grid-cols-3 gap-6 max-w-6xl mx-auto">
                {/* Tabela de produtos (ocupa as 3 colunas) */}
                <div className="col-span-3">
                    <h1 className="text-3xl font-bold mb-6 text-center">Relatório de Produtos</h1>

                    <table className="w-full border border-gray-300 mb-10">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="py-3 px-4 border-b">Nome</th>
                                <th className="py-3 px-4 border-b">Preço</th>
                                <th className="py-3 px-4 border-b">Quantidade</th>
                                <th className="py-3 px-4 border-b">Tamanho</th>
                                <th className="py-3 px-4 border-b">Cor</th>
                                <th className="py-3 px-4 border-b">Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {produtos.map(produto => (
                                <tr key={produto.id}>
                                    <td className="py-3 px-4 border-b">{produto.name}</td>
                                    <td className="py-3 px-4 border-b">€ {produto.price}</td>
                                    <td className="py-3 px-4 border-b">{produto.quantidade}</td>
                                    <td className="py-3 px-4 border-b">{produto.categoria}</td>
                                    <td className="py-3 px-4 border-b">{produto.cor}</td>
                                    <td className="py-3 px-4 border-b">
                                        <Link to={`/produto/ver/${produto.id}`} className="text-blue-600 hover:underline mr-4">Ver</Link>
                                        <Link to={`/produto/editar/${produto.id}`} className="text-yellow-600 hover:underline mr-4">Editar</Link>
                                        <button onClick={() => handleDelete(produto.id)} className="text-red-600 hover:underline">Eliminar</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Tabela de categorias (só na coluna 1) */}
                <div className="col-span-1">
                    <h2 className="text-2xl font-semibold mb-4">Categorias: Tamanhos e Cores</h2>
                    <table className="w-full border border-gray-300">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="py-3 px-4 border-b">#</th>
                                <th className="py-3 px-4 border-b">Tamanho</th>
                                <th className="py-3 px-4 border-b">Cor</th>
                            </tr>
                        </thead>
                        <tbody>
                            {categorias.map((item, index) => (
                                <tr key={index}>
                                    <td className="py-3 px-4 border-b">{index + 1}</td>
                                    <td className="py-3 px-4 border-b">{item.tamanho}</td>
                                    <td className="py-3 px-4 border-b">{cores[index]?.cor || '-'}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </main>



        </div>
    );
};

export default RelatorioProdutos;
