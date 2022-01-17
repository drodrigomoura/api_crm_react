import { Formik, Form, Field } from 'formik'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import Alerta from './Alerta'
import Spinner from './Spinner'

const Formulario = ({ cliente = {}, cargando = false }) => {

  const navigate = useNavigate()

  const nuevoClienteSchema = Yup.object().shape({
    nombre: Yup.string()
      .min(3, 'El nombre es muy corto')
      .required('El nombre del cliente es obligatorio'),
    empresa: Yup.string()
      .required('El nombre de la empresa es obligatorio'),
    email: Yup.string()
      .email('Email no válido')
      .required('El email es obligatorio'),
    telefono: Yup.string()
      .typeError('Teléfono no válido'),
    notas: '',
  })

  const handleSubmit = async (values) => {
    try {
      let respuesta;
      if (cliente?.id) {
        const url = `http://localhost:4000/clientes/${cliente.id}`

        respuesta = await fetch(url, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(values),
        })
      } else {
        const url = "http://localhost:4000/clientes"

        respuesta = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(values),
        })
      }

      const resultado = await respuesta.json()
      console.log(resultado);
      navigate('/clientes')
    } catch (error) {
      console.log(error);
    }
  }

  return (
    cargando ? <Spinner /> : (
      <div className="bg-white mt-10 px-5 py-10 rounded-md shadow-md md:w-3/4 mx-auto">
        <h1 className="text-gray-600 font-bold text-xl uppercase text-center">{cliente?.nombre ? 'Editar Cliente' : 'Agregar Cliente'}</h1>

        <Formik
          initialValues={{
            nombre: cliente?.nombre ?? '',
            empresa: cliente.empresa ?? '',
            email: cliente?.email ?? '',
            telefono: cliente?.telefono ?? '',
            notas: cliente?.notas ?? '',
          }}
          enableReinitialize={true}
          onSubmit={async (values, { resetForm }) => {
            await handleSubmit(values);
            resetForm();
          }}
          validationSchema={nuevoClienteSchema}
        >
          {
            ({ errors, touched }) => {

              return (
                <Form
                  className="mt-10"
                >
                  {/* Nombre */}
                  <div
                    className="mb-4"
                  >
                    <label
                      className="text-gray-800"
                      htmlFor="nombre"
                    >
                      Nombre</label>
                    <Field
                      id="nombre"
                      name="nombre"
                      type="text"
                      className="mt-2 block w-full p-3 bg-gray-50"
                      placeholder="Nombre del cliente"
                    />
                    {errors.nombre && touched.nombre && (
                      <Alerta>
                        {errors.nombre}
                      </Alerta>
                    )}
                  </div>

                  {/* Empresa */}
                  <div
                    className="mb-4"
                  >
                    <label
                      className="text-gray-800"
                      htmlFor="empresa"
                    >
                      Empresa</label>
                    <Field
                      id="empresa"
                      name="empresa"
                      type="text"
                      className="mt-2 block w-full p-3 bg-gray-50"
                      placeholder="Nombre de la empresa"
                    />
                    {errors.empresa && touched.empresa && (
                      <Alerta>
                        {errors.empresa}
                      </Alerta>
                    )}
                  </div>

                  {/* Email */}
                  <div
                    className="mb-4"
                  >
                    <label
                      className="text-gray-800"
                      htmlFor="email"
                    >
                      E-mail</label>
                    <Field
                      id="email"
                      name="email"
                      type="email"
                      className="mt-2 block w-full p-3 bg-gray-50"
                      placeholder="E-mail del cliente"
                    />
                    {errors.email && touched.email && (
                      <Alerta>
                        {errors.email}
                      </Alerta>
                    )}
                  </div>

                  {/* Telefono */}
                  <div
                    className="mb-4"
                  >
                    <label
                      className="text-gray-800"
                      htmlFor="telefono"
                    >
                      Teléfono</label>
                    <Field
                      id="telefono"
                      name="telefono"
                      type="tel"
                      className="mt-2 block w-full p-3 bg-gray-50"
                      placeholder="Teléfono del cliente"
                    />
                    {errors.telefono && touched.telefono && (
                      <Alerta>
                        {errors.telefono}
                      </Alerta>
                    )}
                  </div>

                  <div
                    className="mb-4"
                  >
                    <label
                      className="text-gray-800"
                      htmlFor="notas"
                    >
                      Notas</label>
                    <Field
                      id="notas"
                      name="notas"
                      type="text"
                      as="textarea"
                      className="mt-2 block w-full p-3 bg-gray-50 h-40"
                      placeholder="Notas del cliente"
                    />
                  </div>

                  <button
                    type="submit"
                    className="mt-5 w-full bg-blue-800 p-3 text-white uppercase font-bold text-lg"
                  >
                    {cliente?.nombre ? 'Actualizar Cliente' : 'Guardar Cliente'}
                  </button>
                </Form>
              )
            }
          }
        </Formik>
      </div>
    )
  )
}

export default Formulario
