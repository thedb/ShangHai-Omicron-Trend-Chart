import '../styles/globals.css';
import Script from 'next/script';
import React, { useState, useEffect } from 'react';
// import dynamic from 'next/dynamic'



// const DynamicVconsole = dynamic(() => import('../components/vConsole'), { ssr: false, });

function MyApp({ Component, pageProps }) {
  const shareLink = 'http://qianke.xyz/tesseract/omicron-trend/';
  const getWxConfig = async() => {
    const resultConfig = await fetch('/h5_gallery_api/wx_config', { method: 'POST', data: {
      url: shareLink
    }}).then(res => res.json());
    console.log('resultConfig', resultConfig);
    if (resultConfig.status === 'success') {
      const { config } = resultConfig;
      console.log('config', config);
      wx.config({
        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: config.appId, // 必填，公众号的唯一标识
        timestamp: config.timestamp, // 必填，生成签名的时间戳
        nonceStr: config.nonceStr, // 必填，生成签名的随机串
        signature: config.signature,// 必填，签名
        jsApiList: [
          'onMenuShareAppMessage',
          'onMenuShareTimeline',
        ]
      });
      wx.ready(() => {
        console.log('wx.ready');
        wx.onMenuShareAppMessage({ // 分享给用户
          title: '创意作品gallery',
          desc: 'Stay hungry, stay foolish~', // 分享描述
          link: shareLink,
          imgUrl:  `${shareLink}share.jpg`,
          success: function () {
          }
        });
        wx.onMenuShareTimeline({ // 朋友圈
          title: '创意作品gallery',
          link: shareLink,
          imgUrl:  `${shareLink}share.jpg`,
          success: function () {
          }
        });
      });
      wx.error((e) => {
        console.log('wechat conifg error:', e)
      });
    }
  }
  useEffect(() => {
    // getWxConfig();
  }, [])
  return (
    <>
      {/* <DynamicVconsole /> */}
      <Script src="//res.wx.qq.com/open/js/jweixin-1.4.0.js" strategy="beforeInteractive"></Script>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
