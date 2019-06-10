"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");
const completion_1 = require("./completion");
function activate(context) {
    console.log('My Dear Dalao please dai dai wo');
    let res = vscode.workspace.workspaceFolders;
    console.log(res);
    vscode.workspace.findFiles('**/QueryBuilder.php').then(uri => {
        completion_1.Completion.init(uri);
    });
    // let t = new Completion;
    // vscode.window.showInformationMessage('当前路径:'+t.getRoot());
    // let documentSelector = { scheme: "file", language: "php" };
    // let disposable = vscode.languages.registerCompletionItemProvider(
    // 	documentSelector,
    // 	new Completion
    // );
    // context.subscriptions.push(disposable);
}
exports.activate = activate;
// this method is called when your extension is deactivated
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map