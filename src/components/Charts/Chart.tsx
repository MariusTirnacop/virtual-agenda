import { useMemo } from "react";

import { useFilters } from "../../hooks/useFilters";
import {
  VictoryAxis,
  VictoryBar,
  VictoryChart,
  VictoryContainer,
  VictoryTheme,
  VictoryTooltip,
} from "victory";
import { TaskStatusEnum } from "../../models/tasks/tasks";

const Chart = () => {
  const { filteredTasks } = useFilters();

  const data = useMemo(() => {
    const statusCounts = {
      [TaskStatusEnum.CREATED]: 0,
      [TaskStatusEnum.IN_PROGRESS]: 0,
      [TaskStatusEnum.COMPLETED]: 0,
    };

    filteredTasks.forEach((task) => {
      const status = task.status;
      statusCounts[status] += 1;
    });

    return Object.keys(statusCounts).map((status) => ({
      name: status,
      value: statusCounts[status as TaskStatusEnum],
    }));
  }, [filteredTasks]);

  return (
    <div
      style={{
        width: "100%",
        maxWidth: "400px",
        height: "auto",
        margin: "0 auto",
        touchAction: "auto",
      }}
    >
      <VictoryChart
        theme={VictoryTheme.material}
        domainPadding={20}
        containerComponent={
          <VictoryContainer responsive={true} style={{ pointerEvents: "none" }} />
        }
        animate={{ duration: 500 }}
        padding={{ top: 20, bottom: 60, left: 50, right: 50 }}
      >
        <VictoryAxis
          style={{
            tickLabels: {
              angle: -45,
              textAnchor: "end",
              fontSize: 8,
              padding: 5,
            },
          }}
          tickFormat={data.map((d) => d.name)}
        />
        <VictoryAxis
          dependentAxis
          tickFormat={(x) => Number(x)}
          style={{
            tickLabels: { fontSize: 10 },
          }}
        />
        <VictoryBar
          data={data}
          x="name"
          y="value"
          labels={({ datum }) => datum.value}
          labelComponent={<VictoryTooltip />}
          style={{
            data: { fill: "#8884d8" },
            labels: { fontSize: 10 },
          }}
        />
      </VictoryChart>
    </div>
  );
};

export default Chart;
