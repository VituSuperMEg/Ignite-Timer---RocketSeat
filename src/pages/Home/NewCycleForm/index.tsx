import { FormContainer, TaskInput, MinutesAmountInput  } from "./styles";
import { useFormContext } from "react-hook-form";
import { CycleContext }  from "../../../contexts/CyclesContext";
import { useContext } from "react";

export function NewCycleForm(){
  
  const { register } = useFormContext();
  const { activeCycle } = useContext(CycleContext);
  
  return (
    <FormContainer>
      <label htmlFor="task">Vou trabalhar em</label>
    <TaskInput
      id="task" 
      placeholder="Dê um nome para o seu projeto"
      list="task-suggestions"
      disabled={!!activeCycle}
      {...register('task')}
    />
    <datalist id="task-suggestions">
      <option value="projeto 1"></option>
      <option value="projeto 2"></option>
      <option value="projeto 3"></option>
    </datalist>

    <label htmlFor="minutesAmount">durante</label>
    <MinutesAmountInput 
      type='number' 
      id="minutesAmount" 
      disabled={!!activeCycle}
      placeholder="00"
      step={5}
      min={0}
      max={60}
      {...register('minutesAmount', {valueAsNumber : true})}
    />
    <span>minutos.</span>
    </FormContainer>
  )
}


