import { BiSolidShoppingBags } from "react-icons/bi";
import { FaArrowLeft } from "react-icons/fa6";
import { Poppins } from "next/font/google";
import { Major_Mono_Display } from "next/font/google";
import CirclesTop from "@/app/components/circles-top";
import CirclesBottom from "@/app/components/circles-bottom";
import BackgroundStripes from "@/app/components/background-stripes";
import Image from "next/image";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

const majorMono = Major_Mono_Display({
  subsets: ["latin"],
    weight: "400",
});


export default function Perfil() {
    return(
        <div className="w-screen h-screen relative flex flex-col bg-[#F2EBD5] text-black overflow-hidden">
            <CirclesTop />

            <div className={poppins.className + " ml-25 mt-80"}>
                <BiSolidShoppingBags size={80}/>
                <h1 className={majorMono.className + " text-4xl mt-2 mb-5"}>Bem-Vindo(a)!</h1>
                <h2 className="text-2xl">Este é seu perfil, fique à vontade para <br /> alterar sua foto</h2>
            </div>
            
            <div className={poppins.className + " relative z-10"}>
                <div className="bg-[#F2EBD5] w-[30%] h-auto p-10 rounded-2xl absolute right-40 -top-90">
                    <div className="flex flex-col items-center mb-8">
                        {/* <Image src="/images/logo.png" alt="Logo" width={83} height={70} /> */}
                    </div>


                    <form className="mb-8">
                        <label>Nome:</label>
                        <input readOnly value="#" id="email" type="text" 
                        className="mb-8 w-full h-auto p-1 bg-[#F2C84B] rounded-md outline-none focus:outline-none shadow-md
                                    placeholder:font-light placeholder:text-sm placeholder:opacity-85 text-black/50" />

                        <label>CPF:</label>
                        <input readOnly value="#" id="email" type="text" 
                        className="mb-8 w-full h-auto p-1 bg-[#F2C84B] rounded-md outline-none focus:outline-none shadow-md
                                    placeholder:font-light placeholder:text-sm placeholder:opacity-85 text-black/50" />

                        <label>E-mail:</label>
                        <input readOnly value="#" id="email" type="email" 
                        className="mb-8 w-full h-auto p-1 bg-[#F2C84B] rounded-md outline-none focus:outline-none shadow-md
                                    placeholder:font-light placeholder:text-sm placeholder:opacity-85 text-black/50" />

                        <label>Senha:</label>
                        <input readOnly value="#" id="senha" type="password" 
                        className="mb-8 w-full h-auto p-1 bg-[#F2C84B] rounded-md outline-none focus:outline-none shadow-md
                                    placeholder:font-light placeholder:text-sm placeholder:opacity-85 text-black/50" />         

                        <input id="salvar" value="Salvar" type="submit" className="bg-[#F2594B] w-full h-auto p-3 font-bold text-[#F2EBD5] text-xl rounded-md" />         
                    </form> 

                    <div className="flex flex-col items-center text-sm mb-2">
                        <a href="../inicio"><FaArrowLeft size={40} className="text-[#F2594B]" /></a>
                    </div>
                </div>
            </div>
            <BackgroundStripes />
            <CirclesBottom />
        </div>
    )
}