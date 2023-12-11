import React from "react";
import { createBehavior, createResource } from "@designable/core";
import { DnFC } from "@designable/react";
import { createVoidFieldSchema } from "../Field";
import { AllSchemas } from "../../schemas";
import { AllLocales } from "../../locales";
import cls from "classnames";

export interface IDesignableTextProps {
  value?: string;
  content?: string;
  mode?: "normal" | "h1" | "h2" | "h3" | "p";
  style?: React.CSSProperties;
  className?: string;
}

export const CustomComponent: DnFC<IDesignableTextProps> = (props) => {
  const tagName = props.mode === "normal" || !props.mode ? "div" : props.mode;
  return React.createElement(
    tagName,
    {
      ...props,
      className: cls(props.className, "dn-text"),
      "data-content-editable": "x-component-props.content",
    },
    props.content
  );
};

CustomComponent.Behavior = createBehavior({
  name: "Text",
  extends: ["Field"],
  selector: (node) => node.props["x-component"] === "CustomComponent",
  designerProps: {
    propsSchema: createVoidFieldSchema(AllSchemas.Text),
  },
  designerLocales: {
    "zh-CN": {
      title: "文1本",
      settings: {
        "x-component-props": {
          content: "文本内容",
          mode: {
            title: "文本类型",
            dataSource: ["H1", "H2", "H3", "Paragraph", "Normal"],
          },
        },
      },
    },
    "en-US": {
      title: "Text",
      settings: {
        "x-component-props": {
          content: "Text Content",
          mode: {
            title: "Text Mode",
            dataSource: ["H1", "H2", "H3", "Paragraph", "Normal"],
          },
        },
      },
    },
    "ko-KR": {
      title: "텍스트",
      settings: {
        "x-component-props": {
          content: "텍스트 내용",
          mode: {
            title: "텍스트 모드",
            dataSource: ["H1", "H2", "H3", "Paragraph", "Normal"],
          },
        },
      },
    },
  },
});

CustomComponent.Resource = createResource({
  icon: "InputSource",
  elements: [
    {
      componentName: "Field",
      props: {
        type: "string",
        "x-component": "CustomComponent",
      },
    },
  ],
});
