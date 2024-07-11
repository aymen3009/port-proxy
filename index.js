#! /usr/bin/env node
const { program, Option } = require("commander");
const { proxyTCP, proxyUDP } = require("./serv");



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
console.log(options)

if (options.protocol === 'tcp') {
  proxyTCP(options)
}
if (options.protocol === 'udp') {
  proxyUDP(options)
}