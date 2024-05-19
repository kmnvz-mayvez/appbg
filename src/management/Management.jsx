import React from 'react';
import { useState } from 'react';

export { Management };

const initialPlates = [
    {
        plate: 'B3C5V7SA',
        username: 'Unnecessarya',
        hourStay: 1,
        cost: 5000,
        createdAt: '2024-05-19 07:47:17',
        source: 'car',
        type: 'odd'
    },
    {
        plate: 'B5P9V2NC',
        username: 'Paintedstriv',
        hourStay: 3,
        cost: 15000,
        createdAt: '2024-05-19 07:47:17',
        source: 'car',
        type: 'even'
    },
    {
        plate: 'B9X4P1NF',
        username: 'Elongatedfli',
        hourStay: 10,
        cost: 50000,
        createdAt: '2024-05-19 07:47:17',
        source: 'car',
        type: 'odd'
    },
    {
        plate: 'B3C5V7SA',
        username: 'Milkyomen',
        hourStay: 3,
        cost: 15000,
        createdAt: '2024-05-19 07:47:17',
        source: 'car',
        type: 'odd'
    },
    {
        plate: 'B1H9V5RH',
        username: 'Twentieth-ce',
        hourStay: 6,
        cost: 30000,
        createdAt: '2024-05-19 07:47:18',
        source: 'car',
        type: 'odd'
    },
    {
        plate: 'B9R7T4PA',
        username: 'Declaredfing',
        hourStay: 9,
        cost: 45000,
        createdAt: '2024-05-19 07:47:18',
        source: 'car',
        type: 'even'
    },
    {
        plate: 'B4J2S7NA',
        username: 'Municipalapp',
        hourStay: 3,
        cost: 15000,
        createdAt: '2024-05-19 07:47:18',
        source: 'car',
        type: 'odd'
    },
    {
        plate: 'B3S8Z2UD',
        username: 'Obnoxiouscap',
        hourStay: 7,
        cost: 35000,
        createdAt: '2024-05-19 07:47:18',
        source: 'car',
        type: 'even'
    },
    {
        plate: 'B6R1T7NE',
        username: 'Persistentlo',
        hourStay: 5,
        cost: 25000,
        createdAt: '2024-05-19 07:47:18',
        source: 'car',
        type: 'odd'
    },
    {
        plate: 'B1M3U8RG',
        username: 'Prodigioussw',
        hourStay: 7,
        cost: 35000,
        createdAt: '2024-05-19 07:47:18',
        source: 'car',
        type: 'even'
    },
    {
        plate: 'B7U1R8ZA',
        username: 'Dialecticalc',
        hourStay: 6,
        cost: 30000,
        createdAt: '2024-05-19 07:48:07',
        source: 'car',
        type: 'even'
    },
    {
        plate: 'B8G2S5UF',
        username: 'Methodologic',
        hourStay: 3,
        cost: 15000,
        createdAt: '2024-05-19 07:48:08',
        source: 'car',
        type: 'odd'
    },
    {
        plate: 'B9X2W7VE',
        username: 'Thatchedqual',
        hourStay: 10,
        cost: 50000,
        createdAt: '2024-05-19 07:48:08',
        source: 'car',
        type: 'odd'
    },
    {
        plate: 'B5S7U8TB',
        username: 'Fierydrain',
        hourStay: 4,
        cost: 20000,
        createdAt: '2024-05-19 07:48:08',
        source: 'car',
        type: 'even'
    },
    {
        plate: 'B2R7W9JD',
        username: 'Telescopicpu',
        hourStay: 9,
        cost: 45000,
        createdAt: '2024-05-19 07:48:08',
        source: 'car',
        type: 'odd'
    },
    {
        plate: 'B3P9Z1CE',
        username: 'Disorganized',
        hourStay: 9,
        cost: 45000,
        createdAt: '2024-05-19 07:48:08',
        source: 'car',
        type: 'odd'
    },
    {
        plate: 'B8Z1N4KA',
        username: 'Continuoussa',
        hourStay: 7,
        cost: 35000,
        createdAt: '2024-05-19 07:48:08',
        source: 'car',
        type: 'even'
    },
    {
        plate: 'B7J8Z5TB',
        username: 'Martialtempe',
        hourStay: 8,
        cost: 40000,
        createdAt: '2024-05-19 07:48:08',
        source: 'car',
        type: 'odd'
    },
    {
        plate: 'B9C4X5VA',
        username: 'Appreciative',
        hourStay: 6,
        cost: 30000,
        createdAt: '2024-05-19 07:48:09',
        source: 'car',
        type: 'odd'
    },
    {
        plate: 'B7D1R5PC',
        username: 'Contagiousna',
        hourStay: 9,
        cost: 45000,
        createdAt: '2024-05-19 07:48:09',
        source: 'car',
        type: 'odd'
    },
    {
        plate: 'B8P5F3TA',
        username: 'Clinicalrevo',
        hourStay: 4,
        cost: 20000,
        createdAt: '2024-05-19 07:48:41',
        source: 'car',
        type: 'odd'
    }
];

function Management() {
    const [plates, setPlates] = useState(initialPlates);

    const sortPlates = (property) => {
        const sorted = [...plates].sort((a, b) => {
            if (property === 'cost') {
                return b.cost - a.cost;
            } else if (property === 'createdAt') {
                return new Date(a.createdAt) - new Date(b.createdAt);
            } else if (property === 'type') {
                return a.type === 'odd' ? -1 : 1;
            }
        });
        setPlates(sorted);
    };

    return (
        <div className="container d-flex flex-column">
            <h1 className="align-self-center">Management Parking</h1>
            <div className="d-flex justify-content-center mb-3">
                <button className="btn btn-primary me-2" onClick={() => sortPlates('cost')}>Sort by Cost</button>
                <button className="btn btn-primary me-2" onClick={() => sortPlates('createdAt')}>Sort by Created At</button>
                <button className="btn btn-primary" onClick={() => sortPlates('type')}>Sort by Type</button>
            </div>
            <div className="d-flex justify-content-center">
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Plate</th>
                            <th>Username</th>
                            <th>Hour Stay</th>
                            <th>Cost</th>
                            <th>Created At</th>
                            <th>Source</th>
                            <th>Type</th>
                        </tr>
                    </thead>
                    <tbody>
                        {plates.map((plate, index) => (
                            <tr key={index}>
                                <td>{plate.plate}</td>
                                <td>{plate.username}</td>
                                <td>{plate.hourStay}</td>
                                <td>{plate.cost}</td>
                                <td>{plate.createdAt}</td>
                                <td>{plate.source}</td>
                                <td>{plate.type}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}