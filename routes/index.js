// const fs = require('fs/promises');
// const path = require('path')

// const routes = [];

// const loadRoutes = async (path) => {
//     try {
//       const files = await fs.readdir(path);
//       // console.log({
//       //   path: path,
//       //   files: files
//       // })
//       const regex = /\//; 
//       for (const file of files) {
//         if (file !== 'index.js' && !regex.test(file)) {
//           const name = file.replace(/\.js$/, '');
//           routes.push({
//               path: `/api/${name}`,
//               fileDir: `../routes/${name}`
//           })
//         }
//       }
//     } catch (error) {
//       console.error('Error reading folder:', error);
//       throw error;
//     }
//     //console.log(routes)
//     return routes;
// };

// module.exports = { loadRoutes };



////////////
//const fs = require('fs/promises');
const path = require('path')
const fs = require('fs');
const yaml = require('js-yaml');

// try {
//   const yamlData = fs.readFileSync(__dirname+'/index.yml', 'utf8');
//   const dataArray = yaml.load(yamlData);
//   console.log(dataArray); // This will output the array from the YAML file
// } catch (error) {
//   console.error(error);
// }

const routes = [];
const loadRoutes = async (path) => {
    try {
        const yamlData = fs.readFileSync(path+'/index.yml');
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
    //console.log(routes)
    return routes;
};

module.exports = { loadRoutes };
