import * as vscode from 'vscode';
import { execFile } from 'child_process';
import * as path from 'path';
import { promisify } from 'util';
import * as fs from 'fs';

const execFileAsync = promisify(execFile);
const writeFileAsync = promisify(fs.writeFile);

async function expandLatex(promptForOutput: boolean, resource?: vscode.Uri) {
  try {
    // Use the file provided by the context menu or fallback to the active editor
    let fileUri = resource ?? vscode.window.activeTextEditor?.document.uri;
    if (!fileUri) {
      const selected = await vscode.window.showOpenDialog({
        canSelectMany: false,
        filters: { 'LaTeX Files': ['tex'] }
      });
      if (!selected || selected.length === 0) {
        return;
      }
      fileUri = selected[0];
    }
    
    const mainFilePath = fileUri.fsPath;
    
    // Compute the default output file name (e.g., "main.tex" -> "main-expanded.tex")
    const dir = path.dirname(mainFilePath);
    const ext = path.extname(mainFilePath);
    const base = path.basename(mainFilePath, ext);
    const defaultOutput = path.join(dir, `${base}-expanded${ext}`);
    
    // Determine the output file path
    let outputFilePath: string;
    if (promptForOutput) {
      // Prompt the user with a default value
      const userInput = await vscode.window.showInputBox({
        prompt: "Specify output file name",
        value: defaultOutput
      });
      if (!userInput) {
        vscode.window.showInformationMessage("Operation cancelled.");
        return;
      }
      outputFilePath = userInput;
    } else {
      outputFilePath = defaultOutput;
      vscode.window.showInformationMessage(`Using default output file: ${defaultOutput}`);
    }
    
    // Define the path to your Perl script executable (adjust if necessary)
    const perlScriptPath = '/usr/local/bin/latexpand';
    
    // Execute the Perl script with the main file as argument
    const { stdout, stderr } = await execFileAsync(perlScriptPath, [mainFilePath], {
      cwd: path.dirname(mainFilePath)
    });

    if (stderr) {
      vscode.window.showErrorMessage(`Error: ${stderr}`);
      return;
    }
    
    // Write the output to the determined file
    await writeFileAsync(outputFilePath, stdout);
    
    // Open the output file in a new editor window
    const doc = await vscode.workspace.openTextDocument(outputFilePath);
    vscode.window.showTextDocument(doc);
    
  } catch (error: any) {
    vscode.window.showErrorMessage(`Failed to expand LaTeX project: ${error.message}`);
  }
}

export async function activate(context: vscode.ExtensionContext) {
  // Command that uses the default output file name without prompting.
  const defaultCommand = vscode.commands.registerCommand('latex-expander.expandDefault', async (resource?: vscode.Uri) => {
    await expandLatex(false, resource);
  });
  
  // Command that prompts the user to specify the output file name.
  const promptCommand = vscode.commands.registerCommand('latex-expander.expandPrompt', async (resource?: vscode.Uri) => {
    await expandLatex(true, resource);
  });
  
  context.subscriptions.push(defaultCommand, promptCommand);
}

export function deactivate() {}