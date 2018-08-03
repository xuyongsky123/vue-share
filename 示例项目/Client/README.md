# Client

> 示例前端项目

## 注意Client/config/index.js端口转发

```javascript
// Paths
proxyTable: {
    '/': {
    target: 'http://192.168.188.118:3000',//此处是我本机服务地址，可参考示例项目中Server,开启后端服务，配置此处端口转发
    changeOrigin: true
    }
},
```

### Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
