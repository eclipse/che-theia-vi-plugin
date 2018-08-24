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
import { SelectionAgent } from "../selection-agent";

export namespace VisualModeCommands {
    export const SELECT_RIGHT = {
        id: 'visual.mode.select.right',
        label: 'Select Right'
    };

    export const SELECT_LEFT = {
        id: 'visual.mode.select.left',
        label: 'Select Left'
    };

    export const SELECT_UP = {
        id: 'visual.mode.select.up',
        label: 'Select Up'
    };

    export const SELECT_DOWN = {
        id: 'visual.mode.select.down',
        label: 'Select Down'
    };
}

export namespace VisualLineModeCommands {
    export const SELECT_UP = {
        id: 'visual.line.mode.select.up',
        label: 'Select Line Up'
    };

    export const SELECT_DOWN = {
        id: 'visual.line.mode.select.down',
        label: 'Select Line Down'
    };

    export const SELECT_LINE_HOME = {
        id: 'visual.line.mode.select.line.home',
        label: 'Select Line, set cursor at the beginning of the line'
    };

    export const DELETE_SELECTED = {
        id: 'visual.line.mode.delete',
        label: 'Delete selected lines'
    };
}

@injectable()
export class VisualModeCommandContribution implements CommandContribution {

    @inject(ModeManager) protected readonly modeManager!: ModeManager;
    @inject(EditorAgent) protected readonly editorAgent!: EditorAgent;
    @inject(SelectionAgent) protected readonly selectionAgent!: SelectionAgent;
    @inject(EditorManager) protected readonly editorManager!: EditorManager;

    registerCommands(registry: CommandRegistry): void {
        registry.registerCommand(VisualModeCommands.SELECT_RIGHT, {
            execute: () => this.selectionAgent.selectRight(),
            isEnabled: () => this.modeManager.isActive(ModeType.Visual)
        });

        registry.registerCommand(VisualModeCommands.SELECT_LEFT, {
            execute: () => this.selectionAgent.selectLeft(),
            isEnabled: () => this.modeManager.isActive(ModeType.Visual)
        });

        registry.registerCommand(VisualModeCommands.SELECT_UP, {
            execute: () => this.selectionAgent.selectUp(),
            isEnabled: () => this.modeManager.isActive(ModeType.Visual)
        });

        registry.registerCommand(VisualModeCommands.SELECT_DOWN, {
            execute: () => this.selectionAgent.selectDown(),
            isEnabled: () => this.modeManager.isActive(ModeType.Visual)
        });

        registry.registerCommand(VisualLineModeCommands.SELECT_UP, {
            execute: () => this.selectionAgent.selectLineUp(),
            isEnabled: () => this.modeManager.isActive(ModeType.Visual_Line)
        });

        registry.registerCommand(VisualLineModeCommands.SELECT_DOWN, {
            execute: () => this.selectionAgent.selectLineDown(),
            isEnabled: () => this.modeManager.isActive(ModeType.Visual_Line)
        });

        registry.registerCommand(VisualLineModeCommands.SELECT_LINE_HOME, {
            execute: () => this.selectionAgent.selectCurrentLine(),
            isEnabled: () => this.modeManager.isActive(ModeType.Visual_Line)
        });

        registry.registerCommand(VisualLineModeCommands.DELETE_SELECTED, {
            execute: () => {
                this.editorAgent.executeCommand(EditorCommands.DELETE_LINES);
                this.modeManager.setActiveMode(ModeType.Normal);
            },
            isEnabled: () => this.modeManager.isActive(ModeType.Visual_Line)
        });
    }
}
