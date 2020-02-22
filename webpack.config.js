const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); //打包html的插件
module.exports = {
    mode: "production",
    entry: path.join(__dirname, 'src', 'main'),
    output: {
        path: path.join(__dirname, 'dist'),
    },
    module: {
        rules: [{
                test: /\.(png|jpg|gif|mp4)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 1024
                    }
                }]
            },
            {
                test: /\.scss$/,
                use: [{
                    loader: "style-loader" // 将 JS 字符串生成为 style 节点
                }, {
                    loader: "css-loader" // 将 CSS 转化成 CommonJS 模块
                }, {
                    loader: "sass-loader" // 将 Sass 编译成 CSS
                }]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({ // 打包输出HTML
            minify: { // 压缩HTML文件
                removeComments: true, // 移除HTML中的注释
                collapseWhitespace: true, // 删除空白符与换行符
                minifyCSS: true // 压缩内联css
            },
            template: path.resolve(__dirname + '/plugin/index.html')
        }),
    ]
};