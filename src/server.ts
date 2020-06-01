import express from 'express';

const app = express();

app.get('/users', (request, response) => {
    console.log('Listagem de usuários');

    response.json([
        'André',
        'Luiz',
        'Rodrigues',
        'Soares'
    ]);
});

app.listen(3333,() => {
    console.log('Rodando em http://localhost:3333/');
});
