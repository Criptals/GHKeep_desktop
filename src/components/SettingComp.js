import React, { useEffect, useState } from "react";

import { WiStrongWind } from "react-icons/wi";
import { GiPlantWatering } from "react-icons/gi";
import { PiSprayBottleFill } from "react-icons/pi";

const SettingComp = ({ settingId, text, icon, val, saveFunc, snack }) => {
    const [currentValue, setCurrentValue] = useState(val);

    const newValueSave = () => {
        saveFunc(settingId, currentValue).then((response) => {
            snack(response);
        });
    };

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
        <div style={{ display: 'flex', alignItems: 'center', marginLeft: '10%', fontSize: 20 }}>
            <i style={{marginLeft: '10px'}}>{ic}</i>
            <text style={{ marginTop: '5px', marginLeft: '10px' }}>
               {text}
            </text>
            <div style={{ flexGrow: 1 }} />

            <input
                type="text"
                value={String(currentValue)}
                maxLength={5}
                onChange={e => setCurrentValue(e.target.value)}
                style={{ margin: '5px', marginRight: '10px', padding: '8px', flex: 1 }}
            />
            <button
                style={{height: '15px', marginTop: '0px' , marginRight: '20px'}}
                onClick={newValueSave}
            >
                <i className="icon-content-save-outline"></i>
            </button>
        </div>
    );
};

export default SettingComp;
