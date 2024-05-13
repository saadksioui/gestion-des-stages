import { icons } from "../constants";
import UserLayout from "../layouts/UserLayout";

const Contact = () => {
    return (
        <UserLayout>
            <section className="px-10 mt-10 w-full h-full">
                <h1 className="text-5xl h-1/5 font-bold">Contact-Nous</h1>
                <div className="w-full h-4/5 flex items-center gap-14">
                    <div className="w-1/2 h-1/2 flex justify-center gap-5 items-center">
                        <div>
                            <h1 className="text-3xl font-semibold">Parlez avec nous</h1>
                            <p className="text-2xl">Des questions, des commentaires ou des suggestions ? Remplissez simplement le formulaire et nous vous contacterons sous peu.</p>
                            <div className="flex flex-col gap-3">
                                <p className="font-normal flex gap-2 items-center">
                                    <img src={icons.Mail} alt="" />
                                    <span>e.stage@gmail.com</span>
                                </p>
                                <p className="font-normal flex gap-2 items-center">
                                    <img src={icons.Phone} alt="" />
                                    <span>(+212) 622 222 222</span>
                                </p>
                                <p className="font-normal flex gap-2 items-start">
                                    <img src={icons.Location} alt="" />
                                    <span>1029 Route Bouskoura, km 9, 20190 Casablanca</span>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="w-1/2 h-full">
                        <form className="w-full h-1/2 flex flex-col gap-5">
                            <div className="flex w-full items-center gap-10">
                                <div className="p-3 w-1/2 flex flex-col gap-2 border rounded-xl">
                                    <label htmlFor="prenom">Prénom</label>
                                    <input type="text" placeholder="Votre prénom.." />
                                </div>
                                <div className="p-3 w-1/2 flex flex-col gap-2  border rounded-xl">
                                    <label htmlFor="nom">Nom</label>
                                    <input type="text" placeholder="Votre nom.." />
                                </div>
                            </div>
                            <div className="w-full p-3 flex flex-col gap-2 border rounded-xl">
                                <label htmlFor="email">Email</label>
                                <input type="email" placeholder="Votre email.." />
                            </div>
                            <div className="w-full p-3 flex flex-col gap-2 border rounded-xl">
                                <label htmlFor="phone">Phone Number</label>
                                <input type="text" placeholder="Votre Numéro de téléphone.." />
                            </div>
                            <div className="w-full p-3 flex flex-col gap-2 border rounded-xl">
                                <label htmlFor="message">Message</label>
                                <input type="text" name="message" placeholder="Votre message.." required />
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </UserLayout>
    )
};

export default Contact
