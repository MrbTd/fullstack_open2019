import React, { useState, useEffect } from "react";
import axios from "axios";
import Person from "./components/Person";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState(0);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    console.log("effect");
    axios.get("http://localhost:3001/persons").then(response => {
      console.log("promise fulfilled");
      setPersons(response.data);
    });
  }, []);

  const handleNameChange = event => {
    setNewName(event.target.value);
  };
  const handleNumberChange = event => {
    setNewNumber(event.target.value);
  };
  const handleSearchChange = event => {
    console.log(event.target.value);
    setSearchValue(event.target.value);
  };
  const handleFormChange = event => {
    event.preventDefault();
    addName();
  };

  const addName = event => {
    const nameObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1
    };

    const checkedName =
      persons
        .map(({ name }) => name.toLowerCase())
        .indexOf(nameObject.name.toLowerCase()) > -1;
    console.log(checkedName);
    if (checkedName) {
      window.alert(`${newName} is already added to phonebook`);
    } else {
      axios.post("http://localhost:3001/persons", nameObject).then(response => {
        setPersons(persons.concat(response.data));
        setNewName("");
        setNewNumber(0);
      });
    }
  };

  // let nameRows = () =>
  //   persons.map((person, i) => <Person key={i} person={person.name} number={person.number} />);
  // console.log(persons);
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter
        searchValue={searchValue}
        handleSearchChange={handleSearchChange}
      />
      <h3>add</h3>
      <PersonForm
        handleFormChange={handleFormChange}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h2>numbers</h2>
      <Person persons={persons} searchValue={searchValue} />
    </div>
  );
};

export default App;
