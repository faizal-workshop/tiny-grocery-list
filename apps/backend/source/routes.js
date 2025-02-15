import { APP_NAME } from './configs.js';
import route from './fastify.js';
import db from './db.js';

function isDataExists(item, id = -1) {
    return db.some((i, index) =>
        index !== id && ((typeof i === "string" && typeof item === "string")
            ? i.toLowerCase() === item.toLowerCase()
            : i === item)
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
        return await res.status(201).send({
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
    const { item } = req.body || {};

    if (!item || typeof item !== "string") {
        return res.status(400).send({
            application: APP_NAME,
            message: "Invalid grocery item.",
        });
    }

    if (isDataExists(item)) {
        return res.status(400).send({
            application: APP_NAME,
            message: `Cannot add '${item}', same grocery already exists!`,
        });
    }

    try {
        db.push(item);

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
    const { item } = req.body || {};

    if (!item || typeof item !== "string") {
        return res.status(400).send({
            application: APP_NAME,
            message: "Invalid grocery item.",
        });
    }

    if (isNaN(id) || id < 0 || id >= db.length) {
        return res.status(400).send({
            application: APP_NAME,
            message: "Invalid grocery ID.",
        });
    }

    if (isDataExists(item, id)) {
        return res.status(400).send({
            application: APP_NAME,
            message: `Cannot edit item to '${item}', same grocery already exists!`,
        });
    }

    try {
        db[id] = item;

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
            message: "Invalid grocery ID.",
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
