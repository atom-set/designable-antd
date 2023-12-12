import React from "react";
import { createBehavior, createResource } from "@designable/core";
import { DnFC } from "@designable/react";
import { createVoidFieldSchema } from "../Field";
import cls from "classnames";

export interface IDesignableCustomComponentProps {
  value?: string;
  content?: string;
  mode?: "normal" | "h1" | "h2" | "h3" | "p";
  style?: React.CSSProperties;
  className?: string;
}

export const CustomComponent: DnFC<IDesignableCustomComponentProps> = (
  props
) => {
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
    propsSchema: createVoidFieldSchema({
      type: "object",
      properties: {
        content: {
          type: "string",
          "x-decorator": "FormItem",
          "x-component": "Input.TextArea",
        },
        mode: {
          type: "string",
          "x-decorator": "FormItem",
          "x-component": "Select",
          "x-component-props": {
            defaultValue: "normal",
          },
          enum: ["h1", "h2", "h3", "p", "normal"],
        },
        width: {
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
          content: "文本内容",
          mode: {
            title: "文本类型",
            dataSource: ["H1", "H2", "H3", "Paragraph", "Normal"],
          },
          width: "长度",
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
          width: "长度",
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
          width: "长度",
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
