# Node SMS Gateway App

## Introduction

Node SMS Gateway App provides an easy way to deploy SMS Gateway which includes
[terminal](https://github.com/tohenk/node-sms-terminal) and
[gateway](https://github.com/tohenk/node-sms-gateway). Each terminal and gateway
can be deployed in separate host.

## Requirement

- [Nodejs](https://nodejs.org/) version 8.11.3 or higher. If you're using Linux
  box, use of [NodeSource Node.js Binary Distribution](https://github.com/nodesource/distributions)
  is recommended.
- [MySQL](https://mysql.com/) Server, using other database server is supported
  as long as [Sequelize](http://docs.sequelizejs.com/) supports it.
- Supported hardwares, see https://github.com/tohenk/node-sms-terminal#hardware-support.

## Installation

Installation is available via GIT.

### Clone Node SMS Gateway App

```
$ cd ~
$ git clone https://github.com/tohenk/node-sms-gw.git
```

### Initialize Node SMS Terminal source tree

```
$ cd ~/node-sms-gw
$ git submodule init --merge --remote -- terminal
$ cd ~/node-sms-gw/terminal
$ git submodule init --merge --remote -- ui/lib/script
$ git submodule init --merge --remote -- ui/public/js
```

### Initialize Node SMS Gateway source tree

```
$ cd ~/node-sms-gw
$ git submodule init --merge --remote -- gateway
$ cd ~/node-sms-gw/gateway
$ git submodule init --merge --remote -- ui/lib/script
$ git submodule init --merge --remote -- ui/public/js
```

> For updating, replace `git submodule init` command with
> `git submodule update` for both Node SMS Terminal source tree and
> Node SMS Gateway source tree.

## Preparation

MySQL must be already configured properly. Refer to MySQL documentation to do
so.

### Creating MySQL schema

```
$ cd ~/node-sms-gw
$ mysql -u root -p < docs/smsgw.sql
```

### Adding MySQL user

```
$ mysql -u root -p
mysql> grant all privileges on 'smsgw'.'*' to 'user'@'%' identified by 'password';
mysql> exit
```

> Replace both `user` and `password` with desired user and password.

### Adding user and setting permission

If you're using Linux box, it is recommended to run services as separate user
and give write access to required files and folders.

```
$ sudo adduser --system --no-create-home --disabled-login nodejs

$ cd ~/node-sms-gw/terminal
$ mkdir -p sessions
$ sudo chown -vR nodejs logs sessions msgref.json

$ cd ~/node-sms-gw/gateway
$ mkdir -p sessions
$ sudo chown -vR nodejs config logs sessions
```

## Configuration

- Follow Node SMS Terminal configuration [here](https://github.com/tohenk/node-sms-terminal/blob/master/README.md#configuration).
- Follow Node SMS Gateway configuration [here](https://github.com/tohenk/node-sms-gateway/blob/master/README.md#configuration).

## Creating services

### Linux

#### Node SMS Terminal service

To install Node SMS Terminal as service, follow this commands. Adjust the path as needed.

```
$ cd ~
$ wget https://github.com/tohenk/node-sms-gw/blob/master/service/linux/node-sms-terminal
$ chmod +x node-sms-terminal
$ vi node-sms-terminal
$ sudo cp node-sms-terminal /etc/init.d/
$ sudo update-rc.d node-sms-terminal defaults
$ systemctl daemon-reload
```

And finally, to start Node SMS Terminal issue:

```
$ systemctl start node-sms-terminal
```

#### Node SMS Gateway service

To install Node SMS Gateway as service, follow this commands. Adjust the path as needed.

```
$ cd ~
$ wget https://github.com/tohenk/node-sms-gw/blob/master/service/linux/node-sms-gateway
$ chmod +x node-sms-gateway
$ vi node-sms-gateway
$ sudo cp node-sms-gateway /etc/init.d/
$ sudo update-rc.d node-sms-gateway defaults
$ systemctl daemon-reload
```

And finally, to start Node SMS Gateway issue:

```
$ systemctl start node-sms-gateway
```

### Windows

Windows service functionality currently handled by
[node-windows](https://github.com/coreybutler/node-windows). To install
`node-windows` follow this step:

```
> cd path\to\node-sms-gw
> npm install node-windows --global
> npm link node-windows
```

#### Node SMS Terminal service

Execute following commands in the Administrator Command Prompt:

```
> cd path\to\node-sms-gw
> node service\windows\terminal.js install

> net start nodesmsterminal.exe
```

#### Node SMS Gateway service

Execute following commands in the Administrator Command Prompt:

```
> cd path\to\node-sms-gw
> node service\windows\gateway.js install

> net start nodesmsgateway.exe
```