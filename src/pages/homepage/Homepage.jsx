import { useForm } from "react-hook-form"
import '../../style/pages/_homepage.scss'
import SimulationForm from '../../components/Form/Simulation-form'

export default function Homepage({title}) {
  const {register} = useForm();
  return (
      <section className="simulation-form-section">
        <h1>{title}</h1>
        <SimulationForm></SimulationForm>
      </section>
  )
}
