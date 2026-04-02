# Technical Documentation: Cataract Simulation

## Cataract Simulation

Cataracts are a visual impairment that cause clouding of the eye’s lens. This results in blurred vision, reduced contrast, and difficulty seeing details clearly.

The application simulates this condition by applying a visual overlay that mimics blurred and hazy vision. Instead of modifying the underlying content, the simulation alters how the content is visually perceived.

The implementation can be found in:  
`src/models/cataract/CataractSimulation.ts`

The `CataractSimulation` class implements the `IDisabilitySimulation` interface. This ensures consistency with other simulation features in the system. The class defines the following lifecycle methods:

- `onActivate`
- `onDeactivate`
- `onUpdate`

Additionally, an `isActive` method is present but not yet implemented.


## Overlay-Based Approach

The cataract simulation uses an overlay-based rendering strategy. This means that no changes are made to the actual DOM content.

An overlay is a visual layer placed on top of the webpage. It is used to simulate effects such as:

- Blurring of content
- Reduced contrast
- Hazy or foggy vision

All overlay-related logic is handled by the `OverlayManager`. This component is responsible for:

- Creating overlays
- Applying visual effects
- Updating existing effects
- Removing overlays

Each overlay is identified using a unique name:

`"cataract-overlay"`

This identifier ensures that the correct overlay is managed during activation, updates, and deactivation.


## Activation

The `onActivate` method enables the cataract simulation.

When this method is called, two actions are performed:

1. An overlay is created using the `OverlayManager`
2. The cataract effect is applied to the overlay

The creation step ensures that a visual layer exists in the DOM. The application step applies styling that simulates cataract vision, such as blur filters and reduced clarity.

Separating these responsibilities improves modularity and allows the overlay system to be reused for other visual impairments.


## Deactivation

The `onDeactivate` method disables the cataract simulation.

When invoked, the overlay is removed from the DOM using the `OverlayManager`.

This restores the page to its original visual state immediately. Since the simulation does not modify the DOM content itself, no additional restoration logic is required.


## Updating the Effect

The `onUpdate` method allows the cataract effect to be adjusted dynamically while active.

The method accepts a `value` parameter, which represents configuration data for the effect. This may include:

- The intensity of the blur
- The level of opacity or haze
- The strength of the visual distortion

The method calls `updateCataractEffect` on the `OverlayManager`, passing the overlay name and the new value.

The update is applied without recreating the overlay, allowing for real-time adjustments.

The method is asynchronous to support smoother updates and potential future enhancements such as animated transitions.