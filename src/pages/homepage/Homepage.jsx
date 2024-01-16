import "../../style/pages/_homepage.scss";
import SimulationForm from "../../components/Form/Simulation-form";

export default function Homepage({ title }) {
  return (
    <section className='simulation-form-section'>
      <h1>{title}</h1>
      <SimulationForm></SimulationForm>
    </section>
  );
}
