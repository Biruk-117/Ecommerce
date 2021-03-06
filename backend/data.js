
import bcrypt from 'bcryptjs';

const data = {

    users: [
        {
            name: 'Brook',
            email: 'admin@example.com',
            password: bcrypt.hashSync('1234', 8),
            isAdmin: true,
        },
        {
            name: 'Jon',
            email: 'user@example.com',
            password: bcrypt.hashSync('1234', 8),
            isAdmin: false,
        }

    ],

    products: [
        {
            name: 'shoes 1',
            image: '/images/p1.jpg',
            price: 80,
            countInStock: 20,
            brand: 'brand 1',
            description: 'shoes 1 description'
        },
        {
            name: 'shoes 2',
            image: '/images/p2.jfif',
            price: 120,
            countInStock: 10,
            brand: 'brand 2',
            description: 'shoes 2 description'
        },
        {
            name: 'shoes 3',
            image: '/images/p3.jfif',
            price: 40,
            countInStock: 0,
            brand: 'brand 3',
            description: 'shoes 3 description'
        },
        {
            name: 'shoes 4',
            image: '/images/p4.jpg',
            price: 60,
            countInStock: 15,
            brand: 'brand 4',
            description: 'shoes 4 description'
        },
        {
            name: 'shoes 5',
            image: '/images/p5.jpg',
            price: 70,
            countInStock: 5,
            brand: 'brand 5',
            description: 'shoes 5 description'
        },
        {
            name: 'shoes 6',
            image: '/images/p6.jfif',
            price: 20,
            countInStock: 12,
            brand: 'brand 6',
            description: 'shoes 6 description'
        }
    ]
}

export default data;
