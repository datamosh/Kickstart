// Add ECMA262-5 Object methods if not supported natively
if (!('create' in Object.prototype)) {
	Object.create = function create(prototype, properties) {
		var object
		if (prototype === null)
			object = { "__proto__": null }
		else {
			if (typeof prototype != "object")
				throw new TypeError("typeof prototype["+(typeof prototype)+"] != 'object'")
			var Type = function () {}
			Type.prototype = prototype
			object = new Type()
			object.__proto__ = prototype
		}
		if (properties !== void 0)
			Object.defineProperties(object, properties)
		return object
	}
}

// Add ECMA262-5 method binding if not supported natively
if (!('bind' in Function.prototype)) {
	Function.prototype.bind= function(owner) {
		var that = this
		if (arguments.length<=1) {
			return function() {
				return that.apply(owner, arguments)
			}
		} else {
			var args= Array.prototype.slice.call(arguments, 1)
			return function() {
				return that.apply(owner, arguments.length===0? args : args.concat(Array.prototype.slice.call(arguments)))
			}
		}
	}
}

// Add ECMA262-5 string trim if not supported natively
if (!('trim' in String.prototype)) {
	String.prototype.trim= function() {
		return this.replace(/^\s+/, '').replace(/\s+$/, '')
	}
}

// Add ECMA262-5 Array methods if not supported natively
if (!('indexOf' in Array.prototype)) {
	Array.prototype.indexOf= function(find, i /*opt*/) {
		if (i===undefined) i= 0
		if (i<0) i+= this.length
		if (i<0) i= 0
		for (var n= this.length; i<n; i++)
			if (i in this && this[i]===find)
				return i
		return -1
	}
}

if (!('lastIndexOf' in Array.prototype)) {
	Array.prototype.lastIndexOf= function(find, i /*opt*/) {
		if (i===undefined) i= this.length-1
		if (i<0) i+= this.length
		if (i>this.length-1) i= this.length-1
		for (i++; i-->0;) /* i++ because from-argument is sadly inclusive */
			if (i in this && this[i]===find)
				return i
		return -1
	}
}

if (!('forEach' in Array.prototype)) {
	Array.prototype.forEach= function(action, that /*opt*/) {
		for (var i= 0, n= this.length; i<n; i++)
			if (i in this)
				action.call(that, this[i], i, this)
	}
}

if (!('map' in Array.prototype)) {
	Array.prototype.map= function(mapper, that /*opt*/) {
		var other= new Array(this.length)
		for (var i= 0, n= this.length; i<n; i++)
			if (i in this)
				other[i]= mapper.call(that, this[i], i, this)
		return other
	}
}

if (!('filter' in Array.prototype)) {
	Array.prototype.filter= function(filter, that /*opt*/) {
		var other= [], v
		for (var i=0, n= this.length; i<n; i++)
			if (i in this && filter.call(that, v= this[i], i, this))
				other.push(v)
		return other
	}
}

if (!('every' in Array.prototype)) {
	Array.prototype.every= function(tester, that /*opt*/) {
		for (var i= 0, n= this.length; i<n; i++)
			if (i in this && !tester.call(that, this[i], i, this))
				return false
		return true
	}
}

if (!('some' in Array.prototype)) {
	Array.prototype.some= function(tester, that /*opt*/) {
		for (var i= 0, n= this.length; i<n; i++)
			if (i in this && tester.call(that, this[i], i, this))
				return true
		return false
	}
}

// Javacript kickstart object 0.2
var kickstart = {
	version: '0.2',

	// Utils
	util: {
		// GUID/UUID generator
		// More info: http://es.wikipedia.org/wiki/Globally_Unique_Identifier
		guid: function() {
			return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
				var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8)
				return v.toString(16)
			}).toUpperCase()
		},
		
		// Contains (for string or array)
		contains: function(haystack, needle) {
			return haystack.indexOf(needle) != -1
		},
		
		// Copy / Clone object
		clone: function(object) {
			return Object.create(object)
		},

		// Pluralize word
		pluralize: function(count, word) {
			return count === 1 ? word : word + 's'
		},

		// Get or store data on local storage
		store: function(namespace, data) {
			if (arguments.length > 1)
				return localStorage.setItem(namespace, JSON.stringify(data))
			else {
				var store = localStorage.getItem(namespace)
				return (store && JSON.parse(store)) || []
			}
		},

		// Get random arbitrary
		getRandomArbitary: function(min, max) {
			return Math.random() * (max - min) + min;
		},

		// Get random integer
		getRandomInt: function(min, max) {
			return Math.floor(Math.random() * (max - min + 1)) + min;
		},

		// Format number
		separateNumber: function(number, separator) {
			if(!separator) separator = ','
			var str = number.toString().split('.')
			if (str[0].length >= 4)
			str[0] = str[0].replace(/(\d)(?=(\d{3})+$)/g, '$1' + separator)
			if (str[1] && str[1].length >= 4)
				str[1] = str[1].replace(/(\d{3})/g, '$1 ')
			return str.join('.')
		},

		// Pad number
		pad: function(number, width, character) {
			character = character || '0';
			number = number + '';
			return number.length >= width ? number : new Array(width - number.length + 1).join(character) + number;
		}
	},

	// Validation
	validate: {
		// Validate email
		email: function(email) {
			var regexp = /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i
			return regexp.test(email)
		}
	},

	// System
	system: {
		// Detect retina support
		// Author: Thomas Fuchs - More info: https://gist.github.com/3161015
		isRetina: function(){
			return (('devicePixelRatio' in window && devicePixelRatio > 1) ||
				('matchMedia' in window && matchMedia("(min-resolution:144dpi)").matches))
		}
	},
	
	// Template
	// Author: Addy Osmani - More info: https://github.com/addyosmani/microtemplatez
	template: function(tmpl, data) {
		return tmpl.replace((RegExp("{{\\s*([a-z0-9_][.a-z0-9_]*)\\s*}}", "gi")), function (tag, k) {
			var p = k.split("."),
				len = p.length,
				temp = data,
				i = 0
			for (; i < len; i++)
				temp = temp[p[i]]
			return temp
		})
	},

	// Preload
	preload: function (array) {
		var length = array.length,
			document = window.document,
			body = document.body,
			isIE = 'fileSize' in document,
			object
		while (length--) {
			if (isIE) {
				new Image().src = array[length]
				continue
			}
			object = document.createElement('object')
			object.data = array[length]
			object.width = object.height = 0
			body.appendChild(object)
		}
	},

	// Init Kickstart
	init: (function() {
		// Init code
	})()
}