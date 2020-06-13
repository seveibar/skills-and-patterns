 # Superstruct
 
 It can be helpful to validate objects at runtime. [Superstruct](https://github.com/ianstormtaylor/superstruct) is a
 simple and intuitive way to define runtime types.
 
 ## Example

```javascript
import { assert, object, number, string, array } from 'superstruct'

const Article = object({
  id: number(),
  title: string(),
  tags: array(string()),
  author: object({
    id: number(),
  }),
})

const data = {
  id: 34,
  title: 'Hello World',
  tags: ['news', 'features'],
  author: {
    id: 1,
  },
}

assert(data, Article)
```
