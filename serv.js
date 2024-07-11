const udp = require('dgram');
const net = require('net');





const proxyTCP = ({ from, to }) => {
  const server = net.createServer((socket) => {
    const client = net.createConnection({ port: to }, () => {
      console.log(`Connection established from ${socket.remoteAddress}:${socket.remotePort} to ${client.remoteAddress}:${client.remotePort}`);
      socket.pipe(client);
      client.pipe(socket);
    });
  });

  server.listen(from);
}


const proxyUDP = ({ from, to }) => {
  const server = udp.createSocket('udp4');
  server.on('message', (msg, info) => {
    const client = udp.createSocket('udp4');
    client.send(msg, to, 'localhost', (err) => {
      if (err) {
        console.error(err);
      }
      console.log(`Message from ${info.address}:${info.port} sent to ${to}`);
    });
  });
  server.bind(from);
}

module.exports = {
  proxyTCP,
  proxyUDP
}