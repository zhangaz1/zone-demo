function log(phase) {
	return function () {
		console.log("I am in zone.js " + phase + "!");
	};
}

function now() {
	return typeof performance !== 'undefined' ?
		performance.now() :
		Date.now();
}

import 'zone.js';

export default function zoneInTimeout() {
	Zone.current.fork({
		name: 'printAsyncTime',
		onInvokeTask(
			parentDelegate: ZoneDelegate,
			currentZone: Zone,
			targetZone: Zone,
			task: Task,
			applyThis: any,
			applyArgs: any[],
		) {
			let startTime = now(),
				result = parentDelegate.invokeTask(
					targetZone,
					task,
					applyThis,
					applyArgs
				);
			// console.log(arguments);
			console.log(`${task.source} 耗时 ${now() - startTime}ms `, task.data);
			return result;
		}
	}).run(Main);

	function Main() {
		setTimeout(function whenTimeout() {
			let i = 0;
			while ((i++) < 999999999) { }
		});

		(function whenDocumentClick() {
			let i = 0;
			while ((i++) < 88888888) { }
		})();
	}
}

zoneInTimeout();