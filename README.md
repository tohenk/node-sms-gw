# Node SMS Gateway App

## Introduction

Node SMS Gateway App provides an easy way to deploy SMS Gateway which includes
[terminal](https://github.com/tohenk/node-sms-terminal) and
[gateway](https://github.com/tohenk/node-sms-gateway). Each terminal and gateway
can be deployed in separate host.

Node SMS Gateway App is a pure SMS gateway implementation that doesn't requires
or depends to any external SMS gateway service or library.

## Requirement

- [Nodejs](https://nodejs.org/) version 8.11.3 or higher. If you're using Linux
  box, use of [NodeSource Node.js Binary Distribution](https://github.com/nodesource/distributions)
  is recommended.
- [MySQL](https://mysql.com/) Server, using other database server is supported
  as long as [Sequelize](http://docs.sequelizejs.com/) supports it.
- Supported hardwares, see https://github.com/tohenk/node-sms-terminal#hardware-support.

## Installation

Installation is available using GIT.

### Clone Node SMS Gateway App

```sh
cd ~
git clone https://github.com/tohenk/node-sms-gw.git
```

### Install npm dependencies

```sh
cd ~/node-sms-gw
npm install
```

## Preparation

MySQL must be already configured properly. Refer to MySQL documentation to do
so.

### Creating MySQL schema

```sh
cd ~/node-sms-gw
mysql -u root -p < docs/smsgw.sql
```

### Adding MySQL user

```sh
mysql -u root -p
mysql> grant all privileges on 'smsgw'.'*' to 'user'@'%' identified by 'password';
mysql> exit
```

> Replace both `user` and `password` with desired user and password.

### Adding user and setting permission

If you're using Linux box, it is recommended to run services as separate user
and give write access to required files and folders.

```sh
sudo adduser --system --no-create-home --disabled-login --group nodejs
cd ~/node-sms-gw
cp node_modules/@ntlab/sms-terminal/msgref.json .
sudo chown -vR nodejs config data logs sessions msgref.json
```

It is necessary to add `nodejs` user to `dialout` group to be able to use modem port.

```sh
sudo adduser nodejs dialout
```

## Configuration

- Follow Node SMS Terminal configuration [here](https://github.com/tohenk/node-sms-terminal/blob/master/README.md#configuration).
- Follow Node SMS Gateway configuration [here](https://github.com/tohenk/node-sms-gateway/blob/master/README.md#configuration).

## Creating services

### Linux

To install Node SMS Terminal as service, follow this commands. Adjust the path as needed.

```sh
cd ~/node-sms-gw
vi service/linux/systemd/node-sms-terminal.service
sudo cp service/linux/systemd/node-sms-terminal.service /etc/systemd/system/
sudo systemctl daemon-reload
sudo systemctl enable node-sms-terminal.service
```

And finally, to start Node SMS Terminal issue:

```sh
systemctl start node-sms-terminal
```

To install Node SMS Gateway as service, follow this commands. Adjust the path as needed.

```sh
cd ~/node-sms-gw
vi service/linux/systemd/node-sms-gateway.service
sudo cp service/linux/systemd/node-sms-gateway.service /etc/systemd/system/
sudo systemctl daemon-reload
sudo systemctl enable node-sms-gateway.service
```

And finally, to start Node SMS Gateway issue:

```sh
systemctl start node-sms-gateway
```

### Windows

Windows service functionality currently handled by
[node-windows](https://github.com/coreybutler/node-windows). To install
`node-windows` follow this step:

```sh
cd path\to\node-sms-gw
npm install node-windows --global
npm link node-windows
```

#### Node SMS Terminal service

Execute following commands in the Administrator Command Prompt:

```sh
cd path\to\node-sms-gw
node service\windows\terminal.js install
net start nodesmsterminal.exe
```

#### Node SMS Gateway service

Execute following commands in the Administrator Command Prompt:

```sh
cd path\to\node-sms-gw
node service\windows\gateway.js install
net start nodesmsgateway.exe
```