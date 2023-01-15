import { useContext } from "react";
import { CycleContext } from "../../contexts/CyclesContext";
import { formatDistanceToNow } from 'date-fns';
import ptBR from "date-fns/esm/locale/pt-BR/index.js";
import { HistoryContainer, HistoryList, Status } from "./styles";

export function History () {

  const { cycles } = useContext(CycleContext);
  return (
    <>
    <HistoryContainer>
      <h1>Meu histórico</h1>

      <HistoryList>
        <table>
          <thead>
            <tr>
              <th>Tarefa</th>
              <th>Duração</th>
              <th>Início</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            { cycles.map(cycle => {
              return(
                <tr key={cycle.id}>
                  <td>{cycle.task}</td>
                  <td>{cycle.minutesAmount}</td>
                  <td>{formatDistanceToNow(new Date(cycle.startDate), {
                    addSuffix : true,
                    locale : ptBR
                  })}</td>
                  <td>
                    { cycle.finishedDate && (
                      <Status  statusColor="green">Conclúido</Status>
                    )}
                    {
                      cycle.interruptDate && (
                        <Status statusColor="red">Interrompido</Status>
                      )
                    }
                    {
                     (!cycle.interruptDate && !cycle.interruptDate ) && (
                        <Status statusColor="yellow">Em andamneto</Status>
                      )
                    }
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </HistoryList>
    </HistoryContainer>
    </>
  )
}