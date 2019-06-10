"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
class Completion {
    static init(uris) {
        for (const key in uris) {
            console.log(uris[key]);
            this.read(uris[key]);
        }
    }
    static read(path) {
        vscode.workspace.openTextDocument(path).then(text => {
            let methods = text.getText().match(/public\s+?function\s+?\w+\(.*\)/g);
            if (methods) {
                for (let key in methods) {
                    // console.log(methods[key]);
                    let method = methods[key].match(/function\s+(\w+)\((.*)\)/);
                    let obj = {};
                    if (method) {
                        obj[method[1].toString()] = method[2];
                    }
                    // console.log(method);
                }
            }
        });
        // path = Path.dirname(path);
        // readFile(path,(err,data)=>{
        //     if (err) 
        //     {
        //         return console.error(err);
        //     }
        //     console.log(data.toString());
        // });
    }
}
exports.Completion = Completion;
//# sourceMappingURL=completion.js.map