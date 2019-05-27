// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import {completion}  from "./completion";

export function activate(context: vscode.ExtensionContext) {

	console.log('My Dear Dalao please dai dai wo');
	let documentSelector = { scheme: "file", language: "php" };
	let disposable = vscode.languages.registerCompletionItemProvider(
		documentSelector,
		new completion
	);
	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
