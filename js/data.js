// ========================================
// MOCK DATA
// ========================================

const MockData = {
    // Sample Vehicles
    vehicles: [
        {
            id: 'v1',
            name: 'Honda Activa 6G',
            type: 'Scooty',
            brand: 'Honda',
            model: 'Activa 6G',
            year: 2023,
            registration: 'GJ06XY1234',
            gearType: 'Automatic',
            fuelType: 'Petrol',
            mileage: '45 km/l',
            pricePerHour: 30,
            pricePerDay: 400,
            deposit: 2000,
            location: 'Waghodia Road',
            distance: '0.5 km',
            rating: 4.8,
            images: [
                'honda%206g/side%20view.jpeg',
                'honda%206g/honda-activa-6g-1.avif',
                'honda%206g/activa-6g-right-side-view-8.avif',
                'honda%206g/honda-activa-6g-right-side-view3.avif'
            ],
            ownerId: 'u2',
            ownerName: 'Rahul Sharma',
            available: true,
            rules: ['Helmet mandatory', 'No smoking', 'Return with same fuel level'],
            description: 'Well-maintained Honda Activa, perfect for daily commute around campus.'
        },
        {
            id: 'v2',
            name: 'TVS Jupiter',
            type: 'Scooty',
            brand: 'TVS',
            model: 'Jupiter',
            year: 2022,
            registration: 'GJ06AB5678',
            gearType: 'Automatic',
            fuelType: 'Petrol',
            mileage: '50 km/l',
            pricePerHour: 25,
            pricePerDay: 350,
            deposit: 1500,
            location: 'Alkapuri',
            distance: '1.2 km',
            rating: 4.6,
            images: [
                'tvs%20jupiter/download.jpeg',
                'tvs%20jupiter/download%20(1).jpeg',
                'tvs%20jupiter/jupiter68c8080e2422c.avif'
            ],
            ownerId: 'u3',
            ownerName: 'Priya Singh',
            available: true,
            rules: ['Helmet mandatory', 'Max 2 riders'],
            description: 'Fuel-efficient TVS Jupiter in excellent condition.'
        },
        {
            id: 'v3',
            name: 'Royal Enfield Classic 350',
            type: 'Bike',
            brand: 'Royal Enfield',
            model: 'Classic 350',
            year: 2023,
            registration: 'GJ06CD9012',
            gearType: 'Manual',
            fuelType: 'Petrol',
            mileage: '35 km/l',
            pricePerHour: 60,
            pricePerDay: 800,
            deposit: 5000,
            location: 'Sayajigunj',
            distance: '2.0 km',
            rating: 4.9,
            images: [
                'royalENfiel350/download.jpeg',
                'royalENfiel350/download%20(1).jpeg',
                'royalENfiel350/download%20(2).jpeg'
            ],
            ownerId: 'u4',
            ownerName: 'Arjun Mehta',
            available: true,
            rules: ['Valid license required', 'Helmet mandatory', 'No rash driving'],
            description: 'Iconic Royal Enfield Classic 350 for long rides.'
        },
        {
            id: 'v4',
            name: 'Hero Splendor Plus',
            type: 'Bike',
            brand: 'Hero',
            model: 'Splendor Plus',
            year: 2022,
            registration: 'GJ06EF3456',
            gearType: 'Manual',
            fuelType: 'Petrol',
            mileage: '60 km/l',
            pricePerHour: 35,
            pricePerDay: 450,
            deposit: 2000,
            location: 'Manjalpur',
            distance: '0.8 km',
            rating: 4.5,
            images: [
                'hero%20splendor/download.jpeg',
                'hero%20splendor/download%20(3).jpeg'
            ],
            ownerId: 'u5',
            ownerName: 'Amit Kumar',
            available: true,
            rules: ['Helmet mandatory', 'Return on time'],
            description: 'Reliable Hero Splendor with great mileage.'
        },
        {
            id: 'v5',
            name: 'Suzuki Access 125',
            type: 'Scooty',
            brand: 'Suzuki',
            model: 'Access 125',
            year: 2023,
            registration: 'GJ06GH7890',
            gearType: 'Automatic',
            fuelType: 'Petrol',
            mileage: '48 km/l',
            pricePerHour: 28,
            pricePerDay: 380,
            deposit: 1800,
            location: 'Fatehgunj',
            distance: '1.5 km',
            rating: 4.7,
            images: [
                'suzuki%20acess125/download.jpeg',
                'suzuki%20acess125/download%20(1).jpeg'
            ],
            ownerId: 'u6',
            ownerName: 'Neha Gupta',
            available: true,
            rules: ['Helmet mandatory', 'No smoking', 'Max 2 riders'],
            description: 'Comfortable Suzuki Access 125 with ample storage.'
        },
        {
            id: 'v6',
            name: 'Bajaj Pulsar 150',
            type: 'Bike',
            brand: 'Bajaj',
            model: 'Pulsar 150',
            year: 2022,
            registration: 'GJ06IJ2345',
            gearType: 'Manual',
            fuelType: 'Petrol',
            mileage: '50 km/l',
            pricePerHour: 45,
            pricePerDay: 600,
            deposit: 3000,
            location: 'Race Course',
            distance: '1.8 km',
            rating: 4.6,
            images: [
                'pulsur/download.jpeg',
                'pulsur/download%20(2).jpeg'
            ],
            ownerId: 'u7',
            ownerName: 'Vikram Rao',
            available: true,
            rules: ['Valid license required', 'Helmet mandatory'],
            description: 'Sporty Bajaj Pulsar 150 for city rides.'
        }
    ],

    // Sample Bookings
    bookings: [
        {
            id: 'b1',
            vehicleId: 'v1',
            renterId: 'u1',
            pickupTime: '2025-11-26T10:00:00',
            returnTime: '2025-11-26T18:00:00',
            status: 'upcoming',
            totalCost: 240,
            deposit: 2000
        },
        {
            id: 'b2',
            vehicleId: 'v3',
            renterId: 'u1',
            pickupTime: '2025-11-20T09:00:00',
            returnTime: '2025-11-20T20:00:00',
            status: 'completed',
            totalCost: 660,
            deposit: 5000
        },
        {
            id: 'b3',
            vehicleId: 'v2',
            renterId: 'u1',
            pickupTime: '2025-11-27T10:00:00',
            returnTime: '2025-11-27T18:00:00',
            status: 'upcoming',
            totalCost: 200,
            deposit: 1500
        }
    ],

    // Sample Users
    users: [
        {
            id: 'u1',
            name: 'Current User',
            email: 'user@example.com',
            phone: '9876543210',
            role: 'renter',
            college: 'Parul University',
            hostel: 'Parul Hostel',
            verified: true
        },
        {
            id: 'u2',
            name: 'Rahul Sharma',
            email: 'rahul@example.com',
            phone: '9876543211',
            role: 'owner',
            college: 'MSU (Maharaja Sayajirao University)',
            verified: true
        }
    ],

    // Colleges (Vadodara)
    colleges: [
        'Parul University',
        'Sumandeep Vidyapeeth',
        'MSU (Maharaja Sayajirao University)',
        'Parul Institute of Technology',
        'Faculty of Technology & Engineering (MSU)',
        'Government Engineering College Vadodara'
    ],

    // Brands
    brands: {
        Scooty: ['Honda', 'TVS', 'Suzuki', 'Yamaha', 'Hero'],
        Bike: ['Royal Enfield', 'Bajaj', 'Hero', 'Honda', 'Yamaha', 'KTM']
    },

    // Fine Structure
    fines: {
        lateReturn: [
            { duration: '0-30 mins', fine: 50 },
            { duration: '31-60 mins', fine: 100 },
            { duration: 'Each additional hour', fine: 100 },
            { duration: '12+ hours', fine: 'Double rental rate' }
        ],
        damages: {
            minor: [
                { item: 'Scratches', fine: '₹500-₹1,000' },
                { item: 'Broken mirror', fine: '₹800-₹1,500' },
                { item: 'Seat cover tears', fine: '₹500-₹1,200' },
                { item: 'Small dents', fine: '₹1,000-₹2,000' }
            ],
            moderate: [
                { item: 'Broken headlight', fine: '₹2,000-₹4,000' },
                { item: 'Cracked panels', fine: '₹3,000-₹6,000' },
                { item: 'Bent handlebar', fine: '₹2,500-₹5,000' },
                { item: 'Damaged foot pegs', fine: '₹2,000-₹3,500' }
            ],
            major: [
                { item: 'Engine failure', fine: '₹10,000+' },
                { item: 'Frame bend', fine: '₹15,000+' },
                { item: 'Tyre replacement', fine: '₹5,000-₹8,000' },
                { item: 'Transmission damage', fine: '₹12,000+' },
                { item: 'Total loss/theft', fine: 'Full vehicle value' }
            ]
        },
        violations: [
            { violation: 'Low fuel return', fine: '₹200 + fuel cost' },
            { violation: 'Not cleaned', fine: '₹100-₹300' },
            { violation: 'Smoking in vehicle', fine: '₹500' },
            { violation: 'Lost keys', fine: '₹1,000 + replacement' },
            { violation: 'Traffic challan', fine: 'Fine amount + ₹200 fee' }
        ]
    }
};
