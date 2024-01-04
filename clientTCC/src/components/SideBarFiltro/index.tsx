import React, { useState } from "react";
import { Select, Input, Collapse, Button } from "antd";

const { Option } = Select;
const { Panel } = Collapse;

interface SidebarProps {
  onFilterChange: (filter: string | null, term: string) => void;
}

const SideBarFiltro: React.FC<SidebarProps> = ({ onFilterChange }) => {
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const handleFilterChange = (value: string) => {
    setSelectedFilter(value);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleApplyFilter = () => {
    onFilterChange(selectedFilter, searchTerm);
  };

  return (
    <div className="sidebar-container">
      <Collapse defaultActiveKey={["0"]}>
        <Panel header="Filtros" key="1">
          <Select
            style={{ width: "100%", marginBottom: "10px" }}
            placeholder="Selecione um filtro"
            onChange={handleFilterChange}
          >
            <Option value="especie">Filtrar por Espécie</Option>
            <Option value="porte">Filtrar por Porte</Option>
            <Option value="todos">Mostrar todos</Option>
          </Select>
          <Input
            placeholder="Digite a espécie ou porte"
            onChange={handleSearchChange}
            style={{ marginBottom: "10px" }}
          />
          <Button className="btn-success" onClick={handleApplyFilter}>Aplicar Filtro</Button>
        </Panel>
      </Collapse>
    </div>
  );
};

export default SideBarFiltro;
