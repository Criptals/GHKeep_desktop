import React, { useEffect, useState } from "react";
import AvgTable from "../components/AvgTable";
import HbTable from "../components/HbTable";
import ThTable from "../components/ThTable";
import GraphComp from "../components/GraphComp";
import { Chart } from 'chart.js';
import {
    getThTable,
    getHbTable,
    getTempHumGrpah,
    getHbGrpah,
    getAvgTempGraph,
    getAvgHumGraph,
} from "../Api";

export default function HomeScreen() {
    const [thCurData, setThCurData] = useState(null);
    const [hbCurData, setHbCurData] = useState(null);
    const [thGraphData, setThGraphData] = useState(null);
    const [hbGraphData, setHbGraphData] = useState(null);
    const [avgGraphTempData, setAvgGraphTempData] = useState(null);
    const [avgGraphHumData, setAvgGraphHumData] = useState(null);
    const fetchData = () => {
        console.log("Fetch home api");
        getThTable().then((json) => {
            setThCurData(json);
        });
        getHbTable().then((json) => {
            setHbCurData(json);
        });
        getTempHumGrpah().then((json) => {
            setThGraphData(json);
        });
        getHbGrpah().then((json) => {
            setHbGraphData(json);
        });
        getAvgTempGraph().then((json) => {
            setAvgGraphTempData(json);
        });
        getAvgHumGraph().then((json) => {
            setAvgGraphHumData(json);
        });
    };
    useEffect(() => {
        fetchData();
        const interval = setInterval(fetchData, 30000); // 30 секунд
        return () => clearInterval(interval);
    }, []);  
    return (
        <div style={{ overflowY: "auto", height: "100vh" }}>
            <h2 style={{ margin: 15, textAlign: 'left'}}>Текущие данные</h2>
            <hr />
            <div style={{
                display: "grid",
                gridTemplateColumns: `repeat(2, 1fr)`,
                width: "100%"
            }}>
            <div style={{ marginTop: 31 }} >
            
            {thCurData !== null ? (
                <ThTable tData={thCurData.t_list} hData={thCurData.h_list} />
            ) : (
                <ThTable />
            )}
            </div>
            <div style={{ marginTop: 30 }} >
            {hbCurData !== null ? (
                <HbTable data={hbCurData.h_list} />
            ) : (
                <HbTable />
            )}
            </div>
            </div>
            <div style={{ marginTop: 30 }} />
            <h3 style={{ textAlign: "center" }}>История температуры воздуха</h3>
            <div style={{ overflowX: "auto", whiteSpace: "nowrap" }}>
                {thGraphData !== null ? (
                    thGraphData.map((json) => (
                        <div key={json.id} style={{ display: "inline-block", width: "100%" }}>
                            <GraphComp
                                suffix="°C"
                                id={"№ " + json.id}
                                data={json.t_list}
                                time={json.tim_list}
                            />
                        </div>
                    ))
                ) : (
                    <GraphComp />
                )}
            </div>
            <div style={{ marginTop: 30 }} />
            <h3 style={{ textAlign: "center" }}>История влажности воздуха</h3>
            <div style={{ overflowX: "auto", whiteSpace: "nowrap" }}>
                {thGraphData !== null ? (
                    thGraphData.map((json) => (
                        <div key={json.id} style={{ display: "inline-block", width: "100%" }}>
                            <GraphComp
                                suffix="%"
                                id={"№ " + json.id}
                                data={json.h_list}
                                time={json.tim_list}
                            />
                        </div>
                    ))
                ) : (
                    <GraphComp />
                )}
            </div>
            <div style={{ marginTop: 30 }} />
            <h3 style={{ textAlign: "center" }}>История влажности почвы</h3>
            <div style={{ overflowX: "auto", whiteSpace: "nowrap" }}>
                {hbGraphData !== null ? (
                    hbGraphData.map((json) => (
                        <div key={json.id} style={{ display: "inline-block", width: "100%" }}>
                            <GraphComp
                                suffix="%"
                                id={"№ " + json.id}
                                data={json.h_list}
                                time={json.tim_list}
                            />
                        </div>
                    ))
                ) : (
                    <GraphComp />
                )}
            </div>
            <h2 style={{ margin: 15, textAlign: "left" }}>Средние данные</h2>
            <hr />
            {avgGraphTempData !== null && avgGraphHumData !== null ? (
                <AvgTable
                    data={[
                        avgGraphTempData.d_list[4],
                        avgGraphHumData.d_list[4],
                    ]}
                />
            ) : (
                <AvgTable />
            )}
            <div style={{ marginTop: 30 }} />
            <h3 style={{ textAlign: "center" }}>Изменение температуры</h3>
            <div style={{ overflowX: "auto", whiteSpace: "nowrap" }}>
                {avgGraphTempData !== null ? (
                    <GraphComp
                        suffix="°C"
                        id={""}
                        data={avgGraphTempData.d_list}
                        time={avgGraphTempData.t_list}
                    />
                ) : (
                    <GraphComp />
                )}
            </div>
            <div style={{ marginTop: 30 }} />
            <h3 style={{ textAlign: "center" }}>Изменение влажности</h3>
            <div style={{ overflowX: "auto", whiteSpace: "nowrap" }}>
                {avgGraphHumData !== null ? (
                    <GraphComp
                        suffix="%"
                        id={""}
                        data={avgGraphHumData.d_list}
                        time={avgGraphHumData.t_list}
                    />
                ) : (
                    <GraphComp />
                )}
            </div>
        </div>
    );
}