/*********************************************************************
 * Copyright (c) 2018 Red Hat, Inc.
 *
 * This program and the accompanying materials are made
 * available under the terms of the Eclipse Public License 2.0
 * which is available at https://www.eclipse.org/legal/epl-2.0/
 *
 * SPDX-License-Identifier: EPL-2.0
 **********************************************************************/

import { Keybinding } from "@theia/core/lib/browser";
import { injectable } from "inversify";

@injectable()
export class ViKeyBindings {
    private keyBindings: Keybinding[] = [];

    constructor() {
        this.keyBindings = [

            /*** Normal Mode ***/

            {
                command: 'normal.mode.cursor.left',
                keybinding: "h",
                context: 'viNormalModeActive'
            },

            {
                command: 'normal.mode.cursor.right',
                keybinding: "l",
                context: 'viNormalModeActive'
            },

            {
                command: 'normal.mode.cursor.up',
                keybinding: "k",
                context: 'viNormalModeActive'
            },

            {
                command: 'normal.mode.cursor.down',
                keybinding: "j",
                context: 'viNormalModeActive'
            },

            {
                command: 'normal.mode.cursor.left',
                keybinding: "left",
                context: 'viNormalModeActive'
            },

            {
                command: 'normal.mode.cursor.right',
                keybinding: "right",
                context: 'viNormalModeActive'
            },

            {
                command: 'normal.mode.cursor.up',
                keybinding: "up",
                context: 'viNormalModeActive'
            },

            {
                command: 'normal.mode.cursor.down',
                keybinding: "down",
                context: 'viNormalModeActive'
            },

            {
                command: 'normal.mode.cursor.home',
                keybinding: "0",
                context: 'viNormalModeActive'
            },

            {
                command: 'normal.mode.cursor.end',
                keybinding: "shift+4", // $
                context: 'viNormalModeActive'
            },

            {
                command: 'normal.mode.cursor.word.start.left',
                keybinding: "b",
                context: 'viNormalModeActive'
            },

            {
                command: 'normal.mode.cursor.word.end.right',
                keybinding: "e",
                context: 'viNormalModeActive'
            },

            /*** Visual Mode ***/

            {
                command: 'visual.mode.select.right',
                keybinding: "right",
                context: 'viVisualModeActive'
            },

            {
                command: 'visual.mode.select.right',
                keybinding: "l",
                context: 'viVisualModeActive'
            },

            {
                command: 'visual.mode.select.left',
                keybinding: "left",
                context: 'viVisualModeActive'
            },

            {
                command: 'visual.mode.select.left',
                keybinding: "h",
                context: 'viVisualModeActive'
            },

            {
                command: 'visual.mode.select.up',
                keybinding: "up",
                context: 'viVisualModeActive'
            },

            {
                command: 'visual.mode.select.up',
                keybinding: "k",
                context: 'viVisualModeActive'
            },

            {
                command: 'visual.mode.select.down',
                keybinding: "down",
                context: 'viVisualModeActive'
            },

            {
                command: 'visual.mode.select.down',
                keybinding: "j",
                context: 'viVisualModeActive'
            },

            /*** Visual Line Mode ***/

            {
                command: 'visual.line.mode.select.up',
                keybinding: "up",
                context: 'viVisualLineModeActive'
            },

            {
                command: 'visual.line.mode.select.up',
                keybinding: "k",
                context: 'viVisualLineModeActive'
            },

            {
                command: 'visual.line.mode.select.down',
                keybinding: "j",
                context: 'viVisualLineModeActive'
            },

            {
                command: 'visual.line.mode.select.down',
                keybinding: "down",
                context: 'viVisualLineModeActive'
            },

            {
                command: 'visual.line.mode.delete',
                keybinding: "d",
                context: 'viVisualLineModeActive'
            },

            /*** Switching vi mode ***/

            {
                command: 'vi.switch.to.normalMode',
                keybinding: "esc",
                context: 'switchViMode'
            },

            {
                command: 'vi.switch.to.normalMode',
                keybinding: "ctrl+[",
                context: 'switchViMode'
            },

            {
                command: 'vi.switch.to.visualMode',
                keybinding: "v",
                context: 'switchViMode'
            },

            {
                command: 'vi.switch.to.visualLineMode',
                keybinding: "shift+v",
                context: 'switchViMode'
            },

            {
                command: 'vi.switch.to.insertMode.cursorBefore',
                keybinding: "i",
                context: 'switchViMode'
            },

            {
                command: 'vi.switch.to.insertMode.cursorBefore',
                keybinding: "ins",
                context: 'switchViMode'
            },

            {
                command: 'vi.switch.to.insertMode.cursorAfter',
                keybinding: "a",
                context: 'switchViMode'
            },

            {
                command: 'vi.switch.to.insertMode.newLineBelow',
                keybinding: "o",
                context: 'switchViMode'
            },

            {
                command: 'vi.switch.to.insertMode.cursorHome',
                keybinding: "shift+i",
                context: 'switchViMode'
            },

            {
                command: 'vi.switch.to.insertMode.cursorEnd',
                keybinding: "shift+a",
                context: 'switchViMode'
            },

            {
                command: 'vi.switch.to.insertMode.newLineAbove',
                keybinding: "shift+o",
                context: 'switchViMode'
            }
        ];
    }

    getKeybindingsForCommand(commandId: string): Keybinding[] {
        const result: Keybinding[] = [];
        for (const keybinding of this.keyBindings) {
            if (keybinding.command === commandId) {
                result.push({
                    command: keybinding.command,
                    keybinding: keybinding.keybinding,
                    context: keybinding.context
                });
            }
        }
        return result;
    }

    getKeybindings(): Keybinding[] {
        return Array.from(this.keyBindings);
    }
}
