"use client";
import { Form } from "../ui/form";
import { Text } from "../ui/text";
import { Box } from "../ui/box/box";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import withAlert from "../hoc/withAlert";
import { withModal } from "../hoc/withModal";
import { ChangeEvent, ReactNode } from "react";
import { useProduct } from "@/hooks/use-product";
import { useCategories } from "@/hooks/use-categories";
import { ProductFormSkelleton } from "./form-skelleton";
import { AlertContextType, AlertType } from "@/contexts/alert-context";

interface ButtonWithOnOpen {
  children?: ReactNode;
  onOpen?: () => void;
}

interface ModalWithOnClose {
  id?: string;
  disabled?: boolean;
  showAlert?: AlertContextType["showAlert"];
  onClose?: () => void;
  onConfirm?: (onClose: () => void) => void;
}

const OpenButton = ({ children, onOpen }: ButtonWithOnOpen) => (
  <Button.Primary onClick={onOpen ? () => onOpen() : undefined}>
    {children}
  </Button.Primary>
);

const ProductForm = ({ id, onClose, showAlert }: ModalWithOnClose) => {
  const {
    errors,
    loading: loadingProduct,
    data: product,
    onSave,
    onChange,
  } = useProduct(id);
  const { loading: loadingCategories, data: options = [] } = useCategories();
  if (loadingProduct || loadingCategories) return <ProductFormSkelleton />;
  return (
    <Box className="flex flex-col">
      <Box className="flex flex-row sm:flex-row justify-between">
        <Text.Title className="text-left">
          {id ? "Editar" : "Novo"} produto
        </Text.Title>
        <Button.Clear onClick={onClose ? () => onClose() : undefined}>
          X
        </Button.Clear>
      </Box>
      <Form.Wrapper className="my-6">
        <Form.Row>
          <Form.Field>
            <Input.Label htmlFor="title">Nome</Input.Label>
            <Input.Input
              id="title"
              defaultValue={product?.title}
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                onChange("title", event.target.value)
              }
            />
            {errors.includes("title") || errors.includes("title-30") ? (
              <Input.Error htmlFor="title">
                O nome do produto é obrigatório e precisa ser menor que 30
                caracteres.
              </Input.Error>
            ) : (
              <></>
            )}
          </Form.Field>
          <Form.Field>
            <Input.Label htmlFor="category">Categoria</Input.Label>
            <Input.Select
              id="category"
              defaultValue={product?.category}
              disabled={id !== undefined}
              onChange={(event: ChangeEvent<HTMLSelectElement>) =>
                onChange("category", event.target.value)
              }
            >
              <Input.SelectOption value="">
                Selecione uma opção
              </Input.SelectOption>
              {options.map((option) => (
                <Input.SelectOption key={option}>{option}</Input.SelectOption>
              ))}
            </Input.Select>
            {errors.includes("category") ? (
              <Input.Error htmlFor="category">
                Categoria é obrigatório.
              </Input.Error>
            ) : (
              <></>
            )}
          </Form.Field>
        </Form.Row>
        <Form.Row>
          <Form.Field>
            <Input.Label htmlFor="price">Preço</Input.Label>
            <Input.Input
              id="price"
              inputMode="decimal"
              onInput={(event: React.FormEvent<HTMLInputElement>) => {
                const input = event.currentTarget;
                input.value = input.value.replace(/[^0-9.]/g, "");
              }}
              defaultValue={product?.price?.toString()}
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                onChange("price", Number(event.target.value))
              }
            />
            {errors.includes("price") || errors.includes("price-0") ? (
              <Input.Error htmlFor="price">
                O preço é obrigatório e precisa ser maior que 0.
              </Input.Error>
            ) : (
              <></>
            )}
          </Form.Field>
          <Form.Field>
            <Input.Label htmlFor="image">Imagem (URL)</Input.Label>
            <Input.Input
              id="image"
              defaultValue={product?.image}
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                onChange("image", event.target.value)
              }
            />
            {errors.includes("image") || errors.includes("image-url") ? (
              <Input.Error htmlFor="image">
                A imagem é obrigatória e precisa ser uma URL.
              </Input.Error>
            ) : (
              <></>
            )}
          </Form.Field>
        </Form.Row>
        <Form.Row>
          <Form.Field>
            <Input.Label htmlFor="description">Descrição</Input.Label>
            <Input.Textarea
              id="description"
              defaultValue={product?.description}
              onChange={(event: ChangeEvent<HTMLTextAreaElement>) =>
                onChange("description", event.target.value)
              }
            />
            {errors.includes("description") ? (
              <Input.Error htmlFor="description">
                Categoria é obrigatório.
              </Input.Error>
            ) : (
              <></>
            )}
          </Form.Field>
        </Form.Row>
        <Form.Row className="border-t border-gray-300 text-right pt-4 mt-4 justify-end">
          <Button.Primary
            onClick={async () => {
              const isNew = product.id === undefined;
              const result = await onSave(product);
              if (!result) return;
              const [message, type] = result
                ? [
                    `Produto ${isNew ? "cadastrado" : "editado"} com sucesso!`,
                    "success",
                  ]
                : ["Houve algum problema!", "error"];
              if (showAlert) showAlert(message, type as AlertType);
              if (onClose) onClose();
            }}
          >
            {id ? "Editar" : "Salvar"} produto
          </Button.Primary>
        </Form.Row>
      </Form.Wrapper>
    </Box>
  );
};

export const FormModalButton = withModal(OpenButton, withAlert(ProductForm));
