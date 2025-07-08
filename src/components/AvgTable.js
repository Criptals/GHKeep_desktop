import React from "react";

const AvgTable = ({ data = [0, 0] }) => {
    return (
        <div style={{
            background: 'linear-gradient(to bottom, #C8E6C9 0%, #81C784 100%)',
            borderRadius: "24px",
            margin: "10px",
            padding: "10px"
        }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                    <tr>
                        <th style={{ textAlign: "left", padding: "8px", textAlign: "center" }}>T °C</th>
                        <th style={{ textAlign: "left", padding: "8px", textAlign: "center" }}>H%</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td style={{ padding: "8px", textAlign: "center" }}>{data[0]}°C</td>
                        <td style={{ padding: "8px", textAlign: "center" }}>{data[1]}%</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default AvgTable;