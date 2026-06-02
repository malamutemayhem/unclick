# UIPass product brief

**Status:** split from UXPass, first Admin checklist surface live in XPass.  
**Owner:** XPass maintainers.  
**Relationship:** sibling to UXPass.

## Plain definition

UIPass checks whether the interface looks right and is easy to scan.

It owns the visible screen quality:

- layout
- spacing
- typography
- mobile fit
- visual hierarchy
- buttons, inputs, tables, and state styling
- contrast and readable density
- screenshots and visual proof
- design consistency and polish

UXPass keeps the journey quality:

- can the user understand what to do
- can the user finish the task
- are forms, feedback, recovery, and onboarding clear
- are there dead ends, confusing steps, or missing confirmations

## Routing rule

Run UIPass when a target changes a visible interface, page, component, dashboard, report, mobile layout, screenshot, visual state, or design system detail.

Run UXPass when a target changes a task journey, onboarding, navigation, form, handoff, feedback, recovery path, or user completion path.

For most frontend work, AutoPilot should consider both UIPass and UXPass, then mark either one `N/A` only when the reason is plain.

## First checklist groups

UIPass starts with these product groups:

1. Screen layout
2. Interface controls
3. Visual polish and consistency
4. Deep UIPass checklist
5. Shared evidence, replay, and loop-until-green rows

## Promotion path

UIPass is a product in the XPass family now. It becomes a live dogfood lane after it has a recurring screenshot receipt that proves desktop, mobile, dense rows, long text, and state styling without relying on raw UXPass wording.
