'use client'

import React, {useMemo, useState} from "react";
import {Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import {useAppSelector} from "@/lib/hooks";
import {format, parse} from "date-fns";
import {Transaction} from "@/types/transaction";
import {DropdownOption} from "@/components/atoms/Dropdown/DropdownOptionElement/types";
import Dropdown, {DropdownPreset} from "@/components/atoms/Dropdown";
import {Category} from "@/types/category";
import CustomGraphTooltip from "@/components/atoms/CustomGraphTooltip";
import {getFormattedCurrency} from "@/utils/format";
import Button from "@/components/atoms/Button";
import html2pdf from 'html2pdf.js';

interface FilterOptions {
  dateRange?: { start: string; end: string };
  timeInterval?: "monthly" | "yearly";
  categories?: DropdownOption<Category>[];
}

interface ChartData {
  name: string;
  date: string;
  income: number;
  outcome: number;
}

function processTransactionsForChart(
  transactions: Transaction[],
  filterOptions: FilterOptions = {}
): ChartData[] {
  const {dateRange, timeInterval = "monthly", categories: categoryFilter} = filterOptions;

  const filteredTransactions = transactions
    .filter((transaction) => {
      const transactionDate = new Date(transaction.date);

      if (dateRange) {
        const startDate = new Date(dateRange.start);
        const endDate = new Date(dateRange.end);
        if (transactionDate < startDate || transactionDate > endDate) {
          return false;
        }
      }

      if (categoryFilter?.length && !categoryFilter.find((x) => x.key === transaction.categoryId)) {
        return false;
      }
      return true;
    })
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const groupedData = new Map<string, { income: number; outcome: number }>();

  filteredTransactions.forEach((transaction) => {
    const transactionDate = new Date(transaction.date);

    const key =
      timeInterval === "monthly"
        ? format(transactionDate, "MM/yyyy")
        : format(transactionDate, "yyyy");

    if (!groupedData.has(key)) {
      groupedData.set(key, {income: 0, outcome: 0});
    }

    const group = groupedData.get(key)!;
    if (transaction.type === "income") {
      group.income += transaction.amount;
    } else if (transaction.type === "outcome") {
      group.outcome += transaction.amount;
    }
  });

  const chartData: ChartData[] = [];
  groupedData.forEach((values, key) => {
    chartData.push({
      name: timeInterval === "monthly"
        ? format(parse(key, "MM/yyyy", new Date()), "MM/yyyy")
        : key,
      date: key,
      income: values.income,
      outcome: values.outcome,
    });
  });

  return chartData.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
}


export default function Reports() {
  const transactions = useAppSelector((state) => state.transactionReducer.transactions);
  const categories = useAppSelector((state) => state.categoryReducer.categories);
  const [selectedCategories, setSelectedCategories] = useState<DropdownOption<Category>[]>([]);
  const [timePeriodOption, setTimePeriodOption] = useState<DropdownOption | undefined>({key: "monthly", value: "Aylık"});

  const COLORS = ["#00ff13", "#ff0000"];

  const categoryOptions: DropdownOption<Category>[] = useMemo(() => {
    return categories.map(x => ({key: x.id, value: x.name, item: x}));
  }, [categories]);

  const timePeriodOptions: DropdownOption[] = [
    {key: "monthly", value: "Aylık"},
    {key: "yearly", value: "Yıllık"}
  ]

  const chartData = processTransactionsForChart(Object.values(transactions), {
    dateRange: undefined,
    timeInterval: timePeriodOption?.key as "monthly" | "yearly" | undefined,
    categories: selectedCategories,
  });

  const pieChartData = [
    {name: "Gelir", value: chartData.reduce((sum, item) => sum + item.income, 0)},
    {name: "Gider", value: chartData.reduce((sum, item) => sum + item.outcome, 0)},
  ];

  const generatePDF = () => {
    const element = document.getElementById('reports');
    const options = {
      margin: 0.2,
      filename: 'reports.pdf',
      image: {type: 'jpeg', quality: 1},
      jsPDF: {unit: 'cm', orientation: 'p'}
    };
    html2pdf().from(element).set(options).save();
  };


  return (
    <div id="reports" className="flex flex-col gap-y-10">
      <Button variant="filledBlue" size="medium" className="self-end" label="Raporları PDF İndir" onClick={generatePDF}/>
      <div className="flex flex-col gap-y-[15px]">
        <Dropdown
          label="Kategori Filtresi"
          dropdownPreset={DropdownPreset.Outline}
          options={categoryOptions}
          selectedOption={selectedCategories}
          setSelectedOption={setSelectedCategories}
          multiple={true}
        />
        <Dropdown
          hideSearch
          blockReselect
          disableSort
          label="Zaman Periyodu"
          dropdownPreset={DropdownPreset.Outline}
          options={timePeriodOptions}
          selectedOption={timePeriodOption}
          setSelectedOption={setTimePeriodOption}
          multiple={false}
        />
      </div>
      <div style={{height: 300}}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={pieChartData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={80}
            >
              {pieChartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]}/>
              ))}
            </Pie>
            <Tooltip content={<CustomGraphTooltip/>}/>
            <Legend/>
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div style={{height: 300}}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3"/>
            <XAxis dataKey="date"/>
            <YAxis width={100} tickFormatter={(value) => getFormattedCurrency(value)}/>
            <Tooltip content={<CustomGraphTooltip/>}/>
            <Legend/>
            <Bar name="Gelir" dataKey="income" fill="#005BFF"/>
            <Bar name="Gider" dataKey="outcome" fill="#F48C87"/>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div style={{height: 300}}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData}>
            <CartesianGrid strokeDasharray="4 4"/>
            <XAxis dataKey="date"/>
            <YAxis width={100} tickFormatter={(value) => getFormattedCurrency(value)}/>
            <Tooltip content={<CustomGraphTooltip/>}/>
            <Area type="linear" name="Gelir" dataKey="income" stroke="#005BFF" fill="#A5A6F61A"/>
            <Area type="linear" name="Gider" dataKey="outcome" stroke="#F48C87" fill="none"/>
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
