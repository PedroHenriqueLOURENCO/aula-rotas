// AdicionarProdutos.jsx

import { useState , useEffect } from 'react';
import { useNavigate , useParams} from 'react-router-dom';
import { ListaProdutos } from '../Components/ListaProdutos';

export default function AdicionarProdutos() {
    // Código adicional para incluir a parte de trazer os dados do produto ao add um novo
    const { id } = useParams();
    const [produto, setProduto] = useState({
        id: "",
        nome: "",
        preco: "",
    });

    useEffect(() => {
        if (id) {
            const produtoRecuperado = ListaProdutos.find(
                (produto) => produto.id === parseInt(id)
            );
            if (produtoRecuperado) {
                setProduto({
                    nome: produtoRecuperado.nome,
                    preco: produtoRecuperado.preco,
                });
            }
        }
    }, [id]);

    // Código normal para adicionar produtos
    document.title = 'Adicionar Produto';

    // Inicializando o useNavigate
    const navigate = useNavigate();



    const handleChangeProduto = (event) => {
        const { name, value } = event.target;
        setProduto({ ...produto, [name]: value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
    
        // Somente atribua um novo ID se não estiver definido já
        if (!produto.id) {
            produto.id = ListaProdutos[ListaProdutos.length - 1].id + 1;
        }
    
        // Adicionando o novo produto à lista
        ListaProdutos.push(produto);
        
        alert('Produto adicionado com sucesso!');
        navigate('/produtos');
    };

    return (
        <>
            <div>
                <h1>Adicionar Produto</h1>
                <div>
                    <form onSubmit={handleSubmit}>
                        <fieldset>
                            <legend>Novo Produto</legend>
                            <div>
                                <label htmlFor="idNome">Nome:</label>
                                <input
                                    type="text"
                                    name="nome"
                                    id="idNome"
                                    onChange={handleChangeProduto}
                                    value={produto.nome}
                                />
                            </div>
                            <div>
                                <label htmlFor="idPreco">Preço:</label>
                                <input
                                    type="number"
                                    name="preco"
                                    id="idPreco"
                                    onChange={handleChangeProduto}
                                    value={produto.preco}
                                />
                            </div>
                            <div>
                                <button>ADICIONAR</button>
                            </div>
                        </fieldset>
                    </form>
                </div>
                <p>Nome : {produto.nome}</p>
                <p>Preço : {produto.preco}</p>
            </div>
        </>
    );
}
