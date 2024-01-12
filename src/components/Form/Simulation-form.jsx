import '../../style/components-style/_simulation-form.scss'

export default function SimulationForm() {
  return (
    <form className="form-simulation-bloc">
      <label>
        Longueur totale traverse :
        <input type='number' />
      </label>
      <label>
        Largeur des montants :
        <input type='number' />
      </label>
      <label >
        Nombre de montants
        <input type='number' />
      </label>
      <label>
      Ecarts entre montants
        <input type='number' />
      </label>
    </form>
  );
}
