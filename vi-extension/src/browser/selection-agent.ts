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
import Selection = monaco.Selection;
import { EditorAgent } from "./editor-agent";

@injectable()
export class SelectionAgent {
    @inject(EditorAgent) protected readonly editorAgent!: EditorAgent;

    getCurrentSelection(): Selection | undefined {
        const editor = this.editorAgent.getActiveEditor()!;
        return editor.getControl().getSelection();
    }

    selectLeft() {
        const currentSelection = this.getCurrentSelection()!;
        const currentPosition = currentSelection.getPosition();

        this.changeSelection(currentSelection, currentPosition.lineNumber, currentPosition.column - 1);
    }

    selectRight() {
        const currentSelection = this.getCurrentSelection()!;
        const currentPosition = currentSelection.getPosition();

        this.changeSelection(currentSelection, currentPosition.lineNumber, currentPosition.column + 1);
    }

    selectUp() {
        const currentSelection = this.getCurrentSelection()!;
        const currentPosition = currentSelection.getPosition();

        this.changeSelection(currentSelection, currentPosition.lineNumber - 1, currentPosition.column);
    }

    selectDown() {
        const currentSelection = this.getCurrentSelection()!;
        const currentPosition = currentSelection.getPosition();

        this.changeSelection(currentSelection, currentPosition.lineNumber + 1, currentPosition.column);
    }

    selectCurrentLine() {
        const control = this.editorAgent.getActiveEditor()!.getControl();
        const currentLineNumber = control.getPosition().lineNumber;
        const lineMaxColumn = control.getModel().getLineMaxColumn(currentLineNumber);

        control.setSelection({
            selectionStartLineNumber: currentLineNumber,
            selectionStartColumn: lineMaxColumn,
            positionLineNumber: currentLineNumber,
            positionColumn: 1
        });
    }

    selectLineUp() {
        const control = this.editorAgent.getActiveEditor()!.getControl();

        const currentSelection = this.getCurrentSelection()!;
        const currentSelectionStartLine = currentSelection.startLineNumber;
        const currentSelectionEndLine = currentSelection.endLineNumber;

        const direction = currentSelection.getDirection();
        const positionLineNumber = currentSelection.getPosition().lineNumber - 1;
        const lineMaxColumn = control.getModel().getLineMaxColumn(positionLineNumber);

        const positionColumn = currentSelectionStartLine === currentSelectionEndLine || direction === 1 ? 1 : lineMaxColumn;
        const newSelectionStartLine = direction === 1 ? currentSelectionEndLine : currentSelectionStartLine;
        const newSelectionStartColumn = currentSelectionStartLine === currentSelectionEndLine || direction === 1 ? currentSelection.endColumn : 1;

        control.setSelection({
            selectionStartLineNumber: newSelectionStartLine,
            selectionStartColumn: newSelectionStartColumn,
            positionLineNumber: positionLineNumber,
            positionColumn: positionColumn
        });
        control.revealLine(positionLineNumber);
    }

    selectLineDown() {
        const control = this.editorAgent.getActiveEditor()!.getControl();

        const currentSelection = control.getSelection();
        const currentSelectionStartLine = currentSelection.startLineNumber;
        const currentSelectionEndLine = currentSelection.endLineNumber;

        const direction = currentSelection.getDirection();
        const positionLineNumber = currentSelection.getPosition().lineNumber + 1;
        const lineMaxColumn = control.getModel().getLineMaxColumn(positionLineNumber);

        const positionColumn = currentSelectionStartLine !== currentSelectionEndLine && direction === 1 ? 1 : lineMaxColumn;
        const newSelectionStartLine = direction === 1 ? currentSelectionEndLine : currentSelectionStartLine;
        const newSelectionStartColumn = currentSelectionStartLine !== currentSelectionEndLine && direction === 1 ? currentSelection.endColumn : 1;

        control.setSelection({
            selectionStartLineNumber: newSelectionStartLine,
            selectionStartColumn: newSelectionStartColumn,
            positionLineNumber: positionLineNumber,
            positionColumn: positionColumn
        });
        control.revealLine(positionLineNumber);
    }

    /**
     * Change selection from start selection to given position.
     *
     * @param currentSelection start selection
     * @param positionLineNumber the line number on which the selection should be ended.
     * @param positionColumn the column on `positionLineNumber` where the selection should be ended.
     */
    private changeSelection(currentSelection: Selection, positionLineNumber: number, positionColumn: number) {
        const direction = currentSelection.getDirection();

        const newSelectionStartLine = direction === 1 ? currentSelection.endLineNumber : currentSelection.startLineNumber;
        const newSelectionStartColumn = direction === 1 ? currentSelection.endColumn : currentSelection.startColumn;

        const editor = this.editorAgent.getActiveEditor()!;
        editor.getControl().setSelection({
            selectionStartLineNumber: newSelectionStartLine,
            selectionStartColumn: newSelectionStartColumn,
            positionLineNumber: positionLineNumber,
            positionColumn: positionColumn
        });
        editor.getControl().revealLine(positionLineNumber);
    }
}
