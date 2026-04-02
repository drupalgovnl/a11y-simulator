# Technical Documentation: Glaucoma Simulation

## Glaucoma Simulation

Glaucoma is a visual impairment that affects peripheral vision. People with glaucoma often experience a narrowing of their visual field, commonly described as “tunnel vision”.

This simulation replicates that effect by applying a visual overlay on top of the webpage. Instead of modifying the content itself, the feature changes how the content is visually perceived.

The implementation can be found in:  
`src/models/glaucoma/GlaucomaSimulation.ts`

The `GlaucomaSimulation` class implements the `IDisabilitySimulation` interface. This ensures consistency with other simulation features in the application. The class defines three main lifecycle methods:

- `onActivate`
- `onDeactivate`
- `onUpdate`

## Overlay-Based Approach

Unlike text-based simulations (such as dyslexia features), the glaucoma simulation does not modify the DOM content. Instead, it uses an overlay.

An overlay is a visual layer placed on top of the webpage. This layer can apply effects such as darkening, blurring, or masking parts of the screen.

The simulation relies on the `OverlayManager` to handle all overlay-related operations. This includes:

- Creating overlays
- Applying visual effects
- Updating effects dynamically
- Removing overlays

Each overlay is identified using a unique name:

`"glaucoma-overlay"`

This name is used to ensure the correct overlay is managed throughout its lifecycle.

## Activation

The `onActivate` method is responsible for enabling the glaucoma simulation.

When this method is called, two actions are performed:

1. An overlay is created using the `OverlayManager`
2. The glaucoma effect is applied to that overlay

The creation step ensures that a visual layer exists in the DOM. The application step applies the actual styling that simulates vision loss, such as reduced visibility at the edges of the screen.

By separating these steps, the system remains flexible and reusable for other visual simulations.


## Deactivation

The `onDeactivate` method disables the glaucoma simulation.

When this method is called, the overlay is removed from the DOM using the `OverlayManager`.

This immediately restores the original visual state of the page. Since the simulation does not alter the underlying content, no additional restoration logic is required.


## Updating the Effect

The `onUpdate` method allows the glaucoma effect to be adjusted dynamically while it is active.

This method accepts a `value` parameter, which represents a configuration for the effect. This could include:

- The intensity of the visual impairment
- The size of the visible area
- The strength of the blur or darkening

The method calls `updateGlaucomaEffect` on the `OverlayManager`, passing along the overlay name and the new value.

The update is performed without recreating the overlay, allowing changes to be applied in real time.

The method is asynchronous to support smoother updates and potential future extensions such as animations or external configuration sources.


## Design Considerations

The glaucoma simulation follows a non-destructive design approach:

- The original DOM remains unchanged
- All effects are applied visually through an overlay
- The feature can be enabled and disabled without side effects
- The ranodmize functions will create the glaucoma in a different spot, different shape to create an experiance because its never the same.

Additionally, the use of the `IDisabilitySimulation` interface ensures that this simulation integrates seamlessly with other features in the system. This makes it easy to combine multiple simulations and maintain a consistent structure across the application.