export function create2DMatrix(numRows, numCols, fill = true) {
  const matrix = new Array(numRows);
  for (let i = 0; i < numRows; i++) {
    matrix[i] = new Array(numCols);
    if (fill) matrix[i].fill(0);
  }
  return matrix;
}

// receives a 2D matrix (m)
// and returns the next generation
export function getNextGen(m) {
  const output = create2DMatrix(m.length, m[0].length, false);
  for (let i = 0; i < m.length; i++) {
    for (let j = 0; j < m[i].length; j++) {
      // count the neighbors
      let count = 0;
      if (j > 0) count += m[i][j - 1];
      if (i > 0) count += m[i - 1][j];
      if (i < m.length - 1) count += m[i + 1][j];
      if (i > 0 && j > 0) count += m[i - 1][j - 1];
      if (j < m[i].length - 1) count += m[i][j + 1];
      if (i < m.length - 1 && j > 0) count += m[i + 1][j - 1];
      if (i > 0 && j < m[i].length - 1) count += m[i - 1][j + 1];
      if (i < m.length - 1 && j < m[i].length - 1) count += m[i + 1][j + 1];

      // then determine whether the cell will
      // live, die, or regenerate
      if (m[i][j] && count === 2) output[i][j] = 1;
      else if (count === 3) output[i][j] = 1;
      else output[i][j] = 0;
    }
  }

  return output;
}

export function clone(m) {
  const clone = new Array(m.length);
  for (let i = 0; i < m.length; i++) {
    clone[i] = new Array(m[i].length);
    for (let j = 0; j < m[i].length; j++) {
      clone[i][j] = m[i][j];
    }
  }
  return clone;
}

export function resize(m, numRows, numCols) {
  const resized = new Array(numRows);
  for (let i = 0; i < numRows; i++) {
    resized[i] = new Array(numCols);
    for (let j = 0; j < numCols; j++) {
      if (i < m.length && j < m[i].length) {
        resized[i][j] = m[i][j];
      } else resized[i][j] = 0;
    }
  }
  return resized;
}
