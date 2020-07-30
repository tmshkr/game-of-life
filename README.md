# Conway's Game of Life

React app that allows the user to play Conway's Game of Life, according to the following rules:

* Cells are either alive or dead
* Any live cell with fewer than two live neighbours dies, as if by underpopulation.
* Any live cell with two or three live neighbours lives on to the next generation.
* Any live cell with more than three live neighbours dies, as if by overpopulation.
* Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.

The grid is treated as a finite space, determined by the size of the browser window,
which can be resized in order to resize the grid. Each generation is stored in a
[linked list](src/utils/history.js), which can be stepped through one at a time
(or quickly by holding down the left or right arrow keys).

The full list of keyboard shortcuts can be accessed by clicking the (?) icon
or pressing the `?` key.