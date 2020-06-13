# Burnable Projects

Burnable projects is a philosophy that favors extremely simple APIs, such that projects can quickly be rewritten.

In a system of burnable projects, each project is so small that replacing it takes less than a couple of days. This
allows codebases to be rewritten in new technologies easily.

When a project is rewritten, it either gets a new name or a new major version (e.g. v1.5.2 -> v2.0.0).

## Exception: Popular Open-Source

When building an open-source project, the rules change dramatically to accomodate the fact that users require
a greater degree of stability, and it's also easier to contribute to a project in a small way rather than a
large burnable way. In an open-source projects:

* The boy-scout rule applies
* Maximize ease of contribution, using the complex-but-modular pattern, wherein the project is complex, but is
  easy to contribute to because the complexities of specific functions are in well-separated and organized files

## Anti-pattern: Boy-scout Rule

The boy-scout rule is to "leave a codebase better than you found it", or, "if you change any code, make the
surrounding code easier to understand (if you can)".

> The actual boyscout rule is "Leave a campsite better than you found it."
