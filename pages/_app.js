import '../styles/globals.css';
import Script from 'next/script';
import React, { useState, useEffect } from 'react';
// import dynamic from 'next/dynamic'



// const DynamicVconsole = dynamic(() => import('../components/vConsole'), { ssr: false, });

function MyApp({ Component, pageProps }) {
  const getWxConfig = async(url) => {
    const shareData = {
      title: '2022 ShangHai Omicron Trends Chart',
      desc: '2022年上海奥密克戎疫情趋势图',
      link: window.location.href.split('#')[0],
      imgUrl: 'http://qianke.xyz/jason/apps/omicron-trend/logo.jpg',
    };
    let resultConfig;
    try {
      resultConfig = await fetch(url, 
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          appid: 'wxec1df08db2f9ddc2',
          url: location.href.split('#')[0]
        }),
      }).then(res => res.json());
    } catch (e) {
      console.log('error', e);
    }
    
    console.log('resultConfig', resultConfig);
    if (resultConfig.status === 'success') {
      const { config } = resultConfig;
      console.log('success', config);
      wx.config({
        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: config.appid, // 必填，公众号的唯一标识
        timestamp: config.timestamp, // 必填，生成签名的时间戳
        nonceStr: config.noncestr, // 必填，生成签名的随机串
        signature: config.signature,// 必填，签名
        jsApiList: [
          'updateAppMessageShareData',
          'updateTimelineShareData',
        ]
      });
      wx.ready(() => {
        console.log('wx.ready');
        wx.updateAppMessageShareData(shareData);
        wx.updateTimelineShareData(shareData);
        console.log('wx', wx);
        console.log('updateAppMessageShareData', wx.updateAppMessageShareData);
      });
      wx.error((e) => {
        console.log('wechat conifg error:', e)
      });
    }
  }
  useEffect(() => {
    let requestUrl;
    if (location.href.indexOf('qianke') > -1) {
      requestUrl = 'http://wx.qianke.xyz/open/wx_official/js_api/js_config';
    } else {
      requestUrl = '/open/wx_official/js_api/js_config';
    }
    setTimeout(() => {
      getWxConfig(requestUrl);
    }, 1000);
  }, [])
  return (
    <>
      {/* <DynamicVconsole /> */}
      <Script src="//res.wx.qq.com/open/js/jweixin-1.6.0.js" strategy="beforeInteractive"></Script>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
