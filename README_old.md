# LaTeX Expander

**LaTeX Expander** is a Visual Studio Code extension that preprocesses a LaTeX project by expanding all `\include{}` and `\input{}` commands into a single, consolidated `.tex` file. This makes it easy to preserve semantic information and convert the result into other formats before compiling your document to PDF.

## Features

- **Merge LaTeX Projects:**  
  Automatically replaces `\include{}` and `\input{}` commands with the content of the referenced files to generate one comprehensive LaTeX file.

- **Two Modes of Operation:**
  - **Default Mode:** Uses the computed default output filename (e.g. `main-expanded.tex`) without prompting.
  - **Prompt Mode:** Prompts you to specify a custom output filename (with the default suggestion pre-filled).

- **Context Menu Integration:**  
  Right-click on any `.tex` file in the Explorer to trigger the expansion directly.

## Prerequisites

- **VS Code or a VS Code–Compatible IDE:**  
  This extension is built for VS Code and IDEs that support its extension format (such as Cursor).

- **Perl & the `latexpand` Script:**  
  The extension relies on an external Perl script named `latexpand` to perform the expansion. Make sure you have Perl installed and that the `latexpand` executable is available on your system (default location: `/usr/local/bin/latexpand`).

## Installation

1. **Clone or Download the Extension Source:**  
   Get the source code from the repository.

2. **Install Dependencies:**  
   In the extension folder, run:
   ```bash
   npm install
   ```

3. **Compile the Extension:**  
   Run:
   ```bash
   npm run compile
   ```
   (You can also use `npm run watch` for continuous compilation during development.)

4. **Package the Extension (Optional):**  
   To create a VSIX file for deployment:
   ```bash
   npm install -g vsce
   vsce package
   ```
   This will produce a file like `latex-expander-0.0.1.vsix`, which you can install in VS Code or any compatible IDE via the "Install from VSIX..." option.

## Usage

### From the Command Palette

- **LaTeX-Expander: Expand Project (Default):**  
  Expands the active LaTeX file and saves the merged output as `originalname-expanded.tex`.

- **LaTeX-Expander: Expand Project (Prompt Output Name):**  
  Prompts you to confirm or change the output filename (defaulting to `originalname-expanded.tex`) before running the expansion.

### From the Context Menu

Right-click on a `.tex` file in the Explorer. You will see both commands listed. Choose the desired command to expand your project accordingly.

## How It Works

1. **File Selection:**  
   The extension uses the file selected in the Explorer (or the active editor) as the main LaTeX file.

2. **Output Filename:**  
   It computes a default output filename by appending “-expanded” before the `.tex` extension. In prompt mode, you can override this default.

3. **Working Directory:**  
   The extension sets the current working directory to the folder containing your main file when running the external Perl script, ensuring that relative `\include` or `\input` paths resolve correctly.

4. **Execution:**  
   It executes the Perl script (`latexpand`) and writes its output to the specified file, then opens that file in a new editor window.

## Troubleshooting

- **Include File Not Found:**  
  If you get errors that an included file (e.g. `README33.tex`) cannot be found, check that:
  - The file exists in the same directory as your main LaTeX file.
  - The working directory is set correctly when running `latexpand`. (The extension does this by setting `cwd` to the directory of your main file.)

## Contributing

Contributions, bug reports, and feature requests are welcome! Please open issues or submit pull requests on the GitHub repository.

## License

This project is licensed under the MIT License.