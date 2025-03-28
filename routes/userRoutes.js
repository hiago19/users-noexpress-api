import {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
} from '../controllers/userController.js';

const userRoutes = (req, res, parsedUrl) => {
    const { method, pathname } = parsedUrl;
    console.log('Chegou em userRoutes:', { method, pathname });
    
    let body = '';
    req.on('data', chunk => {
        body += chunk.toString();
    });

    req.on('end', () => {
        // Rota: GET /users (lista com filtros)
        if (method === 'GET' && pathname === '/users') return getUsers(req, res);

        // Rota: GET /user (busca por ID)
        if (method === 'GET' && pathname === '/user') return getUserById(req, res);

        // Rota: POST /user (criação de usuário)
        if (method === 'POST' && pathname === '/user') return createUser(req, res, body);

        // Rota: PUT /user (atualização de usuário)
        if (method === 'PUT' && pathname === '/user') return updateUser(req, res, body);

        // Rota: DELETE /user (exclusão de usuário)
        if (method === 'DELETE' && pathname === '/user') return deleteUser(req, res);

        // Se a rota não for encontrada
        res.writeHead(404);
        res.end(JSON.stringify({ message: 'Route not found' }));
    });
};

export default userRoutes;