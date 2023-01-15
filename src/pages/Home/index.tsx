import { 
  HomeContainer,
  StartCountdownButton, 
  StopCountdownButton
  } from "./styles";
import { HandPalm, Play } from 'phosphor-react';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as zod from 'zod';
import { NewCycleForm } from "./NewCycleForm";
import { CountDown } from "./Countdown";
import { CycleContext } from "../../contexts/CyclesContext";
import { useContext } from "react";

interface NewCycleFormData {
  task : string;
  minutesAmount : number;
}
const newCycleValidationSchema = zod.object({
  task : zod.string().min(1, 'Informe a tarefa'),
  minutesAmount : zod.number()
   .min(1, 'O ciclo precisa ser de no mínimo 5 minuto')
   .max(60, 'O ciclo precisa ser de no maximo 60 minuto'),
});
export function Home () {
  const { activeCycle, createNewCycle, interruptCurrentCycle } = useContext(CycleContext);

  const newCycleForm =  useForm<NewCycleFormData>({
    resolver : zodResolver(newCycleValidationSchema),
    defaultValues : {
      task : '',
      minutesAmount : 0
    }
  });
  const { handleSubmit, watch, reset } = newCycleForm;
  
  function handleCreateNewCycle(data : NewCycleFormData){
    createNewCycle(data);
    reset();
  }
  const task = watch('task');

  const isSubmitDisabled = !task;
  
  return (
    <>
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
 
        <FormProvider {...newCycleForm}>
          <NewCycleForm />
        </FormProvider>
        <CountDown />
        {
          activeCycle ? (
            <StopCountdownButton onClick={interruptCurrentCycle} type="button">
                <HandPalm size={24}/>
                 Interromper
            </StopCountdownButton >
          ) : (
         <StartCountdownButton disabled={isSubmitDisabled} type="submit">
          <Play size={24}/>
          Começar
        </StartCountdownButton >
          )
        }
      </form>
    </HomeContainer>
    
    </>
  )
}