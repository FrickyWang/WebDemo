// 加密传输
define(["angular", "jsencrypt"], function(angular, jsencrypt) {
	
	function crypto(CryptoConfig) {
		this.config = CryptoConfig;
	}
	var cryptoConfig = {
		publicKey: void 0
	}
	// 是否需要加密
	crypto.prototype.enabled = function() {
		if (this.config.publicKey) {
			return true;
		} else {
			return false;
		}
	}
	// 参数加密后返回
	crypto.prototype.encrypt = function(param) {
		if (this.config.publicKey) {
			var jcrypt = new jsencrypt();
			jcrypt.setPublicKey(this.config.publicKey);
			return jcrypt.encrypt(param);
		}
		return param;
	}
	// 防止js mini化时改变变量名称，通过这种方式注入变量
	crypto.$inject = ["CryptoConfig"];
	
	return {
		CryptoConfig: cryptoConfig,
		Crypto: crypto
	}
});