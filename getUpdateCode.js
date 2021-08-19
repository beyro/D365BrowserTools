

// // Get the D365 XRM object unwrapped
var Xrm = window.wrappedJSObject.Xrm
// // Rewrap the Xrm object so as not to mess with it
XPCNativeWrapper(window.wrappedJSObject.Xrm)  

// Get the entity type and id from the URL
const queryString = window.location.search
const urlParams = new URLSearchParams(queryString)
let entityName = urlParams.get('etn')
let entityId = urlParams.get('id')

let updateCode = "Xrm.WebApi.updateRecord('" + entityName + "', '" + entityId + "', {  }).then(r => console.log(r)).catch(e => console.log(e))"

navigator.clipboard.writeText(updateCode).then(function() {
  /* clipboard successfully set */
  console.log('code copied to clipboard')
}, function(e) {
  /* clipboard write failed */
  console.log('failed to copy code to clipboard', e)
});


