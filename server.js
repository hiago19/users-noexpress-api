import http from 'http';
import { parse } from 'url'; // Importando parse para trabalhar com parâmetros da URL

const PORT = 3000;

const users = [
    { id: 1, nome: 'Bruno', sobrenome: 'Hiago', idade: 25 }
];

// Criando servidor
const server = http.createServer((req, res) => {
    const { method, url } = req;
    const parsedUrl = parse(url, true); // Faz o parse da URL para acessar parâmetros
    let body = '';

    req.on('data', (chunk) => {
        body += chunk.toString();
    });

    req.on('end', () => {
        res.setHeader('Content-Type', 'application/json');

        // Método de listagem de usuários
        if (method === 'GET' && parsedUrl.pathname === '/users') {
            const { id, nome, sobrenome, idade } = parsedUrl.query;

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

            /*
            // Se não encontrar nenhum usuário, retorna 404
            if (filteredUsers.length === 0) {
                res.writeHead(404);
                return res.end(JSON.stringify({ message: 'User not found' }));
            }
            */

            res.writeHead(200);
            return res.end(JSON.stringify(filteredUsers));
        }

        // Método de listagem de usuário específico
        if (method === 'GET' && parsedUrl.pathname === '/user') {
            const { id } = parsedUrl.query;

            if (!id) {
                res.writeHead(400);
                return res.end(JSON.stringify({ message: 'User ID required' }));
            }

            const user = users.find(user => user.id === parseInt(id));

            if (!user) {
                res.writeHead(404);
                return res.end(JSON.stringify({ message: 'User not found' }));
            }

            res.writeHead(200);
            return res.end(JSON.stringify(user));
        }

        // Método de criação de usuário
        if (method === 'POST' && parsedUrl.pathname === '/user') {
            try {
                const { nome, sobrenome, idade } = JSON.parse(body);
                if (!nome || !sobrenome || !idade) {
                    res.writeHead(400);
                    return res.end(JSON.stringify({ message: 'Missing fields' }));
                }

                const newUser = { id: users.length + 1, nome, sobrenome, idade };
                users.push(newUser);

                res.writeHead(201);
                return res.end(JSON.stringify({ message: 'User created', user: newUser }));
            } catch (error) {
                res.writeHead(400);
                return res.end(JSON.stringify({ message: 'Invalid JSON' }));
            }
        }

        // Método de atualização de usuário
        if (method === 'PUT' && parsedUrl.pathname === '/user') {
            const { id } = parsedUrl.query; // Acessando o ID pela query

            if (!id) {
                res.writeHead(400);
                return res.end(JSON.stringify({ message: 'User ID required' }));
            }

            try {
                const { nome, sobrenome, idade } = JSON.parse(body);
                const user = users.find(user => user.id === parseInt(id));

                if (!user) {
                    res.writeHead(404);
                    return res.end(JSON.stringify({ message: 'User not found' }));
                }

                user.nome = nome || user.nome;
                user.sobrenome = sobrenome || user.sobrenome;
                user.idade = idade || user.idade;

                res.writeHead(200);
                return res.end(JSON.stringify({ message: 'User updated', user }));
            } catch (error) {
                res.writeHead(400);
                return res.end(JSON.stringify({ message: 'Invalid JSON' }));
            }
        }

        // Método de exclusão de usuário
        if (method === 'DELETE' && parsedUrl.pathname === '/user') {
            const { id } = parsedUrl.query;

            if (!id) {
                res.writeHead(400);
                return res.end(JSON.stringify({ message: 'User ID required' }));
            }

            const index = users.findIndex(user => user.id === parseInt(id));

            if (index === -1) {
                res.writeHead(404);
                return res.end(JSON.stringify({ message: 'User not found' }));
            }

            users.splice(index, 1);

            res.writeHead(200);
            return res.end(JSON.stringify({ message: 'User deleted' }));
        }

        res.writeHead(404);
        res.end(JSON.stringify({ message: 'Route not found' }));
    });
});

// Iniciando servidor
server.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
});