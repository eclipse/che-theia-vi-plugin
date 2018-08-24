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
import { KeybindingContribution, KeybindingRegistry, KeyCode, Keybinding, KeybindingScope, KeySequence } from '@theia/core/lib/browser';
import { CommandRegistry } from "@theia/core/lib/common";
import { ModeManager } from "./mode/mode-manager";
import { ViKeyBindings } from "./keybindings";
import { ModeType } from "./mode/mode";
import { EditorAgent } from "./editor-agent";

@injectable()
export class ViKeybindingContribution implements KeybindingContribution {
    protected keySequence: KeySequence = [];

    constructor(@inject(ModeManager) protected readonly modeManager: ModeManager,
        @inject(KeybindingRegistry) protected readonly keybindingRegistry: KeybindingRegistry,
        @inject(CommandRegistry) protected readonly commandRegistry: CommandRegistry,
        @inject(EditorAgent) protected readonly editorAgent: EditorAgent,
        @inject(ViKeyBindings) protected readonly viKeyBindings: ViKeyBindings) {
        document.addEventListener('keydown', event => this.handleKeyboardEvant(event), true);
    }

    registerKeybindings(registry: KeybindingRegistry): void {
        registry.setKeymap(KeybindingScope.USER, this.viKeyBindings.getKeybindings());
    }

    private handleKeyboardEvant(event: KeyboardEvent) {
        if (event.defaultPrevented) {
            return;
        }

        const keyCode = KeyCode.createKeyCode(event);
        if (keyCode.isModifierOnly()) {
            return;
        }

        this.keySequence.push(keyCode);

        if (this.editorAgent.isEditorFocused() && !this.modeManager.isActive(ModeType.Insert)) {
            const bindingsResult = this.keybindingRegistry.getKeybindingsForKeySequence(this.keySequence);
            if (!this.hasActiveHandlerFor(bindingsResult.full)) {
                event.preventDefault();
                event.stopPropagation();
            }
        }

        this.keySequence = [];
    }

    private hasActiveHandlerFor(bindings: Keybinding[]): boolean {
        for (const binding of bindings) {
            if (this.commandRegistry.isEnabled(binding.command)) {
                return true;
            }
        }
        return false;
    }
}
