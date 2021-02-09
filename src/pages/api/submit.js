import axios from 'axios'
import { omit } from 'lodash'
import { getFormById, getValidationSchema } from '../../lib/forms'
import { getIp } from '../../lib/network'

const DB_URL = `https://script.google.com/macros/s/${process.env.DB_ID}/exec`
export default async (req, res) => {
  if (req.method === 'POST') {
    try {
      const { formId, id, ...payload } = req.body
      const formData = omit(payload, ['undefined', 'null'])
      const userIp = getIp(req)
      const schema = getValidationSchema(getFormById(formId).fields)

      const isValid = await schema.isValid(formData)
      if (!isValid) throw new Error('Invalid data format')

      const dbRes = await axios.post(DB_URL, {
        operation: 'submit',
        formId,
        id,
        userIp,
        ...formData
      })

      if (dbRes.error) throw new Error(dbRes.error)
      if (dbRes.data.error) res.status(404).json(dbRes.data)

      res.status(200).json(dbRes.data)
    } catch (error) {
      res.status(400).json({ message: 'error', error: error && error.message })
    }
  } else {
    res.status(200).json({ message: 'hello there, this is a POST endpoint' })
  }
}
