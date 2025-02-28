import { Form } from "../ui/form";
import { Text } from "../ui/text";
import { Input } from "../ui/input";
import { Box } from "../ui/box/box";
import { Skelleton } from "../ui/skelleton";

export const ProductFormSkelleton = () => (
  <Box className="flex flex-col">
    <Text.Title className="text-left">
      <Skelleton.Input className="max-w-40" />
    </Text.Title>
    <Form.Wrapper className="my-6">
      <Form.Row>
        <Form.Field>
          <Input.Label>
            <Skelleton.Text className="max-w-32" />
          </Input.Label>
          <Skelleton.Input />
        </Form.Field>
        <Form.Field>
          <Input.Label>
            <Skelleton.Text className="max-w-32" />
          </Input.Label>
          <Skelleton.Input />
        </Form.Field>
      </Form.Row>
      <Form.Row>
        <Form.Field>
          <Input.Label>
            <Skelleton.Text className="max-w-32" />
          </Input.Label>
          <Skelleton.Input />
        </Form.Field>
        <Form.Field>
          <Input.Label>
            <Skelleton.Text className="max-w-32" />
          </Input.Label>
          <Skelleton.Input />
        </Form.Field>
      </Form.Row>
      <Form.Row>
        <Form.Field>
          <Input.Label>
            <Skelleton.Text className="max-w-32" />
          </Input.Label>
          <Skelleton.Input className="h-12" />
        </Form.Field>
      </Form.Row>
      <Form.Row className="border-t border-gray-300 pt-4 mt-4 justify-end">
        <Skelleton.Input className="w-28" />
      </Form.Row>
    </Form.Wrapper>
  </Box>
);
