import {
    VITE_APP_NAME,
    VITE_BACKEND,
} from '$env/static/private';
import { json } from '@sveltejs/kit';
import axios from 'axios';

export async function POST({ request }) {
    const { name = '' } = await request.json() || {};

    try {
        const response = await axios.post(`${VITE_BACKEND}/grocery`, {
            name,
        });

        return json({
            application: VITE_APP_NAME,
            message: response.data.message,
            data: response.data.data,
        });
    } catch (e) {
        console.error(e);

        return json({
            application: VITE_APP_NAME,
            message: e,
        }, {
            status: 500,
        });
    }
}

export async function PATCH({ url, request }) {
    const id = url.searchParams.get('id');
    const { name = '', done = false } = await request.json() || {};

    try {
        const data = {};
        if (name) data.name = name;
        data.done = done;

        const response = await axios.patch(`${VITE_BACKEND}/grocery/${id}`, data);

        return json({
            application: VITE_APP_NAME,
            message: response.data.message,
            data: response.data.data,
        });
    } catch (e) {
        console.error(e);

        return json({
            application: VITE_APP_NAME,
            message: e,
        }, {
            status: 500,
        });
    }
}

export async function DELETE({ url, request }) {
    const id = url.searchParams.get('id');

    try {
        const response = await axios.delete(`${VITE_BACKEND}/grocery/${id}`);

        return json({
            application: VITE_APP_NAME,
            message: response.data.message,
            data: response.data.data,
        });
    } catch (e) {
        console.error(e);

        return json({
            application: VITE_APP_NAME,
            message: e,
        }, {
            status: 500,
        });
    }
}
