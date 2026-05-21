import { Column, COLUMNS } from "./Column";
import { useAppSelector } from "../../store/hooks";
import { selectTasksByStatus } from "../../store/selectors";

interface Props {
  onOpen: (id: number) => void;
}

export function KanbanBoard({ onOpen }: Props) {
  const grouped = useAppSelector(selectTasksByStatus);

  return (
    <div className="flex h-full gap-4 overflow-x-auto pb-2">
      {COLUMNS.map((col) => (
        <Column
          key={col.id}
          config={col}
          tasks={grouped[col.id]}
          onOpen={onOpen}
        />
      ))}
    </div>
  );
}
