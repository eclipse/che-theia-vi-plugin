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
import { NormalModeCommands } from "./mode/normal-mode";
import { ViModeKeybindingContexts } from "./mode/mode-context";
import NORMAL_MODE_CONTEXT = ViModeKeybindingContexts.normalModeActive;
import VISUAL_MODE_CONTEXT = ViModeKeybindingContexts.visualModeActive;
import VISUAL_LINE_MODE_CONTEXT = ViModeKeybindingContexts.visualLineModeActive;
import SWITCH_VI_MODE_CONTEXT = ViModeKeybindingContexts.switchMode;
import { VisualModeCommands, VisualLineModeCommands } from "./mode/visual-mode";
import { SwitchModeCommands } from "./mode/switch-mode";

@injectable()
export class ViKeyBindings {
    private keyBindings: Keybinding[] = [];

    constructor() {
        this.keyBindings = [

            /*** Normal Mode ***/

            {
                command: NormalModeCommands.CURSOR_LEFT.id,
                keybinding: "h",
                context: NORMAL_MODE_CONTEXT
            },

            {
                command: NormalModeCommands.CURSOR_RIGHT.id,
                keybinding: "l",
                context: NORMAL_MODE_CONTEXT
            },

            {
                command: NormalModeCommands.CURSOR_UP.id,
                keybinding: "k",
                context: NORMAL_MODE_CONTEXT
            },

            {
                command: NormalModeCommands.CURSOR_DOWN.id,
                keybinding: "j",
                context: NORMAL_MODE_CONTEXT
            },

            {
                command: NormalModeCommands.CURSOR_LEFT.id,
                keybinding: "left",
                context: NORMAL_MODE_CONTEXT
            },

            {
                command: NormalModeCommands.CURSOR_RIGHT.id,
                keybinding: "right",
                context: NORMAL_MODE_CONTEXT
            },

            {
                command: NormalModeCommands.CURSOR_UP.id,
                keybinding: "up",
                context: NORMAL_MODE_CONTEXT
            },

            {
                command: NormalModeCommands.CURSOR_DOWN.id,
                keybinding: "down",
                context: NORMAL_MODE_CONTEXT
            },

            {
                command: NormalModeCommands.CURSOR_HOME.id,
                keybinding: "0",
                context: NORMAL_MODE_CONTEXT
            },

            {
                command: NormalModeCommands.CURSOR_END.id,
                keybinding: "shift+4", // $
                context: NORMAL_MODE_CONTEXT
            },

            {
                command: NormalModeCommands.CURSOR_WORD_START_LEFT.id,
                keybinding: "b",
                context: NORMAL_MODE_CONTEXT
            },

            {
                command: NormalModeCommands.CURSOR_WORD_END_RIGHT.id,
                keybinding: "e",
                context: NORMAL_MODE_CONTEXT
            },

            /*** Visual Mode ***/

            {
                command: VisualModeCommands.SELECT_RIGHT.id,
                keybinding: "right",
                context: VISUAL_MODE_CONTEXT
            },

            {
                command: VisualModeCommands.SELECT_RIGHT.id,
                keybinding: "l",
                context: VISUAL_MODE_CONTEXT
            },

            {
                command: VisualModeCommands.SELECT_LEFT.id,
                keybinding: "left",
                context: VISUAL_MODE_CONTEXT
            },

            {
                command: VisualModeCommands.SELECT_LEFT.id,
                keybinding: "h",
                context: VISUAL_MODE_CONTEXT
            },

            {
                command: VisualModeCommands.SELECT_UP.id,
                keybinding: "up",
                context: VISUAL_MODE_CONTEXT
            },

            {
                command: VisualModeCommands.SELECT_UP.id,
                keybinding: "k",
                context: VISUAL_MODE_CONTEXT
            },

            {
                command: VisualModeCommands.SELECT_DOWN.id,
                keybinding: "down",
                context: VISUAL_MODE_CONTEXT
            },

            {
                command: VisualModeCommands.SELECT_DOWN.id,
                keybinding: "j",
                context: VISUAL_MODE_CONTEXT
            },

            /*** Visual Line Mode ***/

            {
                command: VisualLineModeCommands.SELECT_UP.id,
                keybinding: "up",
                context: VISUAL_LINE_MODE_CONTEXT
            },

            {
                command: VisualLineModeCommands.SELECT_UP.id,
                keybinding: "k",
                context: VISUAL_LINE_MODE_CONTEXT
            },

            {
                command: VisualLineModeCommands.SELECT_DOWN.id,
                keybinding: "j",
                context: VISUAL_LINE_MODE_CONTEXT
            },

            {
                command: VisualLineModeCommands.SELECT_DOWN.id,
                keybinding: "down",
                context: VISUAL_LINE_MODE_CONTEXT
            },

            {
                command: VisualLineModeCommands.DELETE_SELECTED.id,
                keybinding: "d",
                context: VISUAL_LINE_MODE_CONTEXT
            },

            /*** Switching vi mode ***/

            {
                command: SwitchModeCommands.NORMAL_MODE.id,
                keybinding: "esc",
                context: SWITCH_VI_MODE_CONTEXT
            },

            {
                command: SwitchModeCommands.NORMAL_MODE.id,
                keybinding: "ctrl+[",
                context: SWITCH_VI_MODE_CONTEXT
            },

            {
                command: SwitchModeCommands.VISUAL_MODE.id,
                keybinding: "v",
                context: SWITCH_VI_MODE_CONTEXT
            },

            {
                command: SwitchModeCommands.VISUAL_LINE_MODE.id,
                keybinding: "shift+v",
                context: SWITCH_VI_MODE_CONTEXT
            },

            {
                command: SwitchModeCommands.INSERT_MODE_CURSOR_BEFORE.id,
                keybinding: "i",
                context: SWITCH_VI_MODE_CONTEXT
            },

            {
                command: SwitchModeCommands.INSERT_MODE_CURSOR_BEFORE.id,
                keybinding: "ins",
                context: SWITCH_VI_MODE_CONTEXT
            },

            {
                command: SwitchModeCommands.INSERT_MODE_CURSOR_AFTER.id,
                keybinding: "a",
                context: SWITCH_VI_MODE_CONTEXT
            },

            {
                command: SwitchModeCommands.INSERT_MODE_NEW_LINE_BELOW.id,
                keybinding: "o",
                context: SWITCH_VI_MODE_CONTEXT
            },

            {
                command: SwitchModeCommands.INSERT_MODE_CURSOR_HOME.id,
                keybinding: "shift+i",
                context: SWITCH_VI_MODE_CONTEXT
            },

            {
                command: SwitchModeCommands.INSERT_MODE_CURSOR_END.id,
                keybinding: "shift+a",
                context: SWITCH_VI_MODE_CONTEXT
            },

            {
                command: SwitchModeCommands.INSERT_MODE_NEW_LINE_ABOVE.id,
                keybinding: "shift+o",
                context: SWITCH_VI_MODE_CONTEXT
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
