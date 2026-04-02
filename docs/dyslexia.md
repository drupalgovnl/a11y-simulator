# Technical Documentation: Dyslexia feature

## The Dyslexia Feature/Options
Dyslexia experiences differ per person. To maximize the experience to the best of the application's ability, it was chosen to create multiple effects corresponding to different forms of dyslexia, that can be turned on simultaneously. The following forms of dyslexia, or common occurring symptoms were implemented:

1. Mirroring of Characters
2. Changing the word order in sentences
3. Changing the use of spaces in sentences
4. changing the order of characters in a word in sentences

As previously stated, each of these effects can be turned on singularly, as well as simultaneously. 

In the project directory, there is a separate folder called "dyslexia" that houses the multiple forms in the form of typescript classes corresponding to each of the form/functionalities listed above.

### Changing DOM content
Most logic included in the dyslexia functionalities includes making changes in the DOM. There are several ways to do this, the idea is to change the content while not changing any other content besides text. So list items should stay as list items, images should remain as images. For this reason it was chosen to use a tree walker over the document. The TreeWalker object represents the nodes of a document sub-tree and a position within them. This means we can change nodes and it will still be put in the correct position. We create a treewalker for the entire HTML body, and use the filter SHOW_TEXT, so that only text nodes will be taken into account. 

The Treewalker works like an iterator. You can loop through the filtered items by using the nextNode() function, then its content can be editted. Every kind of DOM node is represented by an interface base on the Node Interface. The value can be obtained and set by calling the node.nodeValue attribute.

By working with the Treewalker you can filter out the nodes you need, and only those. And they are also kept in context of the html, you know the node comes from in terms of the location on the document.

### Mirroring
Mirroring means that the characters will resemble one of their mirror-variants. For example, the b would become a d or a p. People who have dyslexia sometimes experience this as part of their struggles.

The logic for the mirroring can be found in the `src/models/dyslexia/DyslexiaMirrorFunctionality.ts` file.
It implements the IDisabilitySimulation because it is a Disability. This means it has an `onActivate`, `onDeactivate`, and `onUpdate` function as part of its class.

When the mirroring gets activated, the goal is to mirror characters. 


### Changing Word Order

The logic for the word order can be found in the `src/models/dyslexia/DyslexiaWordOrderFunctionality.ts` file.
It implements the IDisabilitySimulation because it is a Disability. This means it has an `onActivate`, `onDeactivate`, and `onUpdate` function as part of its class.


### Changing the use of spaces

The logic for the use of spaces can be found in the `src/models/dyslexia/DyslexiaSpacesFunctionality.ts` file.
It implements the IDisabilitySimulation because it is a Disability. This means it has an `onActivate`, `onDeactivate`, and `onUpdate` function as part of its class.

### Changing order of characters

The logic for the order of characters in words can be found in the `src/models/dyslexia/DyslexiaSwitchFunctionality.ts` file.
It implements the IDisabilitySimulation because it is a Disability. This means it has an `onActivate`, `onDeactivate`, and `onUpdate` function as part of its class.
