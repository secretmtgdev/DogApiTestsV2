import React, { useEffect, useState } from "react";

function App() {
  const [dogImgSrcs, setDogImgSrcs] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [dogData, setDogData] = useState('');
  const [allBreeds, setAllBreeds] = useState([]);
  const [currentBreed, setCurrentBreed] = useState('');

  const randomCount = 10;

  useEffect(() => {
    async function getRandomDogsBreeds(breed) {
      const dogImages = [];
      for(let i = 0; i < randomCount; i++) {
        let dogImgSrc = await fetch(`https://dog.ceo/api/breed/${breed}/images/random`)
            .then(res => res.json())
            .then(dogContent => dogContent.message);
        dogImages.push(dogImgSrc);
      }
      setDogImgSrcs(dogImages);
    }
    getRandomDogsBreeds(currentBreed);
  }, [currentBreed]);

  const handleImgClick = (dogData) => {
    setShowModal(!showModal);
    setDogData(dogData);
  }

  useEffect(() => {
    async function getAllDogs() {
      const dogBreeds = await fetch('https://dog.ceo/api/breeds/list/all')
        .then(res => res.json())
        .then(dogContent => Object.keys(dogContent.message));
      setAllBreeds(dogBreeds);
    }
    getAllDogs();
  }, []);

  return (
    <div>
      <div className='header'>
        <h1>Hi get me pics of dogs</h1>
      </div>
      <div id='controls'>
        <label htmlFor="dog-breed">Please select a dog breed</label><br />
        <select id='dog-breeds'>
          {allBreeds.length != 0 && allBreeds.map(dogBreed => <option value={dogBreed}>{dogBreed}</option>)}
        </select>
        <br />
        <button onClick={() => {
          const dogBreedSelection = document.getElementById('dog-breeds');
          setCurrentBreed(dogBreedSelection.value);
        }}>Fetch!</button>
      </div>
      <div className='dog-container'>
        {dogImgSrcs.length != 0 && 
          dogImgSrcs.map(imgSrc => 
          <img onClick={() => handleImgClick(imgSrc)} className='dog-img' src={imgSrc} />
        )}
        {showModal && <div id='modal'>
          <div id='modal-data-container'>
            {dogData}
            <br />
            <button className='modal-button' onClick={() => setShowModal(!showModal)}>Close modal</button>
          </div>
        </div>}
      </div>
    </div>
  );
}
 
export default App;
