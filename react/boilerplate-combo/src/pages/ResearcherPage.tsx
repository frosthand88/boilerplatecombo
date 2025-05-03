import React from 'react';
import backgroundImage from '../assets/blue_nebula_and_planets.jpg';
import ResearcherTable from '../components/ResearcherTable';
import TriangleGamepadCanvas from "../components/TriangleGamepadCanvas";
import ChartView from "../components/ChartView";

function ResearcherPage() {
    return (
        <div style={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            minHeight: '100vh',
            padding: '20px',
            fontFamily: 'Arial, sans-serif'
        }}>
            <h1 style={{ color: "white" }}>Researcher Management</h1>
            <ChartView symbol={"AAPL"}></ChartView>
            <TriangleGamepadCanvas />
            <ResearcherTable />
        </div>
    );
}

export default ResearcherPage;
