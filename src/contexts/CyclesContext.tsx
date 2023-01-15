import { createContext, useState, useReducer, ReactNode, useEffect } from 'react';
import { ActionTypes, addNewCycleAction, interruptCurrentCycleAction, markCurrentAsFinishedAction } from "../reducers/cycles/action";
import { Cycle, cyclesReducer } from '../reducers/cycles/reducer';
import { differenceInSeconds } from 'date-fns';


interface CreateCycleData {
  task : string;
  minutesAmount : number;
}

interface CycleContextType {
  cycles : Cycle[];
  activeCycle : Cycle | undefined;
  activeCycleId : string | null;
  amountSecondPassed : number;
  markCurrentCycleAsFinished : () => void;
  setSecondsPassed : (seconds: number) => void;
  createNewCycle : (data : CreateCycleData) => void;
  interruptCurrentCycle : () => void;
}

export const CycleContext = createContext({} as CycleContextType); 

interface CycleProviderType {
  children : ReactNode;
}

export function CyclesContextProvider( { children }: CycleProviderType ){

  const [cyclesState, dispatch] = useReducer(cyclesReducer, 
    { 
      cycles : [], 
      activeCycleId : null,
    }
    , () => {
      const storedStateasJSON = localStorage.getItem(
        '@ignite-timer:cycles-state-1.0.0'
      )
      if(storedStateasJSON){
        return JSON.parse(storedStateasJSON)
      }
    })
  
  const {activeCycleId, cycles} = cyclesState;
  const activeCycle  = cycles.find(cycle => cycle.id === activeCycleId);

  const [ amountSecondPassed, setAmountSecondPassed] = useState(() => {
    if (activeCycle) {
      return differenceInSeconds(new Date(), new Date(activeCycle.startDate))
    }
    return 0
  });


  useEffect(() => {
     const stateJSON = JSON.stringify(cyclesState);
  
     localStorage.setItem('@ignite-timer:cycles-state-1.0.0', stateJSON)
  }, [cyclesState]);

  
  function setSecondsPassed(seconds: number){
    setAmountSecondPassed(seconds);
  }
 
function markCurrentCycleAsFinished () {
  dispatch(markCurrentAsFinishedAction())
}
 
function createNewCycle(data:CreateCycleData){
  
  const id = String(new Date().getTime());

  const newCycle : Cycle = {
   id : id,
   task : data.task,
   minutesAmount : data.minutesAmount,
   startDate: new Date()
  }
  
  dispatch(addNewCycleAction(newCycle))
  setAmountSecondPassed(0);
 }
 function interruptCurrentCycle(){
  dispatch(interruptCurrentCycleAction())

 }
return (
  <CycleContext.Provider value ={{ 
    cycles,
    activeCycle, 
    activeCycleId,  
    markCurrentCycleAsFinished, 
    setSecondsPassed,
    amountSecondPassed, 
    createNewCycle,
    interruptCurrentCycle
  }}>
    {children}
  </CycleContext.Provider>
   )
}
