// module.exports = {
//   plugins: [
//     require('postcss-preset-env')({
//       autoprefixer: true
//     })
//   ]
// };
module.exports = {
  plugins: [
    require('postcss-import')({}),
    require('postcss-preset-env')({
      autoprefixer: true,
      browsers: ['Android >= 4.0', 'iOS >= 8']
    }),
    require('postcss-pxtorem')({
      rootValue: 16,
      propList: ['*'],
      exclude: /node_modules/i
    })
  ]
};
