import React, { useState, useEffect } from "react";

import { WiStrongWind } from "react-icons/wi";
import { GiPlantWatering } from "react-icons/gi";
import { PiSprayBottleFill } from "react-icons/pi";

const StatusComp = ({ text, icon, statusId, getFunc, changeFunc, isExtra, snack }) => {
    const [isOn, setIsOn] = useState(false);

    const onStatusChange = () => {
        setIsOn(!isOn);
        changeFunc(statusId, isExtra).then((response) => {
            getFunc(statusId).then((json) => {
                setIsOn(Boolean(json));
            });

            if (response !== "OK") {
                snack(String(response));
            }
        });
    };

    useEffect(() => {
        getFunc(statusId).then((json) => {
            setIsOn(Boolean(json));
        });
    }, [statusId, getFunc]);
    
    var ic = <empty/>;
    if (icon == "WiStrongWind"){
        ic = <WiStrongWind size={40} />;
    }
    else if (icon == "PiSprayBottleFill"){
        ic = <PiSprayBottleFill size={40} />;
    }
    else if (icon == "GiPlantWatering"){
        ic = <GiPlantWatering size={40} />;
    }

    return (
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 0, paddingLeft: '20%', fontSize: 20}}>
            {ic}
            <div style={{ marginTop: '5px', display: 'flex', alignItems: 'center' }}>
                <span style={{ marginLeft: '5px' }}>{text} {statusId} {isExtra}</span>
            </div>
            <div style={{ flexGrow: 1}} />
            <label style={{ marginRight: '10px', position: 'relative', right: '30%'}}>
                <input
                    type="checkbox"
                    checked={isOn}
                    onChange={onStatusChange}
                    style={{ cursor: 'pointer' }}
                />
                <span style={{ marginLeft: '5px' }}>{isOn ? "ON" : "OFF"}</span>
            </label>
            <div 
                style={{
                    backgroundColor: isOn ? "#d7e8cd" : "#ff7970",
                    borderColor: isOn ? "#d7e8cd" : "#ff7970",
                    borderRadius: '15px',
                    borderWidth: '2px',
                    padding: '10px',
                    margin: '12px',
                    position: 'relative', 
                    right: '30%',
                    justifyContent: 'flex-end',
                }}
            >
                <span>STATUS: {isOn ? "ON" : "OFF"}</span>
            </div>
        </div>
    );
};

export default StatusComp;
