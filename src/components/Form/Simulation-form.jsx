import { useEffect, useReducer } from "react";
import "../../style/components-style/_simulation-form.scss";

const formReducer = (state, action) => {
  switch (action.type) {
    case 'SET_VALUES':
      return {...state, values: action.payload};
    case 'SET_GAP':
      return {...state, gap: action.payload}
    case 'SET_CALCULATIONS' :
      return {...state, calculations: action.payload}
    default:
      return state;
  }
};

export default function SimulationForm() {

  const [state, dispatch] = useReducer(formReducer, {
    values: {
      length: "",
      width: "",
      nbrOfFence: "",
      thickness: ""
    },
    gap: "",
    calculations: [],
  });

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

  const addNewValueInCalcul = () => {

    const { length, width, nbrOfFence, thickness } = state.values;
    const definitiveGap = calculateGap(
      parseFloat(length),
      parseFloat(width),
      parseInt(nbrOfFence)
    );

    dispatch({type: 'SET_GAP', payload: definitiveGap})

    const woodThickness = calculateWoodThickness(
      state.values.width,
      definitiveGap,
      thickness
    );

    dispatch({type: 'SET_CALCULATIONS', payload: [{ gap: parseFloat(definitiveGap), thickness: woodThickness}]});

  };

  useEffect(() => {
    if (state.values.length && state.values.width && state.values.nbrOfFence ) {
      addNewValueInCalcul();
    }
  }, [state.values]);

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
            value={state.values.length}
            onChange={e => dispatch({ type: 'SET_VALUES', payload: { ...state.values, length: e.target.value}})}
            required
          />
        </label>
        <label>
          Largeur des montants :
          <input
            type='number'
            min='1'
            placeholder='10000 mm'
            value={state.values.width}
            onChange={e => dispatch({ type: 'SET_VALUES', payload: { ...state.values, width: e.target.value}})}
            required
          />
        </label>
        <label>
          Nombre de montants
          <input
            type='number'
            min='1'
            value={state.values.nbrOfFence}
            onChange={e => dispatch({ type: 'SET_VALUES', payload: { ...state.values, nbrOfFence: e.target.value}})}
            required
          />
        </label>
        <label>
          Ecarts entre montants
          <input type='number' readOnly='readOnly' value={state.gap} />
        </label>
        <div className='btn-bloc'>
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
        {state.calculations.length ? state.calculations[0]?.thickness?.map((thickness, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{thickness.toFixed(2)}</td>
            </tr>
          )) : null}
        </tbody>
      </table>
    </div>
  );
}

