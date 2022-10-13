# CSS

## 盒子高度自动和宽度一致

#### html

```
<div class="box"></div>
```

#### css

```
.box {
  width: 100px;
  background: skyblue;
}

.box::before {
  content: '';
  padding-top: 100%;
  display: block;
}
```

## 黑白网页

```
html.grey {
    -webkit-filter: grayscale(100%);
    -moz-filter: grayscale(100%);
    -ms-filter: grayscale(100%);
    -o-filter: grayscale(100%);
    filter: progid:DXImageTransform.Microsoft.BasicImage(grayscale=1);
    _-webkit-filter: none;
    _filter: none;
}
```

## IE8 显示提示

```
<!--[if lt IE 9]>
<style type="text/css">
    html, body {
        overflow: hidden;
        height: 100%
    }

    .init {
        display: block !important;
    }

    .ie-title {
        color: #2366ad;
    }

    .ie-title-icon {
        display: inline-block;
        width: 32px;
        height: 32px;
        padding: 0 2px;
        background-color: #2366ad;
        color: #fff;
    }

    .ie-updater-layer {
        height: 100%;
        background: #666666;
        filter: progid:DXImageTransform.Microsoft.Alpha(opacity=10);
    }

    .ie-updater-box {
        position: absolute;
        left: 50%;
        top: 50%;
        margin-left: -320px;
        margin-top: -252px;
        padding: 32px;
        width: 640px;
        height: 448px;
        background: #fff;
        z-index: 9999;
    }

    .ie-updater-box .ie-btn-groups {
        position: absolute;
        left: 40px;
        text-decoration: none;
        color: #607d8b;
        font-size: 14px;
        width: 240px;
        /*height: 32px;*/
        background-color: #fff;
        /*text-align: center;*/
        line-height: 32px;
    }

    .ie-updater-box small {
        position: absolute;
        top: 80%;
        line-height: 1.8;
    }

    .ie-updater-box small,
    .ie-updater-box small a {
        color: #888;
        cursor: help;
    }

    .ie-updater-box small .fa {
        width: 16px;
    }

    .ie-updater-box small .ie-text-info {
        color: #f0bf22;
    }

    .ie-bx-icon {
        display: inline-block;
        vertical-align: text-bottom;
        width: 20px;
        height: 20px;
        margin-right: 4px;
        background: url("/sysweb/app/res/img/icon-browsers.png") no-repeat;
    }

    .ie-bx-icon.i-1 {
        background-position: -20px 0;
    }

    .ie-bx-icon.i-2 {
        background-position: 0 0;
    }

    .ie-bx-icon.i-3 {
        background-position: -40px 0;
    }

    .ie-mascot {
        position: absolute;
        bottom: 5%;
        right: 5%;
        width: 240px;
        height: 200px;
        background: url("/sysweb/app/res/img/logo-announcer.png") no-repeat center;
    }
</style>
<div class="ie-updater-layer"></div>
<div class="ie-updater-box">
    <h2 class="ie-title">
        东明快购电商平台 - 系统消息:
    </h2>
    <hr>
    <h3>您好，您当前使用的浏览器版本过低，存在严重的安全风险，系统将停止加载。为保障系统安全，建议您升级或使用如下浏览器:</h3>
    <br>
    <div class="ie-btn-groups">
        <a href="http://se.360.cn/"
        class="ie-updater-btn" target="_blank">
            <span class="ie-bx-icon i-3"></span> 360 极速浏览器
        </a><br>
        <a href="http://ie.sogou.com/"
        class="ie-updater-btn" target="_blank">
            <span class="ie-bx-icon i-2"></span> 搜狗高速浏览器
        </a><br>
        <a href="http://www.firefox.com.cn/"
        class="ie-updater-btn" target="_blank">
            <span class="ie-bx-icon i-1"></span> 火狐 Firefox 浏览器
        </a>
    </div>
    <small class="ie-copyright-box">
        <i class="fa fa-institution"></i> <a href="http://www.tongming.com.cn/" target="_blank">浙江东明不锈钢制品股份有限公司</a>
        <span class="ie-text-info">&copy; 2016-2017 &emsp;</span>
        <br>
        <i class="fa fa-phone"></i> 联系电话: 0573-82203125 (377)  400-8843-125
    </small>
    <div class="ie-mascot"></div>
</div>
<![endif]-->
```

## 图片等高不定宽排列（Flex）

#### html

```
<div class="list">
    <div class="item"><img src="1.png"></div>
    <div class="item"><img src="2.png"></div>
    <div class="item"><img src="3.png"></div>
    <div class="item"><img src="4.png"></div>
    <div class="item"><img src="5.png"></div>
</div>
```

#### css

```
.list {
    display: flex;  /* 采用flex布局 */
    flex-wrap: wrap;  /* 规定一行放不下flex元素时自动换行 */
}

.list .item {
    height: 200px;
    flex-grow: 1;  /* 每个flex元素占的宽度相同 */
    margin: 2px;
}

.list .item img {
    height: 100%;
    min-width: 100%;
    max-width: 100%;
    object-fit: cover;  /* 使图片等比拉伸，可能会被裁减 */
    vertical-align: bottom;
    display: block;
}
```

## 修改滚动条样式

```
/* IE滚动条颜色设置 */
body {
    scrollbar-arrow-color: #f2f2f3;  /* 上下箭头 */
    scrollbar-track-color: #1589ce;  /* 底层背景色 */
    scrollbar-face-color: #27aeff;   /* 滚动条前景色 */
    scrollbar-Shadow-color: #1589ce; /* 滚动条边线色 */
}
/* chrome滚动条颜色设置 */
body::-webkit-scrollbar {width: 10px;height: 10px;background-color: transparent;} /* 定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸 */
body::-webkit-scrollbar-track {background-color: #ccc;border-radius: 10px;-webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);} /* 定义滚动条轨道 内阴影+圆角 */
body::-webkit-scrollbar-thumb {background-color: #555;border-radius: 10px;-webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);} /* 定义滑块 内阴影+圆角 */
```

## 提示框三角箭头

#### html

```
<div class="class"></div>
```

#### css

```
.class {
    position: relative;
    top: 30px;
    right: 0px;
    width: 400px;
    height: 200px;
    padding: 8px;
    background-color: #ffffff;
    border: #cccccc solid 1px;
    border-radius: 3px;
}

.class:before {
    box-sizing: content-box;
    width: 0px;
    height: 0px;
    position: absolute;
    top: -16px;
    right: 41px;
    padding: 0;
    border-bottom: 8px solid #ffffff;
    border-top: 8px solid transparent;
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
    display: block;
    content: '';
    z-index: 12;
}

.class:after {
    box-sizing: content-box;
    width: 0px;
    height: 0px;
    position: absolute;
    top: -18px;
    right: 40px;
    padding: 0;
    border-bottom: 9px solid #cccccc;
    border-top: 9px solid transparent;
    border-left: 9px solid transparent;
    border-right: 9px solid transparent;
    display: block;
    content: '';
    z-index: 10;
}
```
