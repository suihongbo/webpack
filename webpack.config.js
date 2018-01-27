const path = require('path');
const devServer = require('webpack-dev-server');
const HtmlPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const UglifyJsPluin = require('uglifyjs-webpack-plugin');
const glob = require('glob');
const PurifyCSSPlugin = require('purifycss-webpack');
module.exports = {
    entry:{
        index:'./src/index.js',
        index2:'./src/index2.js'
    },
    output:{
        path: path.resolve(__dirname,'dist'),
        filename:'[name].js',
        publicPath:'http://localhost:8080/'
    },
    module:{
        rules:[
            {
                test:/\.css$/,
                // use: ['style-loader','css-loader']
                use:ExtractTextPlugin.extract({
                    fallback:"style-loader",
                    use:[{
                        loader:"css-loader",
                        options:{importLoaders:1}
                    },'postcss-loader']
                })    
            },{
                test:/\.(png|jpg|gif)/,
                use:[{
                    loader:'url-loader',
                    options:{
                        limit:500,
                        outputPath:'images/'
                    }
                }]
            },{
                test: /\.html$/i,
                loader: ['html-withimg-loader']
            },{
                test:/\.scss/,
                use:[{
                        loader:'style-loader'
                    },
                    {
                        loader:'css-loader'
                    },
                    {
                        loader:'sass-loader'
                    }
                ]
                // use:ExtractTextPlugin.extract({
                //     use:[{
                //         loader:"css-loader"
                //     },{
                //         loader:"sass-loader"
                //     }],
                //     fallback:"style-loader"
                // })
            },
            {
                test:/\.js$/,
                use:[{
                    loader:"babel-loader",
                    options:{
                        presets:["env"]
                    }
                }],
                exclude:'/node_modules'
            }
        ]
    },
    plugins:[
        new HtmlPlugin({
            minify:{
                removeAttributeQuotes:true
            },
            hash:true,
            template:"./src/index.html",
            chunks:['index']
        }),
        new ExtractTextPlugin("css/index.css"),
        new UglifyJsPluin(),
        new PurifyCSSPlugin({
            paths: glob.sync("./src/*.html")
        })
    ],
    devServer:{
        contentBase: path.resolve(__dirname,'dist'),
        host:'localhost',
        port:'8080'
    }
}