import React, { useEffect, useState, useContext } from "react";
import SettingComp from "../components/SettingComp";
import { ExtraContext } from "../Context";
import {
    getLimitValues,
    changeTemperatureLimit,
    changeHumidityLimit,
    changeHbLimit,
} from "../Api";

export default function SettingsScreen() {
    const { extra, setExtra } = useContext(ExtraContext);
    const [limits, setLimits] = useState(null);
    const [visible, setVisible] = useState(false);
    const [snackContent, setSnackContent] = useState("OK");
    const onToggleSnackBar = (content) => {
        setSnackContent(content);
        setVisible(!visible);
    };
    const onDismissSnackBar = () => setVisible(false);
    useEffect(() => {
        getLimitValues().then((json) => {
            setLimits(json);
        });
    }, []);
    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <h2 style={{textAlign: 'center'}}>Настройки</h2>
            <hr /> 
            {limits && (
                <SettingComp
                    settingId={0}
                    icon="WiStrongWind"
                    text="Лимит на форточки"
                    val={limits.temperature}
                    saveFunc={changeTemperatureLimit}
                    snack={onToggleSnackBar}
                />
            )}
            {limits && (
                <SettingComp
                    settingId={0}
                    icon="PiSprayBottleFill"
                    text="Лимит увлажнения"
                    val={limits.humidity_air}
                    saveFunc={changeHumidityLimit}
                    snack={onToggleSnackBar}
                />
            )}
            {limits && limits.humidity_soil.map((json) => (
                <SettingComp
                    key={json.id}
                    settingId={json.id}
                    icon="GiPlantWatering"
                    text={`Лимит увлажнения почвы ${json.id}`}
                    val={json.hb}
                    saveFunc={changeHbLimit}
                    snack={onToggleSnackBar}
                />
            ))}
            <hr style={{ margin: '50px 0' }} />
        </div>
    );
}