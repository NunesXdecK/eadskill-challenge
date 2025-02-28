"use client";
import { ChangeEvent } from "react";
import { Box } from "../ui/box/box";
import { Input } from "../ui/input";
import withAlert from "../hoc/withAlert";
import { Icons } from "@/components/ui/icons";
import { Table } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useProducts } from "@/hooks/use-products";
import { FormModalButton } from "./form-modal-button";
import { Paginator } from "../ui/paginator/paginator";
import { useCategories } from "@/hooks/use-categories";
import { AlertContextType } from "@/contexts/alert-context";
import { ProductTableSkeleton } from "./product-table-skeleton";
import DeleteProductUseCaseFactory from "@/core/factories/product/delete-product-usecase.factory";

interface Props {
  showAlert: AlertContextType["showAlert"];
}

const ProductTable = ({ showAlert }: Props) => {
  const {
    filter,
    loading,
    data = [],
    maxLength,
    refresh,
    onChangeFilter,
    onCategoryChange,
    onValueOrderChange,
  } = useProducts();
  const { data: options = [] } = useCategories();
  return (
    <>
      <Box>
        <Input.Label>Categoria</Input.Label>
        <Input.Select
          value={filter.category}
          onChange={(event: ChangeEvent<HTMLSelectElement>) =>
            onCategoryChange(event?.target?.value)
          }
        >
          <Input.SelectOption value="">Nenhum</Input.SelectOption>
          {options.map((option) => (
            <Input.SelectOption key={option}>{option}</Input.SelectOption>
          ))}
        </Input.Select>
      </Box>
      {loading ? (
        <ProductTableSkeleton />
      ) : (
        <>
          <Table.Wrapper>
            <Table.THead>
              <Table.TR>
                <Table.TH>Nome</Table.TH>
                <Table.TH>Avaliação</Table.TH>
                <Table.TH>Categoria</Table.TH>
                <Table.TH>
                  <Table.HeaderSwitchButton
                    onSwitch={onValueOrderChange}
                    initialValue={filter.valueOrder}
                  >
                    Preço
                  </Table.HeaderSwitchButton>
                </Table.TH>
                <Table.TH>Descrição</Table.TH>
                <Table.TH className="min-w-[140px]"></Table.TH>
              </Table.TR>
            </Table.THead>
            <Table.TBody>
              {data?.map((product) => (
                <Table.TR
                  key={product.id}
                  className={product.rating.rate > 4 ? "bg-[#17233b]" : ""}
                >
                  <Table.TD>{product.title}</Table.TD>
                  <Table.TD>{product.rating.rate}</Table.TD>
                  <Table.TD>{product.category}</Table.TD>
                  <Table.TD>{product.price}</Table.TD>
                  <Table.TD>{product.description}</Table.TD>
                  <Table.TD className="flex gap-2 justify-end min-w-[140px]">
                    <Button.TrashConfirm
                      onConfirm={async (onClose) => {
                        const result =
                          await DeleteProductUseCaseFactory.create().execute(
                            product.id
                          );
                        if (result) {
                          if (showAlert)
                            showAlert("Produto deletado com sucesso!");
                          onClose();
                          refresh();
                        } else {
                          if (showAlert)
                            showAlert("Produto deletado com sucesso!", "error");
                        }
                      }}
                    />
                    <FormModalButton id={product.id?.toString()}>
                      <Icons.Edit />
                    </FormModalButton>
                  </Table.TD>
                </Table.TR>
              ))}
            </Table.TBody>
          </Table.Wrapper>
          <Paginator
            page={filter.page}
            maxLength={maxLength}
            perPage={filter.perPage}
            onChange={(page) => onChangeFilter("page", page)}
          />
        </>
      )}
    </>
  );
};

export const ProductTableWithAlert = withAlert(ProductTable);
