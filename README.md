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

Installation is available via GIT.

### Clone Node SMS Gateway App

```
$ cd ~
$ git clone https://github.com/tohenk/node-sms-gw.git
```

### Initialize Node SMS Terminal and Node SMS Gateway source tree

```
$ cd ~/node-sms-gw
$ git submodule update --init --recursive --merge --remote -- terminal
$ git submodule update --init --recursive --merge --remote -- gateway
```

In case of the above recursive sub module init doesn't work, you must manually
update the sub modules:
```
$ cd ~/node-sms-gw
$ git submodule update --init --merge --remote -- terminal/lib
$ git submodule update --init --merge --remote -- terminal/ui/lib
$ git submodule update --init --merge --remote -- terminal/ui/lib/script
$ git submodule update --init --merge --remote -- terminal/ui/public/js
$ git submodule update --init --merge --remote -- gateway/lib
$ git submodule update --init --merge --remote -- gateway/ui/lib
$ git submodule update --init --merge --remote -- gateway/ui/lib/script
$ git submodule update --init --merge --remote -- gateway/ui/public/js
```

> For updating, omit `--init` option for each command of `git submodule update`.

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

It is necessary to add `nodejs` user to `dialout` group to be able to use modem port.

```
$ sudo adduser nodejs dialout
```

## Configuration

- Follow Node SMS Terminal configuration [here](https://github.com/tohenk/node-sms-terminal/blob/master/README.md#configuration).
- Follow Node SMS Gateway configuration [here](https://github.com/tohenk/node-sms-gateway/blob/master/README.md#configuration).

## Creating services

### Linux

#### Using systemd

To install Node SMS Terminal as service, follow this commands. Adjust the path as needed.

```
$ cd ~/node-sms-gw
$ vi service/linux/systemd/node-sms-terminal.service
$ sudo cp service/linux/systemd/node-sms-terminal.service /etc/systemd/system/
$ sudo systemctl daemon-reload
$ sudo systemctl enable node-sms-terminal.service
```

And finally, to start Node SMS Terminal issue:

```
$ systemctl start node-sms-terminal
```

To install Node SMS Gateway as service, follow this commands. Adjust the path as needed.

```
$ vi service/linux/systemd/node-sms-gateway.service
$ sudo cp service/linux/systemd/node-sms-gateway.service /etc/systemd/system/
$ sudo systemctl daemon-reload
$ sudo systemctl enable node-sms-gateway.service
```

And finally, to start Node SMS Gateway issue:

```
$ systemctl start node-sms-gateway
```

#### Using init.d

To install Node SMS Terminal as service, follow this commands. Adjust the path as needed.

```
$ cd ~/node-sms-gw
$ chmod +x service/linux/init.d/node-sms-terminal
$ vi service/linux/init.d/node-sms-terminal
$ sudo cp service/linux/init.d/node-sms-terminal /etc/init.d/
$ sudo update-rc.d node-sms-terminal defaults
$ systemctl daemon-reload
```

And finally, to start Node SMS Terminal issue:

```
$ systemctl start node-sms-terminal
```

To install Node SMS Gateway as service, follow this commands. Adjust the path as needed.

```
$ cd ~/node-sms-gw
$ chmod +x service/linux/init.d/node-sms-gateway
$ vi service/linux/init.d/node-sms-gateway
$ sudo cp service/linux/init.d/node-sms-gateway /etc/init.d/
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