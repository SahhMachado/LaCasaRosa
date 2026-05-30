import { BiSolidShoppingBags } from "react-icons/bi";
import { Poppins } from "next/font/google";
import { Major_Mono_Display } from "next/font/google";
import CirclesTop from "@/app/components/circles-top";
import CirclesBottom from "@/app/components/circles-bottom";
import BackgroundStripes from "@/app/components/background-stripes";
import { FaArrowLeft } from "react-icons/fa6";
import Image from "next/image";
import Link from "next/link";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

const majorMono = Major_Mono_Display({
  subsets: ["latin"],
    weight: "400",
});


export default function RecuperarSenha() {
    return(
        <div className="w-screen h-screen relative flex flex-col bg-[#F2EBD5] text-black overflow-hidden">
            <CirclesTop />

            <div className={poppins.className + " ml-25 mt-80"}>
                <BiSolidShoppingBags size={80}/>
                <h1 className={majorMono.className + " text-4xl mt-2 mb-5"}>Bem-Vindo(a)!</h1>
                <h2 className="text-2xl">Defina a nova senha para fazer login e <br /> acessar o sistema</h2>
            </div>
            
            <div className={poppins.className + " relative z-10"}>
                <div className="bg-[#F2EBD5] w-[30%] h-auto p-10 rounded-2xl absolute right-40 -top-80">
                    <div className="flex flex-col items-center mb-8">
                        <Image src="/images/logo.png" alt="Logo" width={83} height={70} />
                    </div>

                    <form className="mb-8">
                        <label>E-mail:</label>
                        <input placeholder="Exemplo: vendas@gmail.com" id="email" type="email" 
                        className="mb-8 w-full h-auto p-1 bg-[#F2C84B] rounded-md outline-none focus:outline-none shadow-md
                                    placeholder:font-light placeholder:text-sm placeholder:opacity-85" />

                        <label>Nova Senha:</label>
                        <input placeholder="Informe sua nova senha aqui..." id="senha" type="password" 
                        className="mb-8 w-full h-auto p-1 bg-[#F2C84B] rounded-md outline-none focus:outline-none shadow-md
                                    placeholder:font-light placeholder:text-sm placeholder:opacity-85" />     

                        <label>Confirmar Senha:</label>
                        <input placeholder="Confirme sua nova senha aqui..." id="confirmasenha" type="password" 
                        className="mb-12 w-full h-auto p-1 bg-[#F2C84B] rounded-md outline-none focus:outline-none shadow-md
                                    placeholder:font-light placeholder:text-sm placeholder:opacity-85" />      

                        <input id="salvar" value="Salvar" type="submit" className="bg-[#F2594B] w-full h-auto p-3 font-bold text-[#F2EBD5] text-xl rounded-md" />         
                    </form>

                    <Link href="/login" className="flex flex-col items-center text-sm mb-2">
                        <FaArrowLeft size={40} className="text-[#F2594B]" />
                    </Link>      
                </div>
            </div>
            <BackgroundStripes />
            <CirclesBottom />
        </div>
    )
}