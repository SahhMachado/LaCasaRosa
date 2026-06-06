"use client";

import { useState } from "react";
import { Poppins } from "next/font/google";
import { Major_Mono_Display } from "next/font/google";
import { IoSearchOutline } from "react-icons/io5";
import { BsListStars } from "react-icons/bs";
import { FaUser } from "react-icons/fa6";
import { BsFillHandbagFill } from "react-icons/bs";
import Menu from "@/app/components/menu";
import Link from "next/link";
import SearchBar from "@/app/components/searchbar";

type ItemCarrinho = {
    id: number;
    nome: string;
    preco: number;
    imagem: string;
    quantidade: number;
};

type ProdutosProps = {
    produto_id: number;
    produto_nome: string;
    produto_preco: number;
    produto_tamanho: string;
    produto_categoria: string;
    produto_imagem: string;
    produto_estoque: number;
    produto_status: string;
}

const poppins = Poppins({
    subsets: ["latin"],
    weight: ["300", "400", "500", "700"],
});

const majorMono = Major_Mono_Display({
    subsets: ["latin"],
    weight: "400",
});

export default function Inicio({ produtos }: { produtos: ProdutosProps[] }) {
    const [aberto, setAberto] = useState(false); //controle para o menu lateral

    const [mensagem, setMensagem] = useState(""); //controle para a mensagem exibida ao adicionar o item no carrinho

    //adicionar produto ao carrinho
    const adicionar = (produto: ItemCarrinho) => {
        const carrinhoAtual = JSON.parse(
            localStorage.getItem("carrinho") || "[]"
        );

        const existente = carrinhoAtual.find(
            (item: ItemCarrinho) => item.id === produto.id
        );

        if (existente) {
            existente.quantidade += 1;
        } else {
            carrinhoAtual.push({
                ...produto,
                quantidade: 1,
            });
        }

        localStorage.setItem(
            "carrinho",
            JSON.stringify(carrinhoAtual)
        );

        setMensagem(`${produto.nome} adicionado ao carrinho!`);
        setTimeout(() => {
            setMensagem("");
        }, 2000);
    };

    return (
        <div className={poppins.className + " w-screen h-screen bg-[#F2EBD5] flex flex-col overflow-hidden"}>

            {/* Menu principal */}
            <header className="bg-[#F25EA3] flex justify-center items-center gap-65 p-10">
                <button onClick={() => setAberto(true)} className="bg-[#f2c84b]/70 text-[#F2594B] w-20 h-20 rounded-full shadow-md flex items-center justify-center">
                    <BsListStars size={60} />
                </button>

                <h1 className={majorMono.className + " text-4xl mt-2 mb-5"}>O que você está buscando?</h1>

                <Link href="/perfil" className="bg-[#f2c84b]/70 text-[#F2594B] w-20 h-20 rounded-full shadow-md flex items-center justify-center">
                    <FaUser size={50} />
                </Link>
            </header>

            <Menu aberto={aberto} fechar={() => setAberto(false)} />

            {/* Barra de pesquisa */}
            <div className="text-[#F2EBD5] bg-[#f25ea3ad] w-full flex text-center justify-center relative">
                <SearchBar
                    placeholder="Pesquise aqui..."
                    className="outline-none focus:outline-none p-1 placeholder:text-[#F2EBD5]
                                w-150 text-center bg-transparent text-[#F2EBD5]"
                />
                <IoSearchOutline size={20} className="text-[#F2EBD5] absolute right-100 top-1/2 -translate-y-1/2" />
            </div>

            {/* Área de produtos */}
            <div className="text-black text-sm mt-10 flex-1 overflow-y-auto">
                <div className="flex flex-wrap justify-center items-center gap-y-5 gap-x-44">

                    {
                        produtos.map((produto) => (
                            <div key={produto.produto_id} className="flex flex-col text-center mt-5">
                                <img src={`data:image/jpeg;base64,${produto.produto_imagem}`} className="w-45 h-45 mb-4 border-2 border-[#F25EA3] shadow-lg rounded-xl" />
                                <p>{produto.produto_nome}</p>
                                <p>
                                    {Number(produto.produto_preco).toLocaleString("pt-BR", {
                                        style: "currency",
                                        currency: "BRL",
                                    })}
                                </p>
                                <button onClick={() =>
                                    adicionar({
                                        id: produto.produto_id,
                                        nome: produto.produto_nome,
                                        preco: produto.produto_preco,
                                        imagem: produto.produto_imagem,
                                        quantidade: 1,
                                    })
                                }
                                    className="bg-[#F25EA3] p-1 rounded-md shadow-md mt-5 hover:scale-110">
                                    Adicionar
                                </button>
                            </div>
                        ))
                    }
                </div>
            </div>

            {mensagem && (
                <div className="fixed top-5 right-5 z-50 bg-[#F2EBD5] text-[#F25EA3] px-6 py-3
                                rounded-lg shadow-lg font-bold">
                    <span>{mensagem}</span>
                </div>
            )}

            {/* Botão para finalizar a venda */}
            <Link href="/finalizar-venda">
                <div className="absolute bg-[#F25EA3] text-[#F2EBD5] w-25 h-25 bottom-10 right-15 shadow-md rounded-full 
                                flex items-center justify-center hover:scale-110">
                    <BsFillHandbagFill size={60} />
                </div>
            </Link>
        </div>
    )
}