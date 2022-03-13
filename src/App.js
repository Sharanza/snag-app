import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import Header from './components/Header/Header'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import developmentOptions from "./constants/developmentOptions";
import inspectedByOptions from "./constants/inspectedByOptions";
import localisationOptions from "./constants/localisationOptions";
import locationAspects from "./constants/locationAspects";
import aspects from "./constants/aspects";

export default function App() {
  const { register, handleSubmit, formState: { errors } } = useForm()
  const [result, setResult] = useState('')
  const [dateValue, handleDateSelect, handleDateChange] = useState();
  const [localisation, setLocalisation] = useState('');
  const [aspect, setAspect] = useState('');
  const onSubmit = (data) => {
    data.inspectionDate = dateValue; // doesn't output as dd/MM/yyyy format like selected
    
    setResult(JSON.stringify(data)) // outputs all form data with an added prop:val pairing of {inspectionDate: dateValue}
  };

  // Refreshes the page when reset button is clicked
  function refreshPage() {
    window.location.reload(false);
  }

  useEffect(() => {
    console.log(localisation);
    console.log(aspect);
  })

  /* Type and snags variables to store different array for different dropdown */
  let type = null;

  let snags = null;
  
  /* these variables will be used to create a set of options that user will see after the onchange event has been invoked */
  let aspectOptions = null;

  let snagOptions = null;

  /* Setting Type variable according to dropdown */
  if (localisation === "hallway") {
    type = locationAspects.hallway;
  } else if (localisation === "bathrooms") {
    type = locationAspects.bathRooms;
  } else if (localisation === "kitchen") {
    type = locationAspects.kitchen;
  } else if (localisation === "bedrooms") {
    type = locationAspects.bedRooms;
  } else if (localisation === "garage") {
    type = locationAspects.garage;
  } else if (localisation === "livingroom") {
    type = locationAspects.livingRoom;
  } else if (localisation === "wc") {
    type = locationAspects.wc;
  } else if (localisation === "external") {
    type = locationAspects.external;
  } else if (localisation === "stairs") {
    type = locationAspects.stairs;
  }

  console.log(type);
  
  /* Setting snags variable according to dropdown */
  if (aspect === "Internal Doors") {
    snags = aspects.internalDoors;
  } else if (aspect === "External Doors") {
    snags = aspects.externalDoors;
  } else if (aspect === "Glazing") {
    snags = aspects.glazing;
  } else if (aspect === "Internal Walls") {
    snags = aspects.internalWalls;
  } else if (aspect === "Floors and stairs") {
    snags = aspects.floorsAndStairs;
  } else if (aspect === "Electrics") {
    snags = aspects.electrics;
  } else if (aspect === "Plumbing") {
    snags = aspects.plumbing;
  } else if (aspect === "Worktops and units") {
    snags = aspects.worktopsAndUnits;
  } else if (aspect === "Appliances") {
    snags = aspects.appliances;
  } else if (aspect === "Heating system") {
    snags = aspects.heatingSystem;
  }

  console.log(snags);

  /* If "Type" is null or undefined then options will be null,
   * otherwise it will create a options iterable based on the above arrays */
  if (type) {
    aspectOptions = type.map((el) => <option key={el.value}>{el.label}</option>);
  }

  if (snags) {
    snagOptions = snags.map((el) => <option key={el.value}>{el.label}</option>);
  }

    return (
        /* "handleSubmit" validates the inputs before invoking "onSubmit" */
        <form onSubmit={handleSubmit(onSubmit)}>
            <Header />
            <select {...register('developmentSite', {required: true})}>
                {developmentOptions.map((development) => (
                    <option
                        value={development.value}
                        disabled={development.disabled}
                    >
                        {development.label}
                    </option>
                ))}
            </select>
            {/* error handling for developmentSite form field */}
            {errors.developmentSite && <span>This field is required *</span>}

            {/* register the input or select into the hook by invoking the "register" function */}
            <input type="number" placeholder="Plot number..." {...register('plotNumber', {required: true, max: 1000, min: 1})} />
            {errors.plotNumber && <span>This field is required *</span>}
            
            <select {...register('inspectedBy', {required: true})}>
                {inspectedByOptions.map((inspected) => (
                    <option
                        value={inspected.value}
                        disabled={inspected.disabled}
                    >
                        {inspected.label}
                    </option>
                ))}
            </select>
            {errors.inspectedBy && <span>This field is required *</span>}
            
            <DatePicker
              placeholderText="Date of inspection..." // sets placeholder text for the field
              selected={dateValue}
              onSelect={handleDateSelect} //when day is clicked
              onChange={handleDateChange} //only when value has changed
              dateFormat="dd/MM/yyyy" // formats the date to UK date format rather than US
            />
            {console.log(dateValue)}
            
            <select {...register('localisation', {required: true})} onChange={(e) => { console.log(e); setLocalisation(e.target.value)}}>
                {localisationOptions.map((el) => (
                    <option
                        value={el.value}
                        disabled={el.disabled}               
                    >
                        {el.label}
                    </option>
                ))}
            </select>
            {errors.localisation && <span>This field is required *</span>}

            <select {...register('aspect', {required: true})} onChange={(e) => { console.log(e); setAspect(e.target.value)}}>
            <option disabled selected value> Aspects... </option>
            {
              /* This is where i've used the aspectOptions variable */
              aspectOptions
            }
            </select>
            {errors.aspect && <span>This field is required *</span>}

            <select {...register('snag', {required: true})} multiple>
            <option disabled select value> Hold down the Ctrl (windows) or Command (Mac) button to select multiple snag options... </option>
            {
              /* This is where i've used the snagOptions variable */
              snagOptions
            }
            </select>
            {errors.snag && <span>This field is required *</span>}          

            <p>{result}</p>
            <input type="submit" /> <input type="reset" onClick={refreshPage} />
        </form>
    )
}
