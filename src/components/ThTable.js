import React from "react";

const ThTable = ({ tData = [], hData = [] }) => {
    const maxLength = Math.max(tData.length, hData.length);

    return (
        <div style={{
            background: 'linear-gradient(to bottom, #C8E6C9 0%, #81C784 100%)',
            borderRadius: '24px',
            margin: '10px',
            padding: '10px',
            width: '99vh',
            float: "left",
            overflow: "hidden"
        }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: "center" }}>
                <thead>
                    <tr>
                        <th>Воздух</th>
                        {Array.from({ length: maxLength }, (_, index) => (
                            <th key={index}>№ {index + 1}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>T °C</td>
                        {Array.from({ length: maxLength }, (_, index) => (
                            <td key={index}>{tData[index] !== undefined ? `${tData[index]}°C` : '-'}</td>
                        ))}
                    </tr>
                    <tr>
                        <td>H%</td>
                        {Array.from({ length: maxLength }, (_, index) => (
                            <td key={index}>{hData[index] !== undefined ? `${hData[index]}%` : '-'}</td>
                        ))}
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default ThTable;
