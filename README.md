# 个人主页项目

这是一个现代化的个人主页项目，具有以下特性：

## 功能特点

- **响应式导航栏**: 包含 HOME、ABOUT、RESUME、RESEARCH、PROJECTS、BLOG 六个选项
- **平滑滚动**: 点击导航项时页面会平滑滚动到对应区域
- **动态下划线**: 当前选中的导航项显示下划线，悬停时也会显示
- **PDF简历**: 点击RESUME会在新窗口打开PDF文件
- **现代化设计**: 使用渐变背景、卡片布局和悬停效果
- **移动端适配**: 完全响应式设计，适配各种屏幕尺寸

## 文件结构

```
ly-homepage/
├── index.html          # 主页面文件
├── styles.css          # 样式文件
├── script.js           # JavaScript功能文件
├── resume.pdf          # 简历PDF文件（示例）
└── README.md           # 项目说明
```

## 使用方法

1. 在浏览器中打开 `index.html` 文件
2. 导航栏会自动固定在页面顶部
3. 点击不同的导航项会平滑滚动到对应部分
4. 点击RESUME会打开PDF简历文件

## 自定义说明

- 将 `resume.pdf` 替换为您的真实简历文件
- 在各个section中添加您的真实内容和图片
- 可以根据需要调整颜色主题和布局

## 技术栈

- HTML5
- CSS3 (Flexbox, Grid, 动画)
- Vanilla JavaScript
- 响应式设计

## 浏览器兼容性

支持所有现代浏览器，包括：
- Chrome 60+
- Firefox 55+
- Safari 11+
- Edge 79+

## 启动与终止服务
python3 -m http.server 8000
pkill -9 -f "python3 -m http.server"