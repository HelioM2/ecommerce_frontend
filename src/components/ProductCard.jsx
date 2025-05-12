// const ProductCard = ({ product }) => {
//     if (!product || typeof product !== 'object') return null;

//     // Verifica se a lista de imagens existe e se não está vazia
//     const images = product.images ? JSON.parse(product.images) : [];
    
//     // Defina a URL da primeira imagem, ou uma imagem padrão se não houver imagens
//     const imageUrl = images.length > 0
//         ? `http://localhost:5000/uploads/${images[0]}`
//         : '/images/default.jpg'; // Imagem padrão

//     return (
//         <div className="bg-white rounded-xl shadow p-4 text-center">
//             {/* Imagem principal */}
//             <img
//                 src={imageUrl}
//                 alt={product.name || 'Produto'}
//                 className="w-full h-40 object-contain rounded-md bg-white"
//             />
            
//             {/* Exibe miniaturas das outras imagens, se existirem */}
//             {images.length > 1 && (
//                 <div className="mt-2 flex justify-center space-x-2">
//                     {images.slice(1).map((image, index) => (
//                         <img
//                             key={index}
//                             src={`http://localhost:5000/uploads/${image}`}
//                             alt={`Miniatura ${index + 1}`}
//                             className="w-16 h-16 object-cover rounded-md border"
//                         />
//                     ))}
//                 </div>
//             )}
            
//             {/* Informações do produto */}
//             <p className="text-black font-bold no-underline ">
//                 {product.price ? `${product.price}€` : 'Preço não disponível'}
//             </p>
//         </div>
//     );
// };

// export default ProductCard;

const ProductCard = ({ product }) => {
    if (!product || typeof product !== 'object') return null;

    // Extrair a primeira imagem da string separada por vírgulas
    const imageList = product.image ? product.image.split(',') : [];
    const imageUrl = imageList.length > 0
        ? `https://ecommercebackend-backend-afropoderosa.up.railway.app/uploads/${imageList[0]}`
        : '/images/default.jpg'; 
    return (
        <div className="bg-white rounded-xl shadow p-4 text-center">
            <img
                src={imageUrl}
                alt={product.name || 'Produto'}
                className="w-full h-40 object-contain rounded-md bg-white"
            />
            
             <p className="text-black font-bold no-underline ">
                {product.name ? `${product.name}` : 'Nome não disponível'}
            </p>
            <p className="text-black font-bold no-underline ">
                {product.price ? `${product.price}€` : 'Preço não disponível'}
            </p>
        </div>
    );
};


export default ProductCard;
