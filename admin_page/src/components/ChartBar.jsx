import {
    Bar,
    BarChart,
    CartesianGrid,
    Legend,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts';

function ChartBar({
    width = '100%',
    data,
    dataKey,
    keyBar,
    name,
    layout = 'horizontal',
}) {
    const propX = {};
    const propY = {};

    if (layout === 'horizontal') {
        propX.dataKey = dataKey;
    }

    if (layout === 'vertical') {
        propX.type = 'number';
        propY.type = 'category';
        propY.dataKey = dataKey;
        propY.width = 160;
    }

    return (
        <ResponsiveContainer width={width} height={400}>
            <BarChart
                data={data}
                layout={layout}
                margin={{ top: 40, right: 0, bottom: 15, left: 10 }}
            >
                <XAxis {...propX} />
                <YAxis {...propY} />
                <CartesianGrid stroke='#ccc' strokeDasharray='5 5' />
                <Tooltip />
                <Legend />
                <Bar
                    dataKey={keyBar}
                    fill='green'
                    name={name}
                    animationDuration={1600}
                />
            </BarChart>
        </ResponsiveContainer>
    );
}

export default ChartBar;
