import React, { useState } from 'react';
import { FaXmark } from "react-icons/fa6";
import Swal from 'sweetalert2';

const EntrepriseForm = ({ isOpen, onClose,handleSubmit, ...formValues }) => {
    const [titreF, setTitreF] = useState(formValues.titre || '');
    const [descriptionF, setDescriptionF] = useState(formValues.description || '');
    const [domaineF, setDomaineF] = useState(formValues.domaine || '');
    const [localisationF, setLocalisationF] = useState(formValues.localisation || '');
    const [competencesRequisesF, setCompetencesRequisesF] = useState(formValues.competencesRequises || '');
    const [dateDebutF, setDateDebutF] = useState(formValues.dateDebut || '');
    const [dureeF, setDureeF] = useState(formValues.duree || '');
    const [typeStgF, setTypeStgF] = useState(formValues.typeStg || '');



    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50">
            <div className="bg-white h-[541px] my-5 overflow-y-scroll p-6 rounded-lg w-[80%] max-w-md">
                <div className='flex items-center mb-4 justify-between'>
                    <h2 className="text-2xl font-bold">Ajouter un stage</h2>
                    <button className="size-10 border-2 border-black rounded-full flex items-center justify-center" onClick={onClose}>
                        <FaXmark />
                    </button>
                </div>
                <form onSubmit={handleSubmit} className="max-w-full">
                    <div className="mb-4">
                        <label htmlFor="titre" className="block text-gray-700 font-bold mb-2">Titre:</label>
                        <input type="text" id="titre" value={titreF} onChange={(e) => setTitreF(e.target.value)} className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="description" className="block text-gray-700 font-bold mb-2">Description:</label>
                        <input type='text' id="description" value={descriptionF} onChange={(e) => setDescriptionF(e.target.value)} className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="domaine" className="block text-gray-700 font-bold mb-2">Domaine:</label>
                        <input type="text" id="domaine" value={domaineF} onChange={(e) => setDomaineF(e.target.value)} className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="localisation" className="block text-gray-700 font-bold mb-2">Localisation:</label>
                        <input type="text" id="localisation" value={localisationF} onChange={(e) => setLocalisationF(e.target.value)} className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="competencesRequises" className="block text-gray-700 font-bold mb-2">Compétences Requises:</label>
                        <input type="text" id="competencesRequises" value={competencesRequisesF} onChange={(e) => setCompetencesRequisesF(e.target.value)} className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="dateDebut" className="block text-gray-700 font-bold mb-2">Date de Début:</label>
                        <input type="date" id="dateDebut" value={dateDebutF} onChange={(e) => setDateDebutF(e.target.value)} className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="duree" className="block text-gray-700 font-bold mb-2">Durée:</label>
                        <select id="duree" value={dureeF} onChange={(e) => setDureeF(e.target.value)} className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                            <option value="20Jours">20 Jours</option>
                            <option value="1Mois">1 Mois</option>
                            <option value="2Mois">2 Mois</option>
                            <option value="4Mois">4 Mois</option>
                            <option value="6Mois">6 Mois</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="typeStg" className="block text-gray-700 font-bold mb-2">Type de Stage:</label>
                        <select id="typeStg" value={typeStgF} onChange={(e) => setTypeStgF(e.target.value)} className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                            <option value="Observation">Observation et Initialisation</option>
                            <option value="Application">Application</option>
                            <option value="findetudes">Fin D'études</option>
                        </select>
                    </div>
                    <button className="bg-black hover:bg-gray-900 text-white font-bold py-2 px-4 rounded-xl w-full" type="submit">Soumettre</button>

                </form>
            </div>
        </div>
    );
};

export default EntrepriseForm;
