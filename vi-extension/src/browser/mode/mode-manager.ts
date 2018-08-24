/*********************************************************************
 * Copyright (c) 2018 Red Hat, Inc.
 *
 * This program and the accompanying materials are made
 * available under the terms of the Eclipse Public License 2.0
 * which is available at https://www.eclipse.org/legal/epl-2.0/
 *
 * SPDX-License-Identifier: EPL-2.0
 **********************************************************************/

import { Mode, ModeType, ModeOptions } from "./mode";
import { injectable, inject } from "inversify";
import { StatusBar, StatusBarAlignment } from "@theia/core/lib/browser";
import { Event, Emitter } from "@theia/core";
import { EditorAgent } from "../editor-agent";

@injectable()
export class ModeManager {
    private _modes: Mode[];
    private _activeMode!: Mode;

    private onModeChangedEmitter = new Emitter<Mode>();
    onModeChanged: Event<Mode> = this.onModeChangedEmitter.event;

    constructor(@inject(StatusBar) protected readonly statusBar: StatusBar,
        @inject(EditorAgent) protected readonly editorAgent: EditorAgent) {

        this._modes = [
            new Mode(ModeType.Normal, ModeOptions.NORMAL_MODE_STATUS_TEXT, { cursorStyle: ModeOptions.NORMAL_MODE_CURSOR_STYLE }),
            new Mode(ModeType.Insert, ModeOptions.INSERT_MODE_STATUS_TEXT, { cursorStyle: ModeOptions.INSERT_MODE_CURSOR_STYLE }),
            new Mode(ModeType.Visual, ModeOptions.VISUAL_MODE_STATUS_TEXT,
                { cursorStyle: ModeOptions.VISUAL_MODE_CURSOR_STYLE, cursorBlinking: ModeOptions.VISUAL_LINE_MODE_CURSOR_BLINKING }),
            new Mode(ModeType.Visual_Line, ModeOptions.VISUAL_LINE_MODE_STATUS_TEXT, { cursorStyle: ModeOptions.VISUAL_MODE_CURSOR_STYLE }),
            new Mode(ModeType.Replace, ModeOptions.REPLACE_MODE_STATUS_TEXT, { cursorStyle: ModeOptions.REPLACE_MODE_CURSOR_STYLE })
        ];

        this.setActiveMode(ModeType.Normal);
    }

    get activeMode(): Mode {
        return this._activeMode;
    }

    setActiveMode(type: ModeType) {
        this._activeMode = this._modes.find(mode => type === mode.type)!;
        this.onModeChangedEmitter.fire(this._activeMode);

        this.statusBar.setElement('vi-mode-status', {
            text: `--- ${this._activeMode.statusBarText} ---`,
            alignment: StatusBarAlignment.LEFT,
            priority: 2
        });
    }

    isActive(type: ModeType): boolean {
        return this._activeMode.type === type;
    }

    /** Returns true if it is possible to switch to given mode type and false otherwise  */
    isEnabled(type: ModeType): boolean {
        if (!this.editorAgent.isEditorFocused()) {
            return false;
        }

        switch (type) {
            case ModeType.Normal:
                return !this.isActive(ModeType.Normal);
            case ModeType.Insert:
                return !this.isActive(ModeType.Insert);
            case ModeType.Visual:
                return this.isActive(ModeType.Normal) || this.isActive(ModeType.Visual_Line);
            case ModeType.Visual_Line:
                return this.isActive(ModeType.Normal) || this.isActive(ModeType.Visual);
            default:
                return false;
        }
    }
}
