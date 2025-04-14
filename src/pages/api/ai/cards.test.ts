import assert from 'assert';
import { test } from 'node:test';

const BASE_URL = 'http://localhost:4321/api/ai/cards';

test('POST /ai/cards - Successful request', async () => {
    const response = await fetch(BASE_URL, {
        body: JSON.stringify({ text: 'Sample text for AI card generation' }),
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
    });

    assert.strictEqual(response.status, 200);
    const data = await response.json();
    assert(Array.isArray(data), 'Response should be an array');
    assert(data.length > 0, 'Response array should not be empty');
    assert(data[0].front, 'Each card should have a front property');
    assert(data[0].back, 'Each card should have a back property');
});

test('POST /ai/cards - Validation error', async () => {
    const response = await fetch(BASE_URL, {
        body: JSON.stringify({ text: '' }),
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
    });

    assert.strictEqual(response.status, 400);
    const data = await response.json();
    assert(data.error, 'Response should contain an error property');
});

test('POST /ai/cards - Unauthorized request', async () => {
    // Simulate an unauthorized request by not providing authentication
    const response = await fetch(BASE_URL, {
        body: JSON.stringify({ text: 'Sample text for AI card generation' }),
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
    });

    assert.strictEqual(response.status, 401);
    const data = await response.json();
    assert(data.error, 'Response should contain an error property');
});
