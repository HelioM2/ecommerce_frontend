import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Carrinho = () => {
    const [carrinho, setCarrinho] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const carrinhoLocal = JSON.parse(localStorage.getItem("carrinho")) || [];
        setCarrinho(carrinhoLocal);
    }, []);

    const calcularTotal = () => {
        return carrinho.reduce(
            (total, item) => total + item.price * item.quantidade,
            0
        );
    };

    const removerItem = (index) => {
        const novoCarrinho = [...carrinho];
        novoCarrinho.splice(index, 1);
        setCarrinho(novoCarrinho);
        localStorage.setItem("carrinho", JSON.stringify(novoCarrinho));
    };

    const finalizarCompra = () => {
        // Aqui você pode redirecionar para login
        navigate("/login");
    };

    if (carrinho.length === 0) {
        return (
            <div className="max-w-5xl mx-auto mt-20 p-4 text-center">
                <h2 className="text-2xl font-bold mb-4">Seu carrinho está vazio</h2>
                <Link to="/" className="text-blue-600 underline">
                    Voltar às compras
                </Link>
            </div>
        );
    }

    return (

        <div className="mt-14 p-4 max-w-[80%] mx-auto">
            <nav className="flex items-center space-x-2 md:space-x-4">
                <Link to="/" className="hover:underline text-blue-600">Início</Link>
                <span>/</span>
                <span className="text-gray-900 font-semibold">Carrinho de Compras</span>
            </nav><br />
            <h2 className="text-2xl font-bold mb-6">Carrinho de Compras</h2>

            <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-300 text-sm">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="p-2 text-left">Produto</th>
                            <th className="p-2 text-left">Cor</th>
                            <th className="p-2 text-left">Tamanho</th>
                            <th className="p-2 text-left">Qtd</th>
                            <th className="p-2 text-left">Preço</th>
                            <th className="p-2 text-left">Total</th>
                            <th className="p-2 text-left">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {carrinho.map((item, index) => (
                            <tr key={index} className="border-t border-gray-300">
                                <td className="p-2 flex items-center gap-2">
                                    <img src={item.image} alt={item.name} className="w-14 h-14 object-cover rounded" />
                                    <span>{item.name}</span>
                                </td>
                                <td className="p-2">{item.cor}</td>
                                <td className="p-2">{item.tamanho}</td>
                                <td className="p-2">{item.quantidade}</td>
                                <td className="p-2">{item.price}€</td>
                                <td className="p-2">{(item.price * item.quantidade).toFixed(2)}€</td>
                                <td className="p-2 space-x-2">
                                    <button
                                        onClick={() => removerItem(index)}
                                        className="text-red-500 hover:underline"
                                    >
                                        Remover
                                    </button>

                                    <a
                                        href={`/produto/${item.id}`}
                                        className="text-blue-500 hover:underline"
                                    >
                                        Ver Produto
                                    </a>
                                </td>
                            </tr>
                        ))}

                    </tbody>
                </table>
            </div>

            <div className="text-right mt-6">
                <h3 className="text-xl font-semibold">Total: {calcularTotal().toFixed(2)}€</h3>
                <button
                    onClick={finalizarCompra}
                    className="mt-4 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
                >
                    Finalizar Compra
                </button>
            </div>
        </div>
    );
};

export default Carrinho;
