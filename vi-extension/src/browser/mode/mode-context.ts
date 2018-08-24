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
import { ModeManager } from "./mode-manager";
import { ModeType } from "./mode";
import { EditorTextFocusContext, EditorWidget } from "@theia/editor/lib/browser";
import { KeybindingContext, Keybinding } from "@theia/core/lib/browser/keybinding";
import { SwitchModeCommands } from "./switch-mode";

export namespace ViModeKeybindingContexts {

    /**
     * ID of a keybinding context that is enabled when the current vi mode is Insert mode.
     */
    export const insertModeActive = 'viInsertModeActive';

    /**
     * ID of a keybinding context that is enabled when the current vi mode is Normal mode.
     */
    export const normalModeActive = 'viNormalModeActive';

    /**
     * ID of a keybinding context that is enabled when the current vi mode is Visual mode.
     */
    export const visualModeActive = 'viVisualModeActive';

    /**
     * ID of a keybinding context that is enabled when the current vi mode is Visual Line mode.
     */
    export const visualLineModeActive = 'viVisualLineModeActive';

    /**
     * ID of a keybinding context that is enabled when current vi mode can be switched.
     */
    export const switchMode = 'switchViMode';
}

@injectable()
export class NormalModeContext extends EditorTextFocusContext {
    readonly id: string = ViModeKeybindingContexts.normalModeActive;

    @inject(ModeManager) protected readonly modeManager!: ModeManager;

    protected canHandle(widget: EditorWidget): boolean {
        return super.canHandle(widget) && this.modeManager.isActive(ModeType.Normal);
    }
}

@injectable()
export class VisualModeContext extends EditorTextFocusContext {
    readonly id: string = ViModeKeybindingContexts.visualModeActive;

    @inject(ModeManager) protected readonly modeManager!: ModeManager;

    protected canHandle(widget: EditorWidget): boolean {
        return super.canHandle(widget) && this.modeManager.isActive(ModeType.Visual);
    }
}

@injectable()
export class VisualLineModeContext extends EditorTextFocusContext {
    readonly id: string = ViModeKeybindingContexts.visualLineModeActive;

    @inject(ModeManager) protected readonly modeManager!: ModeManager;

    protected canHandle(widget: EditorWidget): boolean {
        return super.canHandle(widget) && this.modeManager.isActive(ModeType.Visual_Line);
    }
}

@injectable()
export class SwitchModeContext implements KeybindingContext {
    readonly id: string = ViModeKeybindingContexts.switchMode;

    @inject(ModeManager) protected readonly modeManager!: ModeManager;

    private switchToNormalModeCommands: string[] = [SwitchModeCommands.NORMAL_MODE.id];
    private switchToVisualModeCommands: string[] = [SwitchModeCommands.VISUAL_MODE.id];
    private switchToVisualLineModeCommands: string[] = [SwitchModeCommands.VISUAL_LINE_MODE.id];
    private switchToInsertModeCommands: string[] = [
        SwitchModeCommands.INSERT_MODE_CURSOR_AFTER.id,
        SwitchModeCommands.INSERT_MODE_CURSOR_BEFORE.id,
        SwitchModeCommands.INSERT_MODE_CURSOR_END.id,
        SwitchModeCommands.INSERT_MODE_CURSOR_HOME.id,
        SwitchModeCommands.INSERT_MODE_NEW_LINE_ABOVE.id,
        SwitchModeCommands.INSERT_MODE_NEW_LINE_BELOW.id
    ];

    isEnabled(keybinding: Keybinding): boolean {
        const command = keybinding.command!;
        const modeType = this.getModeTypeFor(command);

        if (modeType === undefined) {
            return false;
        }

        return this.modeManager.isEnabled(modeType);
    }

    private getModeTypeFor(switchModecommandId: string): ModeType | undefined {
        if (this.switchToNormalModeCommands.indexOf(switchModecommandId) !== -1) {
            return ModeType.Normal;
        }

        if (this.switchToInsertModeCommands.indexOf(switchModecommandId) !== -1) {
            return (ModeType.Insert);
        }

        if (this.switchToVisualModeCommands.indexOf(switchModecommandId) !== -1) {
            return ModeType.Visual;
        }

        if (this.switchToVisualLineModeCommands.indexOf(switchModecommandId) !== -1) {
            return ModeType.Visual_Line;
        }

        return undefined;
    }
}
