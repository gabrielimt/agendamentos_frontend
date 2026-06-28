import PainelCard from '../components/PainelCard'
import { Calendar,ClockArrowRight, NotepadTextDashed, UsersRound } from 'lucide-react';

export default function Painel(){
  return(
    <section className='py-5'>
      <h2 className="text-3xl font-bold pb-5">Painel</h2>
      <article className='flex justify-between'>
      <PainelCard 
      title="Agendamentos de Hoje"
      value="12"
      icon={Calendar}/>

      <PainelCard
      title="Status da Recepção (esperando)"
      value="3"
      icon={ClockArrowRight}/>

      <PainelCard
      title="Agendamentos a Confirmar"
      value="7"
      icon={NotepadTextDashed}/>
      
      <PainelCard
      title="Pacientes Cadastrados"
      value="265"
      icon={UsersRound}/>
      
      </article>
    </section>
  )
}