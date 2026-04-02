# Parkinson technical documentation

A Parkinson's tremor can be simulated as a rhythmic shaking or trembling of the cursor. 
As a security measure, browsers don't give JavaScript permission to change the position of the real cursor. 
We couldn't manipulate the movements of the cursor on a webpage. 
This is why we chose to make the real cursor invisible and create a fake cursor. 
The fake cursor does a tremor animation to create a similar effect.

The real cursor is made invisible with “cursor: none”. 
The fake cursor is drawn by creating a div element in a fakeCursor variable, which contains css styling. 

To create the tremor, the X and Y position of the real cursor needs to be determined. 
The cursor starts at position (0,0) and the position updates once the cursor moves. 
By moving the cursor, the positions are tracked and the new coordinates are stored in mouseX and mouseY. 
The animation of the fake cursor takes place from the current stored position.  

At first, we tried to animate the tremor with Math.random() so the cursor moves to random points, but the movement was a bit too rigid. 
To make the tremor animation more fluent and rhythmic, a sine wave is used with Math.sin(), instead of Math.random(). 
The tremor variables like frequency and X/Y amplitudes are declared. 
This way you can control the speed, height, and width of the tremor. 
The speed is set at 4 Hz, because an avarage rest tremor varies from 4-6 Hz. 
The amplitudes are based on estimation, because every tremor is different for every person with Parkinson's. 
In general, the horizontal movement should be larger than the vertical movement. 
The Y tremor has a small phase shift by +1, so X and Y move a little asynchronous, which creates a more natural effect. 

For the requestAnimationFrame a timestamp is given to automatically give the current time to calculate the sine formula. 
RequestAnimationFrame(animate) is called twice. 
Underneath the function requestAnimationFrame initializes the animation and the second within the function is to repeat the animation, because the tremor needs to continue.

One problem was that the real cursor became visible, once it hovered over a link, button, span, or input area. 
The goal was to keep the real cursor invisible anywhere on the webpage. 
This problem was solved by making an async function cursorToNone that iterates the whole page and applies a style change per element and makes the cursor invisible. 
It was not possible to change the style of all elements at the same time. 
Because of this we used await this.curserToNone so the webpage iterates for each element and waits for the next.  
