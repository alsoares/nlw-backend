import { Request, Response } from 'express';
import knex from '../database/connection';
export class PointsController {

    public async create(request: Request, response: Response)
    {
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
        
        const trx = await knex.transaction();
    
        const point = {
            name,
            email,
            whatsapp,
            latitude,
            longitude,
            uf,
            city,
            image: 'fake'
        };
        const insertedIds = await trx('points').insert(point);
    
        const point_id = insertedIds[0];
        
        const pointItems = items.map((item_id: number) => {
            return {
                item_id,
                point_id
            };
        });
    
        await trx('point_items').insert(pointItems);
    
        return response.json(
            {
                id: point_id,
                ... point
            }
        );
    }

    public async get(request: Request, response: Response){
        const { id } = request.params;

        const point = await knex('points').where('id', id).first();

        if(!point)
            return response.status(404).json({message: 'Point not found'});
        
        return response.json(point);
    }

}