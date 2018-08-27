# Vi Extension
The example of how to build the Theia-based applications with the Vi-extension.

## Getting started

Install [nvm](https://github.com/creationix/nvm#install-script).

    curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.5/install.sh | bash

Install npm and node.

    nvm install 8
    nvm use 8

Install yarn.

    npm install -g yarn

## Running the browser example

    yarn rebuild:browser
    cd browser-app
    yarn start

Open http://localhost:3000 in the browser.

## Running the Electron example

    yarn rebuild:electron
    cd electron-app
    yarn start

## Developing with the browser example

Start watching of the vi extension.

    cd vi-extension
    yarn watch

Start watching of the browser example.

    yarn rebuild:browser
    cd browser-app
    yarn watch

Launch `Start Browser Backend` configuration from VS code.

Open http://localhost:3000 in the browser.

## Developing with the Electron example

Start watching of the vi-extension.

    cd vi-extension
    yarn watch

Start watching of the electron example.

    yarn rebuild:electron
    cd electron-app
    yarn watch

Launch `Start Electron Backend` configuration from VS code.

## Publishing vi-extension

Create a npm user and login to the npm registry, [more on npm publishing](https://docs.npmjs.com/getting-started/publishing-npm-packages).

    npm login

Publish packages with lerna to update versions properly across local packages, [more on publishing with lerna](https://github.com/lerna/lerna#publish).

    npx lerna publish

### Insert Mode
|Command         | Desc                                                                                   |
|----------------|----------------------------------------------------------------------------------------|
| `a`            | Moves the cursor after the current character and enters insert mode                    |
| `A`            | Moves the cursor to the end of the line and enters insert mode                         |
| `i (ins)`      | Switches to insert mode                                                                |
| `I`            | Moves the cursor to the beginning of the line and enters insert mode                   |
| `o`            | Inserts a new line below the current line and enters insert mode on the new line       |
| `O`            | Inserts a new line above the current one and enters insert mode on the new line        |

### Normal Mode
|Command         | Desc                                                                                   |
|----------------|----------------------------------------------------------------------------------------|
| `esc (ctrl-[)` | enter Normal Mode                                                                      |
| `l (right)`    | Move forward                                                                           |
| `h (left)`     | Move backward                                                                          |
| `j (down)`     | Move to the next line                                                                  |
| `k (up)`       | Move to the previous line                                                              |
| `0`            | Move to the beginning of line                                                          |
| `$`            | Move to the end of line                                                                |
| `b`            | Move to previous beginning of word                                                     |
| `e`            | Move to end of word                                                                    |

### Visual Mode
|Command         | Desc                                                                                   |
|----------------|----------------------------------------------------------------------------------------|
| `v`            | enter Visual Mode, this will also mark a starting selection point                      |
| `l (right)`    | Select forward                                                                         |
| `h (left)`     | Select backward                                                                        |
| `k (up)`       | Select up                                                                              |
| `j (down)`     | Select down                                                                            |

Move the cursor to the desired end selection point; vi will provide a visual highlight of the text selection

### Visual Line Mode
|Command         | Desc                                                                                   |
|----------------|----------------------------------------------------------------------------------------|
| `V`            | select current line and enter Visual Line Mode, this will make text selections by line |
| `k (up)`       | select line up                                                                         |
| `j (down)`     | select line down                                                                       |
| `d`            | delete selected lines                                                                  |
