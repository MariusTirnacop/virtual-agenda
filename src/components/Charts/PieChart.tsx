import { useMemo } from "react";
import { useFilters } from "../../hooks/useFilters";
import { VictoryPie, VictoryTheme, VictoryLabel } from "victory";
import { TaskPriorityEnum } from "../../models/tasks/tasks";

const PriorityPieChart = () => {
  const { filteredTasks } = useFilters();

  const data = useMemo(() => {
    const priorityCounts = {
      [TaskPriorityEnum.LOW]: 0,
      [TaskPriorityEnum.MEDIUM]: 0,
      [TaskPriorityEnum.HIGH]: 0,
    };

    filteredTasks.forEach((task) => {
      const priority = task.priority;
      priorityCounts[priority] += 1;
    });

    return Object.entries(priorityCounts)
      .filter(([, count]) => count > 0)
      .map(([priority, count]) => ({
        x: priority,
        y: count,
      }));
  }, [filteredTasks]);

  const singlePriority = data.length === 1;

  const colorMap = {
    [TaskPriorityEnum.LOW]: "#4caf50",
    [TaskPriorityEnum.MEDIUM]: "#ffeb3b",
    [TaskPriorityEnum.HIGH]: "#f44336",
  };

  const colorScale = data.map((item) => colorMap[item.x as TaskPriorityEnum]);

  return (
    <div
      style={{
        width: "100%",
        maxWidth: "400px",
        height: "auto",
        margin: "0 auto",
        touchAction: "none",
      }}
    >
      <VictoryPie
        key={JSON.stringify(data)}
        data={data}
        colorScale={colorScale}
        labels={({ datum }) => `${datum.x}: ${datum.y}`}
        labelComponent={
          singlePriority ? (
            <VictoryLabel textAnchor="middle" verticalAnchor="middle" x={200} y={200} />
          ) : (
            <VictoryLabel />
          )
        }
        style={{
          labels: { fontSize: 10, padding: singlePriority ? 0 : 10 },
        }}
        theme={VictoryTheme.material}
        animate={{ duration: 500 }}
      />
    </div>
  );
};

export default PriorityPieChart;
