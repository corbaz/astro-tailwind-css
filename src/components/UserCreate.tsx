import React, { useState, useCallback } from 'react';

interface UserCreateProps {
  // Define any props here, if needed
}

const UserCreate: React.FC<UserCreateProps> = () => {
  const [nombre, setNombre] = useState('');
  const [edad, setEdad] = useState('');
  const [email, setEmail] = useState('');
  const [sexo, setSexo] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();

    if (!nombre) {
      setError('Nombre es requerido');
      return;
    }

    if (!edad) {
      setError('Edad es requerida');
      return;
    }

    if (!email) {
      setError('Email es requerido');
      return;
    }

    if (!sexo) {
      setError('Sexo es requerido');
      return;
    }

    // Basic email validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Email inválido');
      return;
    }

     // Read existing users from db.json
    fetch('/src/databases/db.json')
      .then(response => response.json())
      .then(data => {
        const users = data.users || [];
        const newUser = {
          id: Date.now(), // Generate a unique ID
          nombre,
          edad,
          email,
          sexo
        };
        users.push(newUser);

        // Write the updated users array back to db.json
        return fetch('/src/databases/db.json')
          .then(response => response.json())
          .then(existingData => {
            const updatedData = {
              ...existingData,
              users: users
            };

            return fetch('/src/databases/db.json', {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(updatedData)
            });
          })
          .then(response => {
            if (!response.ok) {
              throw new Error('Failed to update db.json');
            }
            // Handle success (e.g., clear form, update user list)
            setNombre('');
            setEdad('');
            setEmail('');
            setSexo('');
            setError('');
          })
          .catch(error => {
            setError(error.message);
          });
      })
      .catch(error => {
        setError(error.message);
      });
  }, [nombre, edad, email, sexo]);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Create User</h2>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label htmlFor="nombre" className="block text-gray-700 text-sm font-bold mb-2">Nombre:</label>
          <input
            type="text"
            id="nombre"
            placeholder="Nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div>
          <label htmlFor="edad" className="block text-gray-700 text-sm font-bold mb-2">Edad:</label>
          <input
            type="number"
            id="edad"
            placeholder="Edad"
            value={edad}
            onChange={(e) => setEdad(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email:</label>
          <input
            type="email"
            id="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div>
          <label htmlFor="sexo" className="block text-gray-700 text-sm font-bold mb-2">Sexo:</label>
          <select
            id="sexo"
            value={sexo}
            onChange={(e) => setSexo(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="">Seleccionar</option>
            <option value="masculino">Masculino</option>
            <option value="femenino">Femenino</option>
            <option value="otro">Otro</option>
          </select>
        </div>
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Create</button>
      </form>
    </div>
  );
};

export default UserCreate;
