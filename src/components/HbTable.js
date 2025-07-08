import React from "react";

const HbTable = ({ data = [] }) => {
    const columnCount = data.length;

    return (
        <div style={{
            background: 'linear-gradient(to bottom, #C8E6C9 0%, #81C784 100%)',
            borderRadius: "24px",
            margin: "10px",
            overflow: "hidden",
            width: '99vh'
        }}>
            <div style={{
                display: "grid",
                gridTemplateColumns: `repeat(${columnCount + 1}, 1fr)`,
                width: "100%"
            }}>
                <div style={{
                    padding: "12px",
                    fontWeight: "bold",
                    textAlign: "center",
                    backgroundColor: "rgba(0,0,0,0.05)"
                }}>Почва</div>
                {Array.from({ length: columnCount }, (_, index) => (
                    <div key={index} style={{
                        padding: "12px",
                        fontWeight: "bold",
                        textAlign: "center",
                        backgroundColor: "rgba(0,0,0,0.05)"
                    }}>№ {index + 1}</div>
                ))}
                
                <div style={{
                    padding: "12px",
                    textAlign: "center",
                    borderTop: "1px solid rgba(0,0,0,0.1)"
                }}>Hb%</div>

                {Array.from({ length: columnCount }, (_, index) => (
                    <div key={index} style={{
                        padding: "12px",
                        textAlign: "left",
                        borderTop: "1px solid rgba(0,0,0,0.1)"
                    }}>{data[index] !== undefined ? `${data[index]}%` : '-'}</div>
                ))}
            </div>
        </div>
    );
};

export default HbTable;
