# Prettier

prettier is code formatter that is very strict and not-customizable, which is perfect for a standard. It also makes
sure that when code is diff'd it is diff'd in a really consistent way for code reviews.

You should have prettier installed in your ide. It is also highly recommended to have "format-on-save" on.

prettier should be enforced in a test on every repository in continuous integration.

Every project should have a `.prettierrc` with `{ "semi": false }` in it to prevent semi colons.
