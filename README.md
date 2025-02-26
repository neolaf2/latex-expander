# LaTeX Expander

**LaTeX Expander** is a Visual Studio Code extension that preprocesses a LaTeX project by expanding all `\include{}` and `\input{}` commands into a single, consolidated `.tex` file. This is especially useful for preserving semantic information and converting the merged file into other formats before compiling to PDF.

## Features

- **Merge LaTeX Projects:**  
  Automatically replaces `\include{}` and `\input{}` commands with the content of the referenced files to generate one comprehensive LaTeX file.

- **Two Modes of Operation:**
  - **Default Mode:** Uses a computed default output filename (e.g. `main-expanded.tex`) without any prompts.
  - **Prompt Mode:** Prompts you to specify a custom output filename (with the default suggestion pre-filled) for greater flexibility.

- **Context Menu Integration:**  
  Right-click on any `.tex` file in the Explorer to trigger expansion directly via the context menu.

## Prerequisites

- **VS Code or a VS Code–Compatible IDE:**  
  This extension is built for VS Code and compatible IDEs (e.g. Cursor).

- **Perl & the `latexpand` Script:**  
  Ensure that Perl is installed and that the `latexpand` executable is available (default location: `/usr/local/bin/latexpand`).

## Installation

1. **Clone or Download the Extension Source:**  
   Get the source code from the GitHub repository.

2. **Install Dependencies:**  
   Run the following in the project folder:
   ```bash
   npm install
   ```

3. **Compile the Extension:**  
   Run:
   ```bash
   npm run compile
   ```
   (For continuous compilation during development, use `npm run watch`.)

4. **Package the Extension (Optional):**  
   To create a VSIX file:
   ```bash
   npm install -g vsce
   vsce package
   ```
   This will produce a file like `latex-expander-0.0.1.vsix` which you can install in any VS Code–compatible IDE.

## Usage

### From the Command Palette

- **LaTeX-Expander: Expand Project (Default):**  
  Expands the active LaTeX file and saves the merged output as `originalname-expanded.tex`.

- **LaTeX-Expander: Expand Project (Prompt Output Name):**  
  Prompts you to confirm or change the output filename (defaulting to `originalname-expanded.tex`) before performing the expansion.

### From the Context Menu

Right-click on a `.tex` file in the Explorer. You will see both commands ("Expand Project (Default)" and "Expand Project (Prompt Output Name)"). Select the desired command to expand your project accordingly.

## How It Works

1. **File Selection:**  
   The extension uses the file selected in the Explorer (or the active editor) as the main LaTeX file.

2. **Output Filename Determination:**  
   It computes a default output filename by appending “-expanded” before the `.tex` extension. In prompt mode, you can override this default.

3. **Working Directory:**  
   The extension sets the working directory to the folder containing your main file when executing the Perl script. This ensures that relative `\include` or `\input` commands resolve correctly.

4. **Execution:**  
   The external Perl script (`latexpand`) is executed with your main file as an argument. Its output is then written to the specified file, and the output file is opened in a new editor tab.

## Repository

This project is hosted on GitHub:  
[https://github.com/neolaf2/latex-expander](https://github.com/neolaf2/latex-expander)

## License

This project is licensed under the BSD 2-Clause License. See the [LICENSE.md](LICENSE) file for details.

## Contributing

Contributions, bug reports, and feature requests are welcome! Please open issues or submit pull requests on the GitHub repository.
