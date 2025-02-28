import { Text } from "@/components/ui/text";
import { Box } from "@/components/ui/box/box";
import { Main } from "@/components/layout/main";
import { ProductTableWithAlert } from "@/components/product/product-table";
import { FormModalButton } from "@/components/product/form-modal-button";

export default function Home() {
  return (
    <Main>
      <Box className="w-full flex flex-row items-start justify-between">
        <Box>
          <Text.Title>Produtos</Text.Title>
          <Text.Paragraph>Tela para cadastro de produtos</Text.Paragraph>
        </Box>
        <FormModalButton>Novo</FormModalButton>
      </Box>
      <ProductTableWithAlert />
    </Main>
  );
}
