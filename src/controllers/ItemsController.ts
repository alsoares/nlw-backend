import { Request, Response } from 'express';
import knex from '../database/connection';

export class ItemsController {
    
    public async get(request: Request, response: Response) {

        const items = await knex('items').select('*');
        
        const serializedItems = items.map(item => {
            return { 
                id: item.id,
                title: item.title,
                image_url: `http://${request.headers.host}/uploads/${item.image}`
            }
        })
        
        return response.json(serializedItems);
    }
}