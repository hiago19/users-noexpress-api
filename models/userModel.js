// Simulação de um "banco de dados"
export const users = [
    { id: 1, nome: 'teste', sobrenome: 'teste', idade: 25 },
];

// Função para gerar um novo ID
export const generateId = () => users.length ? users[users.length - 1].id + 1 : 1;