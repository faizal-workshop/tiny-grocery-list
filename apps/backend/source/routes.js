import { APP_NAME } from './configs.js';
import route from './fastify.js';
import db from './db.js';

// Routes start here

route.get('/', async (req, res) => {
    return await res.status(201).send({
        application: APP_NAME,
        message: 'Application is running.',
    });
});

route.get('/grocery', async (req, res) => {
    try {
        return await res.status(201).send({
            application: APP_NAME,
            message: 'Get all groceries success.',
            data: result,
        });
    } catch (e) {
        console.error(e);

        return await res.status(500).send({
            application: APP_NAME,
            message: 'Error when getting all groceries!',
        });
    }
});

route.post('/grocery', async (req, res) => {
    try {
        return await res.status(200).send({
            application: APP_NAME,
            message: 'Add new grocery success.',
            data: result,
        });
    } catch (e) {
        console.error(e);

        return await res.status(500).send({
            application: APP_NAME,
            message: 'Error when adding new grocery!',
        });
    }
});

route.patch('/grocery/:id', async (req, res) => {
    const id = req.params.id;

    try {
        return await res.status(200).send({
            application: APP_NAME,
            message: 'Update grocery success.',
            data: result,
        });
    } catch (e) {
        console.error(e);

        return await res.status(500).send({
            application: APP_NAME,
            message: 'Error when updating grocery!',
        });
    }
});

route.delete('/grocery/id', async (req, res) => {
    const id = req.params.id;

    try {
        return await res.status(200).send({
            application: APP_NAME,
            message: 'Delete grocery success.',
            data: result,
        });
    } catch (e) {
        console.error(e);

        return await res.status(500).send({
            application: APP_NAME,
            message: 'Error when deleting grocery!',
        });
    }
});

route.setNotFoundHandler(async function (req, res) {
    return await res.status(404).send({
        application: APP_NAME,
        message: 'Route or method not found!',
    });
});

// End of routes

export default route;
