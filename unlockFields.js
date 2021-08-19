var D365ToolsUnlockFields = new function () {
  this.unlockFields = function () {
    console.log('Unlocking fields...')
    
    // Get the D365 XRM object unwrapped
    var UI = window.wrappedJSObject.Xrm.Page.ui
    var controls = UI.controls.getAll()
    
    for (let i=0; i<controls.length; i++) {
      if (typeof controls[i].setDisabled !== 'undefined') {
        controls[i].setDisabled(false)
      }
    }
    // Rewrap the Xrm object so as not to mess with it
    XPCNativeWrapper(window.wrappedJSObject.Xrm.Page.ui)
  }
}

D365ToolsUnlockFields.unlockFields()