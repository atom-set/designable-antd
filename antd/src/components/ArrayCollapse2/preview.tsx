import React from "react";
import { createBehavior, createResource } from "@designable/core";
import { createFieldSchema } from "../Field";
import { AllSchemas } from "../../schemas";
import { AllLocales } from "../../locales";
import { Collapse } from "antd";
import cls from "classnames";

export const ArrayCollapse2 = (props) => {
  return (
    <Collapse
      {...props}
      className={cls("formily-array-collapse-item", props.className)}
    >
      <Collapse.Panel {...props} forceRender key={0} header={"121212"}>
        hello world
      </Collapse.Panel>
    </Collapse>
  );
};

ArrayCollapse2.Behavior = createBehavior({
  name: "ArrayCollapse2",
  extends: ["Field"],
  selector: (node) => node.props["x-component"] === "ArrayCollapse2",
  designerProps: {
    propsSchema: createFieldSchema(AllSchemas.ArrayCollapse2),
  },
  designerLocales: AllLocales.ArrayCollapse2,
});

ArrayCollapse2.Resource = createResource({
  icon: "DatePickerSource",
  elements: [
    {
      componentName: "Field",
      props: {
        type: "array",
        "x-component": "ArrayCollapse2",
      },
    },
  ],
});
