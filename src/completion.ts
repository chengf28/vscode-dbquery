import * as vscode from "vscode";
import * as fs from "fs";
import * as path from "path";


export class completion
{
    /**
     * prprovideCompletionItems
     */
    public provideCompletionItems(document: vscode.TextDocument, position: vscode.Position, token: vscode.CancellationToken, ): vscode.CompletionItem[]
    {
        
        let line = document.lineAt(position);
        let text = line.text;
        let res = /DBquery::(\w+)\(.*\)(?:(->)|)/.exec(text);
        if (res)
        {
            // 截取当前最后一个字母
            let lastChar:string = line.text.substr(-1,position.character);
            let Snippet: Array<string> = [
                'get','find','first','select','where','orWhere'
            ];

            let CompletionItems:any = Snippet.filter(v => v.indexOf(lastChar) > -1);
            console.log(CompletionItems);

            return CompletionItems.map((method: string):vscode.CompletionItem=>{
                let temp        = new vscode.CompletionItem(method);
                temp.detail     = "DBqueryMethod";
                temp.filterText = method.substr(0,2);
                temp.insertText = new vscode.SnippetString(method+"($1)");
                temp.kind       = vscode.CompletionItemKind.Method;
                return temp;
            });
        }else{
            
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
    public resolveCompletionItem(item: vscode.CompletionItem, token: vscode.CancellationToken): vscode.CompletionItem 
    {
        return item;
    }
}
