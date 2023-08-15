const fs = require('fs');
const yaml = require('js-yaml');

const routes = [];

const loadRoutes = async (path) => {
    try {
        const yamlData = fs.readFileSync(path+'/parameters.yml');
        const files = yaml.load(yamlData);
      for (const file of files) {
          routes.push({
              path: file.url,
              fileDir: `../routes/${file.name}`
          })
        }
      }
    catch (error) {
      console.error('Error reading folder:', error);
      throw error;
    }
    return routes;
};

module.exports = { loadRoutes };
