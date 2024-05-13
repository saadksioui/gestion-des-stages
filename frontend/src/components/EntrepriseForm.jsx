import React, { useState } from 'react';

const EntrepriseForm = () => {
  const [titre, setTitre] = useState('');
  const [description, setDescription] = useState('');
  const [domaine, setDomaine] = useState('');
  const [localisation, setLocalisation] = useState('');
  const [competencesRequises, setCompetencesRequises] = useState([]);
  const [dateDebut, setDateDebut] = useState('');
  const [duree, setDuree] = useState('');

 

  const handleSubmit = (e) => {
    e.preventDefault();
    //...
    
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Titre:
        <input  type="text" value={titre} onChange={(e) => setTitre(e.target.value)} />
      </label> <br />
      <label>
        Description:
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
      </label><br />
      <label>
        Domaine:
        <input type="text" value={domaine} onChange={(e) => setDomaine(e.target.value)} />
      </label><br />
      <label>
        Localisation:
        <input type="text" value={localisation} onChange={(e) => setLocalisation(e.target.value)} />
      </label><br />
      <label>
        Compétences Requises:
        <select value={competencesRequises} onChange={(e) => setCompetencesRequises(e.target.value)}>
          <option value="competence1">Compétence 1</option>
          <option value="competence2">Compétence 2</option>
          <option value="competence3">Compétence 3</option>
        </select>
      </label><br />
      <label>
        Date de Début:
        <input type="date" value={dateDebut} onChange={(e) => setDateDebut(e.target.value)} />
      </label><br />
      <label>
        Durée:
        <input type="number" value={duree} onChange={(e) => setDuree(e.target.value)} />
      </label><br />
      <button className='bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded' type="submit">Soumettre</button>
    </form>
  );
};

export default EntrepriseForm;
