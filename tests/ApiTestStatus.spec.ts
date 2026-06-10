import { test, expect } from '@playwright/test';


//provera statusa up. Endpoint /status
test('API status should be UP', async ({ request }) => {
  const response = await request.get(
    'https://simple-tool-rental-api.click/status'
  );

  
  expect(response.status()).toBe(200);

  const data = await response.json();

  expect(data.status).toBeDefined();

  expect(data.status).toBe('UP');
});

//Get all tools. Endpoint /tools
test('Get tools from electric-generators category', async ({ request }) => {
  const response = await request.get(
    'https://simple-tool-rental-api.click/tools?category=electric-generators'
  );

  expect(response.status()).toBe(200);

  const data = await response.json();

  expect(Array.isArray(data)).toBeTruthy();


  expect(data.length).toBeGreaterThan(0);

  console.log(data);
});

//Get single tool. Endpoint /tools/:toolId
test('Get single electric generator with user manual', async ({ request }) => {
  const response = await request.get(
    'https://simple-tool-rental-api.click/tools/4875?user-manual=true'
  );

  expect(response.status()).toBe(200);

  const data = await response.json();

  console.log(data);

  expect(data).toHaveProperty('id', 4875);
  expect(data).toHaveProperty('category', 'electric-generators');
});

//Create new order Endpoint /orders

test('Get a single order', async ({ request }) => {
   const response = await request.post(
    'https://simple-tool-rental-api.click/orders',
    {
      headers: {
        Authorization: '08e5204f1276bbe30a2f5f1fe5c1a7b4e55427c68f79ad95eb6b8fa5a66f4beb' // <-- zalepi svoj token ovde
      },
      data: {
        toolId: 4875, 
        customerName: 'John Doe'
      }
    }
  );

  console.log('STATUS:', response.status());
  console.log(await response.text());

  expect(response.status()).toBe(201);
});
