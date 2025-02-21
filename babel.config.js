module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./src'],
          alias: {
            '@components': './src/components',
            '@assets': './src/assets',
            '@utils': './src/utils',
            '@hooks': './src/hooks',
          },
        },
      ],
    ],
  };
};
