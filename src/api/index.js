const modules = {}
const modulesFiles = import.meta.globEager('./*.js')
Object.keys(modulesFiles).forEach(
  (modulePath) => {
    const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
    modules[moduleName] = modulesFiles[modulePath].default
  },
)
export default modules
