'use client';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { useEffect, useMemo, useState } from 'react';
import { Select } from 'antd';
import { useGetDonationChartDataQuery } from '../../../redux/services/metaApis';

const DonationsGrowth = () => {
  const currentYear = new Date().getFullYear();
  const [year, setYear] = useState(currentYear);
  const [years, setYears] = useState<number[]>([]);
  const { data: donationChartData, isFetching } = useGetDonationChartDataQuery({ year });

  useEffect(() => {
    const apiYears = donationChartData?.data?.yearsDropdown || [];
    if (Array.isArray(apiYears)) {
      setYears(apiYears as number[]);
      if (apiYears.length > 0 && !apiYears.includes(year)) {
        setYear(apiYears[0] as number);
      }
    }
  }, [donationChartData, year]);

  const { monthlyData, maxUsers } = useMemo(() => {
    const list = donationChartData?.data?.chartData || [];
    const totals = list.map((i: { totalDonate: number }) => i.totalDonate);
    const maxUsers = Math.max(...(totals.length ? totals : [0]), 0) + 4;
    return {
      monthlyData: list.map((i: { month: string; totalDonate: number }) => ({
        name: i.month,
        totalDonation: i.totalDonate,
      })),
      maxUsers,
    };
  }, [donationChartData]);

  return (
    <div
      style={{
        width: '100%',
        height: '450px',
        backgroundColor: '#fff',
        borderRadius: '12px',
        padding: '20px',
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
      }}
    >
      {isFetching ? (
        <div className="w-full h-full flex items-center justify-center text-gray-500 font-medium">
          Loading chart...
        </div>
      ) : (
        <>
          <div className="flex justify-between items-center mb-4">
            <h3
              style={{
                textAlign: 'left',
                color: '#333',
                fontWeight: 'bold',
                fontSize: '18px',
              }}
            >
              Donations growth
            </h3>
            <Select
              value={year}
              placeholder="Select year"
              onChange={setYear}
              style={{
                width: '150px',
                fontWeight: '500',
              }}
              options={years.map((item) => ({ value: item, label: item }))}
            />
          </div>

          <ResponsiveContainer width="100%" height="85%">
            <BarChart
              data={monthlyData}
              margin={{ top: 20, right: 20, left: 0, bottom: 10 }}
            >
              <defs>
                <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#D62828" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#D62828" stopOpacity={0.9} />
                </linearGradient>
              </defs>

              <CartesianGrid strokeDasharray="3 3" stroke="#E0E0E0" />
              <XAxis
                dataKey="name"
                stroke="#333"
                tick={{ fontSize: 12, fontWeight: 500 }}
              />
              <YAxis
                stroke="#333"
                domain={[0, maxUsers]}
                tick={{ fontSize: 12, fontWeight: 500 }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                  padding: '8px',
                }}
                cursor={{ fill: 'rgba(170,119,217,0.1)' }}
              />
              <Bar
                dataKey="totalDonation"
                fill="url(#colorUv)"
                barSize={55}
                radius={[5, 5, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </>
      )}
    </div>
  );
};

export default DonationsGrowth;
