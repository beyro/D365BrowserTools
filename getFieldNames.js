console.log('Getting field names...')
var fieldLables = document.querySelectorAll('label[id*="field-label"')
//console.log(fieldLables)
fieldLables.forEach( function (l) {
  // name = string in between the  third last dash (-) and second last dash from element id
  let idPieces = l.id.split('-')
  let fieldName = idPieces[idPieces.length - 3]
  let newEl = document.createElement('span')
  let newContent = document.createTextNode(' [' + fieldName + ']')
  newEl.className = 'D365-control-name'
  newEl.appendChild(newContent)
  l.appendChild(newEl)
  l.title = ' [' + fieldName + ']'
})

    
