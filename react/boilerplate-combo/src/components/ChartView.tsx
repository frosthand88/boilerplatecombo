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
    const [slicedData, setSlicedData] = useState<ChartData[]>([]);
    const [xOffset, setXOffset] = useState(0); // Track horizontal scroll
    const [scale, setScale] = useState(1); // For zoom level
    const [isLoading, setIsLoading] = useState(false); // To prevent multiple API calls
    const [lastFetchedDate, setLastFetchedDate] = useState<string>(''); // Track the last fetched date
    const chartContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const container = chartContainerRef.current;
        if (!container) return;

        const handleWheelManual = (event: WheelEvent) => {
            event.preventDefault(); // Now allowed!
            const zoomDirection = event.deltaY < 0 ? 1.1 : 0.9;
            setScale((prevScale) => Math.max(0.5, Math.min(5, prevScale * zoomDirection)));

            const chartWidth = container.offsetWidth;
            const scrollDelta = event.clientX - container.getBoundingClientRect().left;
            setXOffset((prevOffset) => prevOffset - (scrollDelta / chartWidth) * 100);
        };

        container.addEventListener('wheel', handleWheelManual, { passive: false });

        return () => {
            container.removeEventListener('wheel', handleWheelManual);
        };
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            console.log("Fetching data...");
            try {
                const res = await axios.get(
                    `${API_BASE_URL}/api/chart/${symbol}?limit=500${lastFetchedDate ? `&start_date=${lastFetchedDate}` : ''}`
                );
                console.log("Fetched data:", res.data);

                // Prepend new data to the existing data and update the last fetched date
                setData((prevData) => {
                    const newData = [...res.data, ...prevData];
                    console.log("Data after prepend:", newData);
                    return newData;
                });
                setLastFetchedDate(res.data[0]?.date); // Update last date for pagination
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [symbol, lastFetchedDate]);

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

    // Check for more data to load when the user scrolls past the current data range
    const checkForMoreData = () => {
        const chartWidth = chartContainerRef.current?.offsetWidth ?? 0;
        const visibleDataStart = Math.floor(xOffset / (chartWidth / scale)); // Calculate start point of visible data
        console.log("Checking for more data. Current xOffset:", xOffset);

        // When the user has scrolled past the 500th data point and no data is being loaded
        if (visibleDataStart <= 500 && !isLoading) {
            console.log("Requesting more data...");
            setLastFetchedDate(data[0]?.date); // Update the last fetched date for pagination
        }
    };

    useEffect(() => {
        checkForMoreData();
    }, [xOffset, data]);

    // Calculate the Y-Axis domain (min and max)
    const yAxisDomain = [
        Math.min(...data.map(d => Math.min(d.open, d.high, d.low, d.close))),
        Math.max(...data.map(d => Math.max(d.open, d.high, d.low, d.close)))
    ];

    useEffect(() => {
        console.log("Data updated:", data);
    }, [data]);

    useEffect(() => {
        if (!chartContainerRef.current) return;

        const chartWidth = chartContainerRef.current.offsetWidth;
        const candleWidth = 8;
        const visibleCandles = Math.floor(chartWidth / candleWidth / scale);

        const startIndex = Math.max(0, data.length - visibleCandles + Math.floor(xOffset / candleWidth));
        const endIndex = Math.min(data.length, startIndex + visibleCandles);

        setSlicedData(data.slice(startIndex, endIndex));
    }, [xOffset, scale, data]);

    return (
        <div
            style={{ width: '100%', height: 500 }}
            onMouseDown={handleMouseDown}
            ref={chartContainerRef}
        >
            <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={slicedData}> {/* Only show the last 100 candles */}
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                        dataKey="date"
                        tickFormatter={(date) => new Date(date).toLocaleDateString()}
                    />
                    <YAxis domain={yAxisDomain} />
                    <Tooltip labelFormatter={(d) => new Date(d as string).toLocaleString()} />

                    {/* Customized rendering for Candlestick */}
                    <Customized
                        component={({ xAxisMap, yAxisMap }: any) => {
                            const xScale = xAxisMap[0]?.scale;
                            const yScale = yAxisMap[0]?.scale;

                            if (!xScale || !yScale) return null;

                            const candleWidth = 6;

                            return (
                                <g>
                                    {slicedData.map((d, i) => {
                                        const x = xScale(d.date); // Apply offset here
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
