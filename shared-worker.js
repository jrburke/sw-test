onconnect = function(e) {
    var port = e.ports[0];

    port.onmessage = function(e) {
      var workerResult = e.data + ' plus penguin';
      port.postMessage(workerResult);
    };

    port.start();
};