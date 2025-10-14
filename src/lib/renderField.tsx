import React from "react";
import { Input, InputNumber, Select, DatePicker } from "antd";
import type { ReactNode } from "react";
import cn from "./cn";

type InputProps = React.ComponentProps<typeof Input>;
type TextAreaProps = React.ComponentProps<typeof Input.TextArea>;
type InputNumberProps = React.ComponentProps<typeof InputNumber>;
type SelectProps = React.ComponentProps<typeof Select>;
type DatePickerProps = React.ComponentProps<typeof DatePicker>;
interface BaseField {
    key?: string;
    label?: ReactNode;
}

type TextField = BaseField & { type: "text"; props?: InputProps };
type PasswordField = BaseField & { type: "password"; props?: InputProps };
type TextareaField = BaseField & { type: "textarea"; props?: TextAreaProps };
type NumberField = BaseField & { type: "number"; props?: InputNumberProps };
type DateField = BaseField & { type: "date"; props?: DatePickerProps };
type SelectField = BaseField & {
    type: "select";
    options: { label: ReactNode; value: string | number }[];
    props?: SelectProps;
};

type Field = TextField | PasswordField | TextareaField | NumberField | DateField | SelectField;

export const renderField = ({
    field,
    className
}: {
    field: Field;
    className?: string;
}): React.ReactNode => {
    switch (field.type) {
        case "text":
            return <Input size="large" className={cn("", className)} key={field.key} {...field.props} />;

        case "password":
            return <Input.Password size="large" className={cn("", className)} key={field.key} {...field.props} />;

        case "textarea":
            return <Input.TextArea size="large" className={cn("", className)} key={field.key} {...field.props} />;

        case "number":
            return <InputNumber size="large" className={cn("", className)} key={field.key} {...field.props} />;

        case "select":
            return (
                <Select placeholder="Select" size="large" className={cn("", className)} key={field.key} {...field.props}>
                    {field.options.map((opt) => (
                        <Select.Option key={String(opt.value)} value={opt.value}>
                            {opt.label}
                        </Select.Option>
                    ))}
                </Select>
            );

        case "date":
            return <DatePicker size="large" className={cn("", className)} key={field.key} {...field.props} />;

        default:
            return null;
    }
};
