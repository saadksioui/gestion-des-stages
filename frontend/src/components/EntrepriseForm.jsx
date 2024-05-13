import { useState } from "react";
import { FaXmark } from "react-icons/fa6";
import Swal from "sweetalert2";

const EntrepriseForm = ({ isOpen, onClose, handleCloseModal }) => {
    const [titreF, setTitreF] = useState('');
    const [descriptionF, setDescriptionF] = useState('');
    const [domaineF, setDomaineF] = useState('');
    const [localisationF, setLocalisationF] = useState('');
    const [competencesRequisesF, setCompetencesRequisesF] = useState('');
    const [dateDebutF, setDateDebutF] = useState('');
    const [dureeF, setDureeF] = useState('');
    const [typeStgF, setTypeStgF] = useState('');

    const dureeAvail = [
        '1 mois',
        '2 mois',
        '4 mois',
        '6 mois',
    ]

    const typeStgAvail = [
        'Observation et Initialisation',
        'Application',
        "Fin D'études",
    ]

    const handleSubmit = (e) => {
        e.preventDefault()

        const emptyFields = [titreF, descriptionF, domaineF, localisationF, competencesRequisesF, dateDebutF, dureeF, typeStgF].filter(field => field === '').length > 0;

        if (emptyFields) {
            Swal.fire({
                iconColor: "black",
                icon: "error",
                title: "Oops…",
                text: "Please fill in all required fields.",
                confirmButtonColor: "black"
            });
            return;
        }
        else {
            const stageData = {
                titre: titreF,
                description: descriptionF,
                domaine: domaineF,
                localisation: localisationF,
                competences_requises: competencesRequisesF,
                date_debut: dateDebutF,
                duree: dureeF,
                type_stage: typeStgF,
            }

            console.log("Form submitted:", stageData);

            setTitreF('')
            setDescriptionF('')
            setDomaineF('')
            setLocalisationF('')
            setCompetencesRequisesF('')
            setDateDebutF('')
            setDureeF('')
            setTypeStgF('')

            handleCloseModal();
        }
    }

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex justify-center items-center h-screen px-10 font-poppins">
            <div className="border-2 border-black bg-white rounded-xl p-5">
                {/* Header */}
                <div className="flex justify-between items-center border-b-[1px] border-[#99999] w-full pb-5">
                    <h1 className="text-2xl font-semibold">Ajouter un stage</h1>
                    <button className="size-10 flex items-center justify-center text-lg border-2 border-black rounded-full" onClick={onClose}>
                        <FaXmark />
                    </button>
                </div>
                {/* Body */}
                <div className="my-3">
                    <form onSubmit={handleSubmit}>
                        <div className="grid grid-cols-3 gap-5">
                            <div className="p-3 flex flex-col gap-2">
                                <label htmlFor="titreStage">Titre de stage:</label>
                                <input type="text" className="border-2 border-[#99999] h-8 rounded-md py-2 px-2 outline-none" value={titreF} onChange={e => setTitreF(e.target.value)} />
                            </div>
                            <div className="p-3 flex flex-col gap-2">
                                <label htmlFor="description">Description:</label>
                                <input type="text" className="border-2 border-[#99999] h-8 rounded-md py-2 px-2 outline-none" value={descriptionF} onChange={e => setDescriptionF(e.target.value)} />
                            </div>
                            <div className="p-3 flex flex-col gap-2">
                                <label htmlFor="domaine">Domaine:</label>
                                <input type="text" className="border-2 border-[#99999] h-8 rounded-md py-2 px-2 outline-none" value={domaineF} onChange={e => setDomaineF(e.target.value)} />
                            </div>
                            <div className="p-3 flex flex-col gap-2">
                                <label htmlFor="localisation">Localisation:</label>
                                <input type="text" className="border-2 border-[#99999] h-8 rounded-md py-2 px-2 outline-none" value={localisationF} onChange={e => setLocalisationF(e.target.value)} />
                            </div>
                            <div className="p-3 flex flex-col gap-2">
                                <label htmlFor="competencesRequises">Competences Requises:</label>
                                <input type="text" className="border-2 border-[#99999] h-8 rounded-md py-2 px-2 outline-none" value={competencesRequisesF} onChange={e => setCompetencesRequisesF(e.target.value)} />
                            </div>
                            <div className="p-3 flex flex-col gap-2">
                                <label htmlFor="dateDebut">Date Debut:</label>
                                <input type="date" className="border-2 border-[#99999] h-8 rounded-md py-2 px-2 outline-none" value={dateDebutF} onChange={e => setDateDebutF(e.target.value)} />
                            </div>
                            <div className="p-3 flex flex-col gap-2">
                                <label htmlFor="duree">Durée:</label>
                                <select name="duree" className="border-2 border-[#99999] rounded-md py-2 px-2 outline-none" value={dureeF} onChange={e => setDureeF(e.target.value)}>
                                    <option>Séléctionner une durée</option>
                                    {
                                        dureeAvail.map((item) => (
                                            <option value={item}>{item}</option>
                                        ))
                                    }
                                </select>
                            </div>
                            <div className="p-3 flex flex-col gap-2">
                                <label htmlFor="typeStg">Type de Stage:</label>
                                <select name="typeStg" className="border-2 border-[#99999] rounded-md py-2 px-2 outline-none" value={typeStgF} onChange={e => setTypeStgF(e.target.value)}>
                                    <option>Séléctionner un type de stage</option>
                                    {
                                        typeStgAvail.map((item) => (
                                            <option value={item}>{item}</option>
                                        ))
                                    }
                                </select>
                            </div>
                        </div>
                        {/* Footer */}
                        <div className="flex justify-end gap-10 items-center border-t-[1px] border-[#99999] w-full pt-2">
                            <button onClick={onClose} className="text-red-600">Fermer</button>
                            <button type="submit" className="bg-black py-2 px-4 text-white rounded-xl flex items-center justify-center text-lg">
                                Ajouter
                            </button>
                        </div>
                    </form>
                </div>

            </div>
        </div>
    )
};

export default EntrepriseForm
