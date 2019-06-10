import * as Path from "path";
import * as vscode from "vscode";
import { readFile, close } from "fs";
export class Completion 
{
    static methods:{};
    
    public static init(uris:vscode.Uri[])
    {
        for (const key in uris) 
        {
            console.log(uris[key]);
            this.read(uris[key]);
        }
    }

    public static read(path:vscode.Uri)
    {
        vscode.workspace.openTextDocument(path).then(text=>{

            let methods: RegExpMatchArray|null  = text.getText().match(/public\s+?function\s+?\w+\(.*\)/g);
            if (methods) 
            {
                for( let key in methods)
                {
                    // console.log(methods[key]);
                    let method: RegExpMatchArray|null = methods[key].match(/function\s+(\w+)\((.*)\)/);
                    let obj = {};
                    if (method) 
                    {
                        obj[method[1].toString()] = method[2];
                    }
                    // console.log(method);
                }
            }
        });
        // path = Path.dirname(path);
        
        // readFile(path,(err,data)=>{
        //     if (err) 
        //     {
        //         return console.error(err);
        //     }
        //     console.log(data.toString());
            
        // });
    }
    
}