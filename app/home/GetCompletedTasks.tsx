import ViewTasks from "@/components/ViewTasks";

export default function GetCompletedTasks() {
  return (
    <ViewTasks
      tasks={[
        { id: 6, title: "Desayunar saludable", descriptions: "Tomar un desayuno equilibrado por la mañana.", instance: true },
        { id: 7, title: "Responder correos", descriptions: "Revisar bandeja de entrada y atender pendientes.", instance: true },
        { id: 8, title: "Meditar 5 minutos", descriptions: "Hacer una pequeña pausa de mindfulness.", instance: true },
        { id: 9, title: "Beber agua", descriptions: "Mantenerse hidratado durante el día.", instance: true },
        { id: 10, title: "Pasear al aire libre", descriptions: "Salir a caminar para despejar la mente.", instance: true },
      ]}
    />
  );
}
