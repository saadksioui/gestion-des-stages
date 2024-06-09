import axios from "axios";
import { useState } from "react";
import { FaXmark } from "react-icons/fa6";
import Swal from "sweetalert2";

const EntrepriseModifier = ({ isOpen, onClose, handleCloseForm, stageData }) => {

    const storedData = localStorage.getItem("sessionToken");
    let stored= storedData.split(",");
console.log(stageData);
    const [titreF, setTitreF] = useState(stageData.titre);
    const [descriptionF, setDescriptionF] = useState(stageData.description);
    const [domaineF, setDomaineF] = useState(stageData.domaine);
    const [localisationF, setLocalisationF] = useState(stageData.localisation);
    const [competencesRequisesF, setCompetencesRequisesF] = useState(stageData.competencesRequises);
    const [dateDebutF, setDateDebutF] = useState(stageData.date_debut);
    const [dureeF, setDureeF] = useState(stageData.duree);
    const [typeStgF, setTypeStgF] = useState(stageData.typeStg);
    const [titre, setTitre] = useState('');
    const [description, setDescription] = useState('');
    const [domaine, setDomaine] = useState('');
    const [localisation, setLocalisation] = useState('');
    const [competencesRequises, setCompetencesRequises] = useState('');
    const [dateDebut, setDateDebut] = useState('');
    const [duree, setDuree] = useState('');
    const [typeStg, setTypeStg] = useState('');

    const dureeAvail = [
        1,
        2,
        4,
        6,
    ]

    const typeStgAvail = [
        'Observation et Initialisation',
        'Application',
        "Fin D'études",
    ]

    const handleSubmit = async(e) => {
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
                entreprise: stored[1],
                duree: dureeF,
                type_stage: typeStgF,
            }

            console.log("Form submitted:", stageData);
            try {
                const response = await axios.post('http://127.0.0.1:8000/api/stage/add', stageData);
                console.log('Stage added:', response.data);
                handleCloseModal();
                Swal.fire({
                    icon: "success",
                    title: "Success",
                    text: "Stage added successfully.",
                });
            } catch (error) {
                console.error('Error adding stage:', error);
            }
            setTitreF('')
            setDescriptionF('')
            setDomaineF('')
            setLocalisationF('')
            setCompetencesRequisesF('')
            setDateDebutF('')
            setDureeF('')
            setTypeStgF('')

            handleCloseForm();
        }
    }

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex justify-center items-center h-screen px-10 font-poppins">
            <div className="border-2 border-black bg-white rounded-xl p-5">
                {/* Header */}
                <div className="flex justify-between items-center border-b-[1px] border-[#99999] w-full pb-5">
                    <h1 className="text-2xl font-semibold">Modifier un stage</h1>
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
                                <input type="text" className="border-2 border-[#99999] h-8 rounded-md py-2 px-2 outline-none" placeholder={titreF} value={titre} onChange={e => setTitre(e.target.value)} />
                            </div>
                            <div className="p-3 flex flex-col gap-2">
                                <label htmlFor="description">Description:</label>
                                <input type="text" className="border-2 border-[#99999] h-8 rounded-md py-2 px-2 outline-none" placeholder={descriptionF} value={description} onChange={e => setDescription(e.target.value)} />
                            </div>
                            <div className="p-3 flex flex-col gap-2">
                                <label htmlFor="domaine">Domaine:</label>
                                <input type="text" className="border-2 border-[#99999] h-8 rounded-md py-2 px-2 outline-none" placeholder={domaineF} value={domaine} onChange={e => setDomaine(e.target.value)} />
                            </div>
                            <div className="p-3 flex flex-col gap-2">
                                <label htmlFor="localisation">Localisation:</label>
                                <input type="text" className="border-2 border-[#99999] h-8 rounded-md py-2 px-2 outline-none" placeholder={localisationF} value={localisation} onChange={e => setLocalisation(e.target.value)} />
                            </div>
                            <div className="p-3 flex flex-col gap-2">
                                <label htmlFor="competencesRequises">Competences Requises:</label>
                                <input type="text" className="border-2 border-[#99999] h-8 rounded-md py-2 px-2 outline-none" placeholder={competencesRequises} value={competencesRequises} onChange={e => setCompetencesRequises(e.target.value)} />
                            </div>
                            <div className="p-3 flex flex-col gap-2">
                                <label htmlFor="dateDebut">Date Debut:</label>
                                <input type="date" className="border-2 border-[#99999] h-8 rounded-md py-2 px-2 outline-none" placeholder={dateDebutF} value={dateDebut} onChange={e => setDateDebut(e.target.value)} />
                            </div>
                            <div className="p-3 flex flex-col gap-2">
                                <label htmlFor="duree">Durée:</label>
                                <select name="duree" className="border-2 border-[#99999] rounded-md py-2 px-2 outline-none" value={duree} onChange={e => setDuree(e.target.value)}>
                                    <option>Séléctionner une durée</option>
                                    {
                                        dureeAvail.map((item) => (
                                            <option value={item} selected={item === dureeF ? true : false}>{item} mois</option>
                                        ))
                                    }
                                </select>
                            </div>
                            <div className="p-3 flex flex-col gap-2">
                                <label htmlFor="typeStg">Type de Stage:</label>
                                <select name="typeStg" className="border-2 border-[#99999] rounded-md py-2 px-2 outline-none" value={typeStg} onChange={e => setTypeStg(e.target.value)}>
                                    <option>Séléctionner un type de stage</option>
                                    {
                                        typeStgAvail.map((item) => (
                                            <option value={item} selected={item === typeStgF ? true : false}>{item}</option>
                                        ))
                                    }
                                </select>
                            </div>
                        </div>
                        {/* Footer */}
                        <div className="flex justify-end gap-10 items-center border-t-[1px] border-[#99999] w-full pt-2">
                            <button onClick={onClose} className="text-red-600">Fermer</button>
                            <button type="submit" className="bg-black py-2 px-4 text-white rounded-xl flex items-center justify-center text-lg">
                                Modifier
                            </button>
                        </div>
                    </form>
                </div>

            </div>
        </div>
    )
};

export default EntrepriseModifier
