exports.install = function(Vue, options) {
  Vue.prototype.$unique = function(arr) { //全局函数1
    const newArray = [];
    arr.sort();
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] !== arr[i + 1]) {
        newArray.push(arr[i]);
      }
    }
    return newArray;
  };
  Vue.prototype.$pushH = function() { //全局函数2
      xxx
  };
  Vue.prototype.$pushHN = function() { //全局函数3
      xxx
  };
};