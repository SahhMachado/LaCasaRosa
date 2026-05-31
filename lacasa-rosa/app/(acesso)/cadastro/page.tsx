"use client";

import { BiSolidShoppingBags } from "react-icons/bi";
import { Poppins } from "next/font/google";
import { Major_Mono_Display } from "next/font/google";
import CirclesTop from "@/app/components/circles-top";
import CirclesBottom from "@/app/components/circles-bottom";
import BackgroundStripes from "@/app/components/background-stripes";
import Image from "next/image";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa6";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

const majorMono = Major_Mono_Display({
  subsets: ["latin"],
    weight: "400",
});


export default function Cadastro() {
    const [showPassword, setShowPassword] = useState(false);

    const [cpf, setCpf] = useState("");
    
    const formatCPF = (value: string) => {
        return value
            .replace(/\D/g, "")
            .replace(/(\d{3})(\d)/, "$1.$2")
            .replace(/(\d{3})(\d)/, "$1.$2")
            .replace(/(\d{3})(\d{1,2})$/, "$1-$2")
            .slice(0, 14);
    };
    
    return(
        <div className="w-screen h-screen relative flex flex-col bg-[#F2EBD5] text-black overflow-hidden">
            <CirclesTop />

            <div className={poppins.className + " ml-25 mt-80"}>
                <BiSolidShoppingBags size={80}/>
                <h1 className={majorMono.className + " text-4xl mt-2 mb-5"}>Bem-Vindo(a)!</h1>
                <h2 className="text-2xl">Realize seu cadastro <br /> para acessar o sistema</h2>
            </div>
            
            <div className={poppins.className + " relative z-10"}>
                <div className="bg-[#F2EBD5] w-[30%] h-auto p-10 rounded-2xl absolute right-40 -top-90">
                    <div className="flex flex-col items-center mb-8">
                        <Image src="/images/logo.png" alt="Logo" width={83} height={70} />
                    </div>

                    <form className="mb-8">
                        <label>Nome:</label>
                        <input placeholder="Informe seu nome aqui..." id="nome" type="text" 
                        className="mb-8 w-full h-auto px-3 p-1 bg-[#F2C84B] rounded-md outline-none focus:outline-none shadow-md
                                    placeholder:font-light placeholder:text-black placeholder:text-sm placeholder:opacity-60 text-[#F2594B] font-bold" />

                        <label>CPF:</label>
                        <input value={cpf} onChange={(e) => setCpf(formatCPF(e.target.value))} placeholder="Informe seu CPF aqui, sem pontos e traço..." id="cpf" type="text" 
                        className="mb-8 w-full h-auto px-3 p-1 bg-[#F2C84B] rounded-md outline-none focus:outline-none shadow-md
                                    placeholder:font-light placeholder:text-black placeholder:text-sm placeholder:opacity-60 text-[#F2594B] font-bold" />

                        <label>E-mail:</label>
                        <input placeholder="Exemplo: vendas@gmail.com" id="email" type="email" 
                        className="mb-8 w-full h-auto p-1 bg-[#F2C84B] rounded-md outline-none focus:outline-none shadow-md
                                    placeholder:font-light placeholder:text-black placeholder:text-sm placeholder:opacity-60 text-[#F2594B] font-bold" />

                        <label>Senha:</label>
                        <input placeholder="Informe sua senha aqui..." id="senha" type={showPassword ? "text" : "password"}
                        className="mb-12 w-full h-auto px-3 p-1 bg-[#F2C84B] rounded-md outline-none focus:outline-none shadow-md
                                    placeholder:font-light placeholder:text-black placeholder:text-sm placeholder:opacity-60 text-[#F2594B] font-bold" />
                        <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-14 bottom-51 text-[#F2594B]" >
                            {showPassword ? <FaEyeSlash size={22} /> : <FaEye size={22} />}   
                        </button>       

                        <input id="cadastrar" value="Cadastrar" type="submit" 
                                className="bg-[#F2594B] w-full h-auto p-3 font-bold text-[#F2EBD5] text-xl rounded-md hover:shadow-xl" />         
                    </form>

                    <div className="flex flex-col items-center text-sm mb-2">
                        <p className="text-[#F25EA3] font-light">Já possui login? <a href="/login" className="font-bold hover:underline">Clique aqui!</a></p>
                    </div>      
                </div>
            </div>
            <BackgroundStripes />
            <CirclesBottom />
        </div>
    )
}