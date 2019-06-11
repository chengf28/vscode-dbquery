"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
class Completion {
    static init(uris) {
        return __awaiter(this, void 0, void 0, function* () {
            for (const key in uris) {
                yield this.read(uris[key]);
            }
        });
    }
    static read(path) {
        return __awaiter(this, void 0, void 0, function* () {
            return vscode.workspace.openTextDocument(path).then(text => {
                let all = text.getText().match(/public\s+?function\s+?\w+\(.*\)/g);
                if (all) {
                    for (let key in all) {
                        // console.log(methods[key]);
                        let method = all[key].match(/function\s?(\w+)\((.*)\)/);
                        if (method) {
                            this.methods[method[1]] = method[2].match(/(\$\w+)([\s=]*(\w)+)?/g);
                        }
                    }
                }
            });
        });
    }
    static provideCompletionItems() {
        return {
            provideCompletionItems(document, position, token, context) {
                const methods = Completion.methods;
                const completions = [];
                let linePrefix = document.lineAt(position).text.substr(0, position.character);
                if (!linePrefix.match('DBquery::table(.*)->')) {
                    return undefined;
                }
                for (const method_name in methods) {
                    const Item = new vscode.CompletionItem(method_name);
                    Item.insertText = new vscode.SnippetString(method_name + "($1)");
                    Item.kind = vscode.CompletionItemKind.Method;
                    completions.push(Item);
                }
                return completions;
            }
        };
    }
}
Completion.methods = {};
exports.Completion = Completion;
//# sourceMappingURL=completion.js.map