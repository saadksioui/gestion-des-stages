import React, { useState } from 'react';

const EntrepriseForm = () => {
    const [titre, setTitre] = useState('');
    const [description, setDescription] = useState('');
    const [domaine, setDomaine] = useState('');
    const [localisation, setLocalisation] = useState('');
    const [competencesRequises, setCompetencesRequises] = useState([]);
    const [dateDebut, setDateDebut] = useState('');
    const [duree, setDuree] = useState('');
    const [typeStg, setTypestg] = useState('');



    const handleSubmit = (e) => {
        e.preventDefault();
        //...

    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <div>
                    <label>
                        Titre:
                        <input type="text" value={titre} onChange={(e) => setTitre(e.target.value)} />
                    </label>
                </div>
                <div>
                    <label>
                        Description:
                        <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
                    </label>
                </div>
                <div>
                    <label>
                        Domaine:
                        <input type="text" value={domaine} onChange={(e) => setDomaine(e.target.value)} />
                    </label>
                </div>
                <div>
                    <label>
                        Localisation:
                        <input type="text" value={localisation} onChange={(e) => setLocalisation(e.target.value)} />
                    </label>
                </div>
                <div>
                    <label>
                        Compétences Requises:
                        <input type="text" value={competencesRequises} onChange={(e) => setCompetencesRequises(e.target.value)} />
                    </label>
                </div>
                <div>
                    <label>
                        Date de Début:
                        <input type="date" value={dateDebut} onChange={(e) => setDateDebut(e.target.value)} />
                    </label>
                </div>
                <div>
                    <label>
                        Durée:
                        <select value={duree} onChange={(e) => setDuree(e.target.value)}>
                            <option value="20Jours">20 Jours</option>
                            <option value="1Mois">1 Mois</option>
                            <option value="2Mois">2 Mois</option>
                            <option value="4Mois">4 Mois</option>
                            <option value="6Mois">6 Mois</option>
                        </select>
                    </label></div>
                <div>
                    <label>
                        Type de Stage:
                        <select value={typeStg} onChange={(e) => setTypestg(e.target.value)}>
                            <option value="Observation">Observation et Initialisation</option>
                            <option value="Application">Application</option>
                            <option value="findetudes">Fin D'études </option>
                        </select>
                    </label></div>
                <button className='bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded' type="submit">Soumettre</button>
            </div>
        </form>
    );
};

export default EntrepriseForm;
