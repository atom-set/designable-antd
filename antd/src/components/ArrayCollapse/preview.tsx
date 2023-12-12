import React, { Fragment } from "react";
import { Card, CardProps } from "antd";
import { TreeNode, createResource } from "@designable/core";
import {
  useTreeNode,
  TreeNodeWidget,
  DroppableWidget,
  useNodeIdProps,
  DnFC,
} from "@designable/react";
import { ArrayBase } from "@formily/antd";
import { observer } from "@formily/react";
import { LoadTemplate } from "../../common/LoadTemplate";
import { useDropTemplate } from "../../hooks";
import {
  hasNodeByComponentPath,
  queryNodesByComponentPath,
  createEnsureTypeItemsNode,
  findNodeByComponentPath,
  createNodeId,
} from "../../shared";
import { createArrayBehavior } from "../ArrayBase";
import cls from "classnames";
import "./styles.less";

const ensureObjectItemsNode = createEnsureTypeItemsNode("object");

const isArrayCollapseOperation = (name: string) =>
  name === "ArrayCollapse.Remove" ||
  name === "ArrayCollapse.MoveDown" ||
  name === "ArrayCollapse.MoveUp";

export const ArrayCollapse: DnFC<CardProps> = observer((props) => {
  const node = useTreeNode();
  const nodeId = useNodeIdProps();
  const designer = useDropTemplate("ArrayCollapse", (source) => {
    const indexNode = new TreeNode({
      componentName: node.componentName,
      props: {
        type: "void",
        "x-component": "ArrayCollapse.Index",
      },
    });
    const additionNode = new TreeNode({
      componentName: node.componentName,
      props: {
        type: "void",
        title: "Addition",
        "x-component": "ArrayCollapse.Addition",
      },
    });
    const removeNode = new TreeNode({
      componentName: node.componentName,
      props: {
        type: "void",
        title: "Addition",
        "x-component": "ArrayCollapse.Remove",
      },
    });
    const moveDownNode = new TreeNode({
      componentName: node.componentName,
      props: {
        type: "void",
        title: "Addition",
        "x-component": "ArrayCollapse.MoveDown",
      },
    });
    const moveUpNode = new TreeNode({
      componentName: node.componentName,
      props: {
        type: "void",
        title: "Addition",
        "x-component": "ArrayCollapse.MoveUp",
      },
    });

    const objectNode = new TreeNode({
      componentName: node.componentName,
      props: {
        type: "object",
      },
      children: [indexNode, ...source, removeNode, moveDownNode, moveUpNode],
    });
    return [objectNode, additionNode];
  });

  const renderCard = () => {
    if (node.children.length === 0) return <DroppableWidget />;
    const additions = queryNodesByComponentPath(node, [
      "ArrayCollapse",
      "ArrayCollapse.Addition",
    ]);
    const indexes = queryNodesByComponentPath(node, [
      "ArrayCollapse",
      "*",
      "ArrayCollapse.Index",
    ]);
    const operations = queryNodesByComponentPath(node, [
      "ArrayCollapse",
      "*",
      isArrayCollapseOperation,
    ]);
    const children = queryNodesByComponentPath(node, [
      "ArrayCollapse",
      "*",
      (name) => name.indexOf("ArrayCollapse.") === -1,
    ]);
    return (
      <ArrayBase disabled>
        <ArrayBase.Item index={0} record={null}>
          <Card
            {...props}
            title={
              <Fragment>
                {indexes.map((node, key) => (
                  <TreeNodeWidget key={key} node={node} />
                ))}
                <span data-content-editable="x-component-props.title">
                  {props.title}
                </span>
              </Fragment>
            }
            className={cls("ant-formily-array-cards-item", props.className)}
            extra={
              <Fragment>
                {operations.map((node) => (
                  <TreeNodeWidget key={node.id} node={node} />
                ))}
                {props.extra}
              </Fragment>
            }
          >
            <div {...createNodeId(designer, ensureObjectItemsNode(node).id)}>
              {children.length ? (
                children.map((node) => (
                  <TreeNodeWidget key={node.id} node={node} />
                ))
              ) : (
                <DroppableWidget hasChildren={false} />
              )}
            </div>
          </Card>
        </ArrayBase.Item>
        {additions.map((node) => (
          <TreeNodeWidget key={node.id} node={node} />
        ))}
      </ArrayBase>
    );
  };

  return (
    <div {...nodeId} className="dn-array-collapse">
      {renderCard()}
      {/* <LoadTemplate
        actions={[
          {
            title: node.getMessage("addIndex"),
            icon: "AddIndex",
            onClick: () => {
              if (
                hasNodeByComponentPath(node, [
                  "ArrayCollapse",
                  "*",
                  "ArrayCollapse.Index",
                ])
              )
                return;
              const indexNode = new TreeNode({
                componentName: node.componentName,
                props: {
                  type: "void",
                  "x-component": "ArrayCollapse.Index",
                },
              });
              ensureObjectItemsNode(node).append(indexNode);
            },
          },
          {
            title: node.getMessage("addOperation"),
            icon: "AddOperation",
            onClick: () => {
              const oldAdditionNode = findNodeByComponentPath(node, [
                "ArrayCollapse",
                "ArrayCollapse.Addition",
              ]);
              if (!oldAdditionNode) {
                const additionNode = new TreeNode({
                  componentName: node.componentName,
                  props: {
                    type: "void",
                    title: "Addition",
                    "x-component": "ArrayCollapse.Addition",
                  },
                });
                ensureObjectItemsNode(node).insertAfter(additionNode);
              }
              const oldRemoveNode = findNodeByComponentPath(node, [
                "ArrayCollapse",
                "*",
                "ArrayCollapse.Remove",
              ]);
              const oldMoveDownNode = findNodeByComponentPath(node, [
                "ArrayCollapse",
                "*",
                "ArrayCollapse.MoveDown",
              ]);
              const oldMoveUpNode = findNodeByComponentPath(node, [
                "ArrayCollapse",
                "*",
                "ArrayCollapse.MoveUp",
              ]);
              if (!oldRemoveNode) {
                ensureObjectItemsNode(node).append(
                  new TreeNode({
                    componentName: node.componentName,
                    props: {
                      type: "void",
                      "x-component": "ArrayCollapse.Remove",
                    },
                  })
                );
              }
              if (!oldMoveDownNode) {
                ensureObjectItemsNode(node).append(
                  new TreeNode({
                    componentName: node.componentName,
                    props: {
                      type: "void",
                      "x-component": "ArrayCollapse.MoveDown",
                    },
                  })
                );
              }
              if (!oldMoveUpNode) {
                ensureObjectItemsNode(node).append(
                  new TreeNode({
                    componentName: node.componentName,
                    props: {
                      type: "void",
                      "x-component": "ArrayCollapse.MoveUp",
                    },
                  })
                );
              }
            },
          },
        ]}
      /> */}
    </div>
  );
});

// ArrayBase.mixin(ArrayCollapse);

ArrayCollapse.Behavior = createArrayBehavior("ArrayCollapse");

ArrayCollapse.Resource = createResource({
  icon: "ArrayCardsSource",
  elements: [
    {
      componentName: "Field",
      props: {
        type: "array",
        "x-decorator": "FormItem",
        "x-component": "ArrayCollapse",
        "x-component-props": {
          title: `Title`,
        },
      },
    },
  ],
});
