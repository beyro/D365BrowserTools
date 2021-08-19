var D365ToolsShowControls = new function () {
    this.showControls = function () {
      console.log('Showing all controls...')
      
      // Get the D365 XRM object unwrapped
      var UI = window.wrappedJSObject.Xrm.Page.ui
      var controls = UI.controls.getAll()
      var tabs = UI.tabs.getAll()

      // First show all tabs and all sections
      for (let i=0; i<tabs.length; i++) {
        tabs[i].setVisible(true)
        
        let sections = tabs[i].sections.getAll()
        for (let si=0; si<sections.length; si++) {
          sections[si].setVisible(true)
        }
      }

      // Finally, show all controls
      for (let i=0; i<controls.length; i++) {
        if (typeof controls[i].setVisible !== 'undefined') {
          controls[i].setVisible(true)
        }
      }

      // // Rewrap the Xrm object so as not to mess with it
      XPCNativeWrapper(window.wrappedJSObject.Xrm.Page.ui)
    }
  }
  
  D365ToolsShowControls.showControls()