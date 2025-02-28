"use client";
import { Table } from "@/components/ui/table";
import { Skelleton } from "../ui/skelleton";

export const ProductTableSkeleton = () => {
  const data = [0, 1, 2, 3, 4];
  return (
    <Table.Wrapper>
      <Table.THead>
        <Table.TR>
          <Table.TH>Nome</Table.TH>
          <Table.TH>Categoria</Table.TH>
          <Table.TH>Preço</Table.TH>
          <Table.TH>Descrição</Table.TH>
          <Table.TH className="min-w-[140px]"></Table.TH>
        </Table.TR>
      </Table.THead>
      <Table.TBody>
        {data?.map((number) => (
          <Table.TR key={number}>
            <Table.TD>
              <Skelleton.Input />
            </Table.TD>
            <Table.TD>
              <Skelleton.Input />
            </Table.TD>
            <Table.TD>
              <Skelleton.Input />
            </Table.TD>
            <Table.TD>
              <Skelleton.Input />
            </Table.TD>
            <Table.TD className="text-right min-w-[140px]">
              <Skelleton.Input />
            </Table.TD>
          </Table.TR>
        ))}
      </Table.TBody>
    </Table.Wrapper>
  );
};
