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

**Alpha** angle describes rotation around the **vertical** axes.
* **min value** = 0
* **max value** = 2 * PI
* the value gets rotated by PI whenever gamma switches from positive to negative

**Beta** angle describes rotation around the **horizontal Z** axes (parallel with the longer side of the screen)
* **min value** = - PI/2
* **max value** = PI

**Gamma** angle describes rotation around the **horizontal X** axes (parallel with the shorter side of the screen)
* **min value** = -PI/2 (screen is vertical)
* **max value** = PI/2 (screen is vertical)
* while rotating the screen (in the same direction) here's how the angle changes:
    * facing down = angle = 0
    * value is reaching PI/2 as the screen becomes vertical
    * at the vertical point value jumps from PI/2 to -PI/2
    * as the screen is rotated up the value reaches 0
    * as the rotation continues and the screen becomes vertical again the value again reaches PI/2
    * at the vertical point value again jumps from PI/2 to -PI/2
