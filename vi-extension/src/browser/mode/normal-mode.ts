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
import { EditorCommands, EditorAgent } from "../editor-agent";

export namespace NormalModeCommands {
    export const CURSOR_RIGHT = {
        id: 'normal.mode.cursor.right',
        label: 'Move forward'
    };

    export const CURSOR_LEFT = {
        id: 'normal.mode.cursor.left',
        label: 'Move backward'
    };

    export const CURSOR_UP = {
        id: 'normal.mode.cursor.up',
        label: 'Move to the previous line'
    };

    export const CURSOR_DOWN = {
        id: 'normal.mode.cursor.down',
        label: 'Move to the next line'
    };

    export const CURSOR_HOME = {
        id: 'normal.mode.cursor.home',
        label: 'Move to the beginning of line'
    };

    export const CURSOR_END = {
        id: 'normal.mode.cursor.end',
        label: 'Move to the end of line'
    };

    export const CURSOR_WORD_END_RIGHT = {
        id: 'normal.mode.cursor.word.end.right',
        label: 'Move forward by one word unit'
    };

    export const CURSOR_WORD_START_LEFT = {
        id: 'normal.mode.cursor.word.start.left',
        label: 'Move backward by one word unit'
    };
}

@injectable()
export class NormalModeCommandContribution implements CommandContribution {

    @inject(ModeManager) protected readonly modeManager!: ModeManager;
    @inject(EditorAgent) protected readonly editorAgent!: EditorAgent;
    @inject(EditorManager) protected readonly editorManager!: EditorManager;

    registerCommands(registry: CommandRegistry): void {
        registry.registerCommand(NormalModeCommands.CURSOR_RIGHT, {
            execute: () => this.editorAgent.executeCommand(EditorCommands.MOVE_CURSOR_RIGHT),
            isEnabled: () => this.modeManager.isActive(ModeType.Normal)
        });

        registry.registerCommand(NormalModeCommands.CURSOR_LEFT, {
            execute: () => this.editorAgent.executeCommand(EditorCommands.MOVE_CURSOR_LEFT),
            isEnabled: () => this.modeManager.isActive(ModeType.Normal)
        });

        registry.registerCommand(NormalModeCommands.CURSOR_UP, {
            execute: () => this.editorAgent.executeCommand(EditorCommands.MOVE_CURSOR_UP),
            isEnabled: () => this.modeManager.isActive(ModeType.Normal)
        });

        registry.registerCommand(NormalModeCommands.CURSOR_DOWN, {
            execute: () => this.editorAgent.executeCommand(EditorCommands.MOVE_CURSOR_DOWN),
            isEnabled: () => this.modeManager.isActive(ModeType.Normal)
        });

        registry.registerCommand(NormalModeCommands.CURSOR_HOME, {
            execute: () => this.editorAgent.executeCommand(EditorCommands.MOVE_CURSOR_HOME),
            isEnabled: () => this.modeManager.isActive(ModeType.Normal)
        });

        registry.registerCommand(NormalModeCommands.CURSOR_END, {
            execute: () => this.editorAgent.executeCommand(EditorCommands.MOVE_CURSOR_END),
            isEnabled: () => this.modeManager.isActive(ModeType.Normal)
        });

        registry.registerCommand(NormalModeCommands.CURSOR_WORD_END_RIGHT, {
            execute: () => this.editorAgent.executeCommand(EditorCommands.MOVE_CURSOR_WORD_END_RIGHT),
            isEnabled: () => this.modeManager.isActive(ModeType.Normal)
        });

        registry.registerCommand(NormalModeCommands.CURSOR_WORD_START_LEFT, {
            execute: () => this.editorAgent.executeCommand(EditorCommands.MOVE_CURSOR_WORD_START_LEFT),
            isEnabled: () => this.modeManager.isActive(ModeType.Normal)
        });
    }
}
