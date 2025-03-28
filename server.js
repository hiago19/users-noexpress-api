import http from 'http';
import { parse } from 'url';
import userRoutes from './routes/userRoutes.js';

const PORT = 3000;

const server = http.createServer((req, res) => {
    const parsedUrl = parse(req.url, true); // Faz o parse da URL
    req.query = parsedUrl.query;            // Adiciona os parâmetros de query

    // Chama as rotas de usuário
    userRoutes(req, res, parsedUrl);
});

server.listen(PORT, () => {
    console.log(`🚀 Server running on port: ${PORT}`);
});
