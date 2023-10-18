# Vue + Ts 编写的大富翁，支持自定义路径，动画和图片可以自行添加

## dev

```bash
git clone https://github.com/YaminZheng/zillionaire.git
cd zillionaire
yarn set version stable
yarn install
yarn dev
```

## 设置路径

- 打开 /src/App.vue
- 修改 roadMap 常量
- 四方格，长宽对齐，数字为地，null为空，根据数字顺序走动
