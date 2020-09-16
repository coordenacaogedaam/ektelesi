/**
 * @OnlyCurrentDoc
 */
const SHEET_NAME = 'Form'
const SCRIPT_PROP = PropertiesService.getScriptProperties()

function mapRow(header, indexedData) {
  return header.map(h => {
    if (h === 'timestamp') return new Date()
    return JSON.stringify(indexedData[h])
  })
}

function setHeader(header, sheet) {
  const range = sheet.getRange(1, 1, 1, header.length)
  range.setValues([header])
}

function getHeader(sheet) {
  const dataRange = sheet.getDataRange()
  const [header] = dataRange.getValues()
  return header
}

function postWithSheet(event, sheet) {
  const { postData } = event
  if (!postData.type.includes('json')) throw new Error('Invalid data type')
  if (postData.length <= 0) throw new Error('Empty payload')
  const payload = JSON.parse(postData.contents)

  const header = getHeader(sheet)
  const newHeader = [...header, ...Object.keys(payload).filter(k => !header.includes(k))]
  setHeader(newHeader, sheet)
  const newRow = mapRow(newHeader, payload)
  sheet.appendRow(newRow)

  return {}
}

function handleResponse(event, withSheetCb) {
  const lock = LockService.getScriptLock()

  try {
    lock.waitLock(20000)
    const doc = SpreadsheetApp.getActiveSpreadsheet() // openById(SCRIPT_PROP.getProperty('key'));
    const sheet = doc.getSheetByName(SHEET_NAME)

    const res = withSheetCb(event, sheet)

    return ContentService.createTextOutput(
      JSON.stringify({ message: 'success', ...res })
    ).setMimeType(ContentService.MimeType.JSON)
  } catch (err) {
    return ContentService.createTextOutput(
      JSON.stringify({ message: 'error', error: err.message, auth: false })
    ).setMimeType(ContentService.MimeType.JSON)
  } finally {
    lock.releaseLock()
  }
}

function doPost(e) {
  return handleResponse(e, postWithSheet)
}

// function doGet(e) {
//  return handleResponse(e, (event, sheet) => {
//    const dataRange = sheet.getDataRange().getValues()
//    const [headers] = dataRange
//
//    const { parameters } = event
//    if (!Object.keys(parameters).includes('ip')) throw new Error('Invalid request')
//
//    const ipCol = headers.indexOf('ip')
//    const ips = dataRange.map(row => row[ipCol].toString())
//    const isIpOnList = ips.includes(parameters.ip.toString())
//
//    return { message: 'success', auth: !isIpOnList }
//  })
// }
