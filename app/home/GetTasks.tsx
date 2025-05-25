import ViewTasks from "@/components/ViewTasks";

export default function GetTasks() {
  return (
    <ViewTasks
      tasks={[
        { id: 1, title: "Leer un capítulo de un libro", descriptions: "Pendiente de completar antes de dormir.", instance: false },
        { id: 2, title: "Organizar escritorio", descriptions: "Mantener ordenado el espacio de trabajo.", instance: false },
        { id: 3, title: "Llamar a un amigo", descriptions: "Conversar con alguien que hace tiempo no ves.", instance: false },
        { id: 4, title: "Aprender algo nuevo", descriptions: "Investigar sobre un tema interesante.", instance: false },
        { id: 5, title: "Hacer ejercicio", descriptions: "Dedicar 30 minutos a una actividad física.", instance: false },
        { id: 6, title: "Desayunar saludable", descriptions: "Tomar un desayuno equilibrado por la mañana.", instance: true },
        { id: 7, title: "Responder correos", descriptions: "Revisar bandeja de entrada y atender pendientes.", instance: true },
        { id: 8, title: "Meditar 5 minutos", descriptions: "Hacer una pequeña pausa de mindfulness.", instance: true },
        { id: 9, title: "Beber agua", descriptions: "Mantenerse hidratado durante el día.", instance: true },
        { id: 10, title: "Pasear al aire libre", descriptions: "Salir a caminar para despejar la mente.", instance: true },
      ]}
    />
  );
}
