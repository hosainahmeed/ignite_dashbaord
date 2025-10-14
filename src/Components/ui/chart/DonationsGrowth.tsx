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

const dummyData = {
  data: {
    total_years: [2023, 2024, 2025],
    monthlyRegistration: {
      Jan: 15,
      Feb: 22,
      Mar: 40,
      Apr: 18,
      May: 25,
      Jun: 5,
      Jul: 45,
      Aug: 52,
      Sep: 40,
      Oct: 28,
      Nov: 20,
      Dec: 32,
    },
  },
};

const DonationsGrowth = () => {
  const currentYear = new Date().getFullYear();
  const [year, setYear] = useState(currentYear);
  const [years, setYears] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {

    setIsLoading(true);
    setTimeout(() => {
      const years = dummyData?.data?.total_years || [];
      setYears(years);
      setIsLoading(false);
    }, 500);
  }, [currentYear]);

  const { monthlyData, maxUsers } = useMemo(() => {
    const monthMap = dummyData?.data?.monthlyRegistration || {};

    const maxUsers = Math.max(...Object.values(monthMap), 0) + 4;

    return {
      monthlyData: Object.keys(monthMap).map((month) => ({
        name: month,
        totalUser: monthMap[month as keyof typeof monthMap],
      })),
      maxUsers,
    };
  }, []);

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
      {isLoading ? (
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
                dataKey="totalUser"
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
