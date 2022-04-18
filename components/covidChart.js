import React, { useState, useEffect } from 'react';
import styles from '../styles/Home.module.css'
// import the core library.
import ReactEChartsCore from 'echarts-for-react/lib/core';
// Import the echarts core module, which provides the necessary interfaces for using echarts.
import * as echarts from 'echarts/core';
// import ReactECharts from 'echarts-for-react'; 

import {
  LineChart,
  // BarChart,
  // PieChart,
  // ScatterChart,
  // RadarChart,
  // MapChart,
  // TreeChart,
  // TreemapChart,
  // GraphChart,
  // GaugeChart,
  // FunnelChart,
  // ParallelChart,
  // SankeyChart,
  // BoxplotChart,
  // CandlestickChart,
  // EffectScatterChart,
  // LinesChart,
  // HeatmapChart,
  // PictorialBarChart,
  // ThemeRiverChart,
  // SunburstChart,
  // CustomChart,
} from 'echarts/charts';
// import components, all suffixed with Component
import {
  // GridSimpleComponent,
  GridComponent,
  // PolarComponent,
  // RadarComponent,
  // GeoComponent,
  // SingleAxisComponent,
  // ParallelComponent,
  // CalendarComponent,
  // GraphicComponent,
  // ToolboxComponent,
  TooltipComponent,
  // AxisPointerComponent,
  // BrushComponent,
  TitleComponent,
  // TimelineComponent,
  // MarkPointComponent,
  // MarkLineComponent,
  // MarkAreaComponent,
  LegendComponent,
  // LegendScrollComponent,
  // LegendPlainComponent,
  // DataZoomComponent,
  // DataZoomInsideComponent,
  // DataZoomSliderComponent,
  // VisualMapComponent,
  // VisualMapContinuousComponent,
  // VisualMapPiecewiseComponent,
  // AriaComponent,
  // TransformComponent,
  // DatasetComponent,
} from 'echarts/components';
// Import renderer, note that introducing the CanvasRenderer or SVGRenderer is a required step
import {
  CanvasRenderer,
  // SVGRenderer,
} from 'echarts/renderers';
// Register the required components

echarts.use(
  [TitleComponent, TooltipComponent, GridComponent, LineChart, LegendComponent, CanvasRenderer]
);

const CovidChart = ({ showData, date, lang }) => {
  let echarts_react;
  const options = {
    animationEasing: 'cubicOut',
    title: {
      // text: 'Covid Trend Chart'
    },
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      orient: 'vertical',
      left: 70,
      top: 20,
      data: showData.map(item => {
        return item[`${lang}`]
      })
    },
    grid: {
      top: '10%',
      left: '2%',
      right: '3%',
      containLabel: true
    },
    // toolbox: {
    //   feature: {
    //     saveAsImage: {}
    //   }
    // },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: date
    },
    yAxis: {
      type: 'value'
    },
    series: showData.map(item => {
      item.name = item[`${lang}`];
      return item
    })
  };
  const [aniStart, setAniStart] = useState(false);
  const [cacheDate, setCacheDate] = useState(date);
  const [cacheShowData, setCacheShowData] = useState(showData);
  const mockAni = () => {
    setAniStart(true);
    if (aniStart) return;
    const len = cacheDate.length;
    const echartsInstance = echarts_react.getEchartsInstance();
    const _date = [].concat(JSON.parse(JSON.stringify(cacheDate)));
    const _showData = [].concat(JSON.parse(JSON.stringify(cacheShowData)));
    let count = 1;
    const timer = setInterval(() => {
      count++;
      for (let i = 0; i < cacheShowData.length; i++) {
        _showData[i].data = cacheShowData[i].data.slice(0, count);
        _showData[i].name = cacheShowData[i][`${lang}`]
      }
      // Array.map会有深拷贝问题
      echartsInstance.setOption({
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: _date.slice(0, count + 2 >= len ? len : count + 2)
        },
        series: _showData
      });
      if (count === date.length) {
        clearInterval(timer);
        setAniStart(false);
      }
    }, 400);
  }

  const onChange = (e) => {
    const val = e.target.value;
    const len = date.length;
    if (val === '0') {
      // total
      setCacheDate(date);
      setCacheShowData(showData);
    }
    if (val === '1') {
      // last 30 days
      const _date = date.slice(len - 30, len);
      const _showData = [].concat(JSON.parse(JSON.stringify(showData)));
      for (let i = 0; i < showData.length; i++) {
        _showData[i].data = showData[i].data.slice(len - 30, len);
        _showData[i].name = showData[i][`${lang}`]
      }
      setCacheDate(_date);
      setCacheShowData(_showData);
    }
  }
  useEffect(() => {
    if (aniStart) return;
    const echartsInstance = echarts_react.getEchartsInstance();
    echartsInstance.setOption({
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: cacheDate
      },
      series: cacheShowData
    });
  }, [cacheShowData]);
  return (
    <section className={styles.charts_content}>
      <section className={`${styles.charts_sort_by} ${aniStart ? styles.cannot_sort : ''}`}>
        { `${lang === 'cn' ? '筛选': 'Filter'}` }&nbsp;
        <select onChange={onChange} className={`${aniStart ? styles.cannot_select : ''}`}>
          <option value="0" defaultValue>{ `${lang === 'cn' ? '全部日期': 'total days'}` }</option>
          <option value="1">{ `${lang === 'cn' ? '最近30天': 'last 30 days'}` }</option>
        </select>
      </section>
      <ReactEChartsCore
        ref={(e) => { echarts_react = e }}
        echarts={echarts}
        option={options}
        style={{ 
          width: '100%',
          height: 500,
        }}
        notMerge={true}
        lazyUpdate={true}
      />
      <section className={styles.wrapper}>
        <p className={styles.button} style={{ display: lang === 'cn' ? 'inline-block' : 'none' }} onClick={mockAni}>播放趋势动画</p>
        <p className={styles.button} style={{ display: lang === 'en' ? 'inline-block' : 'none' }} onClick={mockAni}>Play Trend Animation</p>
      </section>
    </section>
  )
}

export default CovidChart;