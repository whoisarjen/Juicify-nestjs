import { FunctionComponent } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface StackedBarChartProps {
    data: Array<any>,
    barNamesWithColor: Array<any>
}

const StackedBarChart: FunctionComponent<StackedBarChartProps> = ({ data, barNamesWithColor }) => {
    return (
        <ResponsiveContainer width="100%" height="100%">
            <BarChart
                data={data}
                margin={{
                    top: 20,
                    right: 10,
                    // right: 30,
                    // left: 20,
                    bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                {
                    barNamesWithColor.map(bar =>
                        <Bar dataKey={bar.dataKey} stackId="a" fill={bar.fill} />
                    )
                }
            </BarChart>
        </ResponsiveContainer>
    )
}

export default StackedBarChart;