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