"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");
const completion_1 = require("./completion");
function activate(context) {
    console.log('My Dear Dalao please dai dai wo');
    let documentSelector = { scheme: "file", language: "php" };
    let disposable = vscode.languages.registerCompletionItemProvider(documentSelector, new completion_1.completion);
    context.subscriptions.push(disposable);
}
exports.activate = activate;
// this method is called when your extension is deactivated
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map