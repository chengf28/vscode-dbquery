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
                vscode.window.showInformationMessage('DBquery插件加载完成');
                console.log(this.methods);
            }
        });
    }
    /**
     * 读取文件内容,匹配出所有内容
     * @param path 文件地址
     */
    static read(path) {
        return __awaiter(this, void 0, void 0, function* () {
            return vscode.workspace.openTextDocument(path).then(text => {
                const all = text.getText().match(/(|\/\*\*[\t\n\r]+(\s+\*\s?(.*|\/))+[\t\n\r\s]+?)public\s+?function\s+?[^_]\w+\(.*\)/g);
                if (all) {
                    for (const key in all) {
                        const context = all[key];
                        // console.log(methods[key]);
                        const method = context.match(/function\s?(\w+)(\(.*\))/);
                        if (method) {
                            this.methods[method[1]] = {
                                "params": method[2],
                            };
                            const docReg = /\s+\*\s?(\@.*)/g;
                            const titleReg = /\/\*\*\s+\*\s?(.*)/;
                            const title = titleReg.exec(context);
                            this.methods[method[1]]['title'] = title && title[1] ? title[1] : '';
                            let doc;
                            this.methods[method[1]]['doc'] = [];
                            while (doc = docReg.exec(context)) {
                                this.methods[method[1]]['doc'].push(doc[1]);
                            }
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
                    const Item = new vscode.CompletionItem(method_name, vscode.CompletionItemKind.Method);
                    Item.insertText = new vscode.SnippetString(method_name + "($1)");
                    // if (methods[method_name] !== null) 
                    // {
                    Item.detail = method_name + methods[method_name].params;
                    Item.documentation = new vscode.MarkdownString(`
${methods[method_name].title}
\`\`\`php 
<?php
    public function $${Item.detail} {}
\`\`\`
${Completion.getDoc(method_name)}
                        `);
                    console.log(Item.documentation);
                    // }
                    completions.push(Item);
                }
                return completions;
            }
        };
    }
    static getDoc(method_name) {
        let doc = this.methods[method_name].doc;
        if (doc.length === 0) {
            return '';
        }
        return '* ' + doc.join("\n* ");
    }
}
Completion.methods = {};
exports.Completion = Completion;
//# sourceMappingURL=completion.js.map