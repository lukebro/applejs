var fs = require('fs')
var rollup = require('rollup')
var babel = require('rollup-plugin-babel')
var uglify = require('rollup-plugin-uglify')
var version = require('../package.json').version

var banner =
  '/*!\n' +
  ' * apple.js v' + version + '\n' +
  ' * (c) ' + new Date().getFullYear() + ' Lukasz Brodowski\n' +
  ' * github.com/lukebro/nutmeg\n' +
  ' */'

rollup.rollup({
	entry: 'src/index.js',
	plugins: [
		babel()
	]
}).then(function (bundle) {
	return write('dist/apple.js', bundle.generate({
		format: 'umd',
		banner: banner,
		moduleName: 'Nutmeg'
	}).code)
}).then(function () {
	return rollup.rollup({
		entry: 'dist/apple.js',
		plugins: [
	 		uglify({
	 			banner: banner
	 		})
	 	]
	}).then(function (bundle) {
		return write('dist/apple.min.js', banner + '\n' + bundle.generate({
			format: 'umd',
			moduleName: 'Apple'
		}).code)
	})
})

function write(dest, code) {
	return fs.writeFileSync(dest, code)
}
