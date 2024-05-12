import React from 'react';

const ContactUsPage = () => {
    return (
        <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="col-span-1 md:col-span-2">
                    <div className="contact-info">
                        <h2 className="text-2xl font-semibold mb-4">Contactez-Nous</h2>
                        <div className="mb-4">
                            <input type="text" className="border border-gray-300 rounded-md py-2 px-4 w-full" placeholder="Nom" />
                        </div>
                        <div className="mb-4">
                            <input type="text" className="border border-gray-300 rounded-md py-2 px-4 w-full" placeholder="Prénom" />
                        </div>
                        <div className="mb-4">
                            <input type="email" className="border border-gray-300 rounded-md py-2 px-4 w-full" placeholder="Email" />
                        </div>
                        <div className="mb-4">
                            <input type="tel" className="border border-gray-300 rounded-md py-2 px-4 w-full" placeholder="Téléphone" />
                        </div>
                        <div className="mb-4">
                            <textarea className="border border-gray-300 rounded-md py-2 px-4 w-full" rows="5" placeholder="Message"></textarea>
                        </div>
                    </div>
                    <div className="additional-info">
                        <div className="location flex items-center mb-4">
                            <img src="location_icon.png" alt="Location" className="w-6 h-6 mr-2" />
                            <p className="text-gray-600">Sidi Maarouf, Casablanca. Autoroute Casa-kech.</p>
                        </div>
                        <div className="phone flex items-center mb-4">
                            <img src="phone_icon.png" alt="Téléphone" className="w-6 h-6 mr-2" />
                            <p className="text-gray-600">+212 645-789-123</p>
                        </div>
                        <div className="message flex items-center mb-4">
                            <img src="message_icon.png" alt="Message" className="w-6 h-6 mr-2" />
                            <p className="text-gray-600">Contact@ofppt.ma</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ContactUsPage;
