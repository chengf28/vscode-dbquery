// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import {Completion}  from "./completion";

export async function activate(context: vscode.ExtensionContext) {

	console.log('My Dear Dalao please dai dai wo');

	vscode.workspace.findFiles('**/QueryBuilder.php').then(uri=>
		{
			Completion.init(uri);
			let provide = vscode.languages.registerCompletionItemProvider({
				scheme:"file",
				language:"php"
			}, Completion.provideCompletionItems(),'>');
			context.subscriptions.push(provide);
		}
	);
	
	// console.log(Completion.methods);
	
	

	

	
	
	
	// let t = new Completion;
	// vscode.window.showInformationMessage('当前路径:'+t.getRoot());

	// let documentSelector = { scheme: "file", language: "php" };
	// let disposable = vscode.languages.registerCompletionItemProvider(
	// 	documentSelector,
	// 	new Completion
	// );
	// context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
