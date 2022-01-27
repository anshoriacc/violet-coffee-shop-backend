const response = (res, result) => {
  const { status, error, data, message, offset, limit, total_data, total_page, next_link, perv_link } = result
  const resultPrint = {}
  resultPrint.status = message || 'success'
  resultPrint.statusCode = status
  resultPrint.data = data || null
  resultPrint.error = error || null
  resultPrint.offset = offset
  resultPrint.limit = limit
  resultPrint.total_data = total_data
  resultPrint.total_page = total_page
  resultPrint.perv_link = perv_link || null
  resultPrint.next_link = next_link || null
  res.status(status).json(resultPrint)
}

const success = (res, status, data) => {
  res.status(status).json({ result: data })
}
const error = (res, status, data) => {
  const dataError = new Error(data)
  res.status(status).json({ err: dataError.message })
}

module.exports = {
  response,
  success,
  error
}