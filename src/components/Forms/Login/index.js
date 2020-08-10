import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import { TextInput } from '../Fields'

export default function LoginForm({ colorMode, onSubmit }) {
  return (
    <Formik
      initialValues={{
        email: '',
        register: null
      }}
      validationSchema={Yup.object({
        email: Yup.string().email('Endereço de e-mail inválido').required('Exigido'),
        register: Yup.number().integer('Deve ser inteiro').required('Exigido')
      })}
      onSubmit={onSubmit}
    >
      <Form>
        <TextInput
          label="Endereço de e-mail"
          name="email"
          type="email"
          placeholder="maria@gedaam.org"
        />
        <TextInput
          label="Registro Acadêmico"
          name="register"
          type="number"
          placeholder="2020000000"
        />
        <div className="text-center mt-6">
          <button
            className={`${
              colorMode === 'dark' ? 'bg-darker text-light' : 'bg-dark text-lighter'
            } active:opacity-75 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1`}
            type="submit"
          >
            Entrar
          </button>
        </div>
      </Form>
    </Formik>
  )
}
