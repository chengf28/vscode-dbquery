import * as Path from "path";
import * as vscode from "vscode";
import { readFile, close } from "fs";
export class Completion 
{
    static methods:{[key:string]:any} = {};
    
    public static async init(uris:vscode.Uri[])
    {
        
        for (const key in uris) 
        {
            await this.read(uris[key]);
        }
    }

    public static async read(path:vscode.Uri)
    {
        return vscode.workspace.openTextDocument(path).then(text=>{
            let all: RegExpMatchArray|null  = text.getText().match(/public\s+?function\s+?\w+\(.*\)/g);
            if (all) 
            {
                for( let key in all )
                {
                    // console.log(methods[key]);
                    let method: RegExpMatchArray | null = all[key].match(/function\s?(\w+)\((.*)\)/);
                    if (method)
                    {
                        this.methods[method[1]] = method[2].match(/(\$\w+)([\s=]*(\w)+)?/g);
                    }
                }
            }
        });
    }
    
    public static provideCompletionItems():vscode.CompletionItemProvider
    {
        return {
            provideCompletionItems(document: vscode.TextDocument, position: vscode.Position, token: vscode.CancellationToken, context: vscode.CompletionContext): vscode.ProviderResult<vscode.CompletionItem[] | vscode.CompletionList>
            {
                const methods = Completion.methods;
                const completions:Array<vscode.CompletionItem> = [];
                let linePrefix = document.lineAt(position).text.substr(0, position.character);
                if (!linePrefix.match('DBquery::table(.*)->'))
                {
                    return undefined;
                }
                for (const method_name in methods)
                {
                    const Item: vscode.CompletionItem = new vscode.CompletionItem(method_name);
                    Item.insertText = new vscode.SnippetString(
                        method_name + "($1)"
                    );
                    Item.kind = vscode.CompletionItemKind.Method;
                    completions.push(
                        Item
                    );
                }
                return completions;
            }
        };
    }
}