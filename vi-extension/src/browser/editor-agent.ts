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
import { EditorManager } from "@theia/editor/lib/browser";
import { MonacoEditor } from "@theia/monaco/lib/browser/monaco-editor";

export namespace EditorCommands {
    export const MOVE_CURSOR_LEFT = 'cursorLeft';
    export const MOVE_CURSOR_RIGHT = 'cursorRight';
    export const MOVE_CURSOR_UP = 'cursorUp';
    export const MOVE_CURSOR_DOWN = 'cursorDown';
    export const MOVE_CURSOR_HOME = 'cursorHome';
    export const MOVE_CURSOR_END = 'cursorEnd';
    export const MOVE_CURSOR_WORD_END_RIGHT = 'cursorWordEndRight';
    export const MOVE_CURSOR_WORD_START_LEFT = 'cursorWordStartLeft';
    export const INSERT_LINE_ABOVE = 'editor.action.insertLineBefore';
    export const INSERT_LINE_BELOW = 'editor.action.insertLineAfter';
    export const DELETE_LINES = 'editor.action.deleteLines';
}

@injectable()
export class EditorAgent {
    @inject(EditorManager) protected readonly editorManager!: EditorManager;

    getActiveEditor(): MonacoEditor | undefined {
        const editorWidget = this.editorManager.activeEditor!;
        const activeEditor = editorWidget.editor;

        return activeEditor instanceof MonacoEditor ? activeEditor as MonacoEditor : undefined;
    }

    isEditorFocused(): boolean {
        const widget = this.editorManager.activeEditor;
        return !!widget && widget.editor.isFocused();
    }

    executeCommand(commandId: string) {
        const editor = this.getActiveEditor()!;
        editor.commandService.executeCommand(commandId);
    }
}
