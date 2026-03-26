'use client';

import React, { useMemo } from 'react';
import ReactECharts from 'echarts-for-react';
import { use } from 'echarts/core';

interface ChartDataPoint {
  date: string;
  price: number;
  volume: number;
  high_52w: number | null;
  low_52w: number | null;
  pe_ratio: number | null;
  eps: number | null;
  dividend_yield: number | null;
}

interface StockChartProps {
  data: ChartDataPoint[];
}

export default function StockChart({ data }: StockChartProps) {
  const option = useMemo(() => {
    if (!data || data.length === 0) {
      return {
        backgroundColor: 'transparent',
        title: {
          text: 'No data available',
          left: 'center',
          top: 'center',
          textStyle: {
            color: 'rgba(255,255,255,0.5)',
            fontSize: 14,
            fontFamily: 'monospace',
          },
        },
        tooltip: { show: false },
        grid: [{ left: '3%', right: '4%', top: '3%', height: '65%' }],
        xAxis: [{
          type: 'category',
          data: [],
          gridIndex: 0,
          axisLine: { lineStyle: { color: 'rgba(255, 255, 255, 0.3)' } },
          axisLabel: { color: 'rgba(255, 255, 255, 0.7)' },
        }],
        yAxis: [{
          type: 'value',
          gridIndex: 0,
          axisLabel: { color: 'rgba(255, 255, 255, 0.7)' },
        }],
        series: [],
      };
    }

    // Prepare data arrays
    const dates = data.map(d => d.date);
    const prices = data.map(d => d.price);
    const volumes = data.map(d => d.volume);

    // Calculate 52-week high for Y-axis scaling
    const high52 = data[0]?.high_52w || Math.max(...prices);
    const low52 = data[0]?.low_52w || Math.min(...prices);

    // Find price range for Y axis - include room for 0 and the 52-week high
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);
    // Use 0 as floor and 52-week high as ceiling with padding
    const yAxisMin = Math.min(0, minPrice);
    const yAxisMax = high52 * 1.05; // Add 5% padding above 52-week high

    // Find max volume for scaling
    const maxVolume = Math.max(...volumes);

    return {
      backgroundColor: 'transparent',
      animation: true,
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          label: {
            backgroundColor: '#283b56',
            fontSize: 10,
            fontFamily: 'monospace',
          },
          lineStyle: {
            color: 'rgba(255, 255, 255, 0.3)',
            type: 'dashed',
          },
        },
        backgroundColor: 'rgba(0, 0, 0, 0.85)',
        borderColor: 'rgba(255, 255, 255, 0.2)',
        borderWidth: 1,
        textStyle: {
          color: '#fff',
          fontSize: 10,
          fontFamily: 'monospace',
        },
        formatter: (params: any) => {
          const date = params[0]?.axisValue || '';
          let html = `<div style="font-weight: bold; margin-bottom: 4px;">${date}</div>`;

          params.forEach((param: any) => {
            const marker = param.marker;
            const seriesName = param.seriesName;
            const value = param.value;

            if (seriesName === 'Volume') {
              html += `<div>${marker} ${seriesName}: ${value ? value.toLocaleString() : 'N/A'}</div>`;
            } else {
              html += `<div>${marker} ${seriesName}: $${value ? value.toFixed(2) : 'N/A'}</div>`;
            }
          });

          return html;
        },
      },
      grid: [
        // Price chart grid
        {
          left: '3%',
          right: '4%',
          top: '12%',
          height: '65%',
        },
        // Volume grid
        {
          left: '3%',
          right: '4%',
          top: '79%',
          height: '15%',
        },
      ],
      xAxis: [
        {
          type: 'category',
          data: dates,
          gridIndex: 0,
          axisLine: { lineStyle: { color: 'rgba(255, 255, 255, 0.15)' } },
          axisTick: { lineStyle: { color: 'rgba(255, 255, 255, 0.15)' } },
          axisLabel: {
            color: 'rgba(255, 255, 255, 0.6)',
            fontSize: 10,
            fontFamily: 'monospace',
          },
        },
        {
          type: 'category',
          data: dates,
          gridIndex: 1,
          axisLine: { lineStyle: { color: 'rgba(255, 255, 255, 0.15)' } },
          axisTick: { lineStyle: { color: 'rgba(255, 255, 255, 0.15)' } },
          axisLabel: {
            color: 'rgba(255, 255, 255, 0.6)',
            fontSize: 10,
            fontFamily: 'monospace',
          },
          show: false,
        },
      ],
      yAxis: [
        {
          type: 'value',
          gridIndex: 0,
          scale: true,
          min: yAxisMin,
          max: yAxisMax,
          splitLine: {
            lineStyle: {
              color: 'rgba(255, 255, 255, 0.06)',
              type: 'dashed',
            },
          },
          axisLine: { lineStyle: { color: 'rgba(255, 255, 255, 0.15)' } },
          axisLabel: {
            color: 'rgba(255, 255, 255, 0.6)',
            fontSize: 10,
            fontFamily: 'monospace',
            formatter: (value: number) => `$${value.toFixed(2)}`,
          },
        },
        {
          type: 'value',
          gridIndex: 1,
          scale: true,
          splitLine: { show: false },
          axisLine: { lineStyle: { color: 'rgba(255, 255, 255, 0.15)' } },
          axisLabel: {
            color: 'rgba(255, 255, 255, 0.5)',
            fontSize: 9,
            fontFamily: 'monospace',
            formatter: (value: number) => {
              if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
              if (value >= 1000) return `${(value / 1000).toFixed(0)}K`;
              return value.toString();
            },
          },
          max: maxVolume * 1.2,
        },
      ],
      dataZoom: [
        {
          type: 'inside',
          xAxisIndex: [0, 1],
          start: 80,
          end: 100,
          filterMode: 'filter',
        },
        {
          type: 'slider',
          xAxisIndex: [0, 1],
          bottom: 10,
          height: 20,
          borderColor: 'transparent',
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          fillerColor: 'rgba(0, 242, 255, 0.3)',
          handleStyle: {
            color: 'rgba(0, 242, 255, 0.8)',
            borderColor: 'transparent',
          },
          textStyle: {
            color: 'rgba(255, 255, 255, 0.7)',
            fontSize: 9,
            fontFamily: 'monospace',
          },
        },
      ],
      legend: {
        data: [
          { name: 'High', icon: 'line' },
          { name: 'Low', icon: 'line' },
          { name: 'Price', icon: 'line' },
          { name: 'Volume', icon: 'rect' }
        ],
        show: true,
        top: 3,
        left: 'center',
        orient: 'horizontal',
        textStyle: {
          color: 'rgba(255, 255, 255, 0.9)',
          fontSize: 10,
          fontFamily: 'monospace',
          fontWeight: 'bold',
        },
        itemGap: 25,
        itemWidth: 25,
        itemHeight: 12,
        icon: 'roundRect',
        borderRadius: 4,
        tooltip: { show: false },
        emphasis: {
          textStyle: {
            color: '#fff',
          }
        },
        selectedMode: true,
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        borderColor: 'rgba(255, 255, 255, 0.1)',
        borderWidth: 1,
        padding: [6, 15, 6, 15],
        // Prevent legend hover from affecting chart series
        hoverLink: false,
      },
      series: [
        // High line - dashed horizontal at the timeframe max
        {
          name: 'High',
          type: 'line',
          color: 'rgba(239, 68, 68, 0.7)',
          data: Array(dates.length).fill(maxPrice),
          xAxisIndex: 0,
          yAxisIndex: 0,
          symbol: 'none',
          lineStyle: {
            color: 'rgba(239, 68, 68, 0.5)',
            type: 'dashed',
            width: 1.5,
          },
          silent: true,
          tooltip: {
            formatter: () => `High: $${maxPrice.toFixed(2)}`
          },
        },
        // Low line - dashed horizontal at the timeframe min
        {
          name: 'Low',
          type: 'line',
          color: 'rgba(245, 158, 11, 0.7)',
          data: Array(dates.length).fill(minPrice),
          xAxisIndex: 0,
          yAxisIndex: 0,
          symbol: 'none',
          lineStyle: {
            color: 'rgba(245, 158, 11, 0.5)',
            type: 'dashed',
            width: 1.5,
          },
          silent: true,
          tooltip: {
            formatter: () => `Low: $${minPrice.toFixed(2)}`
          },
        },
        // Price line
        {
          name: 'Price',
          type: 'line',
          color: 'rgba(59, 130, 246, 1)',
          data: prices,
          xAxisIndex: 0,
          yAxisIndex: 0,
          symbol: 'circle',
          symbolSize: 4,
          showSymbol: false,
          hoverAnimation: true,
          smooth: true,
          lineStyle: {
            color: 'rgba(59, 130, 246, 0.8)',
            width: 2,
          },
          itemStyle: {
            color: 'rgba(59, 130, 246, 1)',
            borderWidth: 2,
            borderColor: '#0b0c0f',
          },
          areaStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                { offset: 0, color: 'rgba(59, 130, 246, 0.15)' },
                { offset: 1, color: 'rgba(59, 130, 246, 0.01)' },
              ],
            },
          },
          emphasis: {
            itemStyle: {
              color: 'rgba(59, 130, 246, 1)',
              borderWidth: 3,
              borderColor: '#0b0c0f',
              shadowColor: 'rgba(59, 130, 246, 0.4)',
              shadowBlur: 8,
            },
          },
        },
        // Volume bars
        {
          name: 'Volume',
          type: 'bar',
          color: 'rgba(100, 180, 255, 0.5)',
          data: volumes,
          xAxisIndex: 1,
          yAxisIndex: 1,
          itemStyle: {
            color: (params: any) => {
              const price = prices[params.dataIndex];
              const prevPrice = params.dataIndex > 0 ? prices[params.dataIndex - 1] : price;
              return price >= prevPrice
                ? 'rgba(100, 180, 255, 0.5)'
                : 'rgba(239, 68, 68, 0.5)';
            },
            borderRadius: [2, 2, 0, 0],
          },
          emphasis: {
            itemStyle: {
              color: (params: any) => {
                const price = prices[params.dataIndex];
                const prevPrice = params.dataIndex > 0 ? prices[params.dataIndex - 1] : price;
                return price >= prevPrice
                  ? 'rgba(100, 180, 255, 0.8)'
                  : 'rgba(239, 68, 68, 0.8)';
              },
            },
          },
        },
      ],
    };
  }, [data]);

  const chartStyle = {
    height: '100%',
    width: '100%',
  };

  return (
    <ReactECharts
      option={option}
      style={chartStyle}
      opts={{ renderer: 'canvas' }}
      notMerge={true}
      lazyUpdate={true}
    />
  );
}
