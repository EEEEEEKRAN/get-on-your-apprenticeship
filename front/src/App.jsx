import { useState, useEffect } from 'react';
import logo from './assets/hogwarts.png';
import './App.css';

function App() {
  const [students, setStudents] = useState(null);
  const [randomStudent, setRandomStudent] = useState(null);
  const [page, setPage] = useState(1); // Ajout de l'état page
  const limit = 5; // Nombre d'étudiants par page

  useEffect(() => {
    const fetchStudents = async () => {
      const response = await fetch(`http://localhost:3000/real/students`);
      const data = await response.json();
      setStudents(data);
    };
  
    fetchStudents();
  }, [page]);

  const selectRandomStudent = () => {
    const randomIndex = Math.floor(Math.random() * students.length);
    setRandomStudent(students[randomIndex]);
  };

  const nextPage = () => { // Ajout de la fonction nextPage
    setPage(prevPage => prevPage + 1);
  };

  const prevPage = () => { // Ajout de la fonction prevPage
    setPage(prevPage => prevPage > 1 ? prevPage - 1 : 1);
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div className="App-content">
          <div className="App-intro">
            <p>Voici la liste de tout les étudiants :</p>
            {students ? (
              <>
                {students.slice((page - 1) * limit, page * limit).map(student =>
                  <div className="student-card" key={student._id}>
                    <div className="student-name">{student.name}</div>
                    <div className="student-details">{student.house}</div>
                    <div className="student-nickname">{student.nickname}</div>
                  </div>
                )}
                <button onClick={prevPage}>Page précédente</button>
                <button onClick={nextPage}>Page suivante</button>
                <button onClick={selectRandomStudent}>Sélectionner un étudiant aléatoire</button>
                <p>Étudiant aléatoire choisi :</p>
                {randomStudent && (
                  <div className="student-card">
                    <div className="student-name">{randomStudent.name}</div>
                    <div className="student-details">{randomStudent.house}</div>
                    <div className="student-nickname">{randomStudent.nickname}</div>
                  </div>
                )}
              </>
            ) : "Loading..."}
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;