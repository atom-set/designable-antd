import React from "react";
import { createBehavior, createResource } from "@designable/core";
import { createVoidFieldSchema } from "../Field";
import { Collapse } from "antd";
import cls from "classnames";

export const ArrayCollapse2 = (props) => {
  const header = props.header ?? "";
  return (
    <Collapse
      {...props}
      className={cls("formily-array-collapse-item", props.className)}
    >
      <Collapse.Panel {...props} forceRender key={0} header={header}>
        {props.content}
      </Collapse.Panel>
    </Collapse>
  );
};

ArrayCollapse2.Behavior = createBehavior({
  name: "ArrayCollapse",
  extends: ["Field"],
  selector: (node) => node.props["x-component"] === "ArrayCollapse2",
  designerProps: {
    propsSchema: createVoidFieldSchema({
      name: "ArrayCollapse",
      type: "object",
      properties: {
        header: {
          type: "string",
          "x-decorator": "FormItem",
          "x-component": "Input",
        },
      },
    }),
  },
  designerLocales: {
    "zh-CN": {
      title: "自定义文本",
      settings: {
        "x-component-props": {
          header: "标题",
        },
      },
    },
    "en-US": {
      title: "Text",
      settings: {
        "x-component-props": {
          header: "header",
        },
      },
    },
  },
});

ArrayCollapse2.Resource = createResource({
  icon: "DatePickerSource",
  elements: [
    {
      componentName: "Field",
      props: {
        type: "string",
        "x-component": "ArrayCollapse2",
      },
    },
  ],
});
