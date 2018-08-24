/*********************************************************************
 * Copyright (c) 2018 Red Hat, Inc.
 *
 * This program and the accompanying materials are made
 * available under the terms of the Eclipse Public License 2.0
 * which is available at https://www.eclipse.org/legal/epl-2.0/
 *
 * SPDX-License-Identifier: EPL-2.0
 **********************************************************************/

import { injectable, inject } from "inversify";
import { CommandContribution, CommandRegistry } from "@theia/core/lib/common/command";
import { EditorManager } from "@theia/editor/lib/browser";
import { ModeManager } from "./mode-manager";
import { ModeType } from "./mode";
import { VisualLineModeCommands } from "./visual-mode";
import { EditorCommands, EditorAgent } from "../editor-agent";

export namespace SwitchModeCommands {
    export const NORMAL_MODE = {
        id: 'vi.switch.to.normalMode',
        label: 'Switch to Normal Mode'
    };

    export const VISUAL_MODE = {
        id: 'vi.switch.to.visualMode',
        label: 'Switch to Visual Mode'
    };

    export const VISUAL_LINE_MODE = {
        id: 'vi.switch.to.visualLineMode',
        label: 'Switch to Visual Line Mode'
    };

    export const INSERT_MODE_CURSOR_BEFORE = {
        id: 'vi.switch.to.insertMode.cursorBefore',
        label: 'Switch to Insert Mode(cursor before)'
    };

    export const INSERT_MODE_CURSOR_AFTER = {
        id: 'vi.switch.to.insertMode.cursorAfter',
        label: 'Switch to Insert Mode(cursor after)'
    };

    export const INSERT_MODE_CURSOR_HOME = {
        id: 'vi.switch.to.insertMode.cursorHome',
        label: 'Switch to Insert Mode(cursor home)'
    };

    export const INSERT_MODE_CURSOR_END = {
        id: 'vi.switch.to.insertMode.cursorEnd',
        label: 'Switch to Insert Mode(cursor end)'
    };

    export const INSERT_MODE_NEW_LINE_BELOW = {
        id: 'vi.switch.to.insertMode.newLineBelow',
        label: 'Switch to Insert Mode(new line below)'
    };

    export const INSERT_MODE_NEW_LINE_ABOVE = {
        id: 'vi.switch.to.insertMode.newLineAbove',
        label: 'Switch to Insert Mode(new line above)'
    };
}

@injectable()
export class SwitchViModeCommandContribution implements CommandContribution {

    @inject(ModeManager) protected readonly modeManager!: ModeManager;
    @inject(EditorAgent) protected readonly editorAgent!: EditorAgent;
    @inject(EditorManager) protected readonly editorManager!: EditorManager;

    registerCommands(registry: CommandRegistry): void {
        registry.registerCommand(SwitchModeCommands.NORMAL_MODE, {
            execute: () => {
                this.editorAgent.executeCommand(EditorCommands.MOVE_CURSOR_LEFT);
                this.modeManager.setActiveMode(ModeType.Normal);
            },
            isEnabled: () => this.modeManager.isEnabled(ModeType.Normal)
        });

        registry.registerCommand(SwitchModeCommands.VISUAL_MODE, {
            execute: () => this.modeManager.setActiveMode(ModeType.Visual),
            isEnabled: () => this.modeManager.isEnabled(ModeType.Visual)
        });

        registry.registerCommand(SwitchModeCommands.VISUAL_LINE_MODE, {
            execute: () => {
                this.modeManager.setActiveMode(ModeType.Visual_Line);
                this.editorAgent.executeCommand(VisualLineModeCommands.SELECT_LINE_HOME.id);
            },
            isEnabled: () => this.modeManager.isEnabled(ModeType.Visual_Line)
        });

        registry.registerCommand(SwitchModeCommands.INSERT_MODE_CURSOR_BEFORE, {
            execute: () => this.modeManager.setActiveMode(ModeType.Insert),
            isEnabled: () => this.modeManager.isEnabled(ModeType.Insert)
        });

        registry.registerCommand(SwitchModeCommands.INSERT_MODE_CURSOR_AFTER, {
            execute: () => {
                this.editorAgent.executeCommand(EditorCommands.MOVE_CURSOR_RIGHT);
                this.modeManager.setActiveMode(ModeType.Insert);
            },

            isEnabled: () => this.modeManager.isEnabled(ModeType.Insert)
        });

        registry.registerCommand(SwitchModeCommands.INSERT_MODE_CURSOR_HOME, {
            execute: () => {
                this.editorAgent.executeCommand(EditorCommands.MOVE_CURSOR_HOME);
                this.modeManager.setActiveMode(ModeType.Insert);
            },
            isEnabled: () => this.modeManager.isEnabled(ModeType.Insert)
        });

        registry.registerCommand(SwitchModeCommands.INSERT_MODE_CURSOR_END, {
            execute: () => {
                this.editorAgent.executeCommand(EditorCommands.MOVE_CURSOR_END);
                this.modeManager.setActiveMode(ModeType.Insert);
            },
            isEnabled: () => this.modeManager.isEnabled(ModeType.Insert)
        });

        registry.registerCommand(SwitchModeCommands.INSERT_MODE_NEW_LINE_BELOW, {
            execute: () => {
                this.editorAgent.executeCommand(EditorCommands.INSERT_LINE_BELOW);
                this.modeManager.setActiveMode(ModeType.Insert);
            },
            isEnabled: () => this.modeManager.isEnabled(ModeType.Insert)
        });

        registry.registerCommand(SwitchModeCommands.INSERT_MODE_NEW_LINE_ABOVE, {
            execute: () => {
                this.editorAgent.executeCommand(EditorCommands.INSERT_LINE_ABOVE);
                this.modeManager.setActiveMode(ModeType.Insert);
            },
            isEnabled: () => this.modeManager.isEnabled(ModeType.Insert)
        });
    }
}
