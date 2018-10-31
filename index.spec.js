const server = require('./data/api/server');
const request = require('supertest');

/// ----- CRUD ENDPOINT TESTS -----

// ---- Test Test for Test GET Endpoint ----
describe('GET /testmebaby/149 Test Endpoint', () => {
    beforeAll( async () => {
        return response = await request(server).get('/yourethetestaround/2819');
    });

    describe('Response Type and Status', () => {
        it('Should respond with JSON', () => {
            expect(response.type).toBe('application/json');
        });
    
        it('Should respond with a status code of 200 (OK)', () => {
            expect(response.status).toBe(200);
        });
    });

    it('Should respond with Nobody Can Ever Get You Down', () => {
        expect(response.body).toBe('Nothings Gonna Ever Keep You Down!');
    });
})

// ---- GET All Notes Endpoint ----
describe('GET /api/notes Endpoint', () => {
    beforeAll( async () => {
        return response = await request(server).get('/api/notes');
    });

    describe('Response Type and Status', () => {
        it('Should respond with JSON', () => {
            expect(response.type).toBe('application/json');
        });
    
        it('Should respond with a status code of 200 (OK)', () => {
            expect(response.status).toBe(200);
        });
    });

    describe('Random testing of three units', () => {
        beforeAll( async () => {
            return randomIndex = () => Math.floor(Math.random() * response.body.length);
        });

        it('Should respond with an array of objects', () => {
            expect(Array.isArray(response.body)).toBeTruthy;
    
            // Test the type of three random units in the response array;
            expect(typeof response.body[randomIndex()]).toBe('object');
            expect(typeof response.body[randomIndex()]).toBe('object');
            expect(typeof response.body[randomIndex()]).toBe('object');
        });
    
        it('Should have objects in its array response with id, title, genre, and releaseYear properties', () => {
            let testArray = ['_id', 'title', 'textBody', 'tags', 'user'];

            // Test the keys of three random units in the response array;
            expect(Object.keys(response.body[randomIndex()])).toEqual(testArray);
            expect(Object.keys(response.body[randomIndex()])).toEqual(testArray);
            expect(Object.keys(response.body[randomIndex()])).toEqual(testArray);
        });
    })
    
});