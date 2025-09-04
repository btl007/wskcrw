# Gemini Project Context: wskcrw

This file summarizes the context of the `wskcrw` project for future sessions.

## Project Overview

- **Project Name:** wskcrw
- **Type:** Web application with a rich text editor.
- **Core Technologies:** React, Vite, Lexical.
- **Main Goal:** To create a Notion-like script editor where users can insert and manage blocks of text that are editable.

## Development Summary & Current Status

We initially attempted to create an editable block by using a custom `DecoratorNode` (`ScriptBlockNode`) that rendered a `LexicalNestedComposer` inside a React component (`ScriptBlockComponent`).

**Problem Encountered:**
This approach led to persistent and hard-to-debug circular dependency issues. The application would crash with an `Element type is invalid... got: undefined` error when trying to render the custom node. This happened because the main editor, while initializing its nodes, triggered a dependency chain that looped back on itself, causing a failure in the module loading (specifically for the `ContentEditable` component).

**New Architectural Decision:**
After extensive debugging, we decided to **abandon the `LexicalNestedComposer` approach** due to its complexity and inherent issues with circular dependencies in our setup.

The new, simpler architecture will be:
1.  **Use a custom `ElementNode` as a container:** We will create a new `ScriptContainerNode` that extends `ElementNode`. Its sole purpose is to act as a styled wrapper (e.g., providing a border and background) for its children.
2.  **Use standard nodes for content:** The actual text content will be a standard `ParagraphNode` placed *inside* the `ScriptContainerNode`. 
3.  **Leverage the main editor:** All text editing will be handled natively by the main editor, as the content is just a regular paragraph. This completely eliminates the need for a nested editor, state synchronization, and the associated complexity.

## Implementation Summary & Resolution

Based on the new architectural decision, the following steps were taken to refactor the editor:

1.  **Initial Change:** The insertion logic in `scriptEditor.jsx` was temporarily modified to insert a standard `ParagraphNode` to quickly move away from the problematic custom node.
2.  **Code Cleanup:** The obsolete `ScriptBlockNode.jsx` and `ScriptBlockComponent.jsx` files, which were responsible for the nested editor approach, were deleted. All references to these components were removed from `Editor.jsx`.
3.  **New Node Implementation:** A new `ScriptContainerNode.jsx` was created. This node extends `ElementNode` and acts as a simple, non-editable, styled container for other nodes.
4.  **Editor Integration:** The new `ScriptContainerNode` was registered in the `Editor.jsx` configuration, and a theme was applied to give it a distinct visual style (background, padding, etc.).
5.  **Final Insertion Logic:** The logic in `scriptEditor.jsx` was updated to insert a `ScriptContainerNode` containing a `ParagraphNode` with the script's content. This completed the new architecture.

**Follow-up Bug Fix:**- **Problem:** A new issue was identified where inserting a second block caused it to be indented inside the first block. - **Cause:** This was due to the editor's selection remaining *inside* the first container after insertion. The subsequent insertion was happening in a nested context, causing Lexical to auto-indent the new block.- **Resolution:** The insertion logic was made more robust. It now explicitly finds the top-level block containing the cursor, 'escapes' it, and inserts the new block as a sibling, not a child. This definitively solves the nesting and indentation issue.---### Recent Development Summary (Since last update)This section summarizes the work done since the last major update, including new features, bug fixes, and ongoing challenges.*   **Implemented Hover-to-Delete and Block Management Menu:**    *   Replaced the simple "삭제" button with a "..." button that reveals a pop-up menu with "복제" (Duplicate) and "삭제" (Delete) options.    *   This involved a significant refactor to render the menu as a React component (`BlockManagementMenu`) using `createPortal` within a `BlockManagementRendererPlugin`.    *   Styled the new menu components with CSS.    *   Encountered and debugged several issues related to `createPortal` and Lexical context, including `TypeError: this.getEditor is not a function` and `LexicalComposerContext.useLexicalComposerContext: cannot find a LexicalComposerContext`. These were resolved by correctly passing the `editor` instance as a prop.    *   Encountered and debugged `Uncaught ReferenceError: n is not defined` which was a minification artifact.*   **Implemented Automatic Block Wrapping:**    *   Implemented `ParagraphToScriptBlockPlugin` to automatically wrap top-level `ParagraphNode`s into `ScriptContainerNode`s. This ensures all text is managed as blocks.    *   Encountered and debugged `ReferenceError: ParagraphNode is not defined`.    *   Encountered and debugged an issue where the initial placeholder was being transformed too early.*   **Ongoing Challenge: "Extra Enter" Issue:**    *   The "extra Enter" issue (an extra blank line appearing when pressing Enter after a card insertion or in state A) is still unresolved.    *   Despite multiple attempts (cleanup logic, `event.preventDefault()`, `COMMAND_PRIORITY_CRITICAL`), the problem persists.    *   The root cause is still elusive, likely a subtle interaction with Lexical's internal Enter key handling or DOM reconciliation that creates an unwanted empty paragraph.

---
### Bug Fix: Block Management Menu Visibility and Hover Issues

This section details the extensive debugging and architectural changes required to fix an issue where the block management menu would not appear on hover.

**1. Initial Problem & Failed Attempts**
- **Symptom:** The block management menu, intended to appear on hovering over a `ScriptContainerNode`, was not visible.
- **Initial Debugging:** We confirmed the menu component (`BlockManagementMenu`) and its renderer plugin (`BlockManagementRendererPlugin`) were being loaded. We suspected a CSS issue (`opacity: 0`) or a race condition where the plugin tried to render the menu before the node's DOM element was available.
- **The Portal Problem:** Through extensive debugging, we discovered that using `createPortal` to render the menu component directly into the Lexical node's DOM element (`domElement`) was fundamentally failing in this project's environment. Even when portaling to `document.body`, the menu would render, but targeting the `domElement` would fail silently.

**2. Key Insight & Architectural Shift**
- **User Discovery:** The breakthrough came when the user discovered via browser dev tools that the menu *was* rendering, but was positioned far off-screen. The root cause was that its container, the `ScriptContainerNode`'s `div`, was missing `position: relative`, causing the menu's `position: absolute` to be relative to the viewport, not the block.
- **New Architecture:** This led to a complete architectural change for the menu. We abandoned trying to portal *into* the node's element.
    1.  **Portal to Body:** The `BlockManagementMenuPortal` now renders the menu into `document.body`. This is a known, stable portal target.
    2.  **Manual Positioning:** It gets the coordinates of the target `ScriptContainerNode`'s DOM element using `domElement.getBoundingClientRect()`.
    3.  **Prop Drilling:** It passes these coordinates (`rect`) down to the `BlockManagementMenu` component.
    4.  **Self-Positioning:** The `BlockManagementMenu` component now accepts the `rect` prop and uses it to apply `position: fixed` and calculated `top` and `left` styles, allowing it to place itself correctly on the screen next to the block.

**3. Hover Logic Refinement**
- **The Gap Problem:** The new architecture broke the CSS-based `:hover` effect. A new JavaScript-based hover solution was implemented, but this created a "flicker" issue when the mouse moved across the gap between the text block and the now-distant menu.
- **Delayed Hide:** To solve this, a timer-based solution was implemented.
    - When the mouse leaves either the block or the menu, a `setTimeout` of 100ms is initiated to hide the menu.
    - When the mouse enters either element, the timer is cleared, preventing the menu from hiding.
    - This ensures a smooth experience as the user moves the mouse between the two elements.

**4. Final Bug Fixes**
- A final `Uncaught ReferenceError: useRef is not defined` was resolved by adding the missing `useRef` import to `Editor.jsx`.
---
## Feature Implementation: Script Saving & Auth (Clerk/Supabase) - The Final Fix

This section details the extensive and challenging debugging process for implementing script saving with Supabase and Clerk authentication. The issue was a persistent and misleading PostgreSQL error that was ultimately solved by a user-led breakthrough.

**1. The Core Problem: The "Impossible" `uuid` Error**

- **Symptom:** We repeatedly encountered a `22P02: invalid input syntax for type uuid` error when trying to filter the `scripts` table by `user_id` using RLS.
- **The Contradiction:** This error occurred even though the `user_id` column in our database was correctly defined as `TEXT`, and we were comparing it to a `TEXT` value from the Clerk user ID (e.g., `user_...`). A `TEXT = TEXT` comparison should never produce a `uuid` syntax error. A key piece of evidence was that `INSERT` operations worked, while `SELECT` operations failed under the same RLS policy, a logical contradiction.
- **Initial Failures:** Numerous attempts to fix this failed, including using different SQL functions (`auth.uid()`, `auth.jwt() ->> 'sub'`), creating helper functions with explicit type casting, and temporarily disabling Row Level Security (RLS). The error seemed to be a platform-level bug.

**2. The Breakthrough: `sub` vs. Custom Claims**

The turning point came when the user discovered the solution by modifying the Clerk JWT template.

- **The Insight:** The `sub` (Subject) claim in a JWT is a standard, reserved claim. The evidence strongly suggests that Supabase's auth system has special, undocumented internal logic that assumes the `sub` claim *must* correspond to a `uuid` (likely the `id` from the `auth.users` table). This "magic" behavior was incorrectly forcing a `uuid` type check on our `TEXT` column comparison, but only for `SELECT` queries, not `INSERT` checks.
- **The User's Solution:** The user bypassed this entire problem by creating a **custom claim** in the Clerk JWT template.
    1.  In the Clerk dashboard, under JWT Templates, a new claim was added: `"user_id": "{{user.id}}"`.
    2.  This embedded the `TEXT`-based user ID into the JWT under a custom name that has no special meaning to Supabase.

**3. The Final Implementation**

With the new custom claim available, the fix was straightforward and robust:

- **RLS Policies:** All RLS policies for the `scripts` table were updated to use the new custom claim for checks:
  ```sql
  -- Example SELECT Policy
  USING ( user_id = (auth.jwt() ->> 'user_id') )
  ```
- **Client-Side Code:** The client-side code was simplified to rely entirely on the now-functional RLS for security. All temporary workarounds (like client-side `.eq()` filtering) were removed.

**4. Final Status**

The authentication and data access features are now working perfectly and securely. This resolution highlights the importance of understanding potential "magic" or special handling of standard claims in managed authentication systems.
