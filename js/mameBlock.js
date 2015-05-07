/** mameblock.js
	Copyright 2015 Yutaka Kachi released under MIT license.
 */

var mameBlock = (function() {

	function _getCode() {
		return '/* test code */\nalert("hello world4");';
	};
	
	return {
		getCode: _getCode
	}

})()