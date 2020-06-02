import express from 'express';
import knex from './database/connection';

const routes = express.Router();

routes.get('/items', async (request, response) => {
    const items = await knex('items').select('*');
    
    const serializedItems = items.map(item => {
        return { 
            id: item.id,
            title: item.title,
            image_url: `http://localhost:3333/upload/${item.image}`
        }
    })
    
    return response.json(serializedItems);
});

routes.post('/points', async (request, response) => {
    
    const {
        name,
        email,
        whatsapp,
        latitude,
        longitude,
        uf,
        city,
        items
    } = request.body;
    
    await knex('points').insert({
        name,
        email,
        whatsapp,
        latitude,
        longitude,
        uf,
        city,
        image: 'fake'
    });

    return response.json({sucess: true});
});

export default routes;