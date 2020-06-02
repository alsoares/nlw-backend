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
    
    const ids = await knex('points').insert({
        name,
        email,
        whatsapp,
        latitude,
        longitude,
        uf,
        city,
        image: 'fake'
    });

    const pointItems = items.map((item_id: number) => {
        return {
            item_id,
            point_id: ids[0]
        };
    });

    await knex('point_items').insert(pointItems);

    return response.json({sucess: true});
});

export default routes;