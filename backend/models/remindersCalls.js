const knex = require('knex');
const config = require('../knexfile');
const db = knex(config.development);
module.exports = {
    add_reminder,
    update_reminder,
    delete_reminder
};
function findRemById(id){
    return db('remindersTable').where({id}).first();
}
async function add_reminder(reminder, event_id) {
    const [id] = await db('remindersTable').where({event_id}).insert(reminder);
    return findRemById(id)
}