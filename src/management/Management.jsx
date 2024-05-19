import React from 'react';
import { useState } from 'react';

export { Management };

const initialPlates = [
    {
        "plate": "B4W3T9S1",
        "username": "Well-placeda",
        "hourStay": 4,
        "cost": 20000,
        "createdAt": "2024-05-12 01:20:27",
        "source": "motorcycle",
        "type": "odd"
    },
    {
        "plate": "B8C2X4V5",
        "username": "Duskysuperhi",
        "hourStay": 7,
        "cost": 35000,
        "createdAt": "2024-05-12 01:20:27",
        "source": "motorcycle",
        "type": "odd"
    },
    {
        "plate": "B7J8Z5T2",
        "username": "Rapidspatula",
        "hourStay": 2,
        "cost": 10000,
        "createdAt": "2024-05-12 01:20:27",
        "source": "motorcycle",
        "type": "even"
    },
    {
        "plate": "B6J1W4T9",
        "username": "Riotousgamet",
        "hourStay": 4,
        "cost": 20000,
        "createdAt": "2024-05-12 01:20:27",
        "source": "motorcycle",
        "type": "odd"
    },
    {
        "plate": "B7W9N3T2",
        "username": "Crudeclipper",
        "hourStay": 4,
        "cost": 20000,
        "createdAt": "2024-05-12 01:20:28",
        "source": "motorcycle",
        "type": "even"
    },
    {
        "plate": "B4B7X2J6",
        "username": "Rampantexult",
        "hourStay": 10,
        "cost": 50000,
        "createdAt": "2024-05-12 01:20:28",
        "source": "motorcycle",
        "type": "even"
    },
    {
        "plate": "B4K7N9W3",
        "username": "Blue-collarb",
        "hourStay": 9,
        "cost": 45000,
        "createdAt": "2024-05-12 01:20:28",
        "source": "motorcycle",
        "type": "odd"
    },
    {
        "plate": "B6F3P1R8",
        "username": "Legislativec",
        "hourStay": 10,
        "cost": 50000,
        "createdAt": "2024-05-12 01:20:28",
        "source": "motorcycle",
        "type": "even"
    },
    {
        "plate": "B6J8H3R1",
        "username": "Cantankerous",
        "hourStay": 2,
        "cost": 10000,
        "createdAt": "2024-05-12 01:20:29",
        "source": "motorcycle",
        "type": "odd"
    },
    {
        "plate": "B1N3U8M5",
        "username": "Philosophica",
        "hourStay": 4,
        "cost": 20000,
        "createdAt": "2024-05-12 01:20:29",
        "source": "motorcycle",
        "type": "odd"
    },
    {
        "plate": "B3O23KEZ",
        "username": "Wastefulcomm",
        "hourStay": 1,
        "cost": 5000,
        "createdAt": "2024-05-12 01:20:30",
        "source": "motorcycle",
        "type": "odd"
    },
    {
        "plate": "B9R7T4P1",
        "username": "Beadedpotenc",
        "hourStay": 10,
        "cost": 50000,
        "createdAt": "2024-05-12 01:20:30",
        "source": "motorcycle",
        "type": "odd"
    },
    {
        "plate": "B3E8H1T6",
        "username": "Bilateralold",
        "hourStay": 10,
        "cost": 50000,
        "createdAt": "2024-05-12 01:20:31",
        "source": "motorcycle",
        "type": "even"
    },
    {
        "plate": "B1R8N3X2",
        "username": "Unavoidablep",
        "hourStay": 10,
        "cost": 50000,
        "createdAt": "2024-05-12 01:20:31",
        "source": "motorcycle",
        "type": "even"
    },
    {
        "plate": "B5H1W3Z9",
        "username": "Intestinalsc",
        "hourStay": 6,
        "cost": 30000,
        "createdAt": "2024-05-12 01:20:31",
        "source": "motorcycle",
        "type": "odd"
    },
    {
        "plate": "B2X4V5T8",
        "username": "Post-worldol",
        "hourStay": 2,
        "cost": 10000,
        "createdAt": "2024-05-12 01:20:31",
        "source": "motorcycle",
        "type": "even"
    },
    {
        "plate": "B4K7N9W3",
        "username": "Inwardcontra",
        "hourStay": 3,
        "cost": 15000,
        "createdAt": "2024-05-12 01:20:31",
        "source": "motorcycle",
        "type": "odd"
    },
    {
        "plate": "B3P5U9K7",
        "username": "Autocraticdi",
        "hourStay": 9,
        "cost": 45000,
        "createdAt": "2024-05-12 01:20:31",
        "source": "motorcycle",
        "type": "odd"
    },
    {
        "plate": "B2R7W9J4",
        "username": "Governinggua",
        "hourStay": 2,
        "cost": 10000,
        "createdAt": "2024-05-12 01:20:32",
        "source": "motorcycle",
        "type": "even"
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
        <div className="container">
            <h1>Management</h1>
            <div className="d-flex justify-content-end mb-3">
                <button className="btn btn-primary me-2" onClick={() => sortPlates('cost')}>Sort by Cost</button>
                <button className="btn btn-primary me-2" onClick={() => sortPlates('createdAt')}>Sort by Created At</button>
                <button className="btn btn-primary" onClick={() => sortPlates('type')}>Sort by Type</button>
            </div>
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
    );
}