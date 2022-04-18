import React, { useState, useEffect } from 'react';
import Head from 'next/head'
// import Image from 'next/image'
import styles from '../styles/Home.module.css'
import dynamic from 'next/dynamic'

// import covidData from '../assets/data.js'
import useSWR from 'swr'

const CovidChart = dynamic(
  () => import('../components/covidChart'),
  { ssr: false }
)
const fetcher = (...args) => fetch(...args).then(res => res.json());

const Home = () => {
  const [lang, setLang] = useState('cn');
  
  const { data, error } = useSWR('/jason/apps/covidData.json', fetcher)
  
  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>
  const covidData = data;
  const covidRecordDate = covidData.map(item => item.date);
  const newConfirmed = covidData.map(item => item.newConfirmed);
  const totalConfirmed = [];
  totalConfirmed.push(newConfirmed.reduce((total, current) => {
    if (total !== 0) {
      totalConfirmed.push(total)
    }
    return total + current;
  }, 0));
  const newAsymptomatic = covidData.map(item => item.newAsymptomatic);
  const totalAsymptomatic = [];
  totalAsymptomatic.push(newAsymptomatic.reduce((total, current) => {
    if (total !== 0) {
      totalAsymptomatic.push(total)
    }
    return total + current;
  }, 0));
  const totalNewInfected = newConfirmed.map((item, index) => {
    return item + newAsymptomatic[index]
  });
  const totalInfected = totalConfirmed.map((item, index) => {
    return item + totalAsymptomatic[index]
  });
  const newCasesData = [
    {
      en: 'New Confirmed',
      cn: '新增确诊',
      type: 'line',
      data: newConfirmed
    },
    {
      en: 'New Asymptomatic',
      cn: '新增无症状感染者',
      type: 'line',
      data: newAsymptomatic
    },
    {
      en: 'Total New Infected',
      cn: '总计新增患者',
      type: 'line',
      itemStyle: {
        color: "rgba(228, 57, 60, 1)"
      },
      lineStyle: {
        color: "rgba(228, 57, 60, 1)"
      },
      data: totalNewInfected
    },
  ]
  const infectedData = [
    {
      en: 'Total Confirmed',
      cn: '总计新增患者',
      type: 'line',
      data: totalConfirmed
    },
    {
      en: 'Total Asymptomatic',
      cn: '总计无症状感染者',
      type: 'line',
      data: totalAsymptomatic
    },
    {
      en: 'Total Infected',
      cn: '总计感染者',
      type: 'line',
      itemStyle: {
        color: "rgba(0, 0, 0, .65)"
      },
      lineStyle: {
        color: "rgba(0, 0, 0, .65)"
      },
      data: totalInfected
    },
  ]

  
  const switchLang = (lang) => {
    setLang(lang);
  }
  return (
    <div className={styles.container}>
      <Head>
        <title>ShangHai Omicron Trend Chart</title>
        <meta name="description" content="ShangHai Omicron Trend Chart" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <h1 className={styles.title}>
          <p style={{ display: lang === 'cn' ? 'block' : 'none' }}>上海奥密克戎疫情趋势图</p>
          <p style={{ display: lang === 'en' ? 'block' : 'none' }}>ShangHai Omicron Trend Chart</p>
        </h1>
        <section className={styles.lang_switch}>
          <p className={`${lang === 'cn' ? styles.selected : ''}`} onClick={() => { switchLang('cn') }}>CN</p>
          <p className={`${lang === 'en' ? styles.selected : ''}`} onClick={() => { switchLang('en') }}>EN</p>
        </section>
        <section className={styles.content}>
          <h2 style={{ display: lang === 'cn' ? 'block' : 'none' }}>新增感染者趋势</h2>
          <h2 style={{ display: lang === 'en' ? 'block' : 'none' }}>New Infected Trend</h2>
          <CovidChart showData={newCasesData} date={covidRecordDate} lang={lang}/>
          <h2 style={{ display: lang === 'cn' ? 'block' : 'none' }}>累计感染者趋势</h2>
          <h2 style={{ display: lang === 'en' ? 'block' : 'none' }}>Total Infected Trend</h2>
          <CovidChart showData={infectedData} date={covidRecordDate} lang={lang}/>
        </section>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://beebeego.qianke.xyz/"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.footer_link}
        >
          <span className={styles.footer_span}>Powered by Kilogrammer with ❤️ #小蜜蜂无障碍 #beebeego</span>
        </a>
      </footer>
    </div>
  )
}

export default Home;