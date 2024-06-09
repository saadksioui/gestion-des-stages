import axios from "axios";
import { useState } from "react";
import { FaXmark } from "react-icons/fa6";
import Swal from "sweetalert2";

const EntrepriseModifier = ({ isOpen, onClose, handleCloseForm, stageData }) => {

    const storedData = localStorage.getItem("sessionToken");
    const storedId = storedData ? storedData.split(",")[1] : null;
console.log(stageData);
    const [titreF, setTitreF] = useState(stageData?.titre || '');
    const [descriptionF, setDescriptionF] = useState(stageData?.description || '');
    const [domaineF, setDomaineF] = useState(stageData?.domaine || '');
    const [localisationF, setLocalisationF] = useState(stageData?.localisation || '');
    const [competencesRequisesF, setCompetencesRequisesF] = useState(stageData?.competences_requises || '');
    const [dateDebutF, setDateDebutF] = useState(stageData?.date_debut || '');
    const [dureeF, setDureeF] = useState(stageData?.duree || '');
    const [typeStgF, setTypeStgF] = useState(stageData?.type_stage || '');
    const [statusF, setStatusF] = useState(stageData?.status || '');

    const dureeAvail = [1, 2, 4, 6];
    const statuss = ['ouvert', 'fermé', 'en cours', 'terminé'];
    const typeStgAvail = ['Observation et Initialisation', 'Application', "Fin D'études"];

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!titreF || !descriptionF || !domaineF || !localisationF || !competencesRequisesF || !dateDebutF || !dureeF || !typeStgF) {
            Swal.fire({
                iconColor: "black",
                icon: "error",
                title: "Oops…",
                text: "Please fill in all required fields.",
                confirmButtonColor: "black"
            });
            return;
        }

        const updatedStageData = {
            titre: titreF,
            description: descriptionF,
            domaine: domaineF,
            localisation: localisationF,
            competences_requises: competencesRequisesF,
            date_debut: dateDebutF,
            duree: dureeF,
            type_stage: typeStgF,
            status: statusF,
        };

        try {
            await axios.put(`http://127.0.0.1:8000/api/stage/edit/${storedId}`, updatedStageData);
            Swal.fire({
                icon: "success",
                title: "Success",
                text: "Stage updated successfully.",
            });
            handleCloseForm();
        } catch (error) {
            console.error('Error updating stage:', error);
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Failed to update the stage.",
            });
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex justify-center items-center h-screen px-10 font-poppins">
            <div className="border-2 border-black bg-white rounded-xl p-5">
                <div className="flex justify-between items-center border-b-[1px] border-[#99999] w-full pb-5">
                    <h1 className="text-2xl font-semibold">Modifier un stage</h1>
                    <button className="size-10 flex items-center justify-center text-lg border-2 border-black rounded-full" onClick={onClose}>
                        <FaXmark />
                    </button>
                </div>
                <div className="my-3">
                    <form onSubmit={handleSubmit}>
                        <div className="grid grid-cols-3 gap-5">
                            <div className="p-3 flex flex-col gap-2">
                                <label htmlFor="titreStage">Titre de stage:</label>
                                <input type="text" className="border-2 border-[#99999] h-8 rounded-md py-2 px-2 outline-none" placeholder="Titre" value={titreF} onChange={e => setTitreF(e.target.value)} />
                            </div>
                            <div className="p-3 flex flex-col gap-2">
                                <label htmlFor="description">Description:</label>
                                <input type="text" className="border-2 border-[#99999] h-8 rounded-md py-2 px-2 outline-none" placeholder="Description" value={descriptionF} onChange={e => setDescriptionF(e.target.value)} />
                            </div>
                            <div className="p-3 flex flex-col gap-2">
                                <label htmlFor="domaine">Domaine:</label>
                                <input type="text" className="border-2 border-[#99999] h-8 rounded-md py-2 px-2 outline-none" placeholder="Domaine" value={domaineF} onChange={e => setDomaineF(e.target.value)} />
                            </div>
                            <div className="p-3 flex flex-col gap-2">
                                <label htmlFor="localisation">Localisation:</label>
                                <input type="text" className="border-2 border-[#99999] h-8 rounded-md py-2 px-2 outline-none" placeholder="Localisation" value={localisationF} onChange={e => setLocalisationF(e.target.value)} />
                            </div>
                            <div className="p-3 flex flex-col gap-2">
                                <label htmlFor="competencesRequises">Compétences Requises:</label>
                                <input type="text" className="border-2 border-[#99999] h-8 rounded-md py-2 px-2 outline-none" placeholder="Compétences Requises" value={competencesRequisesF} onChange={e => setCompetencesRequisesF(e.target.value)} />
                            </div>
                            <div className="p-3 flex flex-col gap-2">
                                <label htmlFor="dateDebut">Date Début:</label>
                                <input type="date" className="border-2 border-[#99999] h-8 rounded-md py-2 px-2 outline-none" value={dateDebutF} onChange={e => setDateDebutF(e.target.value)} />
                            </div>
                            <div className="p-3 flex flex-col gap-2">
                                <label htmlFor="duree">Durée:</label>
                                <select name="duree" className="border-2 border-[#99999] rounded-md py-2 px-2 outline-none" value={dureeF} onChange={e => setDureeF(e.target.value)}>
                                    <option value="">Sélectionner une durée</option>
                                    {dureeAvail.map((item) => (
                                        <option key={item} value={item}>{item} mois</option>
                                    ))}
                                </select>
                            </div>
                            <div className="p-3 flex flex-col gap-2">
                                <label htmlFor="typeStg">Type de Stage:</label>
                                <select name="typeStg" className="border-2 border-[#99999] rounded-md py-2 px-2 outline-none" value={typeStgF} onChange={e => setTypeStgF(e.target.value)}>
                                    <option value="">Sélectionner un type de stage</option>
                                    {typeStgAvail.map((item) => (
                                        <option key={item} value={item}>{item}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="p-3 flex flex-col gap-2">
                                <label htmlFor="status">Status:</label>
                                <select name="status" className="border-2 border-[#99999] rounded-md py-2 px-2 outline-none" value={statusF} onChange={e => setStatusF(e.target.value)}>
                                    <option value="">Sélectionner un status</option>
                                    {statuss.map((item) => (
                                        <option key={item} value={item}>{item}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="flex justify-end gap-10 items-center border-t-[1px] border-[#99999] w-full pt-2">
                            <button type="button" onClick={onClose} className="text-red-600">Fermer</button>
                            <button type="submit" className="bg-black py-2 px-4 text-white rounded-xl flex items-center justify-center text-lg">
                                Modifier
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EntrepriseModifier;
