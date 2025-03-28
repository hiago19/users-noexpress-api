import { users, generateId } from '../models/userModel.js';

// Lista todos os usuários ou filtra por parâmetros
export const getUsers = (req, res) => {
    const { id, nome, sobrenome, idade } = req.query;
    let filteredUsers = users;

    if (id) {
        filteredUsers = filteredUsers.filter(user => user.id === parseInt(id));
    }

    if (nome) {
        filteredUsers = filteredUsers.filter(user => user.nome.toLowerCase() === nome.toLowerCase());
    }

    if (sobrenome) {
        filteredUsers = filteredUsers.filter(user => user.sobrenome.toLowerCase() === sobrenome.toLowerCase());
    }

    if (idade) {
        filteredUsers = filteredUsers.filter(user => user.idade === parseInt(idade));
    }

    if (filteredUsers.length === 0) {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ message: 'User not found' }));
    }

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(filteredUsers));
};

// Busca um usuário pelo ID
export const getUserById = (req, res) => {
    const { id } = req.query;

    if (!id) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ message: 'User ID required' }));
    }

    const user = users.find(user => user.id === parseInt(id));
    if (!user) {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ message: 'User not found' }));
    }

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(user));
};

// Cria um novo usuário
export const createUser = (req, res, body) => {
    try {
        const { nome, sobrenome, idade } = JSON.parse(body);

        if (!nome || !sobrenome || !idade) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify({ message: 'Missing fields' }));
        }

        const newUser = { id: generateId(), nome, sobrenome, idade };
        users.push(newUser);

        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'User created', user: newUser }));
    } catch (error) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Invalid JSON' }));
    }
};

// Atualiza um usuário existente
export const updateUser = (req, res, body) => {
    const { id } = req.query;

    if (!id) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ message: 'User ID required' }));
    }

    try {
        const { nome, sobrenome, idade } = JSON.parse(body);
        const user = users.find(user => user.id === parseInt(id));

        if (!user) {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify({ message: 'User not found' }));
        }

        user.nome = nome || user.nome;
        user.sobrenome = sobrenome || user.sobrenome;
        user.idade = idade || user.idade;

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'User updated', user }));
    } catch (error) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Invalid JSON' }));
    }
};

// Deleta um usuário
export const deleteUser = (req, res) => {
    const { id } = req.query;

    if (!id) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ message: 'User ID required' }));
    }

    const index = users.findIndex(user => user.id === parseInt(id));
    if (index === -1) {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ message: 'User not found' }));
    }

    users.splice(index, 1);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'User deleted' }));
};