import  { FC } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

// 棒グラフに表示するデータの型を定義
type BarDataItem = {
    date: string;
    pv: number;
};

// コンポーネントのpropsとして受け取るデータの型を定義
interface BarGraphProps {
    data: BarDataItem[];
}

// BarGraph コンポーネントの定義
const BarGraph: FC<BarGraphProps> = ({ data }) => {
    return (
        <BarChart width={730} height={250} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date"/>
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="pv" fill="#91C8E4" name="閲覧数" />
        </BarChart>
    );
};

export default BarGraph;
