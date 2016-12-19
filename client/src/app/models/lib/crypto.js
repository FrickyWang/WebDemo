// ���ܴ���
define(["angular", "jsencrypt"], function(angular, jsencrypt) {
	
	function crypto(CryptoConfig) {
		this.config = CryptoConfig;
	}
	var cryptoConfig = {
		publicKey: void 0
	}
	// �Ƿ���Ҫ����
	crypto.prototype.enabled = function() {
		if (this.config.publicKey) {
			return true;
		} else {
			return false;
		}
	}
	// �������ܺ󷵻�
	crypto.prototype.encrypt = function(param) {
		if (this.config.publicKey) {
			var jcrypt = new jsencrypt();
			jcrypt.setPublicKey(this.config.publicKey);
			return jcrypt.encrypt(param);
		}
		return param;
	}
	// ��ֹjs mini��ʱ�ı�������ƣ�ͨ�����ַ�ʽע�����
	crypto.$inject = ["CryptoConfig"];
	
	return {
		CryptoConfig: cryptoConfig,
		Crypto: crypto
	}
});