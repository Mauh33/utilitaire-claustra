import { useState, useEffect } from "react";
import "../../style/components-style/_simulation-form.scss";

export default function SimulationForm() {
  const [values, setValues] = useState({
    length: "",
    width: "",
    nbrOfFence: "",
  });
  const [gap, setGap] = useState("");
  const [calculations, setCalculations] = useState([]);
  const isCalculationDisabled =
    !values.length || !values.width || !values.nbrOfFence;

  const calculateGap = (length, width, nbrOfFence) => {
    const gapValue = length - (width * nbrOfFence) / (nbrOfFence - 1);
    console.log("calcul de l'écart", gapValue);
    return gapValue.toFixed(2);
  };

  const addNewValueInCalcul = e => {
    e.preventDefault();

    const { length, width, nbrOfFence } = values;

    if (length && width && nbrOfFence) {
      const calculatedGap = calculateGap(length, width, nbrOfFence);
      setGap(calculatedGap);
      setCalculations([...calculations, { gap: calculatedGap }]);
    }
  };

  useEffect(() => {
    const { length, width, nbrOfFence } = values;

    if (length && width && nbrOfFence) {
      const calculatedGap = calculateGap(
        parseFloat(length),
        parseFloat(width),
        parseInt(nbrOfFence)
      );
      setGap(calculatedGap);
    }
  }, [values]);

  return (
    <div className='flex-bloc-column-center-start'>
      <form className='form-simulation-bloc'>
        <label>
          Longueur traverse :
          <input
            type='number'
            min='1'
            pattern='\d*'
            placeholder='longueur en mm'
            value={values.length}
            onChange={e => setValues({ ...values, length: e.target.value })}
            required
          />
        </label>
        <label>
          Largeur des montants :
          <input
            type='number'
            min='1'
            placeholder='10000 mm'
            value={values.width}
            onChange={e => setValues({ ...values, width: e.target.value })}
            required
          />
        </label>
        <label>
          Nombre de montants
          <input
            type='number'
            min='1'
            value={values.nbrOfFence}
            onChange={e => setValues({ ...values, nbrOfFence: e.target.value })}
            required
          />
        </label>
        <label>
          Ecarts entre montants
          <input type='number' readOnly='readOnly' value={gap} />
        </label>
        <div className='btn-bloc'>
          <button
            type='submit'
            onClick={addNewValueInCalcul}
            disabled={isCalculationDisabled}
          >
            calculez
          </button>
        </div>
      </form>
      <table className='table-result'>
        <thead>
          <tr>
            <th>Epaisseur du bois à droite</th>
          </tr>
        </thead>
        <tbody>
          {calculations.map((calculation, index) => (
            <tr key={index}>
              <th>{index + 1}</th>
              <td>{calculation.gap}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
