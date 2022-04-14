import React, { useState } from 'react';
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
  const mockAni = () => {
    setAniStart(true);
    if (aniStart) return;
    const len = date.length;
    const echartsInstance = echarts_react.getEchartsInstance();
    let count = 1;
    const _showData = [].concat(JSON.parse(JSON.stringify(showData)));
    const timer = setInterval(() => {
      count++;
      for (let i = 0; i < showData.length; i++) {
        _showData[i].data = showData[i].data.slice(0, count);
        _showData[i].name = showData[i][`${lang}`]
      }
      // Array.map会有深拷贝问题
      echartsInstance.setOption({
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: date.slice(0, count + 2 >= len ? len : count + 2)
        },
        series: _showData
      });
      if (count === date.length) {
        clearInterval(timer);
        setAniStart(false);
      }
    }, 400);
  }
  return (
    <>
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
        <p className={styles.button} style={{ display: lang === 'cn' ? 'block' : 'none' }} onClick={mockAni}>播放趋势动画</p>
        <p className={styles.button} style={{ display: lang === 'en' ? 'block' : 'none' }} onClick={mockAni}>Play Trend Animation</p>
      </section>
    </>
  )
}

export default CovidChart;