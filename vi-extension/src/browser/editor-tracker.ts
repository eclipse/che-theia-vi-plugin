/*********************************************************************
 * Copyright (c) 2018 Red Hat, Inc.
 *
 * This program and the accompanying materials are made
 * available under the terms of the Eclipse Public License 2.0
 * which is available at https://www.eclipse.org/legal/epl-2.0/
 *
 * SPDX-License-Identifier: EPL-2.0
 **********************************************************************/

import { inject, injectable } from "inversify";
import { EditorManager, EditorWidget } from "@theia/editor/lib/browser";
import { ModeManager } from "./mode/mode-manager";
import { Mode } from "./mode/mode";
import { MonacoEditor } from "@theia/monaco/lib/browser/monaco-editor";
import { DefaultFrontendApplicationContribution } from "@theia/core/lib/browser";

@injectable()
export class TextEditorTracker extends DefaultFrontendApplicationContribution {
    private editors = new Set<EditorWidget>();

    constructor(@inject(EditorManager) protected readonly editorManager: EditorManager,
        @inject(ModeManager) protected readonly modeManager: ModeManager) {
        super();
        editorManager.onCreated(editor => this.onEditorCreated(editor));
        modeManager.onModeChanged(newMode => this.onModeChanged(newMode));
    }

    private onModeChanged(newMode: Mode) {
        for (const editor of this.editors) {
            this.resolveCursorStyleFor(editor, newMode);
        }
    }

    private onEditorCreated(editorWidget: EditorWidget) {
        this.editors.add(editorWidget);
        editorWidget.disposed.connect(editor => this.onEditorRemoved(editorWidget));

        this.resolveCursorStyleFor(editorWidget, this.modeManager.activeMode);
    }

    private onEditorRemoved(editorWidget: EditorWidget) {
        if (this.editors.has(editorWidget)) {
            this.editors.delete(editorWidget);
        }
    }

    private resolveCursorStyleFor(editorWidget: EditorWidget, mode: Mode) {
        if (editorWidget.editor instanceof MonacoEditor) {
            const monacoEditor = editorWidget.editor as MonacoEditor;
            monacoEditor.getControl().updateOptions({ cursorStyle: mode.cursorStyle, cursorBlinking: mode.cursorBlinking });
        }
    }
}
