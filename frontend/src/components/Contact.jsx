import UserLayout from "../layouts/UserLayout";
import { IoLocation, IoMail } from "react-icons/io5";
import { FaPhone } from "react-icons/fa6";

const Contact = () => {
    return (
        <UserLayout>
            <div className="px-10 mt-10">
                <h1 className="text-5xl h-1/6 mb-20 font-bold">Contact-Nous</h1>
                <div className="w-full h-5/6 flex items-start gap-14">
                    <div className="w-1/2 h-1/2 flex justify-center gap-5 items-center">
                        <div className="flex flex-col gap-5">
                            <h1 className="text-3xl font-semibold">Parlez avec nous</h1>
                            <p className="text-2xl">Des questions, des commentaires ou des suggestions ? Remplissez simplement le formulaire et nous vous contacterons sous peu.</p>
                            <div className="flex flex-col gap-3">
                                <p className="font-normal flex gap-5 items-start">
                                    <IoLocation className="text-3xl" />
                                    <span className="text-xl text-[#327AF8] font-medium w-[332px]">1029 Route Bouskoura, km 9, 20190 Casablanca</span>
                                </p>
                                <p className="font-normal flex gap-5 items-center">
                                    <FaPhone className="text-3xl" />
                                    <span className="text-xl text-[#327AF8] font-medium">(+212) 622 222 222</span>
                                </p>
                                <p className="font-normal flex gap-5 items-center">
                                    <IoMail className="text-3xl" />
                                    <span className="text-xl text-[#327AF8] font-medium">e.stage@gmail.com</span>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="w-1/2 h-1/2">
                        <form className="w-full h-1/2 flex flex-col gap-5">
                            <div className="flex w-full items-center gap-10">
                                <div className="p-3 w-1/2 flex flex-col gap-2 border rounded-xl">
                                    <label htmlFor="prenom">Prénom</label>
                                    <input className="outline-none text-lg" type="text" name="prenom" placeholder="Votre prénom.." />
                                </div>
                                <div className="p-3 w-1/2 flex flex-col gap-2  border rounded-xl">
                                    <label htmlFor="nom">Nom</label>
                                    <input className="outline-none text-lg" type="text" name="nom" placeholder="Votre nom.." />
                                </div>
                            </div>
                            <div className="w-full p-3 flex flex-col gap-2 border rounded-xl">
                                <label htmlFor="email">Email</label>
                                <input className="outline-none text-lg" type="email" name="email" placeholder="Votre email.." />
                            </div>
                            <div className="w-full p-3 flex flex-col gap-2 border rounded-xl">
                                <label htmlFor="phone">Numéro de téléphone</label>
                                <input className="outline-none text-lg" type="text" name="phone" placeholder="Votre Numéro de téléphone.." />
                            </div>
                            <div className="w-full p-3 flex flex-col gap-2 border rounded-xl">
                                <label htmlFor="message">Message</label>
                                <textarea id="message" rows="4" class="outline-none block w-full text-lg text-gray-900" placeholder="Votre message.."></textarea>
                            </div>
                            <button className="w-full h-11 p-3 flex justify-center items-center font-medium gap-2 bg-black text-white rounded-xl">
                                Envoyer le message
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </UserLayout>
    )
};

export default Contact;
