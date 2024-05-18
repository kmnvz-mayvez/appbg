import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

export { Home };

function Home() {
    const auth = useSelector(x => x.auth.value);
    const [stayHour, setStayHour] = useState(0);
    const [price, setPrice] = useState(0);
    const [transactionSuccess, setTransactionSuccess] = useState(false);
    const [intervalId, setIntervalId] = useState(null);

    useEffect(() => {
        const startTime = new Date();
        const id = setInterval(() => {
            const currentTime = new Date();
            const elapsedTime = Math.floor((currentTime - startTime) / 1000);
            setStayHour(elapsedTime);
            const hourlyRate = 10000;
            const calculatedPrice = Math.min(elapsedTime / 3600 * hourlyRate, 100000);
            setPrice(calculatedPrice);
        }, 1000);
        setIntervalId(id);

        return () => clearInterval(id);
    }, []);

    const formatTime = (seconds) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const remainingSeconds = seconds % 60;
        return `${hours}h ${minutes}m ${remainingSeconds}s`;
    };

    const handleTransactionSuccess = () => {
        setTransactionSuccess(true);
        clearInterval(intervalId);
    };

    return (
        <div>
            <h1>Hi {auth?.username}!</h1>
            <p>You're log in</p>
            <table>
                <thead>
                    <tr>
                        <th style={{ width: '30%' }}>Plate Number</th>
                        <th style={{ width: '30%' }}>Stay Hour</th>
                        <th style={{ width: '30%' }}>Price</th>
                        <th style={{ width: '30%' }}></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{auth.plateNumber}</td>
                        <td>{formatTime(stayHour)}</td>
                        <td>{price.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}</td>
                        <td><button className="btn btn-sm btn-primary" onClick={handleTransactionSuccess}>Payment</button></td>
                    </tr>
                </tbody>
            </table>
            {transactionSuccess && <p className="text-success">Transaction successful!</p>}
        </div>
    );
}
