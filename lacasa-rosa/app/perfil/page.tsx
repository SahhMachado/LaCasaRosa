"use server";

import { BiSolidShoppingBags } from "react-icons/bi";
import { FaArrowLeft } from "react-icons/fa6";
import { Poppins } from "next/font/google";
import { Major_Mono_Display } from "next/font/google";
import CirclesTop from "@/app/components/circles-top";
import CirclesBottom from "@/app/components/circles-bottom";
import BackgroundStripes from "@/app/components/background-stripes";
import FormUser from "./components/formUser";
import { userGetId } from "../api/user/route";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

const majorMono = Major_Mono_Display({
  subsets: ["latin"],
    weight: "400",
});

export default async function Perfil() {
    const usuario = await userGetId()
    console.log(usuario)

    return(
        <div className="w-screen h-screen relative flex flex-col bg-[#F2EBD5] text-black overflow-hidden">
            <CirclesTop />

            <div className={poppins.className + " ml-25 mt-80"}>
                <BiSolidShoppingBags size={80}/>
                <h1 className={majorMono.className + " text-4xl mt-2 mb-5"}>Bem-Vindo(a)!</h1>
                <h2 className="text-2xl">Este é seu perfil, fique à vontade para <br /> alterar sua foto</h2>
            </div>
            
            <div className={poppins.className + " relative z-10"}>
                            
                {/* Card */}
                <div className="bg-[#F2EBD5] w-[30%] h-auto p-10 rounded-2xl absolute right-40 -top-90">
                
                    <FormUser usuario={usuario} />

                    <div className="flex flex-col items-center text-sm mb-2 hover:scale-110">
                        <a href="../inicio"><FaArrowLeft size={40} className="text-[#F2594B]" /></a>
                    </div>
                </div>
            </div>
            <BackgroundStripes />
            <CirclesBottom />
        </div>
    )
}