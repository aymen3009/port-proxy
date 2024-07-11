#! /usr/bin/env node
const { program, Option } = require("commander");
const udp = require('dgram');
const net = require('net');
const chalk = require('chalk');

const proxyTCP = ({ from, to }) => {
  const server = net.createServer((socket) => {
    const client = net.createConnection({ port: to }, () => {
      const msg = chalk.green(` ${socket.remoteAddress}:${socket.remotePort} -> ${to}`);
      console.log(chalk.green.bold(`[INFO]`), `New connection: ${msg}`);
      socket.pipe(client);
      client.pipe(socket);
    });
  });
  server.on('error', (err) => {
    const msg = chalk.red(err.message);
    console.error(chalk.red.bold(`[ERROR]`), `Error: ${msg}`);
    process.exit(1);
  }
  );
  server.listen(from);
  console.log(chalk.green.bold(`[INFO]`), `Proxying from ${from} to ${to}`);
}

const proxyUDP = ({ from, to }) => {
  const server = udp.createSocket('udp4');
  server.on('message', (msg, info) => {
    const client = udp.createSocket('udp4');
    client.send(msg, to, 'localhost', (err) => {
      if (err) {
        console.log(chalk.red.bold(`[ERROR]`), `Error: ${chalk.red(err.message)}`);
        process.exit(1);
      }
      const message = chalk.green(` ${info.address}:${info.port} -> ${to}`);
      console.log(chalk.green.bold(`[INFO]`), `New message: ${message}`);
    });
  });
  server.bind(from);
}

program
  .name('port-forwarder')
  .description('simple package to proxy ports')
  .version('1.0.0')

program
  .requiredOption('-f, --from <port>', 'Port to forward from')
  .requiredOption('-t, --to <port>', 'Port to forward to')
  .addOption(new Option('-p, --protocol <type>', 'Protocol to forward').choices(['tcp', 'udp']).default('tcp'))

program.parse(process.argv)
const options = program.opts()


if (options.protocol === 'tcp') {
  proxyTCP(options)
}
if (options.protocol === 'udp') {
  proxyUDP(options)
}