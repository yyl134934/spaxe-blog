---
title: '多端兼容方案'
name: "213"
author: "/author.png"
github: "https://github.com/yyl134934"
date: '2023-07-12'
tags: "React,Nextjs"
description: '探讨前端跨平台适配方案——响应式布局以及自适应设计'
---
### 多端兼容方案

响应式布局和自适应设计都是`多端兼容的解决方案`，但他们之间还是有区别的：

**响应式设计**：响应式开发`一套界面`，通过检测视口分辨率，针对不同客户端在客户端做代码处理，来展现不同的布局和内容。

**自适应设计**：自适应需要开发`多套界面`，通过检测视口分辨率，来判断当前访问的设备是 PC 端、平板还是手机，从而请求服务层，返回不同的页面。

### 响应式设计与自适应设计如何选取？

*   页面不是太复杂的情况下，采用响应式布局的方式
*   页面中信息较多，布局较为复杂的情况，采用自适应布局的方式

### 响应式设计方案

大体思路：`@media`、`zoom`做适配；需要移动端的项目用`Grid栅格`、`Flex`适配，字体用`rem`；大屏项目`固定宽高比`，动态计算`scale`进行缩放适配

*
    #### 媒体查询——@media

```css
@media screen and (min-width: 620px) and (max-width: 1620px) {
  .App {
    background-color: yellow;
  }
}
@media screen and (max-width: 620px) {
  .App {
    background-color: green;
  }
}
```

*
    #### react-responsive

安装

    npm install react-responsive --save

代码

```javascript
import React from 'react'
import { useMediaQuery } from 'react-responsive'

const Example = () => {
  const isDesktopOrLaptop = useMediaQuery({
    query: '(min-width: 1224px)'
  })
  const isBigScreen = useMediaQuery({ query: '(min-width: 1824px)' })
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' })
  const isPortrait = useMediaQuery({ query: '(orientation: portrait)' })
  const isRetina = useMediaQuery({ query: '(min-resolution: 2dppx)' })

  return <div>
    <h1>Device Test!</h1>
    {isDesktopOrLaptop && <p>You are a desktop or laptop</p>}
    {isBigScreen && <p>You  have a huge screen</p>}
    {isTabletOrMobile && <p>You are a tablet or mobile phone</p>}
    <p>Your are in {isPortrait ? 'portrait' : 'landscape'} orientation</p>
    {isRetina && <p>You are retina</p>}
  </div>
}
```

*
    #### navigator.useAgent

```javascript
import logo from "./logo.svg";
import "./App.css";
import PhoneApp from "./pages/phone";
import PCApp from "./pages/pc";

function App() {
  const isMobile = () => {
    if (
      navigator.userAgent.match(
        /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
      )
    ) {
      return true;
    }
    return false;
  };

  return <div className="App">{isMobile() ? <PhoneApp /> : <PCApp />}</div>;
}

export default App;
```

*
    #### react hooks

```javascript
import React, { useEffect, useMemo, useRef } from "react";

const viewportContext = React.createContext({});

const ViewportProvider = ({ children }) => {
  // 顺带监听下高度，备用
  const [width, setWidth] = React.useState(window.innerWidth);
  const [height, setHeight] = React.useState(window.innerHeight);

  const handleWindowResize = () => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  };

  React.useEffect(() => {
    window.addEventListener("resize", handleWindowResize);
    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);

  return (
    <viewportContext.Provider value={{ width, height }}>
      {children}
    </viewportContext.Provider>
  );
};

const useViewport = (viewport) => {
  const { width, height } = React.useContext(viewportContext);

  const isMobile = useRef(useMemo(() => width < viewport, []));

  useEffect(() => {
    const nextState = width < viewport;
    if (nextState === isMobile.current) {
      return;
    }
    isMobile.current = nextState;
  }, [width]);

  return { width, height, isMobile: isMobile.current };
};

export { ViewportProvider, useViewport };

```

