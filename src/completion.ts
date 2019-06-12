import * as vscode from "vscode";
export class Completion 
{
    static methods:{[key:string]:any} = {};
    
    public static async init(uris:vscode.Uri[])
    {
        
        for (const key in uris) 
        {
            await this.read(uris[key]);
            vscode.window.showInformationMessage('DBquery插件加载完成');
            console.log(this.methods);
            
        }
    }

    /**
     * 读取文件内容,匹配出所有内容
     * @param path 文件地址
     */
    public static async read(path:vscode.Uri)
    {
        return vscode.workspace.openTextDocument(path).then(text=>{
            const all: RegExpMatchArray | null = text.getText().match(/(|\/\*\*[\t\n\r]+(\s+\*\s?(.*|\/))+[\t\n\r\s]+?)public\s+?function\s+?[^_]\w+\(.*\)/g);
            if (all) 
            {
                for( const key in all )
                {
                    const context:string = all[key];
                    // console.log(methods[key]);
                    const method: RegExpMatchArray | null = context.match(/function\s?(\w+)(\(.*\))/);
                    
                    if (method)
                    {
                        this.methods[method[1]] = {
                            "params":method[2],
                        };
                        
                        const docReg: RegExp = /\s+\*\s?(\@.*)/g;
                        const titleReg: RegExp = /\/\*\*\s+\*\s?(.*)/;

                        const title: RegExpExecArray|null = titleReg.exec(context);
                        this.methods[method[1]]['title'] = title && title[1] ? title[1]  : '';

                        let doc:RegExpExecArray|null;
                        this.methods[method[1]]['doc'] = [];
                        while (doc = docReg.exec(context)) 
                        {
                            this.methods[method[1]]['doc'].push(doc[1]);
                        }

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
                    const Item: vscode.CompletionItem = new vscode.CompletionItem(method_name, vscode.CompletionItemKind.Method);
                    Item.insertText = new vscode.SnippetString(
                        method_name + "($1)"
                    );
                    // if (methods[method_name] !== null) 
                    // {
                    Item.detail = method_name + methods[method_name].params;

                    Item.documentation = new vscode.MarkdownString(
                            `
${methods[method_name].title}
\`\`\`php 
<?php
    public function $${Item.detail} {}
\`\`\`
${Completion.getDoc(method_name)}
                        `
                        );

                    console.log(Item.documentation);
                    
                    // }
                    
                    completions.push(
                        Item
                    );
                }
                return completions;
            }
        };
    }


    private static getDoc(method_name:string):string
    {
        let doc:string[] = this.methods[method_name].doc;
        if (doc.length === 0 ) 
        {
            return '';
        }
        
        return '* '+doc.join("\n* ");
    }
}