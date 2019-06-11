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
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");
const completion_1 = require("./completion");
function activate(context) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('My Dear Dalao please dai dai wo');
        vscode.workspace.findFiles('**/QueryBuilder.php').then(uri => {
            completion_1.Completion.init(uri);
            let provide = vscode.languages.registerCompletionItemProvider({
                scheme: "file",
                language: "php"
            }, completion_1.Completion.provideCompletionItems(), '>');
            context.subscriptions.push(provide);
        });
        // console.log(Completion.methods);
        // let t = new Completion;
        // vscode.window.showInformationMessage('当前路径:'+t.getRoot());
        // let documentSelector = { scheme: "file", language: "php" };
        // let disposable = vscode.languages.registerCompletionItemProvider(
        // 	documentSelector,
        // 	new Completion
        // );
        // context.subscriptions.push(disposable);
    });
}
exports.activate = activate;
// this method is called when your extension is deactivated
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map