# Whats this?
This is a fork of the original project.

This solution consists of two pages:
* mobile one delivering phone orientation data via web socket
* desktop one displaying 3D scene with an arrow pointing in the same direction as the phone in real time

# How to use
**Step 1:** run `npm serve`
**Step 2:** in a web browser on your **desktop** machine open the address displayed in the console and click on the "Desktop page" link
**Step 3:** in a web browser on your **cell phone** open open the address displayed in the console and click on the "Mobile page" link
**Step 6:** move your phone and watch the arrow move on your desktop

*NOTE:* if you wish to change the source of the `main.js` file also run `npm watch` in a separate console session. Just remember to do a reload in your browser each time something changes


# Findings
Rotation is well explained in the following article: [Orientation and motion data explained
](https://developer.mozilla.org/en-US/docs/Web/Guide/Events/Orientation_and_motion_data_explained)

## Rotational axes
Phone has three rotational axes: **x** and **y** are defined relative to the screen, while **z** is defined relative to the earth's center.

* **x-axes** is parallel with the phone's shorter edge, positive to the right side of the screen
* **y-axes** is parallel with the phone's longer edge, positive at the upper halve of the screen
* **z-axes** is equal to the earth's vertical axes, positive extending away from the earth's center

## Alpha angle
**Alpha** angle describes rotation around the (gravitational) **vertical** axes (z-axes) relative to the earth's north pole
* **min value** = 0 (when top of the phone if pointing in the direction of the north pole)
* **mid value** = PI - (when top of the phone if pointing in the direction of the south pole)
* **max value** = 2 * PI (same as min value)
* the poles are flipped when the the screen is facing down (0=south pole; PI = north pole)

**NOTE:** angle **alpha** does not contain enough information to determin if the screen is facing up or down. This information is contained in the **gamma** angle.

## Beta angle
**Beta** angle describes rotation around **longer edge** (y-axes) of the phone
* when screen is facing UP
* **0** - screen is facing up
* **-PI/2** - screen is vertical with it's left edge being above the right one
* **PI/2** - screen is vertical with it's left edge being above the right one)
* **0** - screen is facing down
* **-PI/2** -screen is vertical with it's right edge being above the left one

**NOTE:** angle **beta** does not contain enough information to determin if the screen is facing up or down. This information is contained in the **gamma** angle.

## Gama angle
**Gamma** angle describes rotation around the **shorter edge** (x-axes)
* **0** - screen is horizontal and is pointing up
* **PI/2** - screen is vertical with it's bottom edge being above the upper one
* **PI** - screen is horizontal and is pointing down
* **-PI** - screen is nearly horizontal with it's upper edge being below the
* **-PI/2** - screen is vertical with it's upper edge being below the bottom one
* **0** - screen is horizontal and is pointing up

**NOTE:** **beta** angle helps us determine if the screen is pointing up or down and helps us:
* screen is **facing UP** if the angle is between **-PI/2** and ***0** or between **0** and **PI/2**
* screen is **facing DOWN** if the angle is between **-PI/2** and **-2*PI*** or between **PI/2** and **2*PI**