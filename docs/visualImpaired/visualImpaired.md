# Technical Documentation: Visual Impaired Simulation

## Visual Impaired Simulation

Visual impairment is a broad term that refers to reduced vision that cannot be fully corrected. This may include blurred vision, reduced sharpness, or difficulty focusing on details.

The application simulates this condition by applying a visual overlay that reduces clarity across the screen. Instead of modifying the underlying content, the simulation changes how the content is visually perceived.

The implementation can be found in:  
`src/models/visualImpaired/VisualImpairedSimulation.ts`

The `VisualImpairedSimulation` class implements the `IDisabilitySimulation` interface. This ensures consistency with other simulation features in the system. The class defines three lifecycle methods:

- `onActivate`
- `onDeactivate`
- `onUpdate`


## Overlay-Based Approach

The visual impairment simulation uses an overlay-based rendering strategy. This means that no changes are made to the DOM content itself.

An overlay is a visual layer placed on top of the webpage. It is used to simulate effects such as:

- Reduced sharpness
- Blurred vision
- Lower contrast or clarity

All overlay-related operations are handled by the `OverlayManager`. This component is responsible for:

- Creating overlays
- Applying visual effects
- Updating effects dynamically
- Removing overlays

Each overlay is identified using a unique name:

`"visual-impaired"`

This identifier ensures that the correct overlay is managed during activation, updates, and deactivation.


## Activation

The `onActivate` method enables the visual impairment simulation.

When this method is called, two actions are performed:

1. An overlay is created using the `OverlayManager`
2. The visual impairment effect is applied to the overlay

The creation step ensures that a visual layer exists in the DOM. The application step applies styling that simulates reduced vision quality, such as blur filters or reduced contrast.

Separating these responsibilities improves modularity and allows the overlay system to be reused for other visual simulations.


## Deactivation

The `onDeactivate` method disables the visual impairment simulation.

When invoked, the overlay is removed from the DOM using the `OverlayManager`.

This restores the page to its original visual state immediately. Since the simulation does not modify the DOM content, no additional restoration logic is required.


## Updating the Effect

The `onUpdate` method allows the visual impairment effect to be adjusted dynamically while active.

The method accepts a `value` parameter, which represents configuration data for the effect. This may include:

- The intensity of the blur
- The level of contrast reduction
- The strength of the visual distortion

The method calls `updateVisualImparedEffect` on the `OverlayManager`, passing the overlay name and the new value.

The update is applied without recreating the overlay, allowing changes to be reflected in real time.

The method is asynchronous to support smoother updates and potential future enhancements such as animations or user-driven adjustments.


## Design Considerations

The visual impairment simulation follows a non-destructive and modular design:

- The DOM content remains unchanged
- All visual effects are applied through an overlay
- Activation and deactivation are lightweight operations

By delegating all visual logic to the `OverlayManager`, the simulation class remains focused on controlling the lifecycle of the feature. This separation of concerns improves maintainability and allows the overlay system to be reused across multiple visual impairment simulations.

The consistent use of the `IDisabilitySimulation` interface ensures that this feature integrates seamlessly with other simulations in the application.