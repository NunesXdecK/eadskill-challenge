import { Label } from "./label";
import { Error } from "./error-label";
import { SelectOption } from "./select-option";
import { WithWrapperInput as Base } from "./input";
import { WithWrapperSelect as Select } from "./select";
import { WithWrapperTextarea as Textarea } from "./textarea";

export const Input = {
  Label,
  Error,
  Select,
  Textarea,
  Input: Base,
  SelectOption,
};
