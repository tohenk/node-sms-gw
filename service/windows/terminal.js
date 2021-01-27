/**
 * The MIT License (MIT)
 *
 * Copyright (c) 2018 Toha <tohenk@yahoo.com>
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of
 * this software and associated documentation files (the "Software"), to deal in
 * the Software without restriction, including without limitation the rights to
 * use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
 * of the Software, and to permit persons to whom the Software is furnished to do
 * so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

const args = process.argv.slice(2);
if (args.length && (args[0] == 'install' || args[0] == 'uninstall')) {
    service(args[0]);
} else {
    console.log('Usage: node terminal.js [install|uninstall]');
}

function service(cmd) {
    const fs = require('fs');
    const path = require('path');
    const Service = require('node-windows').Service;
    const dir = fs.realpathSync(path.join(__dirname, '..', '..'));
    const app = path.join(dir, 'node_modules', '@ntlab', 'sms-terminal', 'app.js');
    const config = path.join(dir, 'cfg-terminal.json');
    const svc = new Service({
        name: 'NodeSMSTerminal',
        description: 'Node SMS Terminal',
        script: app,
        scriptOptions: '--config="' + config + '" --auto'
    });
    svc.on('install', () => {
        svc.start();
    });
    switch (cmd) {
        case 'install':
            svc.install();
            break;
        case 'uninstall':
            svc.uninstall();
            break;
    }
}
