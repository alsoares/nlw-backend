import Knex from 'knex';

export async function up(knex: Knex){
    return knex.schema.createTableIfNotExists('points', table => {
        table.increments('id').primary();
        table.string('title').notNullable();
        table.string('image').notNullable();
     });

}
export async function down(knex: Knex){
    return knex.schema.dropTableIfExists('points');
}