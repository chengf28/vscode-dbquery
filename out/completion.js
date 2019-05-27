"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
class completion {
    /**
     * prprovideCompletionItems
     */
    provideCompletionItems(document, position, token) {
        let line = document.lineAt(position);
        let text = line.text;
        let res = /DBquery::(\w+)\(.*\)(?:(->)|)/.exec(text);
        if (res) {
            // 截取当前最后一个字母
            let lastChar = line.text.substr(-1, position.character);
            let Snippet = [
                'get', 'find', 'first', 'select', 'where', 'orWhere'
            ];
            let CompletionItems = Snippet.filter(v => v.indexOf(lastChar) > -1);
            console.log(CompletionItems);
            return CompletionItems.map((method) => {
                let temp = new vscode.CompletionItem(method);
                temp.detail = "DBqueryMethod";
                temp.filterText = method.substr(0, 2);
                temp.insertText = new vscode.SnippetString(method + "($1)");
                temp.kind = vscode.CompletionItemKind.Method;
                return temp;
            });
        }
        else {
            let CompletionItems = [];
            let CompletionItem = new vscode.CompletionItem("DBquery");
            CompletionItem.detail = "DBquery";
            CompletionItem.filterText = 'DB:t';
            CompletionItem.insertText = new vscode.SnippetString('DBquery::$1');
            CompletionItems.push(CompletionItem);
            return CompletionItems;
        }
        // let text: string = Line.text;
        // 使用其他函数
        // console.log (/DBquery::(\w+\(.*\)->)/.test(text)) 
        // {
        // let CompletionItems: never[] | vscode.CompletionItem[] = [];
        // let Sinppet = [
        // 'get','find','first'
        // ]
        // return CompletionItems;
        // }else{
        // 匹配是否存在DBquery字段
        // }
    }
    /**
     * resolveCompletionItem
     */
    resolveCompletionItem(item, token) {
        return item;
    }
}
exports.completion = completion;
//# sourceMappingURL=completion.js.map