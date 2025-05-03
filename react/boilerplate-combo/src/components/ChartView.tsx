import React, { useEffect, useState, useRef } from 'react';
import {
    ResponsiveContainer,
    ComposedChart,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Customized
} from 'recharts';
import axios from 'axios';

type ChartData = {
    date: string;
    open: number;
    high: number;
    low: number;
    close: number;
};

type ChartViewProps = {
    symbol: string;
};

const API_BASE_URL = 'https://api.frosthand.com';

const ChartView: React.FC<ChartViewProps> = ({ symbol }) => {
    const [data, setData] = useState<ChartData[]>([]);
    const [xOffset, setXOffset] = useState(0); // For horizontal scroll
    const [scale, setScale] = useState(1); // For zoom level (scale)
    const chartContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const fetchData = async () => {
            const res = await axios.get(`${API_BASE_URL}/api/chart/${symbol}?limit=100`);
            setData(res.data);
        };
        fetchData();
    }, [symbol]);

    // Calculate the Y-Axis domain (min and max)
    const yAxisDomain = [
        Math.min(...data.map(d => Math.min(d.open, d.high, d.low, d.close))),
        Math.max(...data.map(d => Math.max(d.open, d.high, d.low, d.close)))
    ];

    // Handle mouse wheel zoom
    const handleWheel = (event: React.WheelEvent) => {
        event.preventDefault(); // Prevent default scroll behavior

        const zoomDirection = event.deltaY < 0 ? 1.1 : 0.9; // Zoom in or out
        setScale((prevScale) => Math.max(0.5, Math.min(5, prevScale * zoomDirection))); // Limit zoom scale

        if (chartContainerRef.current) {
            // Adjust the scroll position to keep it centered while zooming
            const chartWidth = chartContainerRef.current.offsetWidth;
            const scrollDelta = event.clientX - chartContainerRef.current.getBoundingClientRect().left;
            setXOffset((prevOffset) => prevOffset - (scrollDelta / chartWidth) * 100);
        }
    };

    // Handle mouse drag to scroll left/right
    const handleMouseDown = (event: React.MouseEvent) => {
        event.preventDefault();
        const initialX = event.clientX;
        const initialOffset = xOffset;

        const handleMouseMove = (moveEvent: MouseEvent) => {
            const deltaX = moveEvent.clientX - initialX;
            setXOffset(initialOffset + deltaX * scale); // Adjust the offset according to zoom scale
        };

        const handleMouseUp = () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);
    };

    return (
        <div
            style={{ width: '100%', height: 500 }}
            onWheel={handleWheel}
            onMouseDown={handleMouseDown}
            ref={chartContainerRef}
        >
            <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                        dataKey="date"
                        tickFormatter={(date) => new Date(date).toLocaleDateString()}
                        offset={xOffset}
                    />
                    <YAxis domain={yAxisDomain} />
                    <Tooltip
                        labelFormatter={(d) => new Date(d as string).toLocaleString()}
                    />

                    {/* Customized rendering for Candlestick */}
                    <Customized
                        component={({ xAxisMap, yAxisMap }: any) => {
                            const xScale = xAxisMap[0]?.scale;
                            const yScale = yAxisMap[0]?.scale;

                            if (!xScale || !yScale) return null;

                            const candleWidth = 6;

                            return (
                                <g>
                                    {data.map((d, i) => {
                                        const x = xScale(d.date) + xOffset; // Apply offset here
                                        const yOpen = yScale(d.open);
                                        const yClose = yScale(d.close);
                                        const yHigh = yScale(d.high);
                                        const yLow = yScale(d.low);

                                        if ([x, yOpen, yClose, yHigh, yLow].some((v) => isNaN(v))) return null;

                                        const color = d.close >= d.open ? 'green' : 'red';

                                        return (
                                            <g key={i}>
                                                {/* Wick */}
                                                <line
                                                    x1={x}
                                                    x2={x}
                                                    y1={yHigh}
                                                    y2={yLow}
                                                    stroke={color}
                                                    strokeWidth={1}
                                                />
                                                {/* Body */}
                                                <rect
                                                    x={x - candleWidth / 2}
                                                    y={Math.min(yOpen, yClose)}
                                                    width={candleWidth}
                                                    height={Math.max(Math.abs(yClose - yOpen), 1)}
                                                    fill={color}
                                                />
                                            </g>
                                        );
                                    })}
                                </g>
                            );
                        }}
                    />
                </ComposedChart>
            </ResponsiveContainer>
        </div>
    );
};

export default ChartView;
