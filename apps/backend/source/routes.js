import { APP_NAME } from './configs.js';
import route from './fastify.js';
import db from './db.js';

function isDataExists(name, id = -1) {
    return db.some((i, index) =>
        index !== id && ((typeof i.name === 'string' && typeof name === 'string')
            ? i.name.toLowerCase() === name.toLowerCase()
            : i.name === name)
    );
}

// Routes start here

route.get('/', async (req, res) => {
    return await res.status(201).send({
        application: APP_NAME,
        message: 'Application is running.',
    });
});

route.get('/grocery', async (req, res) => {
    try {
        return await res.status(200).send({
            application: APP_NAME,
            message: db.length
                ? 'Get all groceries success.'
                : 'There is currently no grocery.',
            data: db.length ? [...db] : undefined,
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
    const { name = '' } = req.body || {};

    if (!name) {
        return res.status(400).send({
            application: APP_NAME,
            message: 'Invalid name, cannot add new grocery item!',
        });
    }

    if (isDataExists(name)) {
        return res.status(400).send({
            application: APP_NAME,
            message: `Cannot add '${name}', same grocery already exists!`,
        });
    }

    try {
        db.unshift({ name, done: false });

        return await res.status(201).send({
            application: APP_NAME,
            message: 'Add new grocery success.',
            data: [...db],
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
    const id = parseInt(req.params.id, 10);
    const { name = '', done = false } = req.body || {};

    if (name !== undefined && typeof name !== 'string') {
        return res.status(400).send({
            application: APP_NAME,
            message: 'Invalid name, cannot edit grocery item!',
        });
    }

    if (typeof done !== 'boolean') {
        return res.status(400).send({
            application: APP_NAME,
            message: 'Invalid "done" value. It must be a boolean!',
        });
    }

    if (isNaN(id) || id < 0 || id >= db.length) {
        return res.status(400).send({
            application: APP_NAME,
            message: 'Invalid grocery ID!',
        });
    }

    if (isDataExists(name, id)) {
        return res.status(400).send({
            application: APP_NAME,
            message:
                `Cannot edit name to '${name}', same grocery already exists!`,
        });
    }

    try {
        const data = { ...db[id] };
        if (name) data.name = name;
        data.done = done;

        db[id] = { ...data };

        return await res.status(200).send({
            application: APP_NAME,
            message: 'Update grocery success.',
            data: [...db],
        });
    } catch (e) {
        console.error(e);

        return await res.status(500).send({
            application: APP_NAME,
            message: 'Error when updating grocery!',
        });
    }
});

route.delete('/grocery/:id', async (req, res) => {
    const id = parseInt(req.params.id, 10);

    if (isNaN(id) || id < 0 || id >= db.length) {
        return res.status(400).send({
            application: APP_NAME,
            message: 'Invalid grocery ID!',
        });
    }

    try {
        db.splice(id, 1);

        return await res.status(200).send({
            application: APP_NAME,
            message: 'Delete grocery success.',
            data: [...db],
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
