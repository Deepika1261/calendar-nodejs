const knex = require('knex');
const config = require('../knexfile');
const db = knex(config.development);
module.exports = {
    add_event,
    update_event,
    retrieve_events,
    delete_events
};

async function add_event(event) {
    const [id] = await db('eventsTable').insert(event);
    return id
}

async function update_event(id, event) {
    const updated_event = await db('eventsTable').where('id', id).update(event, ['id', 'time', 'subject'], { includeTriggerModifications: true })
    return updated_event
}

function retrieve_events() {
    return db('eventsTable');
}

async function delete_events(id_val) {
    const deleted_event = await db('eventsTable').where('id', id_val ).del(['id'])
    return deleted_event
}