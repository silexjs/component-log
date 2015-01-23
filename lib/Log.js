var Log = function(options) {
	this.levels = [
		/*0*/ 'emergency',
		/*1*/ 'alert',
		/*2*/ 'critical',
		/*3*/ 'error',
		/*4*/ 'warning',
		/*5*/ 'notice',
		/*6*/ 'info',
		/*7*/ 'debug',
	];
	this.colors = [
		'redBright',
		'greenBright',
		'yellowBright',
		'magentaBright',
		'cyanBright',
		'red',
		'green',
		'yellow',
		'magenta',
		'cyan',
	];
	this.names = {
		'null': 'blackBright',
	};
	this.color = require('cli-color');
	this.setLevelShow(options.show);
	this.setLevelWrite(options.write);
};
Log.prototype = {
	levels: null,
	colors: null,
	colorsNow: 0,
	names: null,
	levelShow: null,
	levelWrite: null,
	
	setLevelShow: function(level) {
		if(this.levelShow === false) {
			this.levelShow = -2;
		} else {
			this.levelShow = this.levels.indexOf(level);
			if(this.levelShow === -1) { this.levelShow = 7; }
		}
	},
	setLevelWrite: function(level) {
		if(this.levelWrite === false) {
			this.levelWrite = -2;
		} else {
			this.levelWrite = this.levels.indexOf(level);
			if(this.levelWrite === -1) { this.levelWrite = 7; }
		}
	},
	
	canShow: function(level) {
		return (this.levels.indexOf(level) <= this.levelShow);
	},
	canWrite: function(level) {
		return (this.levels.indexOf(level) <= this.levelWrite);
	},
	
	log: function(level, name, m) {
		if(m === undefined) {
			m = name;
			name = null;
		}
		if(this.levels.indexOf(level) === -1) {
			throw new Error('The "'+level+'" level log requested does not exist!');
		}
		if(this.canShow(level) === true) {
			this.show(level, name, m);
		}
		if(this.canWrite(level) === true) {
			this.write(level, name, m);
		}
	},
	
	show: function(level, name, m) {
		console.log(this.color[this.getColor(name)](name)+': '+m);
	},
	write: function(level, name, m) {
		//...
	},
	
	getColor: function(level) {
		if(this.names[level] === undefined) {
			this.names[level] = this.newColor();
		}
		return this.names[level];
	},
	newColor: function() {
		this.colorsNow++;
		if(this.colorsNow >= this.colors.length) {
			this.colorsNow = 0;
		}
		return this.colors[this.colorsNow];
	},
	
	emergency:	function(name, m) { return this.log('emergency',	name, m); },
	alert:		function(name, m) { return this.log('alert',		name, m); },
	critical:	function(name, m) { return this.log('critical',		name, m); },
	error:		function(name, m) { return this.log('error',		name, m); },
	warning:	function(name, m) { return this.log('warning',		name, m); },
	notice:		function(name, m) { return this.log('notice',		name, m); },
	info:		function(name, m) { return this.log('info',			name, m); },
	debug:		function(name, m) { return this.log('debug',		name, m); },
};


module.exports = Log;
