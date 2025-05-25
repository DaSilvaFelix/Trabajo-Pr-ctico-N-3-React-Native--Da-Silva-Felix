import ViewTasks from "@/components/ViewTasks";

export default function GetUncompletedTasks() {
  return (
    <ViewTasks
      tasks={[
        { id: 1, title: "Leer un capítulo de un libro", descriptions: "Pendiente de completar antes de dormir.", instance: false },
        { id: 2, title: "Organizar escritorio", descriptions: "Mantener ordenado el espacio de trabajo.", instance: false },
        { id: 3, title: "Llamar a un amigo", descriptions: "Conversar con alguien que hace tiempo no ves.", instance: false },
        { id: 4, title: "Aprender algo nuevo", descriptions: "Investigar sobre un tema interesante.", instance: false },
        { id: 5, title: "Hacer ejercicio", descriptions: "Dedicar 30 minutos a una actividad física.", instance: false },
      ]}
    />
  );
}
