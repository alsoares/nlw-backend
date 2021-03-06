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
            image: 'https://pegaki.com.br/wp-content/uploads/2019/05/Loja.png'
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

        await trx.commit();
    
        return response.json(
            {
                id: point_id,
                ... point
            }
        );
    }

    public async getById(request: Request, response: Response){
        
        const { id } = request.params;

        const point = await knex('points')
            .where('id', id)
            .first();

        if(!point){
            return response
                .status(404)
                .json({message: 'Point not found'});
        }

        const items = await knex('items')
            .join('point_items', 'items.id', '=', 'point_items.item_id')
            .where('point_items.point_id', id)
            .select('items.title');
            
        return response.json({point, items});
    }

    public async get(request: Request, response: Response){
        const { uf, city, items } = request.query;

        const parsedItems = String(items)
            .split(',')
            .map(item => Number(item.trim()));
            
        const points = await knex('points')
            .join('point_items', 'points.id', '=', 'point_items.point_id')
            .whereIn('point_items.item_id', parsedItems)
            .where('city', String(city))
            .where('uf', String(uf))
            .distinct()
            .select('points.*');

        return response.json(points);
        
    }

}