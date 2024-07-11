# Port Proxy

## Description

This is a simple port proxy that listens on a port and forwards the data to another port.

**THIS IS A WORK IN PROGRESS**

**DO NOT USE IN PRODUCTION**

**USE AT YOUR OWN RISK**

## Installation

```bash
npm install -g @aymen3009/port-proxy
```

## Usage

```bash
port-proxy --from 8080 --to 80  # Listen on port 8080 and forward to port 80
```

```bash
portProxy --from 8080 --to 80  # Listen on port 8080 and forward to port 80
```

## Options

- `--from` or `-f` : The port to listen on
- `--to` or `-t` : The port to forward to
- `-p` or `--protocol` : The protocol to use (default: tcp) (options: tcp, udp)
- `--help` or `-h` : Display help message

## License

This project is licensed under the [MIT](LICENSE) License, feel free to do whatever you want with it.
