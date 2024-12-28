const path = require('path'); // подключаем path к конфигу вебпак

module.exports = {
  entry: { main: './src/scripts/index.js' },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js',
        publicPath: ''
  },
  mode: 'development',
  devServer: {
    static: path.resolve(__dirname, './dist'), 
    compress: true, 
    port: 8080, 

    open: true
  },
}