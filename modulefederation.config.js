const { dependencies } = require("./package.json");

module.exports = {
  name: "container",

  remotes: {
    app1: "app1@http://localhost:3001/remoteEntry.js",
  },
  shared: {
    // ...deps,
    react: { singleton: true, requiredVersion: dependencies.react },
    "react-dom": {
      singleton: true,

      requiredVersion: dependencies["react-dom"],
    },
    // react: { singleton: true, requiredVersion: deps.react },
    // "react-dom": {
    //   singleton: true,

    //   requiredVersion: deps["react-dom"],
    // },
  },
};
