// Docs: https://www.instantdb.com/docs/modeling-data

import { i } from "@instantdb/core";

const _schema = i.schema({
  entities: {
    "$files": i.entity({
      "path": i.string().unique().indexed(),
      "url": i.string().optional(),
    }),
    "$users": i.entity({
      "email": i.string().unique().indexed().optional(),
      "imageURL": i.string().optional(),
      "type": i.string().optional(),
    }),
    "users": i.entity({
      "createdAt": i.number().optional(),
      "displayName": i.string().optional(),
      "email": i.string().optional(),
      "photoURL": i.string().optional(),
      "role": i.string().optional(),
    }),
    "practices": i.entity({
      "title": i.string(),
      "description": i.string(),
      "tags": i.json(),
      "category": i.string(),
      "createdAt": i.number(),
      "updatedAt": i.number(),
    }),
    "systemPrompts": i.entity({
      "content": i.string(),
      "createdAt": i.number(),
      "updatedAt": i.number(),
    }),
  },
  links: {
    "$usersLinkedPrimaryUser": {
      "forward": {
        "on": "$users",
        "has": "one",
        "label": "linkedPrimaryUser",
        "onDelete": "cascade"
      },
      "reverse": {
        "on": "$users",
        "has": "many",
        "label": "linkedGuestUsers"
      }
    },
    "practicePrompt": {
      "forward": {
        "on": "practices",
        "has": "one",
        "label": "systemPrompt"
      },
      "reverse": {
        "on": "systemPrompts",
        "has": "one",
        "label": "practice"
      }
    }
  },
  rooms: {}
});

// This helps Typescript display nicer intellisense
type _AppSchema = typeof _schema;
interface AppSchema extends _AppSchema {}
const schema: AppSchema = _schema;

export type { AppSchema }
export default schema;
