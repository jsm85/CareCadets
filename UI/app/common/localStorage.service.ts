class LocalStorageService {
	getValue(key: string): any {
		if (typeof (Storage) !== 'undefined') {
			var jsonString = localStorage.getItem('carecadets.' + key);
			return JSON.parse(jsonString);
		} else {
			return '';
		}
	};

	setValue(key: string, value: any) {
		if (typeof (Storage) !== 'undefined') {
			var stringified = JSON.stringify(value);
			localStorage.setItem('carecadets.' + key, stringified);
		}
	};	
}

export = LocalStorageService;