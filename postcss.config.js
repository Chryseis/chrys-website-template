/**
 * Created by Administrator on 2017/11/9.
 */
module.exports = {
    plugins: [
        require('autoprefixer'),
        process.env.NODE_ENV === "production" && require('postcss-pxtorem')({
            rootValue: 16,
            propList: ['*', '!top', '!bottom']
        })
    ]
}