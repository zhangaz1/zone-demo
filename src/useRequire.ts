// too old can't works
// var log = function(phase){
//     return function(){
//         console.log("I am in zone.js " + phase + "!");
//     };
// };

// zone.fork({
//     onZoneCreated: log("onZoneCreated"),
//     beforeTask: log("beforeTask"),
//     afterTask: log("afterTask"),
// }).run(function(){
//     var methodLog = function(func){
//         return function(){
//             console.log("I am from " + func + " function!");
//         };
//     },
//     foo = methodLog("foo"),
//     bar = methodLog("bar"),
//     baz = function(){
//         setTimeout(methodLog('baz in setTimeout'), 0);
//     };

//     foo();
//     baz();
//     bar();
// });