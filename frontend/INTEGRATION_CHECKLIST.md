# Fluxon Frontend Integration Checklist

Use this with the backend teammate before switching any feature from mock mode to real API.

## Product endpoints
- Route: `GET /api/product`
- Route: `GET /api/product/{id}`
- Response fields: `id`, `name`, `description`, `price`, `stock`, `categoryId`
- Nice to have: nested `category`

## Category endpoint
- Route: `GET /api/category`
- Response fields: `id`, `name`

## Auth endpoints
- Route: `POST /api/auth/login`
- Route: `POST /api/auth/register`
- Request body:
  - Login: `email`, `password`
  - Register: `name`, `email`, `password`
- Response: token plus customer identity fields

## Order endpoint
- Route: `GET /api/order`
- Route: `POST /api/order`
- Request body should accept:
  - customer/shipping data
  - `items[]` with `productId`, `quantity`, `unitPrice`
- Response should include:
  - order id
  - created date
  - total
  - status
  - payment status

## Frontend env switch
- Mock mode default: `VITE_USE_MOCK_API=true`
- Real API mode: set `VITE_USE_MOCK_API=false`
- API base URL: `VITE_API_BASE_URL=http://localhost:5276`
