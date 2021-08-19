var D365ToolsRetrieveRecord = new function () {
  this.addModalStyles = function () {
    let css = '.micro-modal {' +
      'display: none;' +
    '}' +
    '.micro-modal.is-open {' +
      'display: block;' +
      'z-index: 100000;' +
      'background: white;' +
      'position: absolute;' +
      'top: 100px;' +
      'width: 100%;' +
      'padding:50px;' +
    '}'
    let styleEl = document.createElement('style')
    styleEl.appendChild(document.createTextNode(css))
    document.head.appendChild(styleEl)
  }
  this.clearContents = function(el) {
    while(el.firstChild){
      el.removeChild(el.firstChild);
    }
  }
  this.retrieveRecord = function () {
    console.log('Retrieving record details...')
    
    // Get the D365 XRM object unwrapped
    var Xrm = window.wrappedJSObject.Xrm
    // Rewrap the Xrm object so as not to mess with it
    XPCNativeWrapper(window.wrappedJSObject.Xrm)

    Xrm.Utility.showProgressIndicator()

    // Get the entity type and id from the URL (to avoid using deprecated Xrm.Page)
    // let currentUrl = window.location.href
    // let urlParts = currentUrl.split('&')
    // let etnLocation = findInArray(urlParts, 'etn=')
    // let idLocation = findInArray(urlParts, 'id=')
    // let etn = urlParts[etnLocation].replace('etn=', '')
    // let id = urlParts[idLocation].replace('id=', '')
    // console.log('etn='+etn+' id='+id)

    // Get the entity type and id from the URL
    const queryString = window.location.search
    const urlParams = new URLSearchParams(queryString)
    let etn = urlParams.get('etn')
    let id = urlParams.get('id')

    let globalContext = Xrm.Utility.getGlobalContext()

    // Add a div to the document for our modal if not already created
    if (document.getElementById('entityResultModal') == null) {
      var modalElement = document.createElement('div')
      modalElement.setAttribute('id', 'entityResultModal')
      modalElement.setAttribute('class', 'micro-modal')
      modalElement.setAttribute('aria-hidden', true)
      modalElement.innerHTML = 
      '<div tabindex="-1" data-micromodal-close>' +
        '<div role="dialog" aria-modal="true" aria-labelledby="entityResultModal-title" >' +
          '<header>' +
            '<h2 id="entityResultModal-title"></h2>' +
            '<button aria-label="Close" data-micromodal-close style="padding:10px">Close</button>' +
            '<br />' +
            '<a href="#" target="_blank" id="openURLInTab">Open in tab</a>' +
          '</header>' +
          '<div id="entityResultModal-content"></div>' +
        '</div>' + 
      '</div>'
      document.body.appendChild(modalElement)
      this.addModalStyles()
      MicroModal.init()
    }
    
    

    // Create the HTTP Request with no filters (get everything!)
    var req = new XMLHttpRequest();
    // Pluralize the entity name because someone at MS made a bad decision to use plurals in the endpoints... sigh
    let pluralEtn = getPluralEntityName(etn)
    

    req.open("GET", globalContext.getClientUrl() + '/api/data/v9.0/' + pluralEtn + '(' + id + ')', true)
    req.setRequestHeader("OData-MaxVersion", "4.0")
    req.setRequestHeader("OData-Version", "4.0")
    req.setRequestHeader("Accept", "application/json")
    req.setRequestHeader("Content-Type", "application/json; charset=utf-8")
    req.setRequestHeader("Prefer", "odata.include-annotations=\"*\"")

    // Handle the result
    req.onreadystatechange = function() {
      if (this.readyState === 4) {
        req.onreadystatechange = null
        if (this.status === 200) {
          let result = JSON.parse(this.response)
          console.log('result', result)
          Xrm.Utility.closeProgressIndicator()
          let modalTitle = document.getElementById('entityResultModal-title')
          modalTitle.innerHTML = '' // clear past contents
          modalTitle.appendChild(document.createTextNode(etn + ' ' + id))
          let modalContent = document.getElementById('entityResultModal-content')
          modalContent.innerHTML = '' //clear past contents
          let innerContent = document.createElement('pre')
          let innerContentText = document.createTextNode(JSON.stringify(result, undefined, 2))
          innerContent.appendChild(innerContentText)
          modalContent.appendChild(innerContent)
          let openInTabLink = document.getElementById('openURLInTab')
          openInTabLink.setAttribute('href', req.responseURL)
          MicroModal.show('entityResultModal')
          //alert(JSON.stringify(result))
        } else {
          alert(this.statusText)
        }
      }
    }

    console.log('req', req)

    req.send()


    function findInArray(a, stringToFind) {
      let stringFound = false
      a.forEach((el, i) => {
        if(el.indexOf(stringToFind) !== -1) {
          stringFound = i
        }
      })
      return stringFound
    }
  }

  function getPluralEntityName (etn) {
    let pluralName = ''
    let lastChar = etn[etn.length - 1]
    let lastTwoChars = etn.substring(etn.length - 2)
    let secondLastChar = etn.substring(etn.length - 2, 1)
    let endingsThatTakeEs = ['s', 'ss', 'sh', 'ch', 'x', 'z']
    let vowels = ['a', 'e', 'i', 'o', 'u']
    
    if (endingsThatTakeEs.indexOf(lastChar) !== -1 || endingsThatTakeEs.indexOf(lastTwoChars) !== -1) {
      pluralName = etn + 'es'
    } else if (lastChar === 'y' && vowels.indexOf(secondLastChar) === -1) {
      // If ends in consonant plus 'y', remove 'y' and add 'ies'
      pluralName = etn.substring(0, etn.length -1) + 'ies'
    } else {
      pluralName = etn + 's'
    }
  
    return pluralName
  }
}


//D365ToolsRetrieveRecord.addModalStyles()
D365ToolsRetrieveRecord.retrieveRecord()