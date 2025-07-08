import React, { useContext, useState, useEffect } from "react";
import StatusComp from "../components/StatusComp";
import { ExtraContext } from "../Context";
import { WiStrongWind } from "react-icons/wi";
import { GiPlantWatering } from "react-icons/gi";
import { PiSprayBottleFill } from "react-icons/pi";

import {
    getForkState,
    getHydrationState,
    getWateringState,
    changeForkState,
    changeHydrationState,
    changeWateringState,
    getSensorsNum, // Используем существующую функцию для получения количества датчиков
} from "../Api";

export default function ManageScreen() {
    const { extra, setExtra } = useContext(ExtraContext);
    const [snackContent, setSnackContent] = useState("OK");
    const [visible, setVisible] = useState(false);
    const [furrowCount, setFurrowCount] = useState(1); 
    useEffect(() => {
        const loadFurrowCount = async () => {
            try {
                const count = await getSensorsNum();
                setFurrowCount(count || 1);
            } catch (error) {
                console.error("Failed to load sensors count:", error);
            }
        };
        loadFurrowCount();
    }, []);
    const onToggleSnackBar = (content) => {
        setSnackContent(content);
        setVisible(!visible);
    };
    const onDismissSnackBar = () => setVisible(false);
    const furrowIds = Array.from({ length: furrowCount }, (_, i) => i + 1);
    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <h2 style={{ textAlign: 'center'}}>Статус</h2>
            <hr />
            <StatusComp
                text="Форточки"
                icon="WiStrongWind"
                statusId=""
                getFunc={getForkState}
                changeFunc={changeForkState}
                isExtra={extra}
                snack={onToggleSnackBar}
            />
            <StatusComp
                text="Увлажнение"
                icon="PiSprayBottleFill"
                statusId=""
                getFunc={getHydrationState}
                changeFunc={changeHydrationState}
                isExtra={extra}
                snack={onToggleSnackBar}
            />
            {furrowIds.map((id) => (  
                <StatusComp
                    key={id}
                    text="Горшок"
                    icon="GiPlantWatering"
                    statusId={id}
                    getFunc={getWateringState}
                    changeFunc={changeWateringState}
                    isExtra={extra}
                    snack={onToggleSnackBar}
                />
            ))}
            <div style={{ margin: '30px 0' }}></div>
        </div>
    );
}