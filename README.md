# D365BrowserTools
Firefox browser extension with tools for Dynamics 365 functional analysts and developers.

## Installation
Download the .xpi file from releases using Firefox and it should automatically prompt you to install it. 
If it doesn't, then download the .xpi file, open Firefox, go to about:addons (ctrl+shift+a), click the gear icon and select "Install Add-on From File".

## Usage
Right-click anywhere on the page to open the context menu and select an option from the "D365 Tools" section.
The tools available are:
* **Show Control Names**: Adds the control name beside all visible controls on a model-driven app form.
* **Hide Control Names**: Inverse of the above.
* **Retrieve Current Record**: Retrieves all columns for the current record on a model-driven app form and displays the data in a model.
* **Unlock All Fields**: Unlocks all locked controls on a model-driven app form. This is deprecated because it uses Xrm.Page.
* **Show All Controls**: Shows all hidden controls on a model-driven app form. This is deprecated because it uses Xrm.Page.
* **Get Update Code**: This copies a snippet of JavaScript to your clipboard. The JavaScript can be pasted into the console to update the current record on a model-driven form. You just need to set the columns and values that you want to update inside the empty object {}.
