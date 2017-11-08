import t from 'tcomb';

export const Product = t.struct({
  id: t.Number,
  name: t.String,
  description: t.String,
  price: t.Number
});

export const products = [
  {"id": 1, "name": "Huawei", "description": "p9", "price": 350, "discountValue": 0, "quantity": 2, "cost": 700},
  {"id": 2, "name": "Samsung", "description": "s8", "price": 400, "discountValue": 0, "quantity": 0, "cost": 0},
  {"id": 3, "name": "HTC", "description": "one m2", "price": 300, "discountValue": 0, "quantity": 0, "cost": 0},
  {"id": 4, "name": "Nokia", "description": "lumia 1025", "price": 450, "discountValue": 0, "quantity": 0, "cost": 0}
];
