# Javascript (style guide)

> This document is incomplete, partially because it's a large undertaking. The [Airbnb javascript style guide](https://github.com/airbnb/javascript) is a good reference
> until this document is complete.


## Don't use `forEach`

Use for loops instead of `forEach`. `forEach` has unexpected behavior with asynchronous functions, is slower [[1]](https://coderwall.com/p/kvzbpa/don-t-use-array-foreach-use-for-instead)
and has more characters.
