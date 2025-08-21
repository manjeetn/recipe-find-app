import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

const COLORS = ['#948fecff', '#1aa752ff', '#f4c322ff'];

function NutritionChart({ nutrition }) {
  const data = [
    { name: 'Carbs', value: parseInt(nutrition.carbs) },
    { name: 'Fat', value: parseInt(nutrition.fat) },
    { name: 'Protein', value: parseInt(nutrition.protein) }
  ];

  return (
    <div>
      <h3 className='bg-yellow-600 text-gray-50 px-3 rounded'>Nutrition Breakdown</h3>
      <PieChart width={300} height={300}>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={100}
          label
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
}

export default NutritionChart;
