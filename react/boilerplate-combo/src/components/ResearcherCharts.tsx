import { BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell, ScatterChart, Scatter, CartesianGrid, Legend } from 'recharts';
import {Researcher} from "../types/researcher";
import PaginationBar from "./PaginationBar";

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7f50', '#00c49f', '#ffbb28'];

function groupAges(researchers: Researcher[]) {
    const groups = {
        '≤20': 0,
        '21-30': 0,
        '31-40': 0,
        '41-50': 0,
        '51-60': 0,
        '>60': 0,
    };

    for (const r of researchers) {
        if (r.age <= 20) groups['≤20']++;
        else if (r.age <= 30) groups['21-30']++;
        else if (r.age <= 40) groups['31-40']++;
        else if (r.age <= 50) groups['41-50']++;
        else if (r.age <= 60) groups['51-60']++;
        else groups['>60']++;
    }

    return Object.entries(groups).map(([group, count]) => ({ group, count }));
}

function ResearcherCharts({ fullResearchers, pageResearchers }: { fullResearchers: Researcher[], pageResearchers: Researcher[] }) {
    const fullData = groupAges(fullResearchers);
    const pageData = groupAges(pageResearchers);

    const totalFullCount = fullData.reduce((sum, item) => sum + item.count, 0);
    const pieData = fullData.map(item => ({
        name: item.group,
        value: item.count,
        percentage: (item.count / totalFullCount) * 100,
    }));

    return (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px', marginTop: '40px' }}>
            {/* Histogram */}
            <div>
                <h3>Age Group Histogram (All Data)</h3>
                <BarChart width={300} height={250} data={fullData}>
                    <XAxis dataKey="group" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="count" fill="#8884d8" />
                </BarChart>
            </div>

            {/* Pie Chart */}
            <div>
                <h3>Age Group Pie Chart (All Data)</h3>
                <PieChart width={300} height={250}>
                    <Pie dataKey="value" data={pieData} cx="50%" cy="50%" outerRadius={80} fill="#82ca9d" label>
                        {pieData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip formatter={(value: number) => `${value.toFixed(1)}%`} />
                </PieChart>
            </div>

            {/* Scatter Plot */}
            <div>
                <h3>Age Group Scatterplot (Current Page)</h3>
                <ScatterChart width={300} height={250}>
                    <CartesianGrid />
                    <XAxis type="category" dataKey="group" />
                    <YAxis type="number" dataKey="count" />
                    <Tooltip />
                    <Legend />
                    <Scatter name="Age Group" data={pageData} fill="#ff7300" />
                </ScatterChart>
            </div>
        </div>
    );
}

export default ResearcherCharts;
