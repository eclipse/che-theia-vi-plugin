/*********************************************************************
 * Copyright (c) 2018 Red Hat, Inc.
 *
 * This program and the accompanying materials are made
 * available under the terms of the Eclipse Public License 2.0
 * which is available at https://www.eclipse.org/legal/epl-2.0/
 *
 * SPDX-License-Identifier: EPL-2.0
 **********************************************************************/

import { ContainerModule } from "inversify";
import { CommandContribution } from "@theia/core/lib/common";
import { KeybindingContribution, KeybindingContext, FrontendApplicationContribution } from '@theia/core/lib/browser';
import { ViKeybindingContribution } from './vi-contribution';
import { ModeManager } from "./mode/mode-manager";
import { NormalModeContext, SwitchModeContext, VisualModeContext, VisualLineModeContext } from "./mode/mode-context";
import { ViKeyBindings } from "./keybindings";
import { TextEditorTracker } from "./editor-tracker";
import { SwitchViModeCommandContribution } from "./mode/switch-mode";
import { VisualModeCommandContribution } from "./mode/visual-mode";
import { NormalModeCommandContribution } from "./mode/normal-mode";
import { EditorAgent } from "./editor-agent";
import { SelectionAgent } from "./selection-agent";

export default new ContainerModule(bind => {

    bind(EditorAgent).toSelf().inSingletonScope();
    bind(SelectionAgent).toSelf().inSingletonScope();

    bind(TextEditorTracker).toSelf().inSingletonScope();
    bind(FrontendApplicationContribution).toDynamicValue(ctx => ctx.container.get(TextEditorTracker)).inSingletonScope();

    bind(ViKeyBindings).toSelf().inSingletonScope();

    bind(NormalModeContext);
    bind(KeybindingContext).to(NormalModeContext).inSingletonScope();
    bind(VisualModeContext);
    bind(KeybindingContext).to(VisualModeContext).inSingletonScope();
    bind(VisualLineModeContext);
    bind(KeybindingContext).to(VisualLineModeContext).inSingletonScope();
    bind(SwitchModeContext);
    bind(KeybindingContext).to(SwitchModeContext).inSingletonScope();
    bind(ModeManager).toSelf().inSingletonScope();

    bind(CommandContribution).to(SwitchViModeCommandContribution);
    bind(CommandContribution).to(VisualModeCommandContribution);
    bind(CommandContribution).to(NormalModeCommandContribution);

    bind(KeybindingContribution).to(ViKeybindingContribution);
});
