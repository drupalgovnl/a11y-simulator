# Technical Documentation: Dyslexia

## Table of Contents
1. [Dyslexia Simulation](#dyslexia-simulation)
2. [Changing Content](#changing-content)
3. [The Mirroring Feature](#the-mirroring-feature)
4. [The Word Order Feature](#the-word-order-feature)
5. [The Space Feature](#the-space-feature)
6. [The Character Order Feature](#the-character-order-feature)

## Dyslexia Simulation

Dyslexia affects people in different ways. The application supports multiple effects to reflect this. Each effect targets a common symptom. Users can enable one or more effects at the same time.

The following effects are implemented:

1. Character mirroring
2. Word order changes
3. Space usage changes
4. Character order changes within words

Each effect can be toggled with a checkbox. Checkboxes were chosen to allow multiple selections. This makes it clear that effects can run together. It also lets users explore combinations.

All dyslexia-related logic is stored in the `dyslexia` folder. Each effect is implemented as a TypeScript class. These classes extend a shared `DyslexiaSimulation` base class.

The base class provides common utilities. These include:

- A randomizer for triggering effects
- A `TreeWalker` helper to iterate over Document Object Model (DOM) nodes

More details on DOM handling are described below.

## Changing Content

Most features modify text in the Document Object Model (DOM). The goal is to change text only, without affecting structure. Elements such as lists and images must remain unchanged.

A `TreeWalker` is used for this purpose. It traverses the DOM and selects only text nodes. This is done by filtering with `SHOW_TEXT`.

The `TreeWalker` works like an iterator. You can loop through nodes using `nextNode()`. Each node exposes its value through `node.nodeValue`. This value can be read and updated directly.

This approach has two advantages:

- Only relevant nodes are processed
- Each node keeps its position in the document

Each change is stored in a record. Every effect has its own record. The record maps modified text to the original text.

When an effect is disabled, this record is used to restore the original values.

There is one limitation. Records are not shared between effects. If multiple effects are active, they do not track each other’s changes. Disabling effects in a different order may lead to incorrect text. In this case, the reset button restores the correct state.

## Features
### The Mirroring Feature

Mirroring replaces characters with visually similar alternatives. These alternatives resemble how some letters may appear reversed. For example, `b` may become `d` or `p`. This effect simulates a common reading difficulty where characters are confused with their mirrored forms.

The logic is implemented in:  
`src/models/dyslexia/DyslexiaMirrorFunctionality.ts`

This class implements the `IDisabilitySimulation` interface. It defines `onActivate`, `onDeactivate`, and `onUpdate`.

#### onActivate

A `TreeWalker` is created. Each text node is processed word by word.

Each node is split into words using spaces. Each word is then processed character by character. For each character, a mirrored variant may be selected. The selection is based on predefined mappings.

The modified words are collected in a new list. This list is joined into a string using spaces. The result is assigned to `node.nodeValue`.

#### onDeactivate

A new `TreeWalker` is created to iterate over all text nodes.

Each node is checked against the record created during activation (see the _Changing DOM Content_ section). This record stores a mapping between modified text and the original text.

If the current node value matches a modified entry in the record, the original value is retrieved. The node is then updated with this original value. This restores the text to its state before the mirroring effect was applied.

---

### The Word Order Feature

This effect changes the order of words within a sentence. It simulates cases where words are perceived in a different sequence than intended. This can make sentences harder to follow.

The logic is implemented in:  
`src/models/dyslexia/DyslexiaWordOrderFunctionality.ts`

#### onActivate

A `TreeWalker` is created. Each text node is split into words.

Two random indices are generated. These indices point to two words in the same sentence. The selected words are swapped.

This process keeps the total number of words the same. Only their positions change. The updated list is joined into a string and written back to the node.

#### onDeactivate

A new `TreeWalker` is created to iterate over all text nodes.

Each node is checked against the record created during activation (see the _Changing DOM Content_ section). This record stores a mapping between modified text and the original text.

If the current node value matches a modified entry in the record, the original value is retrieved. The node is then updated with this original value. This restores the text to its state before the mirroring effect was applied.

---

### The Space Feature

This effect changes how spaces appear in text. Spaces may be removed or inserted at random positions. This can cause words to merge or split unexpectedly. As a result, new word boundaries may appear where they should not exist.

The logic is implemented in:  
`src/models/dyslexia/DyslexiaSpacesFunctionality.ts`

#### onActivate

A `TreeWalker` is created. Spaces are first removed from the text to create a continuous string.

The string is then processed character by character. At each step, a check determines if a space should be inserted. This check uses a fixed probability of 33%. This number was chosen by testing out various percentages. In the future it would be nice to have a bit more reasoning behind the probability, perhaps by talking to people with dyslexia.

If a space is added, a flag is set. This flag prevents multiple spaces from being inserted in sequence. This ensures the output remains readable.

#### onDeactivate

A new `TreeWalker` is created to iterate over all text nodes.

Each node is checked against the record created during activation (see the _Changing DOM Content_ section). This record stores a mapping between modified text and the original text.

If the current node value matches a modified entry in the record, the original value is retrieved. The node is then updated with this original value. This restores the text to its state before the mirroring effect was applied.

---

### The Character Order Feature

This effect changes the order of characters within words. It simulates cases where letters appear shuffled. This can result in words that are partially readable or unclear.

The logic is implemented in:  
`src/models/dyslexia/DyslexiaSwitchFunctionality.ts`

#### onActivate

A `TreeWalker` is created. Each text node is split into words.

Each word is evaluated using a probability check. Currently, 40% of words are selected for modification.

If a word is selected, two random indices are generated. These indices represent positions within the word. The characters at these positions are swapped.

The modified word is added to the result list. Words that are not selected remain unchanged. The final list is joined into a string and written back to the node.

#### onDeactivate

A new `TreeWalker` is created to iterate over all text nodes.

Each node is checked against the record created during activation (see the _Changing DOM Content_ section). This record stores a mapping between modified text and the original text.

If the current node value matches a modified entry in the record, the original value is retrieved. The node is then updated with this original value. This restores the text to its state before the mirroring effect was applied.
