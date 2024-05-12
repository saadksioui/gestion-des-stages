import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const ContactUsPage = () => {
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-3">
                    <nav className="navbar navbar-expand-md navbar-light bg-light">
                        <ul className="navbar-nav flex-column">
                            <li className="nav-item">
                                <h4 className="nav-link">Menu</h4>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Stage</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Documents</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Message</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Support</a>
                            </li>
                        </ul>
                    </nav>
                </div>
                <div className="col-md-9">
                    <div className="contact-info">
                        <h2>Contactez-Nous</h2>
                        <div className="mb-3">
                            <input type="text" className="form-control" placeholder="Nom" />
                        </div>
                        <div className="mb-3">
                            <input type="text" className="form-control" placeholder="Prénom" />
                        </div>
                        <div className="mb-3">
                            <input type="email" className="form-control" placeholder="Email" />
                        </div>
                        <div className="mb-3">
                            <input type="tel" className="form-control" placeholder="Téléphone" />
                        </div>
                        <div className="mb-3">
                            <textarea className="form-control" rows="5" placeholder="Message"></textarea>
                        </div>
                    </div>
                    <div className="additional-info">
                        <div className="location">
                            <img src="location_icon.png" alt="Location" />
                            <p className="mb-0">Sidi Maarouf, Casablanca. Autoroute Casa-kech.</p>
                        </div>
                        <div className="phone">
                            <img src="phone_icon.png" alt="Téléphone" />
                            <p className="mb-0">+212 645-789-123</p>
                        </div>
                        <div className="message">
                            <img src="message_icon.png" alt="Message" />
                            <p className="mb-0">Contact@ofppt.ma</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ContactUsPage;
