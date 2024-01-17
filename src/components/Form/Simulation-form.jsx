import { useState, useEffect } from "react";
import "../../style/components-style/_simulation-form.scss";

export default function SimulationForm() {
  const [values, setValues] = useState({
    length: "",
    width: "",
    nbrOfFence: "",
    thickness: "",
  });
  const [gap, setGap] = useState("");
  const [calculations, setCalculations] = useState([]);
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const isCalculationDisabled =
    !values.length || !values.width || !values.nbrOfFence;

  const calculateGap = (length, width, nbrOfFence) => {
    const gapValue = (length - width * nbrOfFence) / (nbrOfFence - 1);
    return gapValue.toFixed(2);
  };

  const calculateWoodThickness = (width, gap) => {
    let woodThickness = [0];
    for (let i = 1; i <= 38; i++) {
      woodThickness.push(
        (woodThickness[i - 1] || 0) + parseFloat(width) + parseFloat(gap)
      );
    }
    return woodThickness;
  };

  const addNewValueInCalcul = (e) => {
    e.preventDefault();

    const { length, width, nbrOfFence, thickness } = values;

    if (length && width && nbrOfFence) {
      let definitiveGap = calculateGap(
        parseFloat(length),
        parseFloat(width),
        nbrOfFence
      );
      setGap(definitiveGap);
      const woodThickness = calculateWoodThickness(
        width,
        definitiveGap,
        parseFloat(thickness) || 0
      );
      setCalculations([{ gap: definitiveGap, thickness: woodThickness }]);
      setIsButtonClicked(true);
    } else {
      setCalculations([{thickness}]);
    }
  };

  useEffect(() => {

      const { length, width, nbrOfFence, thickness } = values;
      const definitiveGap = calculateGap(
        parseFloat(length),
        parseFloat(width),
        parseInt(nbrOfFence)
      );
      setGap(definitiveGap);
      if (isButtonClicked) {
      const woodThickness = calculateWoodThickness(
        values.width,
        definitiveGap,
        thickness
      );
      setCalculations([
        { gap: parseFloat(definitiveGap), thickness: woodThickness },
      ]);
    }
  }, [isButtonClicked, values]);

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
            <th>Index</th>
            <th>Epaisseur du bois</th>
          </tr>
        </thead>
        <tbody>
        {calculations[0]?.thickness?.map((thickness, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{thickness.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

