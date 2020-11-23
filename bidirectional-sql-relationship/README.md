# Bidirectional SQL Relationship

A bidirectional SQL relationship comes up when you want to have a relationship between two items in both directions. For example,
the distance between two points is a symmetric bidirectional relationship. If the distance from `P1` to `P2` is `50`, then you
would expect the distance from `P2` to `P1` to also be `50`. You might represent this in a table `point_distance` like so:

| point_1 | point_2 | distance |
| ------- | ------- | -------- |
| P1      | P2      | 0.5      |
| P2      | P1      | 0.5      |

You can also have an asymmetric bidirectional relationship. For example, the liklihood of buying an a sweater if you purchased a scarf is
not the same as the liklihood of buying a scarf if you purchased a sweater!

## Symmetric Bidirectional Relationships

Symmetric bidirectional relationships can be enforced by the database. Basically whenever someone inserts a record `R1 -> R2`, you
have a trigger automatically insert `R2 -> R1`. This is faster and safer than having the application developer enforce these database
rules. Here's an example of a bidirectional relationship for the CollegeAI college similarity table.

> CollegeAI's similarity table is actually not bidirectional, but I wrote this before I realized it was not, hopefully the code will have some use here.

```javascript
  pgm.createTable("college_sim_data", {
    college_id_1: { type: "text", notNull: true, references: "college" },
    college_id_2: { type: "text", notNull: true, references: "college" },
    sim_type: { type: "text", notNull: true },
    sim: { type: "numeric", notNull: true },
  })
  pgm.createConstraint("college_sim_data", "college_sim_unq", {
    unique: ["college_id_1", "college_id_2", "sim_type"],
  })
  pgm.createView(
    "college_sim",
    {},
    `
    SELECT * FROM college_sim_data
  `.trim()
  )

  pgm.createTrigger(
    "college_sim",
    "college_sim_insert_trig",
    {
      when: "INSTEAD OF",
      operation: "INSERT",
      language: "plpgsql",
    },
    `
  BEGIN
    INSERT INTO college_sim_data (college_id_1, college_id_2, sim_type, sim) SELECT
      NEW.college_id_1,
      NEW.college_id_2,
      NEW.sim_type,
      NEW.sim;
    INSERT INTO college_sim_data (college_id_1, college_id_2, sim_type, sim) SELECT
      NEW.college_id_2,
      NEW.college_id_1,
      NEW.sim_type,
      NEW.sim;
    RETURN NULL;
  END;
  `.trim()
  )

  pgm.createTrigger(
    "college_sim",
    "college_sim_delete_trig",
    {
      when: "INSTEAD OF",
      operation: "DELETE",
      language: "plpgsql",
    },
    `
  BEGIN
    DELETE FROM college_sim_data
    WHERE college_id_1 = OLD.college_id_2 AND college_id_2 = OLD.college_id_1 OR
          college_id_1 = OLD.college_id_1 AND college_id_2 = OLD.college_id_2;
  END;
  `.trim()
  )
```
