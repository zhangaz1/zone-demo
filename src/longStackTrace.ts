import 'zone.js';

function throwError() {
	throw new Error('Error');
}


function main() {
	// document.addEventListener('click', throwError);
	setTimeout(throwError);
}

// main();


// 调用栈信息
interface IStackInfo {
	stack: string;
	time: Date;
}
class LongStackTrace {
	// long-stace 存放索引
	public static longStack = 'xxxxxx';// Symbol('long-stack');
	public name = 'long-stace-trace';
	public onScheduleTask(
		parentZoneDelegate: ZoneDelegate,
		currentZone: Zone,
		targetZone: Zone,
		task: Task
	): Task {

		// 旧的栈信息
		let oldLongStack: IStackInfo[] = (Zone.currentTask && Zone.currentTask.data && Zone.currentTask.data[LongStackTrace.longStack]) || [],
			longStack: IStackInfo[] = [{
				stack: new Error().stack,
				time: new Date()
			}].concat(oldLongStack);

		// 存放新的 longStack
		task.data[LongStackTrace.longStack] = longStack;
		return parentZoneDelegate.scheduleTask(targetZone, task);
	}
	public onHandleError(
		parentZoneDelegate: ZoneDelegate,
		currentZone: Zone,
		targetZone: Zone,
		error: any
	): boolean {
		let err = new Error();
		// 合并调用栈
		let longStace: IStackInfo[] = [{
			stack: error.stack,
			time: new Date()
		}].concat(Zone.currentTask.data[LongStackTrace.longStack] || []);

		// 格式化调用栈
		err.stack = longStace.map(stack => `----------------------${stack.time.toLocaleTimeString()}-----------------------\n${stack.stack}`).join('\n');

		// 打印调用栈
		console.log(err.stack);
		return false;
	}

}

Zone.current
	.fork(new LongStackTrace())
	.run(main);